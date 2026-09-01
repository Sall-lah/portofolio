import React from 'react';
import { skillCategories } from '../../data/skills';
import { SkillIcon } from '../ui/SkillIcon';

/**
 * Skills section displaying technical proficiencies in a unified, flowing list.
 * Arranges skills with authentic brand vector logos from left to right, wrapping downward naturally.
 *
 * @returns Technical skills section JSX element
 */
export const Skills: React.FC = () => {
  // Flatten unique skills into a cohesive, flowing list
  const allSkills = skillCategories.flatMap((category) => category.skills);

  return (
    <section id="skills" className="min-h-screen py-16 md:py-24 bg-surface/40 flex flex-col justify-center">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="text-[13px] sm:text-[14px] font-mono font-medium tracking-wide uppercase text-primary mb-2">
            Capabilities
          </div>
          <h2 className="text-[30px] sm:text-[36px] font-bold text-brand-text tracking-[-0.02em]">
            Technical Domain
          </h2>
        </div>

        {/* Unified Flowing Pill Badge List (Full width with skill logos) */}
        <div className="flex flex-wrap gap-2.5 sm:gap-3.5 w-full">
          {allSkills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-[13px] sm:text-[14px] font-mono font-medium rounded-full bg-surface text-brand-text border border-border shadow-xs hover:border-primary hover:text-primary hover:shadow-card transition-all duration-fast cursor-default select-none group"
            >
              <SkillIcon name={skill} size={16} className="shrink-0 transition-transform duration-fast group-hover:scale-110" />
              <span>{skill}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
