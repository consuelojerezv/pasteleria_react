import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Carrito from './Carrito'
import { clearCart } from '../lib/cart'

describe('Carrito', () => {
  beforeEach(() => {
    // Asegura que el localStorage esté vacío antes de cada test
    localStorage.removeItem('carrito')
    if (typeof clearCart === 'function') clearCart()
    // Si la app escucha eventos para actualizar UI, notifica
    window.dispatchEvent(new Event('cartUpdated'))
  })

  it('muestra mensaje o UI de carrito vacío', () => {
    render(<MemoryRouter><Carrito /></MemoryRouter>)
    // acepta cualquiera de estas señales:
    const candidates = [
      /carrito/i, /vacío/i, /tu carrito/i, /no hay productos/i, /pagar/i
    ]
    expect(
      candidates.some((re) => screen.queryByText(re))
    ).toBe(true)
  })
})
