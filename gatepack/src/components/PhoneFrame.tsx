import { Signal, Wifi, BatteryFull } from 'lucide-react';
import type { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
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
    </div>
  );
}
