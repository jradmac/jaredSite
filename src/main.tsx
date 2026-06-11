import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import { initMetaPixel, trackPixel } from './lib/metaPixel';
import App from './App.tsx';
import AdminLogin from './pages/AdminLogin.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import ContractView from './pages/ContractView.tsx';
import ContractSuccess from './pages/ContractSuccess.tsx';
import Resume from './pages/Resume.tsx';
import Outpilot from './pages/Outpilot.tsx';
import CustomAI from './pages/CustomAI.tsx';
import Consultation from './pages/Consultation.tsx';

// Load the Meta Pixel as early as possible (no-op without a Pixel ID).
initMetaPixel();

// Fire a PageView on first load and on every client-side route change.
function PixelRouteTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPixel('PageView');
  }, [location.pathname]);
  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PixelRouteTracker />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/contract/:id" element={<ContractView />} />
        <Route path="/contract/:id/success" element={<ContractSuccess />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/products/outpilot" element={<Outpilot />} />
        <Route path="/products/custom-ai" element={<CustomAI />} />
        <Route path="/free-consultation" element={<Consultation />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
