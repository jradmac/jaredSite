import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import AdminLogin from './pages/AdminLogin.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import ContractView from './pages/ContractView.tsx';
import ContractSuccess from './pages/ContractSuccess.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/contract/:id" element={<ContractView />} />
        <Route path="/contract/:id/success" element={<ContractSuccess />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
