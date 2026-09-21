import { useAppState, useAppDispatch, useReset } from '../state/hooks';

export function FacilitatorPanel() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const reset = useReset();

  const handleShelveFlipkart = () => {
    dispatch({ type: 'SHELVE', parcelId: 'fkt-55021' });
  };

  const handleExpireOtp = () => {
    // Expire any parcel with active OTP
    state.parcels.forEach((p) => {
      if (p.otp) {
        dispatch({ type: 'EXPIRE_OTP', parcelId: p.id });
      }
    });
  };

  return (
    <aside className="facilitator-panel" aria-label="Facilitator controls">
      <div className="facilitator-panel__title">
        Facilitator controls (prototype only)
      </div>

      <div className="facilitator-panel__group">
        <div className="facilitator-panel__group-title">Actions</div>
        <button
          type="button"
          className="facilitator-panel__btn"
          onClick={reset}
        >
          Reset demo
        </button>
        <button
          type="button"
          className="facilitator-panel__btn"
          onClick={handleShelveFlipkart}
        >
          Shelve Flipkart parcel now
        </button>
        <button
          type="button"
          className="facilitator-panel__btn"
          onClick={handleExpireOtp}
        >
          Expire current OTP now
        </button>
      </div>

      <div className="facilitator-panel__group">
        <div className="facilitator-panel__group-title">Simulations</div>
        <label className="facilitator-panel__checkbox">
          <input
            type="checkbox"
            checked={state.simulateFailure}
            onChange={(e) =>
              dispatch({
                type: 'SET_SIMULATE_FAILURE',
                enabled: e.target.checked,
              })
            }
          />
          <span>Simulate network failure</span>
        </label>
      </div>

      <div className="facilitator-panel__group">
        <div className="facilitator-panel__group-title">State readout</div>
        <div className="facilitator-panel__status">
          {state.parcels.map((p) => (
            <div key={p.id} style={{ marginBottom: '8px' }}>
              <strong>{p.ref}</strong>: {p.status}
              <br />
              Location: Gate {p.gate}, Bin {p.bin ?? 'none'}
              <br />
              OTP: {p.otp ?? 'none'}
              {p.id === 'fkt-55021' && ` | Notify: ${p.notifyOn ? 'on' : 'off'}`}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
