import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Footprints } from 'lucide-react';
import { BackHeader } from '../components/BackHeader';
import { Banner } from '../components/Banner';
import { OtpBoxes } from '../components/OtpBoxes';
import { PackageRow } from '../components/PackageRow';
import { StickyFooter } from '../components/StickyFooter';
import { useAppState } from '../state/hooks';
import { selectParcelById } from '../state/reducer';

export function LocationMismatch() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const state = useAppState();
  const parcel = id ? selectParcelById(state, id) : undefined;

  useEffect(() => {
    document.title = 'GatePack: Location mismatch';
  }, []);

  if (!parcel || !parcel.otp || !parcel.bin) {
    return null;
  }

  return (
    <div className="screen">
      <BackHeader title="Location mismatch" />
      <Banner
        variant="inverted"
        text={`At Gate ${parcel.gate}, not Gate 1`}
      />
      <main className="screen__main">
        {/* Destination card */}
        <div className="mismatch-screen__dest-card">
          <div className="mismatch-screen__dest-label">Actual location</div>
          <div className="mismatch-screen__dest-value">
            Gate {parcel.gate} ({parcel.gateName})
          </div>
          <span className="mismatch-screen__bin-chip">Bin {parcel.bin}</span>
        </div>

        {/* Walk strip */}
        {parcel.walk && (
          <div className="mismatch-screen__walk">
            <Footprints size={18} strokeWidth={2} aria-hidden />
            Walk: {parcel.walk.meters} m (~{parcel.walk.minutes} min {parcel.walk.note})
          </div>
        )}

        {/* Package */}
        <div style={{ paddingTop: 'var(--s-3)' }}>
          <PackageRow value={`${parcel.courier} \u2013 ${parcel.item}`} />
        </div>

        {/* Gate OTP */}
        <div className="mismatch-screen__otp-label">
          Gate {parcel.gate} OTP
        </div>
        <OtpBoxes digits={parcel.otp} />
        <div className="mismatch-screen__otp-caption">
          Gate 1 guard cannot redeem this code.
        </div>
      </main>

      <StickyFooter>
        <button
          className="btn-primary"
          type="button"
          onClick={() => navigate('/')}
        >
          Back to dashboard
        </button>
      </StickyFooter>
    </div>
  );
}
