import { getCart, setCart, addItem, clearCart, cartTotal } from './cart'

describe('cart utils', () => {
  beforeEach(() => localStorage.clear())

  it('addItem acumula cantidades por id', () => {
    addItem({ id_producto:'A', nombre:'Torta', precio:1000, cantidad:1 })
    addItem({ id_producto:'A', nombre:'Torta', precio:1000, cantidad:2 })
    const c = getCart()
    expect(c).toHaveLength(1)
    expect(c[0].cantidad).toBe(3)
  })

  it('cartTotal calcula el total', () => {
    setCart([{ id_producto:'A', precio:500, cantidad:2 }, { id_producto:'B', precio:200, cantidad:3 }])
    expect(cartTotal()).toBe(500*2 + 200*3)
  })

  it('clearCart limpia el storage', () => {
    setCart([{ id_producto:'X', precio:1, cantidad:1 }])
    clearCart()
    expect(getCart()).toEqual([])
  })
})
