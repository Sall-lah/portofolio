import React from 'react';
import { ProjectStatus } from '../../types';

export interface ProjectStatusBadgeProps {
  /** Lifecycle development status of the project */
  status: ProjectStatus;
}

/**
 * Renders a compact, accessible status badge indicating whether a project is Completed, In Progress, or Active.
 * Uses distinct semantic color dots and subtle pill backgrounds to communicate status instantly without clutter.
 *
 * @param props - Status string contract
 * @returns Status badge JSX element
 */
export const ProjectStatusBadge: React.FC<ProjectStatusBadgeProps> = ({ status }) => {
  // Map status to semantic colors and subtle backgrounds
  const getStatusStyles = () => {
    switch (status) {
      case 'Completed':
        return {
          container: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
          dot: 'bg-emerald-500',
        };
      case 'In Progress':
        return {
          container: 'bg-amber-50 text-amber-700 border-amber-200/80',
          dot: 'bg-amber-500 animate-pulse',
        };
      case 'Active':
      default:
        return {
          container: 'bg-orange-50 text-orange-700 border-orange-200/80',
          dot: 'bg-orange-500',
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-mono font-medium rounded-full border ${styles.container}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} aria-hidden="true" />
      <span>{status}</span>
    </span>
  );
};
