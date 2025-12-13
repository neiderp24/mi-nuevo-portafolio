import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; // 👈 importa HashRouter
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter> {/* 👈 ahora todo se enruta correctamente usando # */}
      <App />
    </HashRouter>
  </StrictMode>
);
