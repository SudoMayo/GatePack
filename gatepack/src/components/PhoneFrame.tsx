import { Signal, Wifi, BatteryFull } from 'lucide-react';
import type { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
  panel?: ReactNode;
}

export function PhoneFrame({ children, panel }: PhoneFrameProps) {
  const searchParams = new URLSearchParams(window.location.search);
  const hashQueryIndex = window.location.hash.indexOf('?');
  const hashParams =
    hashQueryIndex !== -1
      ? new URLSearchParams(window.location.hash.slice(hashQueryIndex))
      : null;

  const hidePresenter =
    searchParams.get('presenter') === '0' || hashParams?.get('presenter') === '0';

  return (
    <div className="phone-frame-wrapper">
      <div className="phone-frame">
        <div className="phone-frame__status-bar" aria-hidden="true">
          <span>9:41</span>
          <div className="phone-frame__status-icons">
            <Signal size={14} strokeWidth={2} />
            <Wifi size={14} strokeWidth={2} />
            <BatteryFull size={14} strokeWidth={2} />
          </div>
        </div>
        <div className="phone-frame__content">
          {children}
        </div>
      </div>
      {!hidePresenter && panel}
    </div>
  );
}
