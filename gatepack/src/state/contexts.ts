import { createContext, type Dispatch } from 'react';
import type { AppState, AppAction } from './reducer';

export const AppStateContext = createContext<AppState | null>(null);
export const AppDispatchContext = createContext<Dispatch<AppAction> | null>(null);
export const AppResetContext = createContext<(() => void) | null>(null);
