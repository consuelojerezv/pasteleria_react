import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import products from "../data/products";

export default function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const p = products.find((x) => String(x.id) === String(id));
    setProducto(p ?? null);
    setAdded(false);
  }, [id]);

  function parsePrice(textOrNumber) {
    if (typeof textOrNumber === "number") return textOrNumber;
    if (!textOrNumber) return 0;
    const digits = String(textOrNumber).replace(/\D/g, "");
    return digits ? Number(digits) : 0;
  }

  function formatPrice(n) {
    return Number(n).toLocaleString("es-CL");
  }

  function addToCart() {
    if (!producto) return;
    const precio = parsePrice(producto.precio ?? producto.texto);
    const raw = localStorage.getItem("carrito");
    const cart = raw ? JSON.parse(raw) : [];

    const idx = cart.findIndex((item) => String(item.id) === String(producto.id));
    if (idx > -1) {
      cart[idx].cantidad = (Number(cart[idx].cantidad || 1) + Number(cantidad));
    } else {
      cart.push({
        id: producto.id,
        titulo: producto.titulo,
        precio,
        img: producto.img,
        cantidad: Number(cantidad),
      });
    }

    localStorage.setItem("carrito", JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("cartUpdated"));
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  if (!producto) {
    return (
      <main style={{ padding: "32px 12px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <h2>Producto no encontrado</h2>
          <div style={{ marginTop: 16 }}>
            <Link to="/productos" style={{ textDecoration: "none" }}>
              <button style={{ padding: "8px 14px", borderRadius: 6, border: "none", background: "#222", color: "#fff" }}>Volver a productos</button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const precioNum = parsePrice(producto.precio ?? producto.texto);

  const styles = {
    pageWrap: { padding: "28px 16px" },
    container: { maxWidth: 1100, margin: "0 auto" },
    card: { background: "#fff", borderRadius: 12, padding: 22, boxShadow: "0 8px 24px rgba(0,0,0,0.06)" },
    row: { display: "flex", gap: 28, alignItems: "flex-start", flexWrap: "wrap" },
    // contenedor con alto responsivo para un tamaño consistente
    imgWrap: { flex: "1 1 420px", maxWidth: 520, height: 420 },
    img: { width: "100%", height: "100%", borderRadius: 12, objectFit: "cover", display: "block" },
    info: { flex: "1 1 320px", minWidth: 260 },
    title: { margin: 0, fontSize: 32, marginBottom: 8, color: "#3a2d2d" },
    price: { fontSize: 22, color: "#6b3b1f", marginBottom: 12, fontWeight: 600 },
    desc: { color: "#6b6b6b", lineHeight: 1.5, marginBottom: 14 },
    hr: { border: "none", borderTop: "1px solid #eee", margin: "16px 0" },
    cantidadLabel: { display: "block", marginBottom: 8, color: "#444" },
    cantidadInput: { width: 96, padding: "8px 10px", textAlign: "center", borderRadius: 10, border: "1px solid #ddd" },
    btnSuccess: { marginLeft: 16, background: "#198754", color: "#fff", border: "none", padding: "8px 14px", borderRadius: 8, cursor: "pointer" },
    btnOutline: { marginLeft: 8, background: "transparent", color: "#444", border: "1px solid #bdbdbd", padding: "8px 12px", borderRadius: 8, cursor: "pointer" },
    addedAlert: { display: "inline-block", marginTop: 8, background: "#d1e7dd", color: "#0f5132", padding: "6px 10px", borderRadius: 8 },
    actionsRow: { display: "flex", alignItems: "center", gap: 8, marginTop: 12 },
  };

  return (
    <main style={styles.pageWrap}>
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.row}>
            <div style={styles.imgWrap}>
              <img src={producto.img} alt={producto.titulo} style={styles.img} />
            </div>

            <div style={styles.info}>
              <h1 style={styles.title}>{producto.titulo}</h1>
              <div style={styles.price}>${formatPrice(precioNum)}</div>

              {producto.descripcion && <p style={styles.desc}>{producto.descripcion}</p>}

              <div style={styles.hr} />

              <label style={styles.cantidadLabel}>Cantidad</label>
              <div style={styles.actionsRow}>
                <input
                  type="number"
                  min="1"
                  value={cantidad}
                  onChange={(e) => setCantidad(Math.max(1, Number(e.target.value || 1)))}
                  style={styles.cantidadInput}
                  aria-label="Cantidad"
                />
                <button style={styles.btnSuccess} onClick={addToCart}>Añadir al carrito</button>
                <Link to="/productos" style={{ textDecoration: "none" }}>
                  <button style={styles.btnOutline}>Volver</button>
                </Link>
              </div>

              {added && <div style={styles.addedAlert}>Agregado al carrito ✓</div>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
