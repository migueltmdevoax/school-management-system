import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext"
import ReduxProvider from "./providers/ReduxProvider";
import {
  ToastProvider,
} from "./context/ToastContext";

import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/utilities.css";
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ReduxProvider>
           <ToastProvider>
             <App />
           </ToastProvider> 
        </ReduxProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)