const {
  calculateTax
} = require("./calculate-tax.helper");

function calculatePurchase(details = []) {

  let subtotal = 0;

  const items = details.map(item => {

    const quantity =
      Number(item.quantity);

    const costPrice =
      Number(item.costPrice);

    const itemSubtotal =
      quantity * costPrice;

    subtotal += itemSubtotal;

    return {

      productId: item.productId,

      quantity,

      costPrice,

      subtotal: Number(
        itemSubtotal.toFixed(2)
      )

    };

  });

  const tax =
    calculateTax(subtotal);

  const total =
    subtotal + tax;

  return {

    subtotal: Number(
      subtotal.toFixed(2)
    ),

    tax,

    total: Number(
      total.toFixed(2)
    ),

    items

  };

}

module.exports = {
  calculatePurchase
};