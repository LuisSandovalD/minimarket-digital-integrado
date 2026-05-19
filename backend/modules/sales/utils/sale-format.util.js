// ========================================
// utils/sale-format.util.js
// ========================================

// ========================================
// FORMAT CURRENCY
// ========================================

exports.formatCurrency =
  (
    amount,
    currency = "PEN"
  ) => {

    return new Intl.NumberFormat(
      "es-PE",
      {

        style:
          "currency",

        currency,
      }
    ).format(amount);

  };

// ========================================
// FORMAT DATE
// ========================================

exports.formatDate =
  (
    date
  ) => {

    return new Intl.DateTimeFormat(
      "es-PE",
      {

        year:
          "numeric",

        month:
          "2-digit",

        day:
          "2-digit",

        hour:
          "2-digit",

        minute:
          "2-digit",
      }
    ).format(
      new Date(date)
    );

  };

// ========================================
// FORMAT PERCENTAGE
// ========================================

exports.formatPercentage =
  (
    value
  ) => {

    return `${Number(
      value
    ).toFixed(2)}%`;

  };