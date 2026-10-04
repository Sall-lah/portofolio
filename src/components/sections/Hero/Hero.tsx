import React, { useRef } from 'react';
import { siteConfig } from '../../../data/siteConfig';
import { CyberTrailCanvas } from './CyberTrailCanvas';

/**
 * Top presentation section centered on the viewport for immediate visual impact.
 * Why: Pairs static high-contrast developer typography with an interactive canvas particle background,
 * using a soft white text halo on motivation text to preserve legibility over moving cipher glyphs.
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
      <CyberTrailCanvas containerRef={heroRef} />

      <div className="relative z-10 max-w-content mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-center pointer-events-none">
        <div className="max-w-3xl mx-auto text-center space-y-6 pointer-events-auto">
          <h1 className="text-[44px] sm:text-[58px] md:text-[72px] font-bold leading-[1.06] tracking-[-0.03em] select-none text-center text-stroke-primary">
            {siteConfig.name}
          </h1>

          <p className="text-[18px] sm:text-[21px] md:text-[24px] text-brand-text leading-[1.6] font-medium pt-1 max-w-2xl mx-auto text-center text-halo-light">
            {siteConfig.motivation}
          </p>
        </div>
      </div>
    </section>
  );
};

