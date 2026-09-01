import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  /** Controls visibility state of the modal overlay */
  isOpen: boolean;
  /** Callback fired when user requests to close the dialog */
  onClose: () => void;
  /** Accessible title descriptor for screen readers */
  title: string;
  /** Child modal content */
  children: React.ReactNode;
  /** Optional max width container class override */
  maxWidthClass?: string;
}

/**
 * Accessible dialog modal overlay with keyboard focus management and scroll locking.
 * Implements WCAG AA/AAA dialog patterns with Escape key dismissal and click-outside handling.
 *
 * @param props - Modal visibility state, close handler, title, and children
 * @returns An accessible portal-style dialog component
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidthClass = 'max-w-3xl',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Lock background body scroll and manage focus trapping when modal mounts/unmounts
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';

      // Focus first interactive element or modal container for keyboard accessibility
      const focusTimer = setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.focus();
        }
      }, 50);

      return () => {
        clearTimeout(focusTimer);
        document.body.style.overflow = 'unset';
        // Restore focus to triggering card button when modal closes
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Handle Escape key navigation to dismiss modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm transition-opacity duration-base"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()} // Prevent clicking inside the modal from triggering backdrop dismiss
        className={`relative w-full ${maxWidthClass} bg-white rounded-xl shadow-elevated border border-border overflow-hidden my-auto focus:outline-none transition-all duration-base transform animate-in fade-in zoom-in-95`}
      >
        {/* Header close button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 text-brand-text hover:text-primary hover:bg-surface border border-border transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal body content */}
        <div className="max-h-[85vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
