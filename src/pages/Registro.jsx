import { useState } from "react";

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