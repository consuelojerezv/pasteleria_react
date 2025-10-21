import { render, screen, fireEvent } from '@testing-library/react'
import Contacto from './Contacto'

describe('Contacto', () => {
  it('valida campos requeridos y envía', () => {
    render(<Contacto />)
    window.alert = vi.fn()

    // envía vacío => debe alertar algo
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }))
    expect(window.alert).toHaveBeenCalled()

    // completa y envía
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Ana' } })
    fireEvent.change(screen.getByLabelText(/Correo/i), { target: { value: 'ana@test.cl' } })
    fireEvent.change(screen.getByLabelText(/Mensaje/i), { target: { value: 'Hola' } })
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }))

    expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/Gracias|pronto/i))
  })
})
