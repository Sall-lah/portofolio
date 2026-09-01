import React from 'react';

export interface ScreenshotPreviewFrameProps {
  /** Screenshot image URL */
  screenshot: string;
  /** Project title for image alt text */
  title: string;
}

/**
 * Renders an expansive, static web screenshot preview for direct-access projects.
 * Explicitly omits hover scaling to ensure crisp, distraction-free visual presentation.
 *
 * @param props - Screenshot URL and project title
 * @returns Web screenshot container JSX element
 */
export const ScreenshotPreviewFrame: React.FC<ScreenshotPreviewFrameProps> = ({ screenshot, title }) => {
  return (
    <div className="w-full h-full min-h-[240px] sm:min-h-[280px] lg:min-h-full relative bg-surface border-b lg:border-b-0 lg:border-r border-border overflow-hidden flex items-center justify-center">
      <img
        src={screenshot}
        alt={`Screenshot preview of ${title}`}
        loading="lazy"
        className="w-full h-full object-cover object-top"
      />
    </div>
  );
};
