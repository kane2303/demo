import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./assets/Routes/Routes";
import AuthProvider from "./assets/Providers/AuthProviders";
import { Toaster } from "react-hot-toast";
// Load global CSS/libs from npm instead of CDN
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import AOS from "aos";
import "preline";

// Initialize AOS once on app load
AOS.init();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  </React.StrictMode>
);
