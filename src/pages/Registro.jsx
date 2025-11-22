import { useState } from "react";
import axios from "axios";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = !!email && emailRegex.test(email);
  const isPasswordValid = password.length >= 4; // simple para tests
  const isNombreValid = nombre.trim().length > 0;
  const passwordsMatch = password === confirmPassword;
  const isFormValid = isNombreValid && isEmailValid && isPasswordValid && passwordsMatch;

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setError("");
    if (!isFormValid) {
      if (!passwordsMatch) setError("Las contraseñas no coinciden.");
      return;
    }

    const stored = localStorage.getItem("usuarios");
    const usuarios = stored ? JSON.parse(stored) : [];

    if (usuarios.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      setError("Ya existe un usuario registrado con ese correo.");
      return;
    }

    usuarios.push({ nombre, email: email.toLowerCase(), password });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // feedback para tests
    alert("Registro completado correctamente");

    setNombre("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setSubmitted(false);
  }

  return (
    <main className="page">
      <h2 className="text-center mb-4">Registro</h2>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre completo</label>
              <input
                id="nombre"
                aria-label="Nombre completo"
                className={`form-control ${submitted && !isNombreValid ? "is-invalid" : ""}`}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                id="email"
                aria-label="Correo electrónico"
                type="email"
                className={`form-control ${email && !isEmailValid ? "is-invalid" : ""}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                id="password"
                aria-label="Contraseña"
                type="password"
                className={`form-control ${password && !isPasswordValid ? "is-invalid" : ""}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirm-password" className="form-label">Confirmar contraseña</label>
              <input
                id="confirm-password"
                aria-label="Confirmar contraseña"
                type="password"
                className={`form-control ${submitted && !passwordsMatch ? "is-invalid" : ""}`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="invalid-feedback">Las contraseñas no coinciden.</div>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <button type="submit" className="btn btn-dark" disabled={!isFormValid}>Registrarse</button>
          </form>
        </div>
      </div>
    </main>
  );
}


export default function Registro() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    correo: "",
  });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const registrarUsuario = () => {
    axios.post("http://localhost:8080/api/v1/auth/register", form)
      .then(res => {
        alert("Usuario registrado!");
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Registro</h2>

      <input name="username" onChange={handleChange} placeholder="Usuario" />
      <input name="correo" onChange={handleChange} placeholder="Correo" />
      <input name="password" type="password" onChange={handleChange} placeholder="Contraseña" />

      <button onClick={registrarUsuario}>Registrar</button>
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";

export default function Registro() {
  // -------------------------------
  // Estados del formulario
  // -------------------------------
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    password: "",
    rol: ""
  });

  const [usuarios, setUsuarios] = useState([]);
  const [editId, setEditId] = useState(null);

  // --------------------------------
  // CONTROLAR FORMULARIO
  // --------------------------------
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  // --------------------------------
  // 1. LISTAR USUARIOS
  // --------------------------------
  const cargarUsuarios = () => {
    axios.get("http://localhost:8080/api/v1/usuarios", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
      .then(res => setUsuarios(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // --------------------------------
  // 2. CREAR USUARIO
  // --------------------------------
  const crearUsuario = () => {
    axios.post("http://localhost:8080/api/v1/usuarios", form, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
      .then(() => {
        alert("Usuario creado!");
        cargarUsuarios();
        setForm({ nombre: "", correo: "", password: "", rol: "" });
      })
      .catch(err => console.log(err));
  };

  // --------------------------------
  // 3. CARGAR DATOS PARA EDICIÓN
  // --------------------------------
  const cargarEdicion = (usuario) => {
    setEditId(usuario.id);
    setForm({
      nombre: usuario.nombre,
      correo: usuario.correo,
      password: usuario.password,
      rol: usuario.rol
    });
  };

  // --------------------------------
  // 4. GUARDAR EDICIÓN
  // --------------------------------
  const editarUsuario = () => {
    axios.put(`http://localhost:8080/api/v1/usuarios/${editId}`, form, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
      .then(() => {
        alert("Usuario actualizado!");
        cargarUsuarios();
        setEditId(null);
        setForm({ nombre: "", correo: "", password: "", rol: "" });
      })
      .catch(err => console.log(err));
  };

  // --------------------------------
  // 5. ELIMINAR USUARIO
  // --------------------------------
  const eliminarUsuario = (id) => {
    axios.delete(`http://localhost:8080/api/v1/usuarios/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
      .then(() => {
        alert("Usuario eliminado!");
        cargarUsuarios();
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Registro / CRUD Usuarios</h2>

      {/* FORMULARIO CRUD */}
      <div>
        <h3>{editId ? "Editar Usuario" : "Crear Usuario"}</h3>

        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />

        <input
          name="correo"
          placeholder="Correo"
          value={form.correo}
          onChange={handleChange}
        />

        <input
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
        />

        <input
          name="rol"
          placeholder="Rol (admin/cliente)"
          value={form.rol}
          onChange={handleChange}
        />

        {editId ? (
          <button onClick={editarUsuario}>Guardar Cambios</button>
        ) : (
          <button onClick={crearUsuario}>Crear Usuario</button>
        )}
      </div>

      {/* LISTADO */}
      <h3>Usuarios Registrados</h3>
      <ul>
        {usuarios.map(u => (
          <li key={u.id}>
            <b>{u.nombre}</b> - {u.correo} - rol: {u.rol}

            <button onClick={() => cargarEdicion(u)}>
              Editar
            </button>

            <button onClick={() => eliminarUsuario(u.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
