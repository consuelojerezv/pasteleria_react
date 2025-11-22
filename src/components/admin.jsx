import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [productos, setProductos] = useState([]);

  // 🔹 Cargar productos
  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/productos", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    })
      .then(res => setProductos(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>CRUD Productos (Admin)</h2>
      <ul>
        {productos.map(p => (
          <li key={p.id}>{p.nombre} — ${p.precio}</li>
        ))}
      </ul>
    </div>
  );
}
