import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root') as HTMLElement);


root.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>
);

reportWebVitals();