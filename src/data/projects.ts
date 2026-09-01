import { Project } from '../types';

/**
 * Curated list of featured production and engineering showcase projects.
 * Demonstrates full-stack systems engineering, distributed architecture, and interactive web applications.
 */
export const projects: Project[] = [
  {
    id: 'fitlife',
    kind: 'direct-access',
    title: 'Fitlife',
    tagline: 'Full-stack health & wellness platform with biometric analytics and AI-powered meal recommendations.',
    description:
      'A full-stack wellness tracking ecosystem featuring real-time BMI/TDEE calculation with predictive weight trend modeling, calendar-based nutrition and workout scheduling, custom activity routines, and AI-driven daily dietary recommendations.',
    screenshot: '/project/FitLife.png',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Express', 'Docker', 'Supabase'],
    liveUrl: 'https://fit-life-9173571fa1fb.herokuapp.com/',
    githubUrl: 'https://github.com/nv-hr/Fitness_App',
    status: 'Completed',
    featured: true,
  },
  {
    id: 'special-gift',
    kind: 'direct-access',
    title: 'SpecialGift',
    tagline: 'Real-time multiplayer survival shopping party game powered by an automated AI Executioner.',
    description:
      'A real-time multiplayer browser party game where players navigate bizarre survival scenarios through timed marketplace budget challenges. An AI Executioner Judge evaluates item synergy, generates dark-comedy survival narratives, and calculates real-time HP impact.',
    screenshot: '/project/SpecialGift-Display.png',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Docker', 'Express'],
    liveUrl: 'https://special-gift-ea7251652f65.herokuapp.com/',
    githubUrl: 'https://github.com/Sall-lah/SpecialGift',
    status: 'Completed',
    featured: true,
  },
  {
    id: 'clothes-store',
    kind: 'source-only',
    title: 'Clothes Store',
    tagline: 'High-performance e-commerce gateway and distributed event-driven microservices architecture.',
    description:
      'A scalable retail e-commerce platform backend built in Go. Architected with high-throughput API gateway routing, Redis caching for sub-millisecond query responses, Apache Kafka asynchronous event streaming, Nginx reverse proxying, and Cloudflare R2 object storage.',
    screenshot: '/project/Store.png',
    tags: ['Go', 'Redis', 'Kafka', 'Nginx', 'Cloudflare R2'],
    githubUrl: 'https://github.com/Sall-lah/store_gateway',
    status: 'Completed',
    featured: true,
  },
];
