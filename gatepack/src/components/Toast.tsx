import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAppState, useAppDispatch } from '../state/hooks';

export function Toast() {
  const { toast } = useAppState();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (!toast) return;
    timerRef.current = setTimeout(() => {
      dispatch({ type: 'DISMISS_TOAST' });
    }, 10000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [toast, dispatch]);

  if (!toast) return null;

  const handleClick = () => {
    dispatch({ type: 'DISMISS_TOAST' });
    navigate(`/parcel/${toast.parcelId}/otp`);
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'DISMISS_TOAST' });
  };

  return (
    <div
      className="toast"
      role="status"
      aria-live="polite"
      onClick={handleClick}
    >
      <div className="toast__content">
        <div className="toast__title">{toast.title}</div>
        <div className="toast__body">{toast.body}</div>
      </div>
      <button
        className="toast__dismiss"
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss notification"
      >
        <X size={20} strokeWidth={2} />
      </button>
    </div>
  );
}
