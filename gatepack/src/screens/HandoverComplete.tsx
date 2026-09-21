import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { StickyFooter } from '../components/StickyFooter';
import { useAppState } from '../state/hooks';
import { selectParcelById } from '../state/reducer';

export function HandoverComplete() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const state = useAppState();
  const parcel = id ? selectParcelById(state, id) : undefined;

  useEffect(() => {
    document.title = 'GatePack: Handover complete';
    headingRef.current?.focus();
  }, []);

  if (!parcel) {
    return null;
  }

  return (
    <div className="screen">
      <main className="done-screen">
        <div className="done-screen__icon">
          <Check size={36} strokeWidth={3} color="var(--white)" aria-hidden />
        </div>
        <h1
          className="done-screen__heading"
          ref={headingRef}
          tabIndex={-1}
        >
          Handover complete
        </h1>
        <div className="done-screen__location">
          Gate {parcel.gate}, Bin {parcel.bin}
        </div>

        <div className="done-screen__receipt">
          <div className="done-screen__receipt-title">Transaction record</div>
          <hr className="done-screen__receipt-divider" />
          <div>Retrieved: {parcel.retrievedAt}</div>
          <div>OTP: #{parcel.otp}</div>
          <div>{parcel.post}</div>
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
