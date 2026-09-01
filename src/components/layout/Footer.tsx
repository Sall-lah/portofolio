import React from 'react';
import { ArrowUp, Phone, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { siteConfig } from '../../data/siteConfig';

/**
 * Minimalist footer component stripped of generic AI boilerplate.
 * Focused entirely on direct contact details (Name, Phone, Email) and quick navigation.
 *
 * @returns Minimalist footer JSX element
 */
export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-dark text-white mt-20">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Developer identity and direct contact */}
          <div className="space-y-2">
            <div className="text-[18px] font-semibold tracking-tight text-white">
              {siteConfig.name}
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] text-gray-300 font-mono">
              {siteConfig.phone && (
                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 hover:text-white transition-colors duration-fast"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  <span>{siteConfig.phone}</span>
                </a>
              )}
              <a
                href={siteConfig.socialLinks.email}
                className="inline-flex items-center gap-2 hover:text-white transition-colors duration-fast"
              >
                <Mail className="w-4 h-4 text-primary" />
                <span>{siteConfig.email}</span>
              </a>
            </div>
          </div>

          {/* Social Navigation and Back to Top Trigger */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <a
              href={siteConfig.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub Profile"
              className="flex items-center justify-center w-10 h-10 rounded-md bg-white/10 text-white hover:bg-primary hover:text-white transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-white"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={siteConfig.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn Profile"
              className="flex items-center justify-center w-10 h-10 rounded-md bg-white/10 text-white hover:bg-primary hover:text-white transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-white"
            >
              <LinkedinIcon size={18} />
            </a>
            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top of page"
              className="flex items-center justify-center w-10 h-10 rounded-md bg-white/10 text-white hover:bg-primary hover:text-white transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-white ml-2 cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
