import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    const stored = localStorage.getItem("usuarios");
    const usuarios = stored ? JSON.parse(stored) : [];

    const usuario = usuarios.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!usuario) {
      setError("Correo o contraseña incorrectos.");
      return;
    }

    // Guardar con la key que esperan los tests
    localStorage.setItem(
      "usuarioActual",
      JSON.stringify({ nombre: usuario.nombre, email: usuario.email })
    );

    // llamar alert (los tests mockean window.alert)
    alert("Inicio de sesión correcto");

    navigate("/");
  }

  return (
    <main className="page">
      <h2 className="text-center mb-4">Inicio de Sesión</h2>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo</label>
              <input
                type="email"
                className={`form-control ${email && !isEmailValid ? "is-invalid" : ""}`}
                id="email"
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="invalid-feedback">Ingresa un correo válido.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className={`form-control ${password && password.length === 0 ? "is-invalid" : ""}`}
                id="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="invalid-feedback">La contraseña es obligatoria.</div>
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