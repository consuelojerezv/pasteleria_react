import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import InicioSesion from './InicioSesion'

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
