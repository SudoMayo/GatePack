import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BackHeaderProps {
  title: string;
}

export function BackHeader({ title }: BackHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="back-header">
      <button
        className="back-header__back"
        onClick={() => navigate('/')}
        type="button"
      >
        <ChevronLeft size={20} strokeWidth={2} aria-hidden />
        Back
      </button>
      <span className="back-header__title">{title}</span>
    </header>
  );
}
