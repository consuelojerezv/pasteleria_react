import { render, screen } from '@testing-library/react'
import Home from './Home'

describe('Home', () => {
  it('renderiza título principal', () => {
    render(<Home />)
    expect(
      screen.getByText(/Pastelería Mil Sabores/i)
    ).toBeInTheDocument()
  })

  it('tiene acción para ver novedades o productos', () => {
    render(<Home />)
    const link = screen.getByRole('link', { name: /ver/i })
    expect(link).toBeInTheDocument()
  })
})
