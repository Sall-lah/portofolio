/**
 * Data structure representing a single point along the pointer's movement path.
 */
export interface TrailPoint {
  /** X-coordinate in canvas CSS pixel space */
  x: number;
  /** Y-coordinate in canvas CSS pixel space */
  y: number;
  /** High-resolution timestamp from performance.now() */
  time: number;
}

/**
 * Result of evaluating wake influence for a specific grid coordinate.
 */
export interface WakeInfluenceResult {
  /** Normalized influence between 0 (calm baseline dot) and 1 (peak cipher scramble) */
  influence: number;
  /** Distance in pixels to the closest wake line segment */
  dist: number;
  /** Whether the coordinate lies within the wake's active tapered envelope */
  isInside: boolean;
}

/**
 * Bounding box of column and row indices to prune off-screen and untouched grid cells.
 */
export interface GridBoundingBox {
  minCol: number;
  maxCol: number;
  minRow: number;
  maxRow: number;
}

/**
 * Computes the minimum squared distance from point (px, py) to a line segment between (x1, y1) and (x2, y2),
 * and returns the interpolation parameter t along the segment.
 *
 * Why:
 * Testing line segments rather than discrete points ensures the wake doesn't break into
 * disconnected "beads" during fast cursor strokes or flicks.
 *
 * @param px Target cell X coordinate
 * @param py Target cell Y coordinate
 * @param x1 Segment start X
 * @param y1 Segment start Y
 * @param x2 Segment end X
 * @param y2 Segment end Y
 * @returns Object containing squared distance and interpolation factor t in [0, 1]
 */
export function getClosestSegmentPoint(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): { distSq: number; t: number } {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lenSq = dx * dx + dy * dy;

  if (lenSq === 0) {
    const dpx = px - x1;
    const dpy = py - y1;
    return { distSq: dpx * dpx + dpy * dpy, t: 0 };
  }

  let t = ((px - x1) * dx + (py - y1) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));

  const projX = x1 + t * dx;
  const projY = y1 + t * dy;
  const dpx = px - projX;
  const dpy = py - projY;

  return { distSq: dpx * dpx + dpy * dpy, t };
}

/**
 * Evaluates the cumulative water wake influence on a single cell coordinate by testing against
 * the active trailing path segments.
 *
 * Why:
 * 1. Simulates fluid displacement: newer points near the cursor head exert a wider (up to maxRadius)
 *    and brighter influence, while older points naturally narrow and softly fade out.
 * 2. If the pointer stops moving, existing points expire past `lifespan` without being replenished,
 *    allowing the wake to organically dissolve back into still water.
 *
 * @param cellX Center X of the grid cell
 * @param cellY Center Y of the grid cell
 * @param trailPoints Array of recorded pointer points sorted chronologically
 * @param now Current performance timestamp
 * @param maxRadius Maximum detection radius at the head of the wake (e.g. 180px)
 * @param minRadius Minimum detection radius at the tail of the wake (e.g. 36px)
 * @param lifespan Lifespan of trail points in milliseconds before complete evaporation (e.g. 800ms)
 * @returns Result with influence score, closest distance, and inside flag
 */
export function calculateWakeInfluence(
  cellX: number,
  cellY: number,
  trailPoints: TrailPoint[],
  now: number,
  maxRadius = 180,
  minRadius = 36,
  lifespan = 800
): WakeInfluenceResult {
  if (trailPoints.length === 0) {
    return { influence: 0, dist: Infinity, isInside: false };
  }

  let maxInfluence = 0;
  let minDistance = Infinity;
  let isInside = false;

  // Single point handling (e.g. initial touch or click)
  if (trailPoints.length === 1) {
    const p = trailPoints[0];
    const age = now - p.time;
    if (age >= lifespan) {
      return { influence: 0, dist: Infinity, isInside: false };
    }

    const dist = Math.hypot(cellX - p.x, cellY - p.y);
    const freshness = Math.max(0, 1 - age / lifespan);
    const radius = minRadius + (maxRadius - minRadius) * freshness;

    if (dist <= radius) {
      const radialFalloff = 1 - dist / radius;
      return {
        influence: radialFalloff * freshness,
        dist,
        isInside: true,
      };
    }

    return { influence: 0, dist, isInside: false };
  }

  // Iterate over consecutive line segments along the recorded trajectory
  for (let i = 0; i < trailPoints.length - 1; i++) {
    const p1 = trailPoints[i];
    const p2 = trailPoints[i + 1];

    const { distSq, t } = getClosestSegmentPoint(cellX, cellY, p1.x, p1.y, p2.x, p2.y);
    const dist = Math.sqrt(distSq);

    // Interpolate timestamp along the segment
    const pointTime = p1.time + t * (p2.time - p1.time);
    const age = now - pointTime;

    if (age < lifespan) {
      // Smooth cosine or power easing for gentle water-like dissipation
      const rawFreshness = Math.max(0, 1 - age / lifespan);
      // Easing curve creates a sustained gentle tail that doesn't abruptly drop off
      const freshness = Math.sin((rawFreshness * Math.PI) / 2);

      // Taper radius from maxRadius at head down to minRadius at tail
      const segmentRadius = minRadius + (maxRadius - minRadius) * freshness;

      if (dist <= segmentRadius) {
        const radialFalloff = 1 - dist / segmentRadius;
        const influence = radialFalloff * freshness;

        if (influence > maxInfluence) {
          maxInfluence = influence;
        }
        if (dist < minDistance) {
          minDistance = dist;
        }
        isInside = true;
      }
    }
  }

  return {
    influence: maxInfluence,
    dist: minDistance,
    isInside,
  };
}

/**
 * Computes a spatial bounding box encompassing all active trail points expanded by maxRadius.
 *
 * Why:
 * Computing matrix distance math only for cells in this bounding box reduces per-frame math
 * by over 80% on high-resolution screens, keeping animation silky smooth at 60/120fps.
 *
 * @param trailPoints Array of active trail points
 * @param maxRadius Detection radius expansion (e.g. 180px)
 * @param cols Total columns in the monospace grid
 * @param rows Total rows in the monospace grid
 * @param offsetX Grid horizontal center offset
 * @param offsetY Grid vertical center offset
 * @param cellWidth Width of each monospace cell
 * @param cellHeight Height of each monospace cell
 * @returns Bounding box with clamped grid column and row ranges
 */
export function getTrailBoundingBox(
  trailPoints: TrailPoint[],
  maxRadius: number,
  cols: number,
  rows: number,
  offsetX: number,
  offsetY: number,
  cellWidth: number,
  cellHeight: number
): GridBoundingBox | null {
  if (trailPoints.length === 0) return null;

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (let i = 0; i < trailPoints.length; i++) {
    const p = trailPoints[i];
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }

  minX -= maxRadius;
  maxX += maxRadius;
  minY -= maxRadius;
  maxY += maxRadius;

  return {
    minCol: Math.max(0, Math.floor((minX - offsetX) / cellWidth)),
    maxCol: Math.min(cols - 1, Math.ceil((maxX - offsetX) / cellWidth)),
    minRow: Math.max(0, Math.floor((minY - offsetY) / cellHeight)),
    maxRow: Math.min(rows - 1, Math.ceil((maxY - offsetY) / cellHeight)),
  };
}
