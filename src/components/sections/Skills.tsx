import React from 'react';
import { skillCategories } from '../../data/skills';
import { SkillIcon } from '../ui/SkillIcon';

/**
 * Skills section displaying technical competencies categorized by practical domain.
 * Adheres strictly to DESIGN.md by presenting skills in stacked category groups
 * separated purely by generous whitespace, optimizing scannability and visual calm
 * for hiring managers without noisy dividing borders or distraction.
 *
 * @returns Technical skills section JSX element
 */
export const Skills: React.FC = () => {
  return (
    <section id="skills" className="min-h-screen py-16 md:py-24 bg-surface/40 flex flex-col justify-center">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Heading matching DESIGN.md typography hierarchy */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <h2 className="text-[30px] sm:text-[36px] font-bold text-primary tracking-[-0.02em]">
            Skills
          </h2>
        </div>

        {/* Domain-Categorized Skill Groups separated purely by whitespace */}
        <div className="space-y-8 sm:space-y-10 w-full">
          {skillCategories.map(({ category, skills }) => (
            <div key={category}>
              {/* Category Subheading */}
              <h3 className="text-[16px] sm:text-[18px] font-semibold text-brand-text tracking-[-0.01em] mb-3 sm:mb-4">
                {category}
              </h3>

              {/* Category Pill Badges Cluster */}
              <div className="flex flex-wrap gap-2.5 sm:gap-3.5 w-full">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-[13px] sm:text-[14px] font-mono font-medium rounded-full bg-surface text-brand-text border border-border shadow-xs cursor-default select-none"
                  >
                    <SkillIcon name={skill} size={16} className="shrink-0" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
