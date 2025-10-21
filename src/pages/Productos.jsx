import { Link } from "react-router-dom";

export default function Productos() {
  const posts = [
    { id:"TC001", titulo:"Torta Cuadrada de Chocolate", texto:"$45.000", img:"/imagenes/torta-cuadrada.jpg", link:"/producto/TC001" },
    { id:"TV002", titulo:"Torta Circular de Vainilla", texto:"$40.000", img:"/img/Circular-Vainilla.webp", link:"/producto/TV002" },
    { id:"TF003", titulo:"Torta Cuadrada de Frutas", texto:"$50.000", img:"/img/Cuadrada-Frutas.jpg", link:"/producto/TF003" },
    { id:"TR004", titulo:"Torta Cuadrada de Manjar", texto:"$42.000", img:"/img/Cuadrada-Manjar.jpeg", link:"/producto/TR004"},
    { id:"TL005", titulo:"Mousse de Chocolate", texto:"$5.000", img:"/img/Mousse-Chocolate.jpg", link:"/producto/TL005"},
    { id:"TN006", titulo:"Tiramisu Clasico", texto:"$5.500", img:"/img/Tiramisu-Clasico.jpg", link:"/producto/TN006"},
    { id:"TM007", titulo:"Torta Sin Azucar de Naranja", texto:"$48.000", img:"/img/SinAzucar-Naranja.webp", link:"/producto/TM007"},
    { id:"TH009", titulo:"Chesscake Sin Azucar", texto:"$47.000", img:"/imagenes/cheescake.jpeg", link:"/producto/TH009"},
    { id:"TP008", titulo:"Empanada de Manzana", texto:"$3.000", img:"/img/Empanada-Manzana.jpg", link:"/producto/TP008"}, 
    { id:"TF010", titulo:"Tarta de Santiago", texto:"$6.000", img:"/img/Santiago.webp", link:"/producto/TF010"},
    { id:"TC011", titulo:"Brownie Sin Gluten", texto:"$4.000", img:"/img/Brownie-SinGluten.avif", link:"/producto/TC011"},
    { id:"TM012", titulo:"Pan sin Gluten", texto:"$3.500", img:"/img/Pan-SinGluten.webp", link:"/producto/TM012"},
    { id:"TB013", titulo:"Torta Vegana de Chocolate", texto:"$50.000", img:"/img/Vegana-Chocolate.jpeg", link:"/producto/TB013"},
    { id:"TP014", titulo:"Galletas Veganas de Avena", texto:"$4.500", img:"/img/Galletas-Vegana-Avena.jpg", link:"/producto/TP014"}, 
    { id:"TG015", titulo:"Torta Especial de Cumpleaños", texto:"$55.000", img:"/img/Especial-Cumpleaños.jpg", link:"/producto/TG015"}, 
    { id:"TL016", titulo:"Torta Especial de Boda", texto:"$60.000", img:"/img/Especial-Boda.avif", link:"/producto/TL016"}   
  ];  

  function parsePrice(text) {
    if (!text) return 0;
    const digits = String(text).replace(/\D/g, "");
    return digits ? Number(digits) : 0;
  }

  function addToCart(p) {
    const raw = localStorage.getItem("carrito");
    const cart = raw ? JSON.parse(raw) : [];
    const existingIndex = cart.findIndex(item => String(item.id) === String(p.id));
    if (existingIndex > -1) {
      cart[existingIndex].cantidad = (cart[existingIndex].cantidad ?? 1) + 1;
    } else {
      cart.push({
        id: p.id,
        titulo: p.titulo,
        precio: parsePrice(p.texto),
        img: p.img,
        cantidad: 1
      });
    }
    localStorage.setItem("carrito", JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("cartUpdated"));
    alert("Producto agregado al carrito");
  }

  return (
    <main className="page">
      <h2 className="text-center mb-4">Nuestros Productos</h2>
      <div className="row g-4">
        {posts.map(p => (
          <div key={p.id} className="col-12 col-sm-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <img src={p.img} className="card-img-top blog-img" alt={p.titulo}/>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.titulo}</h5>
                <p className="card-text flex-grow-1">{p.texto}</p>
                <div className="d-flex">
                  <Link className="btn btn-dark mt-2 align-self-start" to={p.link}>Ver producto</Link>
                  <button
                    type="button"
                    className="btn btn-outline-primary mt-2 ms-2"
                    onClick={() => addToCart(p)}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
