import type { Parcel, HistoryEntry, Kind } from '../types';
import { getKind } from '../types';

export interface AppState {
  parcels: Parcel[];
  history: HistoryEntry[];
  activeTab: 'active' | 'history';
  toast: ToastData | null;
  simulateFailure: boolean;
  shelveTimerId: ReturnType<typeof setTimeout> | null;
}

export interface ToastData {
  parcelId: string;
  title: string;
  body: string;
}

export type AppAction =
  | { type: 'OPEN_OTP'; parcelId: string }
  | { type: 'REGENERATE_OTP'; parcelId: string }
  | { type: 'COMPLETE_HANDOVER'; parcelId: string }
  | { type: 'TOGGLE_NOTIFY'; parcelId: string }
  | { type: 'SHELVE'; parcelId: string }
  | { type: 'SET_TAB'; tab: 'active' | 'history' }
  | { type: 'EXPIRE_OTP'; parcelId: string }
  | { type: 'SET_TOAST'; toast: ToastData }
  | { type: 'DISMISS_TOAST' }
  | { type: 'SET_SIMULATE_FAILURE'; enabled: boolean }
  | { type: 'SET_SHELVE_TIMER'; timerId: ReturnType<typeof setTimeout> | null }
  | { type: 'RESET' };

function generateOtp(exclude?: string): string {
  let otp: string;
  do {
    otp = String(Math.floor(1000 + Math.random() * 9000));
  } while (otp === exclude);
  return otp;
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'OPEN_OTP': {
      return {
        ...state,
        parcels: state.parcels.map((p) =>
          p.id === action.parcelId && p.otpExpiresAt === null
            ? { ...p, otpExpiresAt: Date.now() + 15 * 60 * 1000 }
            : p,
        ),
      };
    }

    case 'REGENERATE_OTP': {
      return {
        ...state,
        parcels: state.parcels.map((p) =>
          p.id === action.parcelId
            ? {
                ...p,
                otp: generateOtp(p.otp ?? undefined),
                otpExpiresAt: Date.now() + 15 * 60 * 1000,
              }
            : p,
        ),
      };
    }

    case 'COMPLETE_HANDOVER': {
      const parcel = state.parcels.find((p) => p.id === action.parcelId);
      if (!parcel) return state;

      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const h12 = hours % 12 || 12;
      const retrievedAt = `${h12}:${String(minutes).padStart(2, '0')} ${ampm}`;

      const newHistoryEntry: HistoryEntry = {
        courier: parcel.courier,
        ref: parcel.ref,
        item: parcel.item,
        collected: `today, ${retrievedAt}`,
        gate: parcel.gate,
        bin: parcel.bin ?? '',
      };

      return {
        ...state,
        parcels: state.parcels.map((p) =>
          p.id === action.parcelId
            ? { ...p, status: 'collected' as const, retrievedAt }
            : p,
        ),
        history: [newHistoryEntry, ...state.history],
      };
    }

    case 'TOGGLE_NOTIFY': {
      return {
        ...state,
        parcels: state.parcels.map((p) =>
          p.id === action.parcelId
            ? { ...p, notifyOn: !p.notifyOn }
            : p,
        ),
      };
    }

    case 'SHELVE': {
      return {
        ...state,
        parcels: state.parcels.map((p) =>
          p.id === action.parcelId
            ? {
                ...p,
                status: 'shelved' as const,
                bin: 'A-2',
                otp: '3157',
                intakeAt: '11:58 AM',
              }
            : p,
        ),
        shelveTimerId: null,
      };
    }

    case 'SET_TAB':
      return { ...state, activeTab: action.tab };

    case 'EXPIRE_OTP':
      return {
        ...state,
        parcels: state.parcels.map((p) =>
          p.id === action.parcelId
            ? { ...p, otpExpiresAt: Date.now() - 1 }
            : p,
        ),
      };

    case 'SET_TOAST':
      return { ...state, toast: action.toast };

    case 'DISMISS_TOAST':
      return { ...state, toast: null };

    case 'SET_SIMULATE_FAILURE':
      return { ...state, simulateFailure: action.enabled };

    case 'SET_SHELVE_TIMER':
      return { ...state, shelveTimerId: action.timerId };

    case 'RESET':
      return { ...state }; // handled externally with initialState

    default:
      return state;
  }
}

// Selectors
export function selectParcelsByKind(state: AppState, kind: Kind): Parcel[] {
  return state.parcels.filter((p) => getKind(p) === kind);
}

export function selectActiveCount(state: AppState): number {
  return state.parcels.filter((p) => getKind(p) !== 'collected').length;
}

export function selectHistoryCount(state: AppState): number {
  return state.history.length;
}

export function selectParcelById(state: AppState, id: string): Parcel | undefined {
  return state.parcels.find((p) => p.id === id);
}
