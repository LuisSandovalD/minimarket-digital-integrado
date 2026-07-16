// ========================================
// utils/sale-ticket.util.js
// ========================================

const {
  formatCurrency,
  formatDate,
} = require(
  "./sale-format.util",
);

// ========================================
// GENERATE TICKET
// ========================================

exports.generateTicket =
  (
    sale,
  ) => {

    let ticket = "";

    ticket +=
      "=================================\n";

    ticket +=
      "        COMPROBANTE\n";

    ticket +=
      "=================================\n\n";

    ticket +=
      `N°: ${sale.saleNumber}\n`;

    ticket +=
      `Fecha: ${formatDate(
        sale.createdAt,
      )}\n`;

    ticket +=
      `Cliente: ${
        sale.customerName ||
        "Cliente General"
      }\n\n`;

    ticket +=
      "---------------------------------\n";

    sale.details.forEach(
      (detail) => {

        ticket +=
          `${detail.product.name}\n`;

        ticket +=
          `${detail.quantity} x ${formatCurrency(
            detail.price,
          )}\n`;

        ticket +=
          `${formatCurrency(
            detail.subtotal,
          )}\n\n`;

      },
    );

    ticket +=
      "---------------------------------\n";

    ticket +=
      `Subtotal: ${formatCurrency(
        sale.subtotal,
      )}\n`;

    ticket +=
      `IGV: ${formatCurrency(
        sale.tax,
      )}\n`;

    ticket +=
      `Descuento: ${formatCurrency(
        sale.discount,
      )}\n`;

    ticket +=
      `TOTAL: ${formatCurrency(
        sale.total,
      )}\n`;

    ticket +=
      "=================================\n";

    return ticket;

  };
