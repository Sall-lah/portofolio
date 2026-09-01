import React, { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

/**
 * Sticky navigation bar providing seamless anchor navigation and responsive mobile menu.
 * Adheres to DESIGN.md styling with clean border separation and minimum 44px touch targets.
 *
 * @returns Responsive sticky navigation header component
 */
export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll position to apply dynamic shadow and border enhancement
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md transition-shadow duration-base ${
        isScrolled ? 'border-b border-border shadow-sm' : 'border-b border-border/50'
      }`}
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo / Name */}
        <a
          href="#"
          className="flex items-center gap-2.5 group focus-visible:outline-2 focus-visible:outline-primary py-2"
        >
          <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center text-white transition-transform duration-fast group-hover:scale-105">
            <Code2 className="w-5 h-5" />
          </div>
          <span className="text-[20px] font-bold tracking-tight text-brand-text group-hover:text-primary transition-colors duration-fast">
            {siteConfig.name}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[15px] font-medium text-brand-muted hover:text-primary transition-colors duration-fast py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all after:duration-fast"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Action CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-5 py-2.5 text-[15px] font-medium rounded-full bg-primary text-white hover:bg-primary-hover transition-colors duration-fast min-h-[44px] shadow-sm hover:shadow-md"
          >
            Get In Touch
          </a>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-md text-brand-text hover:text-primary hover:bg-surface border border-border transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-primary"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-white px-4 pt-2 pb-6 space-y-3 shadow-md animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-[16px] font-medium text-brand-text hover:text-primary hover:bg-surface rounded-md transition-colors duration-fast"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full py-3 text-[15px] font-medium text-center rounded-md bg-primary text-white hover:bg-primary-hover transition-colors duration-fast min-h-[44px]"
            >
              Get In Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
