// ========================================
// helpers/sale-status.helper.js
// ========================================

module.exports = {

  // ========================================
  // SALE STATUS
  // ========================================

  SALE_STATUS: {

    PENDING:
      "PENDING",

    COMPLETED:
      "COMPLETED",

    CANCELLED:
      "CANCELLED",

    REFUNDED:
      "REFUNDED",

  },

  // ========================================
  // DEFAULT STATUS
  // ========================================

  getDefaultSaleStatus:
    () => {

      return "COMPLETED";

    },

  // ========================================
  // VALIDATE STATUS
  // ========================================

  isValidSaleStatus:
    (status) => {

      return [

        "PENDING",
        "COMPLETED",
        "CANCELLED",
        "REFUNDED",

      ].includes(status);

    },

};
