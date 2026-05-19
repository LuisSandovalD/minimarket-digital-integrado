exports.generateSaleNumber = () => {

  return `SALE-${Date.now()}`;

};

exports.generatePurchaseNumber = () => {

  return `PUR-${Date.now()}`;

};

exports.calculateTax = (
  subtotal,
  taxRate = 18
) => {

  return (subtotal * taxRate) / 100;

};

exports.calculateDiscount = (
  subtotal,
  discount
) => {

  return subtotal - discount;

};

exports.generateSlug = (text) => {

  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

};