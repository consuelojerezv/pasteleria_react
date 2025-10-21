import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import DetalleProducto from './DetalleProducto'
import { getCart, clearCart } from '../lib/cart'

describe('DetalleProducto', () => {
  beforeEach(() => clearCart())

  const renderWithRoute = (id='TC001') =>
    render(
      <MemoryRouter initialEntries={[`/producto/${id}`]}>
        <Routes>
          <Route path="/producto/:id" element={<DetalleProducto />} />
        </Routes>
      </MemoryRouter>
    )

  it('agrega item al carrito al hacer click', () => {
    window.alert = vi.fn()
    renderWithRoute()
    fireEvent.click(screen.getByRole('button', { name: /añadir al carrito/i }))
    expect(getCart()).toHaveLength(1)
  })
})
