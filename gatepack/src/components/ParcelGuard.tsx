import { Navigate, useParams } from 'react-router-dom';
import { useAppState } from '../state/hooks';
import { selectParcelById } from '../state/reducer';
import { getKind, type Kind } from '../types';
import type { ReactNode } from 'react';

interface ParcelGuardProps {
  allowedKinds: Kind[];
  children: ReactNode;
}

export function ParcelGuard({ allowedKinds, children }: ParcelGuardProps) {
  const { id } = useParams<{ id: string }>();
  const state = useAppState();
  const parcel = id ? selectParcelById(state, id) : undefined;

  if (!parcel) {
    return <Navigate to="/" replace />;
  }

  const kind = getKind(parcel);

  if (allowedKinds.includes(kind)) {
    return <>{children}</>;
  }

  // Redirect to the correct route for this parcel's current kind
  switch (kind) {
    case 'ready':
      return <Navigate to={`/parcel/${id}/otp`} replace />;
    case 'pending':
      return <Navigate to={`/parcel/${id}/pending`} replace />;
    case 'mismatch':
      return <Navigate to={`/parcel/${id}/mismatch`} replace />;
    case 'collected':
      return <Navigate to="/" replace />;
    default:
      return <Navigate to="/" replace />;
  }
}
