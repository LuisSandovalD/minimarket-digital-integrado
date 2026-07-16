// ========================================
// utils/formatter.js
// ========================================

const currency = (value) => {

  if (
    value === null ||
        value === undefined
  ) {
    return "S/ 0.00";
  }

  return new Intl.NumberFormat(
    "es-PE",
    {
      style: "currency",
      currency: "PEN",
    },
  ).format(Number(value));
};

const percent = (value) => {

  return `${Number(value).toFixed(2)}%`;
};

module.exports = {
  currency,
  percent,
};
