import { useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lock, LockOpen, Bell, Check, ChevronRight } from 'lucide-react';
import { BackHeader } from '../components/BackHeader';
import { Banner } from '../components/Banner';
import { PackageRow } from '../components/PackageRow';
import { VerticalStepper } from '../components/VerticalStepper';
import { StickyFooter } from '../components/StickyFooter';
import { useAppState, useAppDispatch } from '../state/hooks';
import { selectParcelById } from '../state/reducer';
import { getKind } from '../types';

function getDefaultShelveDelay(): number {
  if (typeof window === 'undefined') return 10;
  const params = new URLSearchParams(window.location.search);
  const val = params.get('shelveDelay');
  return val ? Number(val) : 10;
}

export function PackagePending() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const state = useAppState();
  const dispatch = useAppDispatch();
  const parcel = id ? selectParcelById(state, id) : undefined;
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    document.title = 'GatePack: Package pending';
  }, []);

  // Shelve timer
  useEffect(() => {
    if (!parcel || !id) return;
    if (parcel.notifyOn && parcel.status === 'unboxing') {
      const delay = getDefaultShelveDelay() * 1000;
      timerRef.current = setTimeout(() => {
        dispatch({ type: 'SHELVE', parcelId: id });

        // If we are NOT on this screen, show toast
        // We'll check by examining if the current route matches
        const currentPath = window.location.hash.replace('#', '');
        const myPath = `/parcel/${id}/pending`;
        if (currentPath !== myPath) {
          dispatch({
            type: 'SET_TOAST',
            toast: {
              parcelId: id,
              title: 'Parcel shelved',
              body: `${parcel.courier} #${parcel.ref} is ready at Gate 1, Bin A-2.`,
            },
          });
        }
      }, delay);

      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
    // If notify turned off, cancel timer
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [parcel, id, dispatch]);

  const handleToggleNotify = useCallback(() => {
    if (!id) return;
    dispatch({ type: 'TOGGLE_NOTIFY', parcelId: id });
  }, [id, dispatch]);

  if (!parcel) {
    return null;
  }

  const kind = getKind(parcel);
  const isShelved = kind === 'ready';

  // Steps vary based on status
  const steps = isShelved
    ? [
        { label: 'Dropped', status: 'done' as const, statusText: 'Done' },
        { label: 'Security unboxing', status: 'done' as const, statusText: 'Done' },
        { label: 'Shelved', status: 'done' as const, statusText: 'Done' },
      ]
    : [
        { label: 'Dropped', status: 'done' as const, statusText: 'Done' },
        { label: 'Security unboxing', status: 'active' as const, statusText: 'In progress' },
        { label: 'Shelved', status: 'pending' as const, statusText: 'Pending' },
      ];

  return (
    <div className="screen">
      <BackHeader title="Package pending" />

      {isShelved ? (
        <Banner
          variant="success"
          text={`Ready. Go to Gate ${parcel.gate}, Bin ${parcel.bin}`}
        />
      ) : (
        <Banner
          variant="warning"
          text="Do not walk down. Unboxing in progress."
        />
      )}

      <main className="screen__main">
        <div style={{ paddingTop: 'var(--s-4)' }}>
          <PackageRow value={`${parcel.courier} \u2013 ${parcel.item}`} />
        </div>

        <VerticalStepper steps={steps} />

        {isShelved ? (
          <>
            <div className="parcel-card__location" style={{ marginBottom: 'var(--s-4)' }}>
              <div className="parcel-card__location-label">Location assigned</div>
              <div className="parcel-card__location-value">
                Gate {parcel.gate} | Bin {parcel.bin}
              </div>
            </div>
            <div className="pending-screen__unlocked-otp">
              <div className="pending-screen__locked-title">
                <LockOpen size={18} strokeWidth={2} aria-hidden />
                Your OTP is ready
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="pending-screen__wait">
              Est. wait: 15–20 min
            </div>
            <div style={{ paddingTop: 'var(--s-4)' }}>
              <div className="pending-screen__locked-otp">
                <div className="pending-screen__locked-title">
                  <Lock size={18} strokeWidth={2} aria-hidden />
                  OTP locked
                </div>
                <div className="pending-screen__locked-sub">
                  Generates once shelved
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <StickyFooter>
        {isShelved ? (
          <button
            className="btn-primary"
            type="button"
            onClick={() => navigate(`/parcel/${parcel.id}/otp`)}
          >
            View pickup OTP
            <ChevronRight size={18} strokeWidth={2} aria-hidden />
          </button>
        ) : parcel.notifyOn ? (
          <>
            <div className="pending-screen__notify-help">
              We'll alert you as soon as it's on the shelf.
            </div>
            <button
              className="btn-secondary"
              type="button"
              onClick={handleToggleNotify}
              aria-pressed="true"
            >
              <Check size={18} strokeWidth={2} aria-hidden />
              Notification on. Tap to turn off
            </button>
          </>
        ) : (
          <button
            className="btn-primary"
            type="button"
            onClick={handleToggleNotify}
            aria-pressed="false"
          >
            <Bell size={18} strokeWidth={2} aria-hidden />
            Notify me when shelved
          </button>
        )}
        <div style={{ textAlign: 'center', paddingTop: 'var(--s-2)' }}>
          <button
            className="text-link"
            type="button"
            onClick={() => navigate('/')}
          >
            Return to dashboard
          </button>
        </div>
      </StickyFooter>
    </div>
  );
}
