export const formatCurrency = (value) => {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(Number(value || 0));
};

export const calculateSubtotal = (details = []) => {
  return details.reduce(
    (acc, item) =>
      acc + Number(item.quantity || 0) * Number(item.unitPrice || 0),
    0,
  );
};

export const calculateTax = (subtotal) => {
  return subtotal * 0.18;
};

export const calculateTotal = (subtotal, tax) => {
  return subtotal + tax;
};
