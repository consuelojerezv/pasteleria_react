import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Registro from './Registro'

describe('Registro', () => {
  beforeEach(() => localStorage.clear())

  it('registra un usuario nuevo', () => {
    window.alert = vi.fn()
    render(<MemoryRouter><Registro /></MemoryRouter>)

    fireEvent.change(screen.getByLabelText(/Nombre completo/i), { target: { value: 'Ana Test' } })
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'ana@test.cl' } })
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i), { target: { value: '1234' } })
    fireEvent.change(screen.getByLabelText(/Confirmar contraseña/i), { target: { value: '1234' } })
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }))

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
    expect(usuarios.find(u => u.email === 'ana@test.cl')).toBeTruthy()
    expect(window.alert).toHaveBeenCalled()
  })
})
