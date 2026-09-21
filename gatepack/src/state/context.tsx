import { useReducer, useCallback, type ReactNode, type Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSeedParcels, getSeedHistory } from '../data';
import { appReducer, type AppState, type AppAction } from './reducer';
import { AppStateContext, AppDispatchContext, AppResetContext } from './contexts';

function createInitialState(): AppState {
  return {
    parcels: getSeedParcels(),
    history: getSeedHistory(),
    activeTab: 'active',
    toast: null,
    simulateFailure: false,
    shelveTimerId: null,
  };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, null, createInitialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        <ResetProvider dispatch={dispatch}>
          {children}
        </ResetProvider>
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

function ResetProvider({ children, dispatch }: { children: ReactNode; dispatch: Dispatch<AppAction> }) {
  const navigate = useNavigate();

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    navigate('/');
    window.location.reload();
  }, [dispatch, navigate]);

  return (
    <AppResetContext.Provider value={reset}>
      {children}
    </AppResetContext.Provider>
  );
}
