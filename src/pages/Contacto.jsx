import { useState } from "react";
const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contacto() {
  const [f, setF] = useState({ nombre:"", correo:"", mensaje:"" });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!f.nombre.trim()) return alert("Ingresa tu nombre.");
    if (!emailOk.test(f.correo)) return alert("Correo inválido.");
    if (!f.mensaje.trim()) return alert("Escribe tu mensaje.");
    alert("¡Gracias! Te contactaremos pronto.");
    setF({ nombre:"", correo:"", mensaje:"" });
  };

  return (
    <main className="page">
      <h2 className="text-center mb-4">Contacto</h2>
      <form className="contact-wrapper" onSubmit={onSubmit} noValidate>
        <label className="form-label">Nombre</label>
        <input className="form-control" value={f.nombre} onChange={e=>setF({...f, nombre:e.target.value})}/>
        <label className="form-label mt-3">Correo</label>
        <input className="form-control" value={f.correo} onChange={e=>setF({...f, correo:e.target.value})}/>
        <label className="form-label mt-3">Mensaje</label>
        <textarea className="form-control" rows="4" value={f.mensaje} onChange={e=>setF({...f, mensaje:e.target.value})}/>
        <button className="btn btn-dark w-100 mt-3">Enviar</button>
      </form>
    </main>
  );
}
