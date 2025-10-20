import { useState } from "react";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = passwordRegex.test(password);
  const isNombreValid = nombre.trim().length > 0;
  const isFormValid = isNombreValid && isEmailValid && isPasswordValid;

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setError("");
    if (!isFormValid) return;

    // obtener lista de usuarios desde localStorage
    const stored = localStorage.getItem("usuarios");
    const usuarios = stored ? JSON.parse(stored) : [];

    // evitar registro duplicado por email
    if (usuarios.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      setError("Ya existe un usuario registrado con ese correo.");
      return;
    }

    // almacenar nuevo usuario (nota: para demo; en producción usar backend y hashing)
    usuarios.push({ nombre, email: email.toLowerCase(), password });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Registro completado correctamente");
    setNombre("");
    setEmail("");
    setPassword("");
    setSubmitted(false);
  }

  return (
    <main className="page">
      <h2 className="text-center mb-4">Registro</h2>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre Completo</label>
              <input
                type="text"
                className={`form-control ${submitted && !isNombreValid ? "is-invalid" : ""}`}
                id="nombre"
                placeholder="Ingresa tu nombre completo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <div className="invalid-feedback">El nombre es obligatorio.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo Electrónico</label>
              <input
                type="email"
                className={`form-control ${email && !isEmailValid ? "is-invalid" : ""}`}
                id="email"
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="invalid-feedback">Ingresa un correo válido (ej: usuario@dominio.com).</div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className={`form-control ${password && !isPasswordValid ? "is-invalid" : ""}`}
                id="password"
                placeholder="Crea una contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="invalid-feedback">
                La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial.
              </div>
              <small className="form-text text-muted">
                Recomendado: mínimo 8 caracteres, incluir mayúscula, número y símbolo.
              </small>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <button type="submit" className="btn btn-dark" disabled={!isFormValid}>
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}