// ========================================
// helpers/payment-status.helper.js
// ========================================

module.exports = {

  // ========================================
  // PAYMENT STATUS
  // ========================================

  PAYMENT_STATUS: {

    PENDING:
      "PENDING",

    PAID:
      "PAID",

    REFUNDED:
      "REFUNDED",

    FAILED:
      "FAILED",

  },

  // ========================================
  // DEFAULT STATUS
  // ========================================

  getDefaultPaymentStatus:
    () => {

      return "PAID";

    },

  // ========================================
  // VALIDATE STATUS
  // ========================================

  isValidPaymentStatus:
    (status) => {

      return [

        "PENDING",
        "PAID",
        "REFUNDED",
        "FAILED",

      ].includes(status);

    },

};