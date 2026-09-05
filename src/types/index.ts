/**
 * @fileoverview Type definitions for Developer Portfolio
 * Defines clear contracts for projects, skills, site configurations, and interactive states.
 */

/**
 * Represents the architectural classification of a showcase project.
 * Distinguishes between live web applications and source-only/CLI tools.
 */
export type ProjectKind = 'direct-access' | 'source-only';

/**
 * Represents the lifecycle status of a software project.
 * Used for status badges with corresponding semantic colors.
 */
export type ProjectStatus = 'Active' | 'In Progress' | 'Completed';

/**
 * Data structure representing a simulated terminal/CLI snippet for source-only projects.
 */
export interface TerminalPreview {
  /** Prompt prefix (default: '$' or 'bash') */
  prompt?: string;
  /** Primary CLI execution command */
  command: string;
  /** Output lines or return value displayed beneath the command */
  output?: string[];
}

/**
 * Shared foundational attributes present across all portfolio project types.
 */
export interface BaseProject {
  /** Unique URL-safe identifier for the project */
  id: string;
  /** Primary display title */
  title: string;
  /** Short single-sentence tagline for card summaries */
  tagline: string;
  /** Multi-sentence technical overview */
  description: string;
  /** Monospace technology tags associated with the project (e.g. React, TypeScript) */
  tags: string[];
  /** Current development lifecycle status */
  status: ProjectStatus;
  /** Flag indicating if this project is featured prominently */
  featured?: boolean;
}

/**
 * Project that has an active live deployment accessible directly in the browser.
 */
export interface DirectAccessProject extends BaseProject {
  kind: 'direct-access';
  /** URL or relative path to project web screenshot */
  screenshot: string;
  /** Publicly accessible deployment URL */
  liveUrl: string;
  /** Public source code repository URL (optional) */
  githubUrl?: string;
}

/**
 * Project whose primary deliverable is source code, a CLI tool, library, or backend service.
 */
export interface SourceOnlyProject extends BaseProject {
  kind: 'source-only';
  /** Public source code repository URL */
  githubUrl: string;
  /** Optional terminal CLI execution preview block */
  terminalPreview?: TerminalPreview;
  /** Optional architectural / preview screenshot fallback */
  screenshot?: string;
}

/**
 * Showcase project item represented as a discriminated union of DirectAccessProject and SourceOnlyProject.
 */
export type Project = DirectAccessProject | SourceOnlyProject;

/**
 * Interface representing a categorized group of technical skills.
 */
export interface SkillCategory {
  /** Domain title (e.g. "Frontend Development", "Backend & APIs", "Tools & Workflow") */
  category: string;
  /** List of technologies or frameworks in this domain */
  skills: string[];
}

/**
 * Interface representing developer social navigation links.
 */
export interface SocialLink {
  /** Platform name (e.g. "GitHub", "LinkedIn", "Email") */
  label: string;
  /** Target link URI */
  url: string;
  /** Accessible label description */
  ariaLabel: string;
}

/**
 * Global site metadata and personal profile configuration.
 */
export interface SiteConfig {
  /** Developer full name */
  name: string;
  /** Professional title / role */
  role: string;
  /** Core driving motivation statement prominently displayed in hero */
  motivation: string;
  /** Hero headline (legacy fallback / concise value proposition) */
  headline: string;
  /** Concise developer summary */
  bio: string;
  /** Structured multi-paragraph narrative for the dedicated About story */
  aboutStory: string[];
  /** Contact email */
  email: string;
  /** Contact phone number */
  phone?: string;
  /** Geographic location */
  location: string;
  /** External profile links */
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
  };
}

/**
 * State contract for the contact message form.
 */
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
