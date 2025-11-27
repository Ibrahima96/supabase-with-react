import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from 'react-router-dom';
import { router } from "./router.jsx";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
    <ToastContainer position="bottom-right" theme="dark" />
  </StrictMode>
);
