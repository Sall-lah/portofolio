import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual variant distinguishing technology tags from project status indicators */
  variant?: 'mono' | 'success' | 'warning' | 'danger';
  /** Optional icon prefix (e.g. status indicator dot) */
  icon?: React.ReactNode;
}

/**
 * Pill-shaped badge component for technology tags and status indicators.
 * Implements monospace JetBrains typography for technical context per DESIGN.md.
 *
 * @param props - Badge content, visual variant, and styling overrides
 * @returns Styled pill badge element
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'mono',
  icon,
  className = '',
  ...props
}) => {
  // Styles map to DESIGN.md 8px padding, 12px radius, and 13px monospace font specifications
  const baseStyles =
    'inline-flex items-center gap-1.5 px-3 py-1 text-[13px] font-mono rounded-lg transition-colors duration-fast';

  const variantStyles = {
    mono: 'bg-surface text-brand-muted border border-border/70 hover:border-border',
    success: 'bg-emerald-50 text-status-success border border-status-success/20 font-medium',
    warning: 'bg-amber-50 text-status-warning border border-status-warning/20 font-medium',
    danger: 'bg-red-50 text-status-danger border border-status-danger/20 font-medium',
  };

  return (
    <span
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
