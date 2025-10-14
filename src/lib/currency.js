export const fmtCLP = (n) =>
  "$" + new Intl.NumberFormat("es-CL").format(Math.round(n));
