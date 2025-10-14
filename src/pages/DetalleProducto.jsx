import { useParams } from "react-router-dom";
import { addItem } from "../lib/cart";
import { fmtCLP } from "../lib/currency";

const CATALOGO = {
  TC001: { id:"TC001", nombre:"Torta Cuadrada de Chocolate", precio:45000, img:"/imagenes/torta-cuadrada.jpg" },
};

export default function DetalleProducto() {
  const { id = "TC001" } = useParams();
  const p = CATALOGO[id] ?? CATALOGO.TC001;

  const agregar = () => {
    const cantidad = Number(document.getElementById("cantidad").value) || 1;
    addItem({ id_producto: p.id, nombre: p.nombre, precio: p.precio, cantidad });
    alert(`Agregado ${cantidad} × ${p.nombre}`);
  };

  return (
    <main className="page">
      <div id="contenedor-detalle-producto">
        <div className="product-images">
          <img src={p.img} className="main-product-image" alt={p.nombre}/>
        </div>
        <div className="product-info">
          <h1 className="product-title">{p.nombre}</h1>
          <div className="price">{fmtCLP(p.precio)}</div>
          <p className="product-description text-muted">Deliciosa torta de chocolate con ganache. Personalizable.</p>
          <div className="separator"></div>
          <label htmlFor="cantidad" className="form-label">Cantidad</label>
          <input id="cantidad" type="number" min="1" defaultValue="1" className="form-control input-cantidad"/>
          <button className="add-to-cart-btn" onClick={agregar}>Añadir al carrito 🛒</button>
        </div>
      </div>
    </main>
  );
}
