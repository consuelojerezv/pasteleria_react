import { useEffect, useState } from "react";
import { getCart, removeItem, clearCart, cartTotal } from "../lib/cart";
import { fmtCLP } from "../lib/currency";

export default function Carrito() {
  const [cart, setCart] = useState(getCart());
  const refresh = () => setCart(getCart());

  useEffect(() => {
    const onStorage = () => refresh();
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const total = cartTotal();

  return (
    <main className="page">
      <h2 className="mb-3">Tu Carrito</h2>

      <div className="row g-3">
        {cart.length ? cart.map(it => (
          <div className="col-12 col-md-6 col-lg-4" key={it.id_producto}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{it.nombre}</h5>
                <p className="mb-1">Precio: {fmtCLP(it.precio)}</p>
                <p className="mb-2">Cantidad: {it.cantidad}</p>
                <button className="btn btn-outline-danger btn-sm"
                        onClick={() => { removeItem(it.id_producto); refresh(); }}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )) : <div className="col-12"><div className="alert alert-secondary">Tu carrito está vacío.</div></div>}
      </div>

      <div className="total-box mt-4 d-flex justify-content-between align-items-center">
        <div>
          <div className="fw-semibold">Total</div>
          <div className="fs-4">{fmtCLP(total)}</div>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-danger" onClick={() => { clearCart(); refresh(); }}>
            Vaciar carrito
          </button>
          <button className="btn btn-dark" disabled={!cart.length} onClick={() => alert("Simulación de pago ✅")}>
            Pagar
          </button>
        </div>
      </div>
    </main>
  );
}
