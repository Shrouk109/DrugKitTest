// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <GoogleOAuthProvider clientId="189643722599-m5hen2ba4no3gp1mjdrvcvr9mqsl4fub.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  // </StrictMode>
);
