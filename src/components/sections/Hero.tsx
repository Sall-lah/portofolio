import React, { useRef } from 'react';
import { siteConfig } from '../../data/siteConfig';
import { CyberTrailCanvas } from '../ui/CyberTrailCanvas';

/**
 * Top presentation section centered on the viewport for immediate visual impact.
 * Features a static developer headline with crisp solid white fill and primary red border (#e21818)
 * set against an interactive HTML5 Canvas cyber cipher particle trail background.
 *
 * Why:
 * 1. The static white-fill + red-stroke typography provides maximum contrast and structural clarity
 *    over the dynamic particle wake.
 * 2. Scoping the pointer tracking ref directly to the hero section prevents canvas interaction from
 *    spilling into narrative sections.
 * 3. Layering the content above the canvas (z-10 over z-0) ensures accessibility and text selection.
 *
 * @returns Centered Hero section JSX element
 */
export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement | null>(null);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center py-16 sm:py-20 md:py-24 bg-white overflow-hidden"
    >
      {/* Interactive cyber matrix cipher particle wake layer */}
      <CyberTrailCanvas containerRef={heroRef} />

      {/* Foreground Content Layer */}
      <div className="relative z-10 max-w-content mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-center pointer-events-none">
        <div className="max-w-3xl mx-auto text-center space-y-6 pointer-events-auto">
          {/* Primary Name Display: Static solid white fill with high-fidelity primary red stroke */}
          <h1 className="text-[44px] sm:text-[58px] md:text-[72px] font-bold leading-[1.06] tracking-[-0.03em] select-none text-center text-stroke-primary">
            {siteConfig.name}
          </h1>

          {/* High-impact personal motivation statement with enhanced fidelity, contrast and legibility */}
          <p className="text-[18px] sm:text-[21px] md:text-[24px] text-brand-text leading-[1.6] font-medium pt-1 max-w-2xl mx-auto text-center">
            {siteConfig.motivation}
          </p>
        </div>
      </div>
    </section>
  );
};

