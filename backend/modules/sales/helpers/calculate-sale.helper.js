// ========================================
// helpers/calculate-sale.helper.js
// ========================================

module.exports = {

  // ========================================
  // CALCULATE SALE
  // ========================================

  calculateSale:
    (
      details = [],
      discount = 0
    ) => {

      // ========================================
      // SUBTOTAL
      // ========================================

      const subtotal =
        details.reduce(
          (acc, item) => {

            return (
              acc +
              (
                Number(item.quantity || 0) *
                Number(item.price || 0)
              )
            );

          },
          0
        );

      // ========================================
      // DISCOUNT
      // ========================================

      const discountAmount =
        Number(discount || 0);

      // ========================================
      // TAXABLE
      // ========================================

      const taxable =
        subtotal - discountAmount;

      // ========================================
      // TAX
      // ========================================

      const tax =
        taxable * 0.18;

      // ========================================
      // TOTAL
      // ========================================

      const total =
        taxable + tax;

      return {

        subtotal:
          Number(
            subtotal.toFixed(2)
          ),

        discount:
          Number(
            discountAmount.toFixed(2)
          ),

        tax:
          Number(
            tax.toFixed(2)
          ),

        total:
          Number(
            total.toFixed(2)
          ),

      };

    },

};