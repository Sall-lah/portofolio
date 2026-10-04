import React from 'react';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects/Projects';
import { Skills } from './components/sections/Skills';
import { Contact } from './components/sections/Contact';

/**
 * Main application component assembling the single-page developer portfolio.
 * Why: Assembles section landmarks with a skip-to-content link for keyboard and screen-reader accessibility.
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

      <main id="main-content" className="flex-grow">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;
