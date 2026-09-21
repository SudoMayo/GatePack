import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { BackHeader } from '../components/BackHeader';
import { OtpBoxes } from '../components/OtpBoxes';
import { PackageRow } from '../components/PackageRow';
import { StickyFooter } from '../components/StickyFooter';
import { ConfirmSheet } from '../components/ConfirmSheet';
import { useAppState, useAppDispatch } from '../state/hooks';
import { selectParcelById } from '../state/reducer';

function useCountdown(expiresAt: number | null): { display: string; isExpired: boolean } {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (expiresAt === null) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  if (expiresAt === null) return { display: '15:00', isExpired: false };

  const remaining = Math.max(0, expiresAt - now);
  const mins = Math.floor(remaining / 60000);
  const secs = Math.floor((remaining % 60000) / 1000);
  return {
    display: `${mins}:${String(secs).padStart(2, '0')}`,
    isExpired: remaining <= 0,
  };
}

export function ParcelOtp() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const state = useAppState();
  const dispatch = useAppDispatch();
  const parcel = id ? selectParcelById(state, id) : undefined;
  const hasOpenedRef = useRef(false);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Start OTP timer on first visit
  useEffect(() => {
    if (id && parcel && parcel.otpExpiresAt === null && !hasOpenedRef.current) {
      hasOpenedRef.current = true;
      dispatch({ type: 'OPEN_OTP', parcelId: id });
    }
  }, [id, parcel, dispatch]);

  useEffect(() => {
    document.title = 'GatePack: Verification';
  }, []);

  const { display: countdown, isExpired } = useCountdown(parcel?.otpExpiresAt ?? null);

  const handleConfirm = useCallback(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    setTimeout(() => {
      if (state.simulateFailure) {
        setLoading(false);
        setError("Couldn't confirm the handover. Check your connection and try again.");
        return;
      }
      dispatch({ type: 'COMPLETE_HANDOVER', parcelId: id });
      setLoading(false);
      setSheetOpen(false);
      navigate(`/parcel/${id}/done`, { replace: true });
    }, 700);
  }, [id, state.simulateFailure, dispatch, navigate]);

  const handleRegenerate = useCallback(() => {
    if (!id) return;
    setLoading(true);
    setTimeout(() => {
      dispatch({ type: 'REGENERATE_OTP', parcelId: id });
      setLoading(false);
    }, 500);
  }, [id, dispatch]);

  const handleOpenSheet = useCallback(() => {
    // If expired while on screen, don't open sheet
    if (isExpired) return;
    setSheetOpen(true);
  }, [isExpired]);

  if (!parcel || !parcel.otp || !parcel.bin) {
    return null;
  }

  const qrPayload = `gatepack://pickup?parcel=${parcel.ref}&otp=${parcel.otp}&gate=${parcel.gate}`;

  return (
    <div className="screen">
      <BackHeader title="Verification" />
      <main className="screen__main">
        {/* Location card */}
        <div className="otp-screen__location-card">
          <div className="otp-screen__location-value">
            Gate {parcel.gate} | Bin {parcel.bin}
          </div>
          <div className="otp-screen__location-intake">
            Intake: {parcel.intakeAt}
          </div>
        </div>

        {/* Show to guard */}
        <div className="otp-screen__label">Show to guard</div>

        {isExpired ? (
          <>
            <OtpBoxes digits="----" expired />
            <div className="otp-screen__countdown" style={{ color: 'var(--ink)', fontWeight: 600 }}>
              Code expired
            </div>
            <div className="otp-screen__reassurance">
              This OTP expired. Get a new one and try again.
            </div>
          </>
        ) : (
          <>
            <OtpBoxes digits={parcel.otp} />
            {/* QR code */}
            <div className="otp-screen__qr-wrapper">
              <div className="otp-screen__qr-box">
                <QRCodeSVG
                  value={qrPayload}
                  size={168}
                  level="M"
                />
              </div>
            </div>
            <div className="otp-screen__countdown" role="timer">
              Expires in {countdown}
            </div>
          </>
        )}

        {/* Package */}
        <PackageRow value={`${parcel.courier} \u2013 ${parcel.item}`} />

        {!isExpired && (
          <div className="otp-screen__reassurance">
            Your OTP stays valid if you leave this screen.
          </div>
        )}
      </main>

      <StickyFooter>
        {isExpired ? (
          <button
            className="btn-primary"
            type="button"
            onClick={handleRegenerate}
            disabled={loading}
          >
            {loading ? 'Getting new OTP\u2026' : 'Get a new OTP'}
          </button>
        ) : (
          <button
            className="btn-primary"
            type="button"
            onClick={handleOpenSheet}
          >
            Complete handover
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

      <ConfirmSheet
        open={sheetOpen}
        onClose={() => { setSheetOpen(false); setError(null); }}
        onConfirm={handleConfirm}
        onRetry={handleConfirm}
        loading={loading}
        error={error}
      />
    </div>
  );
}
