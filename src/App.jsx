import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "/./components/Navbar";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";
import Contacto from "./pages/Contacto";
import DetalleProducto from "./pages/DetalleProducto";
import InicioSesion from "./pages/InicioSesion";
import Registro from "./pages/Registro";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos/>} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/inicio" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
      </Routes>
    </BrowserRouter>
  );
}
