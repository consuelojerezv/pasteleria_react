import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function InicioSesion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const isFormValid = isEmailValid && password.length > 0;

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!isFormValid) {
      setError("Por favor ingresa un correo y contraseña válidos.");
      return;
    }

    axios
      .post("http://localhost:8080/api/v1/auth/login", { email, password })
      .then((res) => {
        const data = res?.data || {};

        if (!data.accessToken) {
          throw new Error("Respuesta inválida del backend");
        }

        localStorage.setItem("token", data.accessToken);
        localStorage.setItem(
          "usuarioActual",
          JSON.stringify({
            nombre: data.nombre,
            email: data.email,
            rol: data.rol,
          })
        );

        // Actualizar navbar sin recargar
        window.dispatchEvent(new Event("userUpdated"));

        navigate("/admin"); // ENTRADA DIRECTA AL ADMIN
      })
      .catch(() => {
        const stored = localStorage.getItem("usuarios");
        const usuarios = stored ? JSON.parse(stored) : [];

        const usuario = usuarios.find(
          (u) =>
            u.email.toLowerCase() === email.toLowerCase() &&
            u.password === password
        );

        if (!usuario) {
          setError("Correo o contraseña incorrectos.");
          return;
        }

        localStorage.removeItem("token");

        localStorage.setItem(
          "usuarioActual",
          JSON.stringify({
            nombre: usuario.nombre,
            email: usuario.email,
          })
        );

        window.dispatchEvent(new Event("userUpdated"));

        navigate("/admin"); // TAMBIÉN VA AL ADMIN
      });
  }

  return (
    <main className="page">
      <h2 className="text-center mb-4">Inicio de Sesión</h2>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <form onSubmit={handleSubmit} noValidate>
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

            {error && <div className="alert alert-danger">{error}</div>}

            <button type="submit" className="btn btn-dark" disabled={!isFormValid}>
              Entrar
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
