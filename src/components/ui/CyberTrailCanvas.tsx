import React, { useEffect, useRef } from 'react';
import {
  calculateWakeInfluence,
  getTrailBoundingBox,
  TrailPoint,
} from '../../utils/wakeTrail';

/**
 * Cipher symbols used for the continuous live decryption stream.
 * Includes alphanumeric characters, code syntax symbols, and cryptographic runes.
 */
const CIPHER_GLYPHS =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>/\\*+=-~#&%!?$@|;:^∆∑∏Ω§øλπ≠';

/**
 * Predefined technical strings mapped across the monospace grid rows.
 * Showcases full-stack competencies, architecture concepts, and core technologies.
 */
const TECHNICAL_STRINGS = [
  'IKHSAN IBNU ABDULLAH • FULLSTACK SOFTWARE ENGINEER • DISTRIBUTED SYSTEMS • ',
  'TYPESCRIPT • REACT • VITE • TAILWIND CSS • GO • REDIS • APACHE KAFKA • ',
  'SYSTEM ARCHITECTURE • HIGH THROUGHPUT • EVENT DRIVEN • CLEAN CODE • ',
  'DOCKER • PODMAN • NGINX • LINUX • GITHUB ACTIONS CI/CD • WEB STANDARDS • ',
  'BACKEND MICROSERVICES • CLOUD STORAGE • SCALABLE ARCHITECTURE • REST APIS • ',
];

/**
 * Grid cell dimensions in pixels (adhering to JetBrains Mono aspect ratio).
 */
const CELL_WIDTH = 20;
const CELL_HEIGHT = 28;

/**
 * Optimized proximity interaction radius at the head of the water wake.
 * Provides a focused 180px reach (360px diameter) directly responding to pointer trajectory.
 */
const PROXIMITY_RADIUS = 180;

/**
 * Minimum tapered radius at the tail of the decaying wake.
 */
const TAIL_RADIUS = 36;

/**
 * Lifespan of pointer wake disturbance in milliseconds before complete evaporation.
 */
const TRAIL_LIFESPAN = 800;

/**
 * Shared baseline opacity for both idle monospace dots and the perimeter minimum of cipher characters.
 *
 * Why:
 * Unifying the floor opacity prevents abrupt brightness dips when dots transform into letters,
 * and eliminates pop-in artifacts when active characters dissolve back into the idle dot matrix.
 */
const BASE_DOT_OPACITY = 0.52;

/**
 * Styling for the baseline idle monospace dot matrix.
 * Slate-500 with BASE_DOT_OPACITY provides clear, intentional architectural structure against pure white.
 */
const IDLE_DOT_COLOR = `rgba(100, 116, 139, ${BASE_DOT_OPACITY})`;

/**
 * State tracked per individual grid cell for continuous live cipher scrambling.
 */
interface CellState {
  /** Frames remaining until next cipher glyph mutation */
  mutationCountdown: number;
  /** Current active cipher glyph */
  displayChar: string;
  /** True resolved character from technical string */
  targetChar: string;
  /** Reveal progress between 0 (baseline dot) and 1 (fully active cipher letter) */
  revealProgress: number;
  /** Randomly assigned flag for occasional brand red accent glitch */
  isAccent: boolean;
}

export interface CyberTrailCanvasProps {
  /**
   * Optional reference to parent container to track pointer movements across.
   * When omitted, listeners attach directly to the canvas's immediate parent element.
   */
  containerRef?: React.RefObject<HTMLElement>;
  /**
   * Optional extra CSS classes applied to the canvas element.
   */
  className?: string;
}

/**
 * High-performance HTML5 Canvas component that renders a monospace dot matrix (`·`)
 * across the hero background, transforming dots into an organic, motion-driven water wake
 * that hugs cursor trajectory when moving and gently dissolves to still dots when stationary.
 *
 * Why:
 * 1. Motion-Driven Water Wake: Cells activate based on movement trajectory and velocity,
 *    simulating fluid displacement that trails behind the cursor.
 * 2. Gentle Idle Dissolution: When the cursor pauses or stops moving, existing disturbances
 *    smoothly evaporate over ~800ms back into the calm dot matrix.
 * 3. 180px Proximity Radius: Reduced from 260px to provide a balanced, focused field of view.
 * 4. Bounding-box spatial pruning limits per-frame calculations to cells within the active wake path.
 * 5. Self-sleeping RAF loop pauses automatically when all disturbances settle, maintaining 0% idle CPU.
 * 6. Respects prefers-reduced-motion by rendering a peaceful static dot matrix.
 *
 * @param props Component properties containing optional containerRef and className
 * @returns Absolute-positioned HTML5 canvas JSX element
 */
export const CyberTrailCanvas: React.FC<CyberTrailCanvasProps> = ({
  containerRef,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const rawCanvas = canvasRef.current;
    if (!rawCanvas) return;

    const rawCtx = rawCanvas.getContext('2d');
    if (!rawCtx) return;

    const rawTarget = containerRef?.current || rawCanvas.parentElement;
    if (!rawTarget) return;

    // Guaranteed non-null references for inner function closures
    const canvas: HTMLCanvasElement = rawCanvas;
    const ctx: CanvasRenderingContext2D = rawCtx;
    const targetElement: HTMLElement = rawTarget;

    // Honor accessibility: check if visitor prefers reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = motionQuery.matches;

    let animationFrameId: number | null = null;
    let isLoopRunning = false;

    // Chronological buffer of recent pointer movement points
    let trailPoints: TrailPoint[] = [];

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;
    let cols = 0;
    let rows = 0;
    let offsetX = 0;
    let offsetY = 0;

    // 2D grid storing cellular state
    let grid: CellState[][] = [];

    /**
     * Retrieves a random character from the cyber cipher dictionary.
     */
    function getRandomCipherGlyph(): string {
      return CIPHER_GLYPHS[Math.floor(Math.random() * CIPHER_GLYPHS.length)];
    }

    /**
     * Initializes the monospace grid and cellular states based on dimensions.
     */
    function initGrid() {
      cols = Math.max(1, Math.floor(width / CELL_WIDTH));
      rows = Math.max(1, Math.floor(height / CELL_HEIGHT));

      offsetX = (width - cols * CELL_WIDTH) / 2 + CELL_WIDTH / 2;
      offsetY = (height - rows * CELL_HEIGHT) / 2 + CELL_HEIGHT / 2;

      grid = [];
      for (let r = 0; r < rows; r++) {
        const rowData: CellState[] = [];
        const stringSource = TECHNICAL_STRINGS[r % TECHNICAL_STRINGS.length];

        for (let c = 0; c < cols; c++) {
          const char = stringSource[c % stringSource.length];
          rowData.push({
            mutationCountdown: Math.floor(Math.random() * 16) + 8,
            displayChar: char,
            targetChar: char,
            revealProgress: 0,
            isAccent: Math.random() < 0.14, // 14% chance of brand red accent
          });
        }
        grid.push(rowData);
      }
    }

    /**
     * Draws a single static frame of the clean dot matrix (used for idle or reduced motion).
     */
    function drawStaticDotGrid() {
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      ctx.font = '600 13px "JetBrains Mono", "Fira Code", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = IDLE_DOT_COLOR;

      for (let r = 0; r < rows; r++) {
        const y = offsetY + r * CELL_HEIGHT;
        for (let c = 0; c < cols; c++) {
          const x = offsetX + c * CELL_WIDTH;
          ctx.fillText('·', x, y);
        }
      }

      ctx.restore();
    }

    /**
     * Main canvas rendering loop.
     * Computes water wake influence along the pointer trail, executes live cipher mutations,
     * and softly dissolves cells back into dots when movement stops.
     * Automatically suspends itself when all wake disturbances settle, maintaining 0% idle CPU.
     */
    function renderFrame() {
      const now = performance.now();

      // Prune expired trail points older than TRAIL_LIFESPAN
      trailPoints = trailPoints.filter((p) => now - p.time < TRAIL_LIFESPAN);

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Compute spatial bounding box for the active wake
      const bbox = getTrailBoundingBox(
        trailPoints,
        PROXIMITY_RADIUS,
        cols,
        rows,
        offsetX,
        offsetY,
        CELL_WIDTH,
        CELL_HEIGHT
      );

      let activeTransitionsCount = 0;

      for (let r = 0; r < rows; r++) {
        const y = offsetY + r * CELL_HEIGHT;
        const isRowInBBox = bbox !== null && r >= bbox.minRow && r <= bbox.maxRow;

        for (let c = 0; c < cols; c++) {
          const x = offsetX + c * CELL_WIDTH;
          const cell = grid[r][c];

          let targetReveal = 0;
          let dist = Infinity;
          let isInside = false;

          if (isRowInBBox && bbox !== null && c >= bbox.minCol && c <= bbox.maxCol) {
            const wake = calculateWakeInfluence(
              x,
              y,
              trailPoints,
              now,
              PROXIMITY_RADIUS,
              TAIL_RADIUS,
              TRAIL_LIFESPAN
            );
            targetReveal = wake.influence;
            dist = wake.dist;
            isInside = wake.isInside;
          }

          if (isInside && targetReveal > 0.04) {
            // Live continuous cipher stream in active wake
            cell.mutationCountdown--;
            if (cell.mutationCountdown <= 0) {
              // 15% chance to momentarily flash the true target character, 85% random cipher glyph
              if (Math.random() < 0.15 && cell.targetChar !== ' ') {
                cell.displayChar = cell.targetChar;
              } else {
                cell.displayChar = getRandomCipherGlyph();
              }
              const cycleSpeed = dist < 70 ? 12 : 20;
              cell.mutationCountdown = Math.floor(Math.random() * 8) + cycleSpeed;
            }

            // Smooth approach toward target reveal
            cell.revealProgress += (targetReveal - cell.revealProgress) * 0.28;
            activeTransitionsCount++;
          } else {
            // Outside active wake or wake dissipating: gentle dissolution toward baseline dot
            if (cell.revealProgress > 0) {
              cell.revealProgress += (0 - cell.revealProgress) * 0.12;
              if (cell.revealProgress < 0.005) {
                cell.revealProgress = 0;
                cell.displayChar = '·';
              } else {
                activeTransitionsCount++;
              }
            }
          }

          // Render cell based on reveal progress
          if (cell.revealProgress > 0.02 && cell.displayChar !== ' ') {
            // In wake: Render scrambling cipher character
            ctx.font = '600 13px "JetBrains Mono", "Fira Code", monospace';

            // Scale opacity smoothly from BASE_DOT_OPACITY at perimeter up to 1.0 at center
            const animOpacity = BASE_DOT_OPACITY + (1 - BASE_DOT_OPACITY) * cell.revealProgress;

            if (dist < 60) {
              // Center zone: High contrast charcoal with occasional brand red
              if (cell.isAccent) {
                ctx.fillStyle = `rgba(226, 24, 24, ${Math.min(1, animOpacity * 1.1)})`;
              } else {
                ctx.fillStyle = `rgba(26, 26, 26, ${Math.min(1, animOpacity * 1.1)})`;
              }
            } else {
              // Mid/outer wake zone: Refined slate fading smoothly toward perimeter minimum
              if (cell.isAccent) {
                ctx.fillStyle = `rgba(226, 24, 24, ${animOpacity})`;
              } else {
                ctx.fillStyle = `rgba(51, 65, 85, ${animOpacity})`;
              }
            }

            ctx.fillText(cell.displayChar, x, y);
          } else {
            // Default baseline: Monospace dot
            ctx.font = '600 13px "JetBrains Mono", "Fira Code", monospace';
            ctx.fillStyle = IDLE_DOT_COLOR;
            ctx.fillText('·', x, y);
          }
        }
      }

      ctx.restore();

      // Continue animation loop if trail points exist or cells are still dissolving
      if (trailPoints.length > 0 || activeTransitionsCount > 0) {
        animationFrameId = requestAnimationFrame(renderFrame);
      } else {
        isLoopRunning = false;
        animationFrameId = null;
      }
    }

    /**
     * Wakes the RAF loop when pointer interaction occurs.
     */
    function wakeLoop() {
      if (!isLoopRunning) {
        isLoopRunning = true;
        animationFrameId = requestAnimationFrame(renderFrame);
      }
    }

    /**
     * Handles canvas buffer resizing matching device pixel ratio for retina clarity.
     */
    function handleResize() {
      const rect = targetElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      initGrid();

      if (prefersReducedMotion) {
        drawStaticDotGrid();
      } else {
        renderFrame();
      }
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = targetElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
        return;
      }

      const now = performance.now();
      const lastPoint = trailPoints[trailPoints.length - 1];

      // Append new point if pointer moved at least 4px or >= 20ms elapsed
      if (
        !lastPoint ||
        Math.hypot(x - lastPoint.x, y - lastPoint.y) >= 4 ||
        now - lastPoint.time >= 20
      ) {
        trailPoints.push({ x, y, time: now });
        // Cap buffer length to prevent memory churn
        if (trailPoints.length > 50) {
          trailPoints.shift();
        }
      }

      wakeLoop();
    }

    function handlePointerLeave() {
      // When cursor leaves hero, allow existing wake to dissolve gently
      wakeLoop();
    }

    handleResize();
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(targetElement);

    if (prefersReducedMotion) {
      return () => {
        resizeObserver.disconnect();
      };
    }

    targetElement.addEventListener('pointermove', handlePointerMove as EventListener, {
      passive: true,
    });
    targetElement.addEventListener('pointerdown', handlePointerMove as EventListener, {
      passive: true,
    });
    targetElement.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      resizeObserver.disconnect();
      targetElement.removeEventListener('pointermove', handlePointerMove as EventListener);
      targetElement.removeEventListener('pointerdown', handlePointerMove as EventListener);
      targetElement.removeEventListener('pointerleave', handlePointerLeave);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
    />
  );
};
