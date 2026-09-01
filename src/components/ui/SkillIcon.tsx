import React from 'react';

export interface SkillIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Name of the skill */
  name: string;
  /** Size in pixels (applies to width & height, default 16) */
  size?: number;
  /** Custom CSS classes */
  className?: string;
}

/**
 * Mapping of skill names to their corresponding SVG asset in public/icon/
 */
const ICON_MAP: Record<string, string> = {
  'javascript': 'JavaScript.svg',
  'js': 'JavaScript.svg',
  'typescript': 'TypeScript.svg',
  'ts': 'TypeScript.svg',
  'nodejs': 'Node.js.svg',
  'node.js': 'Node.js.svg',
  'node': 'Node.js.svg',
  'nodemon': 'Nodemon.svg',
  'express': 'Express.svg',
  'express.js': 'Express.svg',
  'python': 'Python.svg',
  'django': 'Django.svg',
  'flask': 'Flask.svg',
  'fastapi': 'FastAPI.svg',
  'go': 'Go.svg',
  'golang': 'Go.svg',
  'kafka': 'Apache Kafka.svg',
  'apache kafka': 'Apache Kafka.svg',
  'redis': 'Redis.svg',
  'docker': 'Docker.svg',
  'podman': 'Podman.svg',
  'react': 'React.svg',
  'tailwind': 'Tailwind CSS.svg',
  'tailwindcss': 'Tailwind CSS.svg',
  'tailwind css': 'Tailwind CSS.svg',
  'vite': 'Vite.js.svg',
  'vite.js': 'Vite.js.svg',
  'bootstrap': 'Bootstrap.svg',
  'boostrap': 'Bootstrap.svg',
  'c': 'C.svg',
  'java': 'Java.svg',
  'html': 'HTML5.svg',
  'html5': 'HTML5.svg',
  'css': 'CSS3.svg',
  'css3': 'CSS3.svg',
  'anaconda': 'Anaconda.svg',
  'mysql': 'MySQL.svg',
  'postgresql': 'PostgresSQL.svg',
  'postgres': 'PostgresSQL.svg',
  'postgressql': 'PostgresSQL.svg',
  'github': 'GitHub.svg',
  'git': 'GitHub.svg',
};

/**
 * Renders an authentic brand logo SVG loaded from the public/icon folder.
 *
 * @param props - Skill name, size override, and HTML image attributes
 * @returns Image element referencing public/icon SVGs
 */
export const SkillIcon: React.FC<SkillIconProps> = ({
  name,
  size = 16,
  className = '',
  ...props
}) => {
  const normalized = name.toLowerCase().trim();
  const iconFile = ICON_MAP[normalized] || `${name}.svg`;
  const iconPath = `/icon/${iconFile}`;

  return (
    <img
      src={iconPath}
      alt={`${name} icon`}
      width={size}
      height={size}
      loading="lazy"
      className={`inline-block object-contain ${className}`}
      {...props}
    />
  );
};
