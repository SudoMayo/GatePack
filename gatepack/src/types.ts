export type ParcelStatus = 'unboxing' | 'shelved' | 'collected';

export interface Parcel {
  id: string;
  courier: string;
  ref: string;
  item: string;
  weightKg: number;
  urgentLabel?: string;
  status: ParcelStatus;
  gate: 1 | 2;
  gateName: string;
  bin: string | null;
  post: string;
  otp: string | null;
  otpExpiresAt: number | null;
  intakeAt: string | null;
  retrievedAt: string;
  notifyOn: boolean;
  walk?: { meters: number; minutes: number; note: string };
}

export type Kind = 'ready' | 'pending' | 'mismatch' | 'collected';

export function getKind(p: Parcel): Kind {
  if (p.status === 'collected') return 'collected';
  if (p.status === 'unboxing') return 'pending';
  if (p.status === 'shelved' && p.gate !== 1) return 'mismatch';
  return 'ready';
}

export interface HistoryEntry {
  courier: string;
  ref: string;
  item: string;
  collected: string;
  gate: number;
  bin: string;
}
