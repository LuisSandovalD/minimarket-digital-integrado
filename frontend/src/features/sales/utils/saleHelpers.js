// ========================================
// UTILS / SALES / CALCULATIONS
// ========================================

/**
 * Formatea un valor numérico a la moneda nacional peruana (Soles - PEN)
 * @param {Number|String} value - Monto a formatear
 * @returns {String} Valor formateado, ej: "S/ 125.00"
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(Number(value || 0));
};

/**
 * Calcula el subtotal neto sumando el producto de cantidades y precios unitarios
 * 🟢 Corregido: Ahora lee 'price' tal como viene del backend
 * @param {Array} details - Listado de ítems en el carrito
 * @returns {Number} Subtotal exacto con un máximo de 2 decimales
 */
export const calculateSubtotal = (details = []) => {
  const rawSubtotal = details.reduce(
    (acc, item) => acc + Number(item.quantity || 0) * Number(item.price || item.unitPrice || 0),
    0,
  );
  // Redondeamos preventivamente a 2 decimales para evitar ruido de flotantes
  return Math.round(rawSubtotal * 100) / 100;
};

/**
 * Calcula el valor del impuesto (IGV 18%) a partir del subtotal
 * @param {Number} subtotal - Subtotal neto de la venta
 * @returns {Number} Impuesto exacto redondeado a 2 decimales
 */
export const calculateTax = (subtotal) => {
  return Math.round(subtotal * 0.18 * 100) / 100;
};

/**
 * Calcula el total bruto sumando el subtotal y su impuesto respectivo
 * @param {Number} subtotal
 * @param {Number} tax
 * @returns {Number} Total de la venta redondeado a 2 decimales
 */
export const calculateTotal = (subtotal, tax) => {
  return Math.round((subtotal + tax) * 100) / 100;
};
