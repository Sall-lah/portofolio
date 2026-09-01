import React from 'react';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Contact } from './components/sections/Contact';

/**
 * Main application component assembling the single-page developer portfolio.
 * Includes skip-to-content accessibility navigation and clean section landmarks.
 *
 * @returns Complete Portfolio single-page layout
 */
export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-text">
      {/* Skip to Main Content Link for Keyboard & Screen Reader Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-primary text-white font-medium rounded-md shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Skip to Main Content
      </a>

      {/* Main Page Content Landmark */}
      <main id="main-content" className="flex-grow">
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Dark Footer */}
      <Footer />
    </div>
  );
};

export default App;
