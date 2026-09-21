import { TriangleAlert, Check } from 'lucide-react';

interface BannerProps {
  variant: 'warning' | 'inverted' | 'success';
  text: string;
}

export function Banner({ variant, text }: BannerProps) {
  const Icon = variant === 'success' ? Check : TriangleAlert;

  return (
    <div className={`banner banner--${variant}`} role="alert">
      <Icon size={18} strokeWidth={2} aria-hidden />
      <span>{text}</span>
    </div>
  );
}
