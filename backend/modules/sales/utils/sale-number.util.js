// ========================================
// utils/sale-number.util.js
// ========================================

// ========================================
// GENERATE SALE NUMBER
// ========================================

exports.generateSaleNumber =
  (
    prefix = "SALE"
  ) => {

    const date =
      new Date();

    const year =
      date.getFullYear();

    const month =
      String(
        date.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        date.getDate()
      ).padStart(2, "0");

    const random =
      Math.floor(
        1000 +
        Math.random() * 9000
      );

    return `${prefix}-${year}${month}${day}-${random}`;

  };

// ========================================
// GENERATE INVOICE NUMBER
// ========================================

exports.generateInvoiceNumber =
  (
    series = "F001",
    correlative = 1
  ) => {

    return `${series}-${String(
      correlative
    ).padStart(6, "0")}`;

  };