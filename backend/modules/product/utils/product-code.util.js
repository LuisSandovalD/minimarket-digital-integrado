// ========================================
// utils/product-code.util.js
// ========================================

function generateSKU(
  name,
  total,
) {

  const prefix =
    name
      .trim()
      .substring(0, 3)
      .toUpperCase();

  const number =
    String(total + 1)
      .padStart(5, "0");

  return `${prefix}-${number}`;

}

module.exports = {
  generateSKU,
};
