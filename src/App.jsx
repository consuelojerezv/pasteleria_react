import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";
import Contacto from "./pages/Contacto";
import DetalleProducto from "./pages/DetalleProducto";
import InicioSesion from "./pages/InicioSesion";
import Registro from "./pages/Registro";
import Footer from "./components/footer.jsx";
import Admin from "./components/admin";

export default function App() {
  // Lee el usuario actual desde localStorage
  const user = JSON.parse(localStorage.getItem("usuarioActual") || "null");
  const rol = user?.rol || null; // "ROLE_ADMIN", "ROLE_VENDEDOR", "ROLE_CLIENTE" o null

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/inicio" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />

        {/* 🔒 Admin: SOLO ROLE_ADMIN */}
        <Route
          path="/admin"
          element={
            rol === "ROLE_ADMIN"
              ? <Admin />
              : <Navigate to="/" replace />
          }
        />

        {/* Cualquier ruta rara → Inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  );
}
