import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import products from "../data/products";

export default function Carrito() {
  const [items, setItems] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function loadCart() {
    const raw = localStorage.getItem("carrito");
    let parsed = [];
    try {
      parsed = raw ? JSON.parse(raw) : [];
    } catch {
      parsed = [];
    }

    const normalized = parsed.map((it) => {
      // carrito guarda solo id (string/number)
      if (typeof it === "string" || typeof it === "number") {
        const p = products.find((x) => x.id === String(it));
        return p
          ? { ...p, cantidad: 1 }
          : {
              id: String(it),
              titulo: "Producto",
              precio: 0,
              img: "/img/default-product.png",
              cantidad: 1,
            };
      }

      // carrito guarda objeto con id pero sin detalles
      if (it && !it.titulo) {
        const p = products.find((x) => x.id === String(it.id));
        if (p) return { ...p, cantidad: it.cantidad ?? it.qty ?? 1 };
        return {
          id: it.id,
          titulo: it.titulo ?? "Producto",
          precio: it.precio ?? 0,
          img: it.img ?? "/img/default-product.png",
          cantidad: it.cantidad ?? 1,
        };
      }

      // ya tiene todos los campos
      return { ...it, cantidad: it.cantidad ?? it.qty ?? 1 };
    });

    setItems(Array.isArray(normalized) ? normalized : []);
  }

  function saveCart(next) {
    setItems(next);
    localStorage.setItem("carrito", JSON.stringify(next));
    // notificar cambios del carrito a la misma pestaña y a otras
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  }

  function removeItem(id) {
    const next = items.filter((it) => it.id !== id);
    saveCart(next);
  }

  function changeQuantity(id, delta) {
    const next = items.map((it) => {
      if (it.id !== id) return it;
      const current = Number(it.cantidad ?? it.qty ?? 1);
      return { ...it, cantidad: Math.max(1, current + delta) };
    });
    saveCart(next);
  }

  function setQuantity(id, qty) {
    const next = items.map((it) =>
      it.id === id ? { ...it, cantidad: Math.max(1, qty) } : it
    );
    saveCart(next);
  }

  function getTotalNumber() {
    return items.reduce((sum, it) => {
      const price = parseFloat(it.precio ?? it.price ?? 0) || 0;
      const qty = Number(it.cantidad ?? it.qty ?? 1);
      return sum + price * qty;
    }, 0);
  }

  // =========================
  // CREAR ORDEN EN BACKEND
  // =========================
  async function handlePagar() {
    setError("");
    setMensaje("");

    if (!items.length) {
      setError("No hay productos en el carrito.");
      return;
    }

    const rawUser = localStorage.getItem("usuarioActual");
    const user = rawUser ? JSON.parse(rawUser) : null;

    if (!user || !user.email) {
      setError("Debes iniciar sesión para realizar el pago.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token no encontrado. Inicia sesión nuevamente.");
      return;
    }

    // Construir las líneas usando el codigo del producto
    const lineas = items.map((it) => ({
      // Producto.java -> campo @Id int codigo
      productoCodigo: Number(it.id),              // <-- CLAVE: nombre exacto del DTO
      cantidad: Number(it.cantidad ?? 1),
    }));

    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/ordenes?emailCliente=${encodeURIComponent(
          user.email
        )}`,
        lineas,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const orden = res.data;
      setMensaje(
        `Orden creada con éxito. Número de orden: ${
          orden.id ?? "(sin id devuelto)"
        }`
      );

      // Vaciar carrito después de crear la orden
      saveCart([]);
    } catch (err) {
      console.error(err);
      setError("Hubo un error al procesar la orden.");
    }
  }

  if (!items || items.length === 0) {
    return (
      <main className="page">
        <div className="container py-4">
          <h2 className="text-center mb-4">Carrito</h2>
          <div className="text-center">
            <p>Tu cesta está vacía</p>
            <Link to="/productos" className="btn btn-dark">
              Ver productos
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="container py-4">
        <h2 className="text-center mb-4">Carrito</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {mensaje && <div className="alert alert-success">{mensaje}</div>}

        <div className="list-group mb-3">
          {items.map((it) => {
            const price = parseFloat(it.precio ?? it.price ?? 0) || 0;
            const qty = Number(it.cantidad ?? it.qty ?? 1);
            return (
              <div
                key={it.id}
                className="list-group-item d-flex align-items-center"
              >
                <img
                  src={it.img ?? "/img/default-product.png"}
                  alt={it.titulo ?? "producto"}
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 8,
                    marginRight: 16,
                  }}
                />

                <div className="flex-grow-1">
                  <h5 className="mb-1">{it.titulo}</h5>
                  <div className="text-muted">Precio: ${price}</div>
                </div>

                <div className="d-flex align-items-center me-3">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => changeQuantity(it.id, -1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={qty}
                    onChange={(e) =>
                      setQuantity(
                        it.id,
                        Math.max(1, Number(e.target.value || 1))
                      )
                    }
                    style={{
                      width: 64,
                      textAlign: "center",
                      margin: "0 8px",
                    }}
                    className="form-control form-control-sm"
                  />
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => changeQuantity(it.id, +1)}
                  >
                    +
                  </button>
                </div>

                <div className="text-end">
                  <div className="mb-2">
                    Subtotal: {(price * qty).toFixed(0)}
                  </div>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeItem(it.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <strong>Total: {getTotalNumber().toFixed(0)}</strong>
          </div>
          <div>
            <button
              className="btn btn-secondary me-2"
              onClick={() => {
                saveCart([]);
              }}
            >
              Vaciar
            </button>
            <button className="btn btn-primary" onClick={handlePagar}>
              Pagar
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
