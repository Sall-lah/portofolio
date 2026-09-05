import React from 'react';
import { projects } from '../../data/projects';
import { ProjectCard } from './ProjectCard';

/**
 * Projects showcase section rendering expansive feature displays of software projects.
 * Supports direct-access live web applications and source-only CLI/engine modules with clean status indicators.
 *
 * @returns Projects showcase section JSX element
 */
export const Projects: React.FC = () => {
  return (
    <section id="projects" className="min-h-screen py-16 md:py-24 bg-surface/30 flex flex-col justify-center">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Heading matching DESIGN.md typography hierarchy */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <h2 className="text-[30px] sm:text-[36px] font-bold text-primary tracking-[-0.02em]">
            Projects
          </h2>
        </div>

        {/* Expansive Project Cards List */}
        <div className="space-y-10 sm:space-y-14">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
