import React from 'react';

export interface SectionContainerProps {
  children: React.ReactNode;
}

/**
 * Standard content container enforcing site-wide maximum width and responsive horizontal padding.
 * Why: Centralizes outer section gutters across About, Projects, Skills, and Contact to maintain
 * visual vertical alignment without duplicating breakpoint padding rules.
 *
 * @param props - Container children
 * @returns Responsive section container element
 */
export const SectionContainer: React.FC<SectionContainerProps> = ({ children }) => {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 w-full">
      {children}
    </div>
  );
};
