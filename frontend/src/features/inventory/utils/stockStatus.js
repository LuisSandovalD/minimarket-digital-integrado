export const getStockStatus = (stock, minStock = 5) => {
  if (stock <= 0) {
    return {
      label: "Sin stock",
      color: "bg-red-100 text-red-700",
    };
  }

  if (stock <= minStock) {
    return {
      label: "Stock bajo",
      color: "bg-yellow-100 text-yellow-700",
    };
  }

  return {
    label: "Disponible",
    color: "bg-green-100 text-green-700",
  };
};
