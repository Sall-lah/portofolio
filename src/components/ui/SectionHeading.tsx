import React from 'react';

export interface SectionHeadingProps {
  children: React.ReactNode;
}

/**
 * Standard primary section heading component.
 * Why: Unifies typography scale, font weight, brand color, and letter-spacing across main sections
 * (Projects, Skills, Contact) while keeping About's larger editorial heading independent.
 *
 * @param props - Heading children text or nodes
 * @returns Primary section heading element
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({ children }) => {
  return (
    <h2 className="text-[30px] sm:text-[36px] font-bold text-primary tracking-[-0.02em]">
      {children}
    </h2>
  );
};
