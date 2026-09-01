import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant reflecting the action hierarchy in DESIGN.md */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Optional icon displayed before the button label */
  icon?: React.ReactNode;
  /** Whether the button should stretch full width of its parent */
  fullWidth?: boolean;
}

/**
 * Standard button component adhering to DESIGN.md interactive rules.
 * Enforces a minimum 44x44px touch target for WCAG accessibility compliance.
 *
 * @param props - Button configuration attributes and styling variants
 * @returns An accessible styled button element
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  icon,
  fullWidth = false,
  className = '',
  ...props
}) => {
  // Base styles ensure WCAG 44x44px minimum touch targets and reliable focus rings
  const baseStyles =
    'inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[15px] font-medium rounded-md transition-all duration-base ease-brand focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 min-h-[44px] min-w-[44px] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

  // Variant mappings strictly implement the DESIGN.md color tokens and hover feedback
  const variantStyles = {
    primary:
      'bg-primary text-white hover:bg-primary-hover active:bg-primary-hover shadow-sm hover:shadow-md',
    secondary:
      'bg-white text-primary border border-primary hover:bg-surface active:bg-surface',
    ghost:
      'bg-transparent text-brand-text hover:text-primary hover:underline underline-offset-4',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
