// ========================================
// helpers/inventory-alert.helper.js
// ========================================

// ========================================
// NORMALIZE DATE
// ========================================

const normalizeDate =
  (date) => {

    const normalized =
      new Date(date);

    normalized.setHours(
      0,
      0,
      0,
      0
    );

    return normalized;

  };

// ========================================
// EXPIRING SOON
// ========================================

exports.isExpiringSoon =
  (
    expirationDate,
    days = 30
  ) => {

    if (!expirationDate) {

      return false;

    }

    const today =
      normalizeDate(
        new Date()
      );

    const limitDate =
      normalizeDate(
        new Date()
      );

    limitDate.setDate(
      today.getDate() + days
    );

    const expiration =
      normalizeDate(
        expirationDate
      );

    return (
      expiration <= limitDate
    );

  };

// ========================================
// EXPIRED
// ========================================

exports.isExpired =
  (
    expirationDate
  ) => {

    if (!expirationDate) {

      return false;

    }

    const expiration =
      normalizeDate(
        expirationDate
      );

    const today =
      normalizeDate(
        new Date()
      );

    return expiration < today;

  };

// ========================================
// LOW STOCK ALERT
// ========================================

exports.buildLowStockAlert =
  (
    product
  ) => {

    return {

      title:
        "Stock Bajo",

      message:
        `El producto ${product.name} tiene stock bajo`,

      type:
        "LOW_STOCK",
    };

  };

// ========================================
// EXPIRING ALERT
// ========================================

exports.buildExpiringAlert =
  (
    product
  ) => {

    return {

      title:
        "Producto por vencer",

      message:
        `El producto ${product.name} está próximo a vencer`,

      type:
        "EXPIRING_PRODUCT",
    };

  };

// ========================================
// DAMAGED STOCK ALERT
// ========================================

exports.buildDamagedAlert =
  (
    product,
    quantity
  ) => {

    return {

      title:
        "Producto Dañado",

      message:
        `${quantity} unidades de ${product.name} fueron marcadas como dañadas`,

      type:
        "INVENTORY_MISMATCH",
    };

  };