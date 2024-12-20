import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
    <Toaster
      containerStyle={{
        top: "20%",
      }}
      toastOptions={{
        error: {
          style: {
            background: "var(--accent-color)",
            color: "white",
          },
        },
      }}
    />
  </StrictMode>
);
