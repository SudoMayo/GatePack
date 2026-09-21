import { useContext } from 'react';
import { AppStateContext, AppDispatchContext, AppResetContext } from './contexts';
import type { AppState, AppAction } from './reducer';
import type { Dispatch } from 'react';

export function useAppState(): AppState {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppProvider');
  return ctx;
}

export function useAppDispatch(): Dispatch<AppAction> {
  const ctx = useContext(AppDispatchContext);
  if (!ctx) throw new Error('useAppDispatch must be used within AppProvider');
  return ctx;
}

export function useReset(): () => void {
  const ctx = useContext(AppResetContext);
  if (!ctx) throw new Error('useReset must be used within AppProvider');
  return ctx;
}
