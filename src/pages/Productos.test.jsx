import { render, screen } from '@testing-library/react'
import Productos from './Productos'

describe('Productos', () => {
  it('renderiza la sección de productos', () => {
    render(<Productos />)
    // Busca un título típico o un elemento de tarjeta
    const ok =
      screen.queryByText(/productos/i) ||
      screen.queryAllByRole('img').length > 0 ||
      screen.queryAllByText(/añadir/i).length > 0
    expect(Boolean(ok)).toBe(true)
  })
})
