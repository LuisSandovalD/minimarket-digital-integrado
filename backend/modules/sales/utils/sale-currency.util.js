// ========================================
// utils/sale-currency.util.js
// ========================================

// ========================================
// ROUND DECIMAL
// ========================================

exports.roundDecimal =
  (
    value,
  ) => {

    return Number(
      parseFloat(value)
        .toFixed(2),
    );

  };

// ========================================
// CALCULATE TAX
// ========================================

exports.calculateTax =
  (
    subtotal,
    taxRate = 18,
  ) => {

    return (
      subtotal *
      (taxRate / 100)
    );

  };

// ========================================
// CALCULATE TOTAL
// ========================================

exports.calculateTotal =
  (
    subtotal,
    tax,
    discount = 0,
  ) => {

    return (
      subtotal +
      tax -
      discount
    );

  };

// ========================================
// APPLY DISCOUNT
// ========================================

exports.applyDiscount =
  (
    amount,
    discount,
  ) => {

    return (
      amount -
      discount
    );

  };
