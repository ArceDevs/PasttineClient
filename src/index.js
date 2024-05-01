import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import history from './components/History';
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from './exports/toaster'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter history={history}>
    <ToastProvider>
      <App />
    </ToastProvider>
  </BrowserRouter>
);
