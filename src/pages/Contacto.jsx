import { useState } from "react";

export default function Contacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  function isEmailSimple(e) {
    return typeof e === "string" && e.includes("@") && e.includes(".");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!nombre.trim() || !isEmailSimple(email) || !mensaje.trim()) {
      setError("Todos los campos son requeridos y el correo debe ser válido.");
      // llamar alert cuando faltan campos (el test espera un alert)
      alert("Por favor completa los campos requeridos.");
      return;
    }

    // Mensaje de éxito que coincide con la expectativa del test
    alert("¡Gracias! Te contactaremos pronto.");

    setNombre("");
    setEmail("");
    setMensaje("");
  }

  return (
    <main className="page">
      <h2 className="text-center mb-4">Contacto</h2>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label
                htmlFor="contacto-nombre"
                className="form-label"
              >
                Nombre
              </label>
              <input
                id="contacto-nombre"
                aria-label="Nombre"
                aria-describedby="contacto-nombre-desc"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="contacto-email"
                className="form-label"
              >
                Correo
              </label>
              <input
                id="contacto-email"
                aria-label="Correo"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="contacto-mensaje"
                className="form-label"
              >
                Mensaje
              </label>
              <textarea
                id="contacto-mensaje"
                aria-label="Mensaje"
                className="form-control"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
              />
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-dark">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
