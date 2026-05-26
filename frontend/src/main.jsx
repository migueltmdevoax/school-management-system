import { StrictMode }
from "react";

import {
  createRoot,
} from "react-dom/client";

import {
  BrowserRouter,
} from "react-router-dom";



import "./index.css";



// 🟣 APP
import App
from "./app/App.jsx";



// 🟣 REDUX
import ReduxProvider
from "./providers/ReduxProvider";



// 🟣 GLOBAL TOAST
import GlobalToast
from "./features/toast/components/GlobalToast";


import GlobalLoader
from "./features/loading/components/GlobalLoader";

import GlobalModal
from "./features/modal/components/GlobalModal";



// 🟣 STYLES
import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/utilities.css";





createRoot(
  document.getElementById("root")
).render(

  <StrictMode>

    <ReduxProvider>

      <BrowserRouter>

        <App />

        {/* 🔥 GLOBAL TOAST SYSTEM */}
        <GlobalToast />

        <GlobalLoader />

        <GlobalModal />

      </BrowserRouter>

    </ReduxProvider>

  </StrictMode>
);