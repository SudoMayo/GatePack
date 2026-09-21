import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, TriangleAlert, Clock } from 'lucide-react';
import { useAppState, useAppDispatch, useReset } from '../state/hooks';
import { selectParcelsByKind, selectActiveCount, selectHistoryCount } from '../state/reducer';
import { HorizontalStepper } from '../components/HorizontalStepper';
import { STUDENT_ID } from '../data';

const STEPPER_LABELS = ['Dropped', 'Unboxing', 'Shelved'];

export function Dashboard() {
  const navigate = useNavigate();
  const state = useAppState();
  const dispatch = useAppDispatch();
  const reset = useReset();

  const readyParcels = selectParcelsByKind(state, 'ready');
  const pendingParcels = selectParcelsByKind(state, 'pending');
  const mismatchParcels = selectParcelsByKind(state, 'mismatch');
  const otherUpdates = [...pendingParcels, ...mismatchParcels];

  const activeCount = selectActiveCount(state);
  const historyCount = selectHistoryCount(state);

  useEffect(() => {
    document.title = 'GatePack';
  }, []);

  return (
    <div className="screen">
      <main className="screen__main">
        {/* Header */}
        <header className="dashboard-header">
          <h1 className="dashboard-header__wordmark">GatePack</h1>
          <span className="dashboard-header__id">ID: {STUDENT_ID}</span>
        </header>

        {/* Tabs */}
        <div className="tabs" role="tablist">
          <button
            className={`tab${state.activeTab === 'active' ? ' tab--active' : ''}`}
            role="tab"
            aria-selected={state.activeTab === 'active'}
            id="tab-active"
            aria-controls="panel-active"
            onClick={() => dispatch({ type: 'SET_TAB', tab: 'active' })}
            type="button"
          >
            Active ({activeCount})
          </button>
          <button
            className={`tab${state.activeTab === 'history' ? ' tab--active' : ''}`}
            role="tab"
            aria-selected={state.activeTab === 'history'}
            id="tab-history"
            aria-controls="panel-history"
            onClick={() => dispatch({ type: 'SET_TAB', tab: 'history' })}
            type="button"
          >
            History ({historyCount})
          </button>
        </div>

        {/* Active panel */}
        {state.activeTab === 'active' && (
          <div role="tabpanel" id="panel-active" aria-labelledby="tab-active">
            {/* Ready parcel cards */}
            {readyParcels.map((p) => (
              <div key={p.id} className="parcel-card">
                <div className="parcel-card__header">
                  {p.urgentLabel && (
                    <span className="parcel-card__urgent">
                      <TriangleAlert size={14} strokeWidth={2} aria-hidden />
                      Urgent: {p.urgentLabel}
                    </span>
                  )}
                  <span className="parcel-card__ref">{p.ref}</span>
                </div>
                <div className="parcel-card__title">
                  {p.courier} #{p.ref}
                </div>
                <div className="parcel-card__weight">
                  Est. weight: {p.weightKg} kg
                </div>
                <HorizontalStepper steps={STEPPER_LABELS} completedCount={3} />
                <div className="parcel-card__location">
                  <div className="parcel-card__location-label">Location assigned</div>
                  <div className="parcel-card__location-value">
                    Gate {p.gate} | Shelf Bin {p.bin}
                  </div>
                </div>
                <button
                  className="btn-primary"
                  onClick={() => navigate(`/parcel/${p.id}/otp`)}
                  type="button"
                >
                  View pickup OTP
                  <ChevronRight size={18} strokeWidth={2} aria-hidden />
                </button>
              </div>
            ))}

            {readyParcels.length === 0 && otherUpdates.length === 0 && (
              <div className="empty-state">
                <div className="empty-state__title">Nothing ready to collect yet</div>
                <div className="empty-state__body">
                  We'll list a parcel here once security has shelved it.
                </div>
              </div>
            )}

            {/* Other updates */}
            {otherUpdates.length > 0 && (
              <div className="other-updates">
                <div className="other-updates__label">Other updates</div>
                {pendingParcels.map((p) => (
                  <button
                    key={p.id}
                    className="update-row"
                    onClick={() => navigate(`/parcel/${p.id}/pending`)}
                    type="button"
                  >
                    <Clock size={20} strokeWidth={2} className="update-row__icon" aria-hidden />
                    <div className="update-row__text">
                      <div className="update-row__title">
                        Unboxing in progress (wait 15–20 min)
                      </div>
                      <div className="update-row__subtitle">
                        {p.courier} #{p.ref}
                      </div>
                    </div>
                    <ChevronRight size={18} strokeWidth={2} className="update-row__chevron" aria-hidden />
                  </button>
                ))}
                {mismatchParcels.map((p) => (
                  <button
                    key={p.id}
                    className="update-row"
                    onClick={() => navigate(`/parcel/${p.id}/mismatch`)}
                    type="button"
                  >
                    <TriangleAlert size={20} strokeWidth={2} className="update-row__icon" aria-hidden />
                    <div className="update-row__text">
                      <div className="update-row__title">
                        Arrived at Gate {p.gate} instead
                      </div>
                      <div className="update-row__subtitle">
                        {p.courier} #{p.ref}
                      </div>
                    </div>
                    <ChevronRight size={18} strokeWidth={2} className="update-row__chevron" aria-hidden />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* History panel */}
        {state.activeTab === 'history' && (
          <div role="tabpanel" id="panel-history" aria-labelledby="tab-history">
            {state.history.map((h, i) => (
              <div key={`${h.ref}-${i}`} className="history-row">
                <div className="history-row__left">
                  <div className="history-row__title">
                    {h.courier} #{h.ref}
                  </div>
                  <div className="history-row__item">{h.item}</div>
                  <div className="history-row__date">
                    Collected {h.collected}
                  </div>
                </div>
                <div className="history-row__right">
                  Gate {h.gate}, Bin {h.bin}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="dashboard-footer">
          <div className="dashboard-footer__version">GatePack prototype v1.0</div>
          <button className="text-link" type="button" onClick={reset}>
            Reset demo
          </button>
        </footer>
      </main>
    </div>
  );
}
