import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './state/context';
import { PhoneFrame } from './components/PhoneFrame';
import { FacilitatorPanel } from './components/FacilitatorPanel';
import { ParcelGuard } from './components/ParcelGuard';
import { Toast } from './components/Toast';
import { Dashboard } from './screens/Dashboard';
import { ParcelOtp } from './screens/ParcelOtp';
import { HandoverComplete } from './screens/HandoverComplete';
import { PackagePending } from './screens/PackagePending';
import { LocationMismatch } from './screens/LocationMismatch';
import { useKiosk } from './hooks/useKiosk';

function AppShell() {
  useKiosk();

  return (
    <PhoneFrame panel={<FacilitatorPanel />}>
      <Toast />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/parcel/:id/otp"
          element={
            <ParcelGuard allowedKinds={['ready']}>
              <ParcelOtp />
            </ParcelGuard>
          }
        />
        <Route
          path="/parcel/:id/done"
          element={
            <ParcelGuard allowedKinds={['collected']}>
              <HandoverComplete />
            </ParcelGuard>
          }
        />
        <Route
          path="/parcel/:id/pending"
          element={
            <ParcelGuard allowedKinds={['pending', 'ready']}>
              <PackagePending />
            </ParcelGuard>
          }
        />
        <Route
          path="/parcel/:id/mismatch"
          element={
            <ParcelGuard allowedKinds={['mismatch']}>
              <LocationMismatch />
            </ParcelGuard>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PhoneFrame>
  );
}

export function App() {
  return (
    <HashRouter>
      <AppProvider>
        <AppShell />
      </AppProvider>
    </HashRouter>
  );
}
