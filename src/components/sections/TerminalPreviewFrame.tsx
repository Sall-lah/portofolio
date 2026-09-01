import React from 'react';
import { TerminalPreview } from '../../types';

export interface TerminalPreviewFrameProps {
  /** Project title for accessible image/preview context */
  title: string;
  /** Terminal execution details and outputs */
  preview?: TerminalPreview;
}

/**
 * Renders a simulated terminal / CLI execution frame for source-only projects.
 * Adheres strictly to zero-zoom on hover to maintain clean readability and a grounded developer aesthetic.
 *
 * @param props - Project title and terminal preview definition
 * @returns Terminal window mockup JSX element
 */
export const TerminalPreviewFrame: React.FC<TerminalPreviewFrameProps> = ({ title, preview }) => {
  const prompt = preview?.prompt ?? '$';
  const command = preview?.command ?? `git clone https://github.com/Sall-lah/${title.toLowerCase().replace(/\s+/g, '-')}`;
  const output = preview?.output ?? ['Ready for build & local testing'];

  return (
    <div
      className="w-full h-full min-h-[260px] sm:min-h-[300px] lg:min-h-[360px] bg-[#121316] text-[#e4e4e7] p-4 sm:p-6 flex flex-col font-mono text-[12px] sm:text-[13px] select-none justify-between border-b lg:border-b-0 lg:border-r border-border/80"
      role="region"
      aria-label={`Terminal execution preview for ${title}`}
    >
      {/* Top macOS/Terminal Window Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-zinc-500 text-[11px] font-mono tracking-wider lowercase">
          bash — 80×24
        </span>
      </div>

      {/* Terminal Command & Execution Output Body */}
      <div className="my-auto py-4 space-y-2 overflow-x-auto leading-relaxed">
        <div className="flex items-start gap-2 text-zinc-100 font-semibold">
          <span className="text-primary select-none">{prompt}</span>
          <span className="text-emerald-400">{command}</span>
        </div>

        {output.map((line, idx) => (
          <div key={idx} className="text-zinc-400 text-[12px] pl-4 font-mono">
            {line}
          </div>
        ))}
      </div>

      {/* Terminal Footer Indicator */}
      <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-zinc-500 text-[11px]">
        <span>⚡ source-only module</span>
        <span className="text-emerald-400 font-medium">● ready</span>
      </div>
    </div>
  );
};
