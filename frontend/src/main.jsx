import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./app/App.jsx";
import ReduxProvider from "./providers/ReduxProvider";
import AppSystems from "./components/system/AppSystems";
import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/utilities.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReduxProvider>
      <BrowserRouter>
        <App />
        <AppSystems />
      </BrowserRouter>
    </ReduxProvider>
  </StrictMode>
);