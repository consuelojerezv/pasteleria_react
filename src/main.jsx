import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";  // ⬅️ IMPORTANTE
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap primero
import "./styles.css";                          // Tus estilos SIEMPRE al final

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
