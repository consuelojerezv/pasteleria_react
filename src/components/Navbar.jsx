import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [units, setUnits] = useState(0);

  useEffect(() => {
    function updateUnitsFromStorage() {
      try {
        const rc = localStorage.getItem("carrito");
        const arr = rc ? JSON.parse(rc) : [];
        const total = Array.isArray(arr) ? arr.reduce((s, it) => s + (Number(it.cantidad ?? it.qty ?? 1)), 0) : 0;
        setUnits(total);
      } catch {
        setUnits(0);
      }
    }

    updateUnitsFromStorage();
    window.addEventListener("cartUpdated", updateUnitsFromStorage);
    window.addEventListener("storage", updateUnitsFromStorage);
    return () => {
      window.removeEventListener("cartUpdated", updateUnitsFromStorage);
      window.removeEventListener("storage", updateUnitsFromStorage);
    };
  }, []);

  useEffect(() => {
    const rawUser = localStorage.getItem("usuarioActual");
    setUser(rawUser ? JSON.parse(rawUser) : null);

    const rawCart = localStorage.getItem("carrito");
    try {
      const parsed = rawCart ? JSON.parse(rawCart) : [];
      setUnits(Array.isArray(parsed) ? parsed.length : 0);
    } catch {
      setUnits(0);
    }

    function onStorage() {
      const r = localStorage.getItem("usuarioActual");
      setUser(r ? JSON.parse(r) : null);

      const rc = localStorage.getItem("carrito");
      try {
        const p = rc ? JSON.parse(rc) : [];
        setUnits(Array.isArray(p) ? p.length : 0);
      } catch {
        setUnits(0);
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function handleLogout() {
    localStorage.removeItem("usuarioActual");
    setUser(null);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">🍰 Mil Sabores</Link>

        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/blog">Blog</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/carrito">Carrito <span className="badge bg-success ms-1">{units}</span></Link></li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/inicio">Ingresar</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/registro">Registrarse</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item"><span className="nav-link">Hola, {user.nombre}</span></li>
                <li className="nav-item"><button className="btn btn-link nav-link" onClick={handleLogout}>Cerrar sesión</button></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
