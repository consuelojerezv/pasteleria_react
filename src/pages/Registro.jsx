import { useState } from "react";
import axios from "axios";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const passwordsMatch = password.length > 0 && password === confirm;
  const isFormValid = nombre && isEmailValid && passwordsMatch;

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMensaje("");

    if (!isFormValid) {
      setError("Revisa los datos ingresados.");
      return;
    }

    axios
      .post("http://localhost:8080/api/v1/auth/registro", {
        nombre,
        email,
        password,
      })
      .then(() => {
        setMensaje("Usuario registrado exitosamente.");
        setNombre("");
        setEmail("");
        setPassword("");
        setConfirm("");
      })
      .catch((err) => {
        console.error(err);
        setError(
          err?.response?.data || "Error al registrar el usuario."
        );
      });
  }

  return (
    <main className="page">
      <h2 className="text-center mb-4">Registro</h2>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input
                type="email"
                className={`form-control ${
                  email && !isEmailValid ? "is-invalid" : ""
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="invalid-feedback">Ingresa un correo válido.</div>
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirmar contraseña</label>
              <input
                type="password"
                className={`form-control ${
                  confirm && !passwordsMatch ? "is-invalid" : ""
                }`}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
              <div className="invalid-feedback">
                Las contraseñas no coinciden.
              </div>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            {mensaje && <div className="alert alert-success">{mensaje}</div>}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isFormValid}
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
