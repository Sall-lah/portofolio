import { SkillCategory } from '../types';

/**
 * Technical skills taxonomy grouped by practical domain.
 */
export const skillCategories: SkillCategory[] = [
  {
    category: 'Programming Languages & Runtimes',
    skills: [
      'JavaScript',
      'TypeScript',
      'NodeJS',
      'Python',
      'GO',
      'C',
      'Java',
      'HTML',
      'CSS',
    ],
  },
  {
    category: 'Backend Frameworks & Tools',
    skills: [
      'Express',
      'Django',
      'Flask',
      'FastAPI',
      'Nodemon',
    ],
  },
  {
    category: 'Databases & Data Tools',
    skills: [
      'PostgreSQL',
      'MySQL',
      'Redis',
      'Kafka',
    ],
  },
  {
    category: 'DevOps & Version Control',
    skills: [
      'Docker',
      'Podman',
      'GitHub',
    ],
  },
  {
    category: 'Frontend & UI Frameworks',
    skills: [
      'React',
      'Tailwind',
      'Bootstrap',
      'Vite',
    ],
  },
];
