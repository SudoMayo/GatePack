import { useEffect } from 'react';
import { useReset } from '../state/hooks';

export function useKiosk() {
  const reset = useReset();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const hashQueryIndex = window.location.hash.indexOf('?');
    const hashParams =
      hashQueryIndex !== -1
        ? new URLSearchParams(window.location.hash.slice(hashQueryIndex))
        : null;

    const isKiosk =
      searchParams.get('kiosk') === '1' || hashParams?.get('kiosk') === '1';

    if (!isKiosk) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        reset();
      }, 180000); // 180 seconds idle reset
    };

    const events = ['pointerdown', 'mousemove', 'keydown', 'touchstart', 'scroll'];
    events.forEach((event) =>
      window.addEventListener(event, resetTimer, { passive: true })
    );

    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [reset]);
}
