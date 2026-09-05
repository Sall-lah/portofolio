import React from 'react';
import { siteConfig } from '../../data/siteConfig';

/**
 * Top presentation section centered on the viewport for immediate visual impact.
 * Features the animated cascading light-wave developer name and personal motivation
 * statement with clean, centered typography adhering to DESIGN.md.
 *
 * @returns Centered Hero section JSX element
 */
export const Hero: React.FC = () => {
  // Stagger characters individually across CSS animation variables to provide
  // a subtle, high-contrast light wave that immediately draws visual attention.
  const words = siteConfig.name.split(' ');
  let charCounter = 0;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center py-16 sm:py-20 md:py-24 bg-white"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-center">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Primary Name Display: Staggered light wave animation centered across viewports */}
          <h1 className="text-[42px] sm:text-[56px] md:text-[70px] font-bold leading-[1.06] tracking-[-0.03em] select-none text-brand-text text-center">
            {words.map((word, wordIndex) => (
              <span
                key={wordIndex}
                className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0"
              >
                {Array.from(word).map((char, charIndex) => {
                  const currentCharIdx = charCounter++;
                  return (
                    <span
                      key={charIndex}
                      className="animate-char-wave"
                      style={
                        {
                          '--char-idx': currentCharIdx,
                        } as React.CSSProperties
                      }
                    >
                      {char}
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          {/* High-impact personal motivation statement centered beneath name */}
          <p className="text-[18px] sm:text-[21px] md:text-[23px] text-brand-muted leading-[1.55] font-normal pt-1 max-w-2xl mx-auto text-center">
            {siteConfig.motivation}
          </p>
        </div>
      </div>
    </section>
  );
};

