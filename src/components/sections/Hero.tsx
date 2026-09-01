import React from 'react';
import { ArrowDown, ExternalLink, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { siteConfig } from '../../data/siteConfig';

/**
 * Hero presentation section setting an authentic, uncluttered editorial tone.
 * Introduces the developer with a two-column layout featuring an owner portrait,
 * a character-by-character cascading light wave animation, and direct contact/social action buttons.
 *
 * @returns Hero section JSX element
 */
export const Hero: React.FC = () => {
  // Split name into words and characters to enable per-character CSS staggered animation
  // while preventing mid-word breaks across narrow mobile viewports.
  const words = siteConfig.name.split(' ');
  let charCounter = 0;

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center py-16 sm:py-20 md:py-24 bg-white"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Role, Name, Bio, and Action Links */}
          <div className="lg:col-span-7 space-y-6">
            {/* Role identifier */}
            <div className="text-[13px] sm:text-[14px] font-mono font-medium tracking-wide uppercase text-primary">
              {siteConfig.role}
            </div>

            {/* Primary Name & Headline (Cascading character light wave) */}
            <h1 className="text-[38px] sm:text-[50px] md:text-[62px] font-bold leading-[1.08] tracking-[-0.03em] select-none">
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

            {/* Value statement & Bio */}
            <p className="text-[17px] sm:text-[19px] text-brand-muted leading-[1.6] max-w-2xl">
              {siteConfig.headline} {siteConfig.bio}
            </p>

            {/* Direct Action Links & Contacts */}
            <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[15px] font-medium rounded-md bg-primary text-white hover:bg-primary-hover transition-all duration-base shadow-sm min-h-[44px]"
              >
                <span>Explore Projects</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href={siteConfig.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-[15px] font-medium rounded-md text-brand-text hover:text-primary bg-surface hover:bg-white border border-border transition-colors duration-fast min-h-[44px]"
              >
                <GithubIcon size={18} />
                <span>GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href={siteConfig.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-[15px] font-medium rounded-md text-brand-text hover:text-primary bg-surface hover:bg-white border border-border transition-colors duration-fast min-h-[44px]"
              >
                <LinkedinIcon size={18} />
                <span>LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-[15px] font-medium rounded-md text-brand-text hover:text-primary bg-surface hover:bg-white border border-border transition-colors duration-fast min-h-[44px]"
              >
                <Mail className="w-4 h-4 text-primary" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Right Column: Framed Developer Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[380px] aspect-[4/5] sm:aspect-square rounded-2xl overflow-hidden border border-border bg-surface shadow-card group">
              <img
                src={`${import.meta.env.BASE_URL}owner_image.jpeg`}
                alt={siteConfig.name}
                loading="eager"
                className="w-full h-full object-cover object-top transition-transform duration-slow ease-brand group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

