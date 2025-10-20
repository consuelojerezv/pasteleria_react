import { useParams } from "react-router-dom";
import { addItem } from "../lib/cart";
import { fmtCLP } from "../lib/currency";

const CATALOGO = {
  TC001: { id:"TC001", nombre:"Torta Cuadrada de Chocolate", precio:45000, img:"/imagenes/torta-cuadrada.jpg" },
  TV002: { id:"TV002", nombre:"Torta Circular de Vainilla", precio:40000, img:"/img/Circular-Vainilla.webp" },
  TF003: { id:"TF003", nombre:"Torta Cuadrada de Frutas", precio:50000, img:"/img/Cuadrada-Frutas.jpg" },
  TR004: { id:"TR004", nombre:"Torta Cuadrada de Manjar", precio:42000, img:"/img/Cuadrada-Manjar.jpeg"}, 
  TL005: { id:"TL005", nombre:"Mousse de Chocolate", precio:5000, img:"/img/Mousse-Chocolate.jpg"},
  TN006: { id:"TN006", nombre:"Tiramisu Clasico", precio:5500, img:"/img/Tiramisu-Clasico.jpg"},
  TM007: { id:"TM007", nombre:"Torta Sin Azucar de Naranja", precio:48000, img:"/img/SinAzucar-Naranja.webp"},
  TH009: { id:"TH009", nombre:"Chesscake Sin Azucar", precio:47000, img:"/imagenes/cheescake.jpeg"},
  TP008: { id:"TP008", nombre:"Empanada de Manzana", precio:3000, img:"/img/Empanada-Manzana.jpg"}, 
  TF010: { id:"TF010", nombre:"Tarta de Santiago", precio:6000, img:"/img/Santiago.webp"},
  TC011: { id:"TC011", nombre:"Brownie Sin Gluten", precio:4000, img:"/img/Brownie-SinGluten.avif"},  
  TM012: { id:"TM012", nombre:"Pan sin Gluten", precio:3500, img:"/img/Pan-SinGluten.webp"},
  TB013: { id:"TB013", nombre:"Torta Vegana de Chocolate", precio:50000, img:"/img/Vegana-Chocolate.jpeg"},
  TP014: { id:"TP014", nombre:"Galletas Veganas de Avena", precio:4500, img:"/img/Galletas-Vegana-Avena.jpg"}, 
  TG015: { id:"TG015", nombre:"Torta Especial de Cumpleaños", precio:55000, img:"/img/Especial-Cumpleaños.jpg"}, 
  TL016: { id:"TL016", nombre:"Torta Especial de Boda", precio:60000, img:"/img/Especial-Boda.avif"}  
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
