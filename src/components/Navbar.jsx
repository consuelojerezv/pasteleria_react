import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [units, setUnits] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    function sync() {
      try {
        const rawUser = localStorage.getItem("usuarioActual");
        const parsedUser = rawUser ? JSON.parse(rawUser) : null;
        setUser(parsedUser);

        const rc = localStorage.getItem("carrito");
        const arr = rc ? JSON.parse(rc) : [];
        const total = Array.isArray(arr)
          ? arr.reduce(
              (s, it) => s + Number(it.cantidad ?? it.qty ?? 1),
              0
            )
          : 0;
        setUnits(total);
      } catch {
        setUser(null);
        setUnits(0);
      }
    }

    sync();

    window.addEventListener("storage", sync);
    window.addEventListener("userUpdated", sync);
    window.addEventListener("cartUpdated", sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("userUpdated", sync);
      window.removeEventListener("cartUpdated", sync);
    };
  }, []);

  const rol = user?.rol; // "ROLE_ADMIN", "ROLE_VENDEDOR", "ROLE_CLIENTE"

  function handleLogout() {
    localStorage.removeItem("usuarioActual");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("userUpdated"));
    setUser(null);
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          🍰 Mil Sabores
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productos">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">Contacto</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/carrito">
                Carrito{" "}
                <span className="badge bg-success ms-1">{units}</span>
              </Link>
            </li>

            {/* 🔒 Link Admin solo si es ROLE_ADMIN */}
            {rol === "ROLE_ADMIN" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Admin
                </Link>
              </li>
            )}
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
                <li className="nav-item">
                  <span className="nav-link">
                    Hola, {user.nombre}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
