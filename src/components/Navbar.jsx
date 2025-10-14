import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { countUnits } from "../lib/cart";

export default function Navbar() {
  const [units, setUnits] = useState(countUnits());

  useEffect(() => {
    const onStorage = () => setUnits(countUnits());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">{/* <-- centra y da aire */}
        <Link className="navbar-brand fw-bold" to="/">🍰 Mil Sabores</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="menu" className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/blog">Blog</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
            <li className="nav-item">
              <Link className="nav-link" to="/carrito">🛒 <span className="badge bg-success">{units}</span></Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
