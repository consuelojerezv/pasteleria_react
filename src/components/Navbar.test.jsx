import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'

const renderNav = () => render(
  <MemoryRouter>
    <Navbar />
  </MemoryRouter>
)

describe('Navbar', () => {
  beforeEach(() => localStorage.clear())

  it('muestra enlaces básicos', () => {
    renderNav()
    expect(screen.getByText(/Inicio/i)).toBeInTheDocument()
    expect(screen.getByText(/Blog/i)).toBeInTheDocument()
    expect(screen.getByText(/Contacto/i)).toBeInTheDocument()
  })

  it('muestra login/registro cuando no hay sesión', () => {
    renderNav()
    expect(screen.getByText(/Ingresar/i)).toBeInTheDocument()
    expect(screen.getByText(/Registrarse/i)).toBeInTheDocument()
  })

  it('muestra saludo cuando hay usuarioActual', () => {
    localStorage.setItem('usuarioActual', JSON.stringify({ nombre: 'Consuelo Jerez' }))
    renderNav()
    expect(screen.getByText(/Hola, Consuelo/i)).toBeInTheDocument()
  })
})
