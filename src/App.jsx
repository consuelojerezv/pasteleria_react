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
  const user = JSON.parse(localStorage.getItem("usuarioActual") || "null");

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

        {/* 🔒 Ruta protegida */}
        <Route
          path="/admin"
          element={
            user ? <Admin /> : <Navigate to="/" replace />
          }
        />
      </Routes>

      <Footer />
    </>
  );
}
