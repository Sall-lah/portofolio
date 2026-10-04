import React from 'react';
import { skillCategories } from '../../data/skills';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeading } from '../ui/SectionHeading';
import { SkillIcon } from '../ui/SkillIcon';

/**
 * Skills section displaying technical competencies categorized by practical domain.
 * Why: Presents competencies grouped by domain and separated by whitespace for scannability and calm.
 *
 * @returns Technical skills section JSX element
 */
export const Skills: React.FC = () => {
  return (
    <section id="skills" className="min-h-screen py-16 md:py-24 bg-surface/40 flex flex-col justify-center">
      <SectionContainer>
        <div className="max-w-3xl mb-10 sm:mb-12">
          <SectionHeading>Skills</SectionHeading>
        </div>

        <div className="space-y-8 sm:space-y-10 w-full">
          {skillCategories.map(({ category, skills }) => (
            <div key={category}>
              <h3 className="text-[16px] sm:text-[18px] font-semibold text-brand-text tracking-[-0.01em] mb-3 sm:mb-4">
                {category}
              </h3>

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
      </SectionContainer>
    </section>
  );
};
