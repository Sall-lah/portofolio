import React, { useEffect, useRef } from 'react';

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
 * Generous proximity interaction radius around the cursor.
 * Allows full phrases and words to be comfortably read without visual cramping.
 */
const PROXIMITY_RADIUS = 260;

/**
 * Styling for the baseline idle monospace dot matrix.
 * Slate-500 with 0.52 opacity provides clear, intentional architectural structure against pure white.
 */
const IDLE_DOT_COLOR = 'rgba(100, 116, 139, 0.52)';

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
 * across the hero background, transforming dots into a continuous, living cipher stream
 * that actively scrambles and mutates as long as the cursor is nearby.
 *
 * Why:
 * 1. Continuous Live Cipher: Characters in proximity never settle on static text,
 *    simulating an active real-time cryptographic decryption stream.
 * 2. Monospace dot grid provides architectural structure when idle.
 * 3. Bounding-box spatial pruning limits per-frame math to ~300 cells instead of the whole screen.
 * 4. Self-sleeping RAF loop pauses when cursor leaves the hero, maintaining 0% idle CPU.
 * 5. Respects prefers-reduced-motion by rendering a peaceful static dot matrix.
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
    let isPointerActive = false;
    let pointerX = -9999;
    let pointerY = -9999;

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
     * Computes proximity falloff, runs continuous cipher mutations, and renders dots or letters.
     * Automatically suspends itself when pointer leaves and cells settle to preserve CPU.
     */
    function renderFrame() {
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      let hasActiveTransitions = false;

      // Spatial pruning bounding box for proximity checks
      const minCol = Math.max(0, Math.floor((pointerX - PROXIMITY_RADIUS - offsetX) / CELL_WIDTH));
      const maxCol = Math.min(cols - 1, Math.ceil((pointerX + PROXIMITY_RADIUS - offsetX) / CELL_WIDTH));
      const minRow = Math.max(0, Math.floor((pointerY - PROXIMITY_RADIUS - offsetY) / CELL_HEIGHT));
      const maxRow = Math.min(rows - 1, Math.ceil((pointerY + PROXIMITY_RADIUS - offsetY) / CELL_HEIGHT));

      for (let r = 0; r < rows; r++) {
        const y = offsetY + r * CELL_HEIGHT;
        const isRowInBounds = isPointerActive && r >= minRow && r <= maxRow;

        for (let c = 0; c < cols; c++) {
          const x = offsetX + c * CELL_WIDTH;
          const cell = grid[r][c];

          let dist = Infinity;
          let isInside = false;

          if (isRowInBounds && c >= minCol && c <= maxCol) {
            dist = Math.hypot(x - pointerX, y - pointerY);
            isInside = dist <= PROXIMITY_RADIUS;
          }

          if (isInside) {
            // Live continuous cipher stream: mutate glyphs at a relaxed, rhythmic pace
            cell.mutationCountdown--;
            if (cell.mutationCountdown <= 0) {
              // 15% chance to momentarily flash the true target character, 85% random cipher glyph
              if (Math.random() < 0.15 && cell.targetChar !== ' ') {
                cell.displayChar = cell.targetChar;
              } else {
                cell.displayChar = getRandomCipherGlyph();
              }
              // Reduced mutation rate: center-most cells mutate every 12–18 frames (~200ms–300ms),
              // perimeter cells mutate more gently every 20–30 frames (~330ms–500ms).
              const cycleSpeed = dist < 90 ? 12 : 20;
              cell.mutationCountdown = Math.floor(Math.random() * 8) + cycleSpeed;
            }

            // Target reveal based on distance falloff
            const targetReveal = Math.max(0, 1 - dist / PROXIMITY_RADIUS);
            cell.revealProgress += (targetReveal - cell.revealProgress) * 0.35;
            hasActiveTransitions = true;
          } else {
            // Cell outside proximity radius: dissolve back toward dot baseline
            if (cell.revealProgress > 0) {
              cell.revealProgress += (0 - cell.revealProgress) * 0.18;
              if (cell.revealProgress < 0.02) {
                cell.revealProgress = 0;
                cell.displayChar = '·';
              }
              hasActiveTransitions = true;
            }
          }

          // Rendering based on reveal progress
          if (cell.revealProgress > 0.04 && cell.displayChar !== ' ') {
            // In proximity: Render live scrambling cipher character
            ctx.font = '600 13px "JetBrains Mono", "Fira Code", monospace';

            if (dist < 70) {
              // Center zone: High contrast charcoal with occasional brand red
              if (cell.isAccent) {
                ctx.fillStyle = `rgba(226, 24, 24, ${Math.min(1, cell.revealProgress * 1.25)})`;
              } else {
                ctx.fillStyle = `rgba(26, 26, 26, ${Math.min(1, cell.revealProgress * 1.2)})`;
              }
            } else {
              // Mid/outer zone: Refined slate fading smoothly toward perimeter
              if (cell.isAccent) {
                ctx.fillStyle = `rgba(226, 24, 24, ${cell.revealProgress * 0.85})`;
              } else {
                ctx.fillStyle = `rgba(51, 65, 85, ${cell.revealProgress * 0.85})`;
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

      // Continue animation loop if transitions are active or pointer is active in hero
      if (hasActiveTransitions || isPointerActive) {
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
        isPointerActive = false;
        return;
      }

      isPointerActive = true;
      pointerX = x;
      pointerY = y;
      wakeLoop();
    }

    function handlePointerLeave() {
      isPointerActive = false;
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

    targetElement.addEventListener('pointermove', handlePointerMove as EventListener, { passive: true });
    targetElement.addEventListener('pointerdown', handlePointerMove as EventListener, { passive: true });
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
