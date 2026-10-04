import React from 'react';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '../../ui/Icons';
import { Project } from '../../../types';
import { ScreenshotPreviewFrame } from './ScreenshotPreviewFrame';
import { TerminalPreviewFrame } from './TerminalPreviewFrame';

export interface ProjectCardProps {
  /** Project data item to render */
  project: Project;
}

/**
 * Project showcase card supporting both Direct-Access Web Apps and Source-Only CLI/Libraries.
 * Why: Renders static media previews with clear call-to-actions, omitting zoom effects for grounded presentation.
 *
 * @param props - Project model item (discriminated by kind)
 * @returns Project card JSX element
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <article className="bg-white rounded-xl border border-border overflow-hidden flex flex-col lg:flex-row lg:h-[440px]">
      <div className="lg:w-1/2 flex items-stretch h-[240px] sm:h-[280px] lg:h-full overflow-hidden">
        {project.screenshot ? (
          <ScreenshotPreviewFrame screenshot={project.screenshot} title={project.title} />
        ) : project.kind === 'source-only' ? (
          <TerminalPreviewFrame title={project.title} preview={project.terminalPreview} />
        ) : null}
      </div>

      <div className="lg:w-1/2 p-6 sm:p-8 md:p-9 flex flex-col justify-between h-full space-y-5">
        <div className="space-y-3 sm:space-y-3.5">
          <div>
            <h3 className="text-[22px] sm:text-[26px] font-bold text-brand-text tracking-tight">
              {project.title}
            </h3>
          </div>

          <p className="text-[14px] sm:text-[15px] text-brand-muted font-medium leading-[1.5]">
            {project.tagline}
          </p>

          <p className="text-[13px] sm:text-[14px] text-brand-muted/90 leading-[1.65]">
            {project.description}
          </p>
        </div>

        <div className="space-y-5 pt-4 border-t border-border/70">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[12px] font-mono rounded-md bg-surface text-brand-text border border-border"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {project.kind === 'direct-access' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[14px] font-medium rounded-md bg-primary text-white hover:bg-primary-hover transition-colors duration-fast shadow-sm min-h-[40px]"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[14px] font-medium rounded-md transition-colors duration-fast min-h-[40px] ${
                  project.kind === 'source-only'
                    ? 'bg-brand-dark text-white hover:bg-zinc-800 shadow-sm'
                    : 'text-brand-text hover:text-primary bg-white hover:bg-surface border border-border'
                }`}
              >
                <GithubIcon size={16} />
                <span>{project.kind === 'source-only' ? 'View Repository' : 'Source Code'}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
