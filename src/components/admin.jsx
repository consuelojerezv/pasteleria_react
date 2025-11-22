import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [productos, setProductos] = useState([]);
  
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: ""
  });

  const [editId, setEditId] = useState(null);

  // -------------------------------
  // 1. LISTAR PRODUCTOS
  // -------------------------------
  const cargarProductos = () => {
    axios.get("http://localhost:8080/api/v1/productos", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => setProductos(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // -------------------------------
  // CONTROLAR FORMULARIO
  // -------------------------------
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  // -------------------------------
  // 2. CREAR PRODUCTO
  // -------------------------------
  const crearProducto = () => {
    axios.post("http://localhost:8080/api/v1/productos", form, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        alert("Producto creado!");
        cargarProductos();
        setForm({ nombre: "", descripcion: "", precio: "", imagen: "" });
      })
      .catch(err => console.log(err));
  };

  // -------------------------------
  // 3. PREPARAR EDICIÓN
  // -------------------------------
  const cargarEdicion = (producto) => {
    setEditId(producto.id);
    setForm({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      imagen: producto.imagen
    });
  };

  // -------------------------------
  // 4. GUARDAR EDICIÓN
  // -------------------------------
  const editarProducto = () => {
    axios.put(`http://localhost:8080/api/v1/productos/${editId}`, form, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        alert("Producto actualizado!");
        cargarProductos();
        setEditId(null);
        setForm({ nombre: "", descripcion: "", precio: "", imagen: "" });
      })
      .catch(err => console.log(err));
  };

  // -------------------------------
  // 5. ELIMINAR PRODUCTO
  // -------------------------------
  const eliminarProducto = (id) => {
    axios.delete(`http://localhost:8080/api/v1/productos/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        alert("Producto eliminado!");
        cargarProductos();
      })
      .catch(err => console.log(err));
  };

  // -------------------------------
  // UI
  // -------------------------------
  return (
    <div style={{ padding: "20px" }}>
      <h2>ADMINISTRADOR – CRUD Productos</h2>

      {/* FORMULARIO */}
      <div style={{ marginBottom: "20px" }}>
        <h3>{editId ? "Editar Producto" : "Crear Producto"}</h3>

        <input name="nombre" placeholder="Nombre"
          value={form.nombre} onChange={handleChange} />

        <input name="descripcion" placeholder="Descripción"
          value={form.descripcion} onChange={handleChange} />

        <input name="precio" placeholder="Precio"
          value={form.precio} onChange={handleChange} />

        <input name="imagen" placeholder="URL Imagen"
          value={form.imagen} onChange={handleChange} />

        {editId ? (
          <button onClick={editarProducto}>Guardar Cambios</button>
        ) : (
          <button onClick={crearProducto}>Crear</button>
        )}
      </div>

      {/* LISTADO */}
      <h3>Productos Registrados</h3>
      <ul>
        {productos.map(p => (
          <li key={p.id}>
            <b>{p.nombre}</b> — ${p.precio}

            <button onClick={() => cargarEdicion(p)}>
              Editar
            </button>

            <button onClick={() => eliminarProducto(p.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

