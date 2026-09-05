import React from 'react';
import { ArrowDown, ExternalLink, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { siteConfig } from '../../data/siteConfig';

/**
 * About section presenting the developer's narrative user story alongside an authentic portrait image.
 * Houses the primary portfolio action and contact channels beneath the narrative.
 * Adheres to DESIGN.md typography and spacing standards in a balanced two-column layout.
 *
 * @returns About section JSX element
 */
export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center py-16 sm:py-20 md:py-24 bg-white"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Heading */}
        <div className="mb-10 sm:mb-14">
          <h2 className="text-[28px] sm:text-[34px] md:text-[38px] font-semibold text-primary tracking-[-0.02em] leading-[1.18]">
            About Me
          </h2>
        </div>

        {/* Two-Column Responsive Layout: User Story Narrative (Left) + Framed Image (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: User Story narrative & CTA action buttons */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6">
            <div className="space-y-5 text-[15px] sm:text-[16px] text-brand-text leading-[1.75]">
              {siteConfig.aboutStory.map((paragraph, index) => (
                <p key={index} className="text-brand-text">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Direct Action Links & Contacts: moved to About section with min 44px touch targets */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[15px] font-medium rounded-md bg-primary text-white hover:bg-primary-hover transition-all duration-base shadow-sm min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span>Explore Projects</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href={siteConfig.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-[15px] font-medium rounded-md text-brand-text hover:text-primary bg-surface hover:bg-white border border-border transition-colors duration-fast min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <GithubIcon size={18} />
                <span>GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href={siteConfig.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-[15px] font-medium rounded-md text-brand-text hover:text-primary bg-surface hover:bg-white border border-border transition-colors duration-fast min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <LinkedinIcon size={18} />
                <span>LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-[15px] font-medium rounded-md text-brand-text hover:text-primary bg-surface hover:bg-white border border-border transition-colors duration-fast min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <Mail className="w-4 h-4 text-primary" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean Framed Developer Portrait */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[400px] aspect-[4/5] sm:aspect-square rounded-2xl overflow-hidden border border-border bg-surface shadow-card">
              <img
                src={`${import.meta.env.BASE_URL}owner_image.jpeg`}
                alt={siteConfig.name}
                loading="lazy"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
