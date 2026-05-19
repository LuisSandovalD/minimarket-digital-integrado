// ========================================
// FORMAT PRICE
// ========================================

export const formatPrice = (
  value = 0
) => {

  return new Intl.NumberFormat(
    "es-PE",
    {
      style: "currency",
      currency: "PEN",
    }
  ).format(Number(value));

};

// ========================================
// FORMAT STOCK
// ========================================

export const formatStock = (
  stock = 0
) => {

  return Number(stock)
    .toLocaleString("es-PE");

};

// ========================================
// FORMAT DATE
// ========================================

export const formatDate = (
  date
) => {

  if (!date) return "-";

  return new Date(date)
    .toLocaleDateString(
      "es-PE",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );

};