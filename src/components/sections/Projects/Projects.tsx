import React from 'react';
import { projects } from '../../../data/projects';
import { SectionContainer } from '../../ui/SectionContainer';
import { SectionHeading } from '../../ui/SectionHeading';
import { ProjectCard } from './ProjectCard';

/**
 * Projects showcase section rendering feature displays of software projects.
 * Why: Highlights production systems with direct demo access or repository inspection.
 *
 * @returns Projects showcase section JSX element
 */
export const Projects: React.FC = () => {
  return (
    <section id="projects" className="min-h-screen py-16 md:py-24 bg-surface/30 flex flex-col justify-center">
      <SectionContainer>
        <div className="max-w-3xl mb-10 sm:mb-12">
          <SectionHeading>Projects</SectionHeading>
        </div>

        {/* Expansive Project Cards List */}
        <div className="space-y-10 sm:space-y-14">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
};
