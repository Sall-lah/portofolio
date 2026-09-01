import React from 'react';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { Project } from '../../types';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';

export interface ProjectModalProps {
  /** The currently selected project to show in full detail, or null if closed */
  project: Project | null;
  /** Handler to dismiss the modal */
  onClose: () => void;
}

/**
 * Expanded project focus modal providing detailed case study context.
 * Features high-resolution preview image, architecture highlights, tech stack badges, and visit links.
 *
 * @param props - Selected project item and modal close callback
 * @returns Focus modal dialog JSX element
 */
export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const statusVariant =
    project.status === 'Completed'
      ? 'success'
      : project.status === 'Active'
      ? 'warning'
      : 'mono';

  return (
    <Modal isOpen={Boolean(project)} onClose={onClose} title={project.title}>
      {/* Full-width Screenshot Header */}
      {project.screenshot && (
        <div className="relative aspect-video w-full overflow-hidden bg-gray-100 border-b border-border">
          <img
            src={project.screenshot}
            alt={`Full preview of ${project.title}`}
            className="w-full h-full object-cover object-top"
          />
        </div>
      )}

      {/* Modal Detail Content */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Header Title & Status */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-[24px] sm:text-[28px] font-bold text-brand-text tracking-tight">
              {project.title}
            </h2>
            <p className="text-[15px] font-medium text-brand-muted">
              {project.tagline}
            </p>
          </div>
          <Badge variant={statusVariant} className="px-3.5 py-1 text-[13px]">
            {project.status}
          </Badge>
        </div>

        {/* Detailed Description */}
        <div className="space-y-3">
          <h4 className="text-[14px] font-mono uppercase font-semibold text-brand-muted tracking-wider">
            About the Project
          </h4>
          <p className="text-[15px] text-brand-text leading-[1.7] whitespace-pre-line">
            {project.description}
          </p>
        </div>


        {/* Full Technologies Used */}
        <div className="space-y-3">
          <h4 className="text-[14px] font-mono uppercase font-semibold text-brand-muted tracking-wider">
            Technologies & Tools
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="mono">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Links Buttons */}
        <div className="pt-4 border-t border-border flex flex-wrap items-center gap-4">
          {project.kind === 'direct-access' && project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[15px] font-medium rounded-md bg-primary text-white hover:bg-primary-hover transition-colors duration-fast shadow-sm min-h-[44px] focus-visible:outline-2 focus-visible:outline-primary"
            >
              <span>Visit Live Project</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[15px] font-medium rounded-md bg-white text-brand-text hover:text-primary hover:bg-surface border border-border transition-colors duration-fast min-h-[44px] focus-visible:outline-2 focus-visible:outline-primary"
            >
              <GithubIcon size={18} />
              <span>View Source Code</span>
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
};
