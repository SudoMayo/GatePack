import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ConfirmSheetProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function ConfirmSheet({ open, onClose, onConfirm, loading, error, onRetry }: ConfirmSheetProps) {
  const safeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement;
      // Focus the safe choice after animation
      const timer = setTimeout(() => safeRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    } else if (triggerRef.current) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      // Focus trap: cycle within the sheet
      if (e.key === 'Tab') {
        const sheet = document.querySelector('.confirm-sheet');
        if (!sheet) return;
        const focusable = sheet.querySelectorAll<HTMLElement>(
          'button, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div
        className="confirm-sheet__scrim"
        onClick={loading ? undefined : onClose}
        aria-hidden
      />
      <div
        className="confirm-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Confirm handover"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="confirm-sheet__title">
              Did the guard hand you your parcel?
            </div>
            <div className="confirm-sheet__body">
              Confirm only when you're holding it. This can't be undone.
            </div>
          </div>
          {!loading && (
            <button
              type="button"
              onClick={onClose}
              style={{ minWidth: 44, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              aria-label="Close"
            >
              <X size={20} strokeWidth={2} />
            </button>
          )}
        </div>

        {error && (
          <div className="confirm-sheet__error" role="alert">
            {error}
          </div>
        )}

        <div className="confirm-sheet__buttons">
          {error ? (
            <>
              <button
                className="btn-primary"
                type="button"
                onClick={onRetry}
                disabled={loading}
              >
                {loading ? 'Confirming\u2026' : 'Try again'}
              </button>
              <button
                className="btn-secondary"
                type="button"
                onClick={onClose}
                ref={safeRef}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="btn-primary"
                type="button"
                onClick={onConfirm}
                disabled={loading}
              >
                {loading ? 'Confirming\u2026' : 'Yes, complete handover'}
              </button>
              <button
                className="btn-secondary"
                type="button"
                onClick={onClose}
                ref={safeRef}
                disabled={loading}
              >
                Not yet
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
