import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [productos, setProductos] = useState([]);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
  });

  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  // ============================
  // 1. CARGAR PRODUCTOS
  // ============================
  const cargarProductos = () => {
    setError("");
    axios
      .get("http://localhost:8080/api/v1/productos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setProductos(res.data || []);
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudieron cargar los productos (revisar token / backend).");
      });
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // ============================
  // 2. CONTROLAR FORMULARIO
  // ============================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================
  // 3. GUARDAR (CREAR / EDITAR)
  // ============================
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    const data = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      precio: Number(form.precio),
      imagen: form.imagen,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    // Si hay editId, hacemos PUT (editar). Si no, POST (crear)
    const peticion = editId
      ? axios.put(`http://localhost:8080/api/v1/productos/${editId}`, data, config)
      : axios.post("http://localhost:8080/api/v1/productos", data, config);

    peticion
      .then(() => {
        setMensaje(editId ? "Producto actualizado correctamente." : "Producto creado correctamente.");
        setForm({
          nombre: "",
          descripcion: "",
          precio: "",
          imagen: "",
        });
        setEditId(null);
        cargarProductos();
      })
      .catch((err) => {
        console.error(err);
        setError("Error al guardar el producto.");
      });
  };

  // ============================
  // 4. EDITAR (CARGAR EN FORM)
  // ============================
  const handleEdit = (producto) => {
    setEditId(producto.id); // ajusta al nombre real de tu PK
    setForm({
      nombre: producto.nombre || "",
      descripcion: producto.descripcion || "",
      precio: producto.precio?.toString() || "",
      imagen: producto.imagen || "",
    });
    setMensaje("");
    setError("");
  };

  // ============================
  // 5. ELIMINAR
  // ============================
  const handleDelete = (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;

    axios
      .delete(`http://localhost:8080/api/v1/productos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setMensaje("Producto eliminado correctamente.");
        cargarProductos();
      })
      .catch((err) => {
        console.error(err);
        setError("Error al eliminar el producto.");
      });
  };

  // ============================
  // 6. RENDER
  // ============================
  return (
    <div style={{ padding: "20px" }}>
      <h1>Panel de Administración</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}

      {/* FORMULARIO */}
      <h2>{editId ? "Editar producto" : "Crear producto"}</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", marginBottom: "30px" }}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Descripción</label>
          <input
            type="text"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Precio</label>
          <input
            type="number"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>URL Imagen</label>
          <input
            type="text"
            name="imagen"
            value={form.imagen}
            onChange={handleChange}
          />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          {editId ? "Actualizar" : "Crear"}
        </button>
      </form>

      {/* LISTADO */}
      <h2>Listado de productos</h2>
      {productos.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <table border="1" cellPadding="6" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.descripcion}</td>
                <td>{p.precio}</td>
                <td>
                  {p.imagen && (
                    <img
                      src={p.imagen}
                      alt={p.nombre}
                      style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    />
                  )}
                </td>
                <td>
                  <button onClick={() => handleEdit(p)}>Editar</button>
                  <button onClick={() => handleDelete(p.id)} style={{ marginLeft: "5px" }}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
