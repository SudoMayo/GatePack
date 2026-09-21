import type { ReactNode } from 'react';

interface StickyFooterProps {
  children: ReactNode;
}

export function StickyFooter({ children }: StickyFooterProps) {
  return (
    <div className="sticky-footer">
      {children}
    </div>
  );
}
