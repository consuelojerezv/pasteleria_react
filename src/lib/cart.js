const KEY = "carrito";

export const getCart = () => JSON.parse(localStorage.getItem(KEY)) || [];
export const setCart = (c) => localStorage.setItem(KEY, JSON.stringify(c));
export const countUnits = () => getCart().reduce((s, it) => s + it.cantidad, 0);

export const addItem = (item) => {
  const cart = getCart();
  const i = cart.findIndex(x => x.id_producto === item.id_producto);
  if (i >= 0) cart[i].cantidad += item.cantidad;
  else cart.push(item);
  setCart(cart);
  window.dispatchEvent(new StorageEvent("storage"));
};

export const removeItem = (id) => {
  setCart(getCart().filter(x => x.id_producto !== id));
  window.dispatchEvent(new StorageEvent("storage"));
};

export const clearCart = () => {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new StorageEvent("storage"));
};

export const cartTotal = () =>
  getCart().reduce((t, it) => t + it.precio * it.cantidad, 0);
