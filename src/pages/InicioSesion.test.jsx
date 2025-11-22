import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import InicioSesion from './InicioSesion'
import { useState } from "react";
import axios from "axios";

describe('InicioSesion', () => {
  beforeEach(() => localStorage.clear())

  it('permite iniciar sesión con usuario existente', () => {
    const usuarios = [{ nombre: 'Ana', email: 'ana@test.cl', password: '1234' }]
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
    window.alert = vi.fn()

    render(<MemoryRouter><InicioSesion /></MemoryRouter>)
    fireEvent.change(screen.getByLabelText(/Correo/i), { target: { value: 'ana@test.cl' } })
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: '1234' } })
    fireEvent.click(screen.getByRole('button', { name: /Entrar|Ingresar/i }))

    const actual = JSON.parse(localStorage.getItem('usuarioActual'))
    expect(actual?.email).toBe('ana@test.cl')
    expect(window.alert).toHaveBeenCalled()
  })
})




export default function InicioSesion() {
  const [usuario, setUsuario] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setUsuario({...usuario, [e.target.name]: e.target.value });
  };

  const iniciarSesion = () => {
    axios.post("http://localhost:8080/api/v1/auth/login", usuario)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        alert("Inicio de sesión exitoso!");
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <input name="username" onChange={handleChange} placeholder="Usuario" />
      <input name="password" type="password" onChange={handleChange} placeholder="Contraseña" />
      <button onClick={iniciarSesion}>Ingresar</button>
    </div>
  );
}
