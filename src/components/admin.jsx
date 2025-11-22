import { useEffect, useState } from "react";
import axios from "axios";

// URL base del backend
const URL = "http://localhost:8080/productos";

export default function Admin() {
  
  // --------------------------
  // ESTADOS
  // --------------------------
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [editando, setEditando] = useState(null);

  const token = localStorage.getItem("token");

  // --------------------------
  // GET — Listar productos
  // --------------------------
  useEffect(() => {
    axios
      .get(URL, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setProductos(response.data))
      .catch((error) => console.log(error));
  }, []);

  // --------------------------
  // POST — Crear producto
  // --------------------------
  const crearProducto = (e) => {
    e.preventDefault();

    axios
      .post(
        URL,
        { nombre, precio },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // --------------------------
  // DELETE — Eliminar producto
  // --------------------------
  const eliminarProducto = (id) => {
    axios
      .delete(`${URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setProductos(productos.filter((p) => p.id !== id));
      })
      .catch((err) => console.log(err));
  };

  // --------------------------
  // GET — Cargar datos para editar
  // --------------------------
  const cargarParaEditar = (id) => {
    axios
      .get(`${URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setEditando(id);
        setNombre(res.data.nombre);
        setPrecio(res.data.precio);
      })
      .catch((err) => console.log(err));
  };

  // --------------------------
  // PUT — Guardar edición
  // --------------------------
  const guardarEdicion = (e) => {
    e.preventDefault();

    axios
      .put(
        `${URL}/${editando}`,
        { nombre, precio },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  };

  // ======================================================
  // RENDER DEL ADMIN
  // ======================================================
  return (
    <div style={{ padding: "25px" }}>
      <h1>Panel de Administración — Productos</h1>

      {/* ---------------------------------------------------------------
         LISTA DE PRODUCTOS
      ---------------------------------------------------------------- */}
      <h2>Lista de Productos</h2>
      <ul>
        {productos.map((prod) => (
          <li key={prod.id}>
            {prod.nombre} — ${prod.precio}
            <button onClick={() => cargarParaEditar(prod.id)}>Editar</button>
            <button onClick={() => eliminarProducto(prod.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      {/* ---------------------------------------------------------------
        FORMULARIO CREAR / EDITAR
      ---------------------------------------------------------------- */}
      <h2>{editando ? "Editar Producto" : "Crear Nuevo Producto"}</h2>

      <form onSubmit={editando ? guardarEdicion : crearProducto}>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label>Precio:</label>
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />

        <button type="submit">
          {editando ? "Guardar Cambios" : "Crear Producto"}
        </button>
      </form>
    </div>
  );
}
