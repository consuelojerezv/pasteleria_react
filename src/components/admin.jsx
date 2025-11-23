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
  const [editCodigo, setEditCodigo] = useState(null);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

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
        setError("No se pudieron cargar los productos (revisar token/backend).");
      });
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

    const peticion = editCodigo
      ? axios.put(
          `http://localhost:8080/api/v1/productos/${editCodigo}`,
          data,
          config
        )
      : axios.post(
          "http://localhost:8080/api/v1/productos",
          data,
          config
        );

    peticion
      .then(() => {
        setMensaje(
          editCodigo
            ? "Producto actualizado correctamente."
            : "Producto creado correctamente."
        );
        setForm({
          nombre: "",
          descripcion: "",
          precio: "",
          imagen: "",
        });
        setEditCodigo(null);
        cargarProductos();
      })
      .catch((err) => {
        console.error(err);
        setError("Error al guardar el producto.");
      });
  };

  const handleEdit = (producto) => {
    setEditCodigo(producto.codigo); // PK real del backend
    setForm({
      nombre: producto.nombre || "",
      descripcion: producto.descripcion || "",
      precio: producto.precio?.toString() || "",
      imagen: producto.imagen || "",
    });
    setMensaje("");
    setError("");
  };

  const handleDelete = (codigo) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;

    axios
      .delete(`http://localhost:8080/api/v1/productos/${codigo}`, {
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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Panel de Administración</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}

      <h2>{editCodigo ? "Editar producto" : "Crear producto"}</h2>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", marginBottom: "30px" }}
      >
        <div className="mb-2">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Descripción</label>
          <input
            type="text"
            name="descripcion"
            className="form-control"
            value={form.descripcion}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Precio</label>
          <input
            type="number"
            name="precio"
            className="form-control"
            value={form.precio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-2">
          <label className="form-label">URL Imagen</label>
          <input
            type="text"
            name="imagen"
            className="form-control"
            value={form.imagen}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-2">
          {editCodigo ? "Actualizar" : "Crear"}
        </button>
      </form>

      <h2>Listado de productos</h2>
      {productos.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.codigo}>
                <td>{p.codigo}</td>
                <td>{p.nombre}</td>
                <td>{p.descripcion}</td>
                <td>{p.precio}</td>
                <td>
                  {p.imagen && (
                    <img
                      src={p.imagen}
                      alt={p.nombre}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(p)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(p.codigo)}
                  >
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
