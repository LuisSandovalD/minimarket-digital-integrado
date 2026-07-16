// ========================================
// modules/sales/repositories/sale-invoice.repository.js
// ========================================

const prisma = require("../../../prisma/client");

module.exports = {

  // ========================================
  // GENERATE CORRELATIVO SEGURO Y CONSECUTIVO
  // ========================================
  generateInvoiceNumber: async (companyId, invoiceType, tx = prisma) => {
    const prefix = invoiceType === "FACTURA" ? "F001" : "B001";

    // 1. Buscamos la última factura emitida de ese tipo para esa empresa
    const lastInvoice = await tx.invoice.findFirst({
      where: {
        companyId: Number(companyId),
        invoiceNumber: { startsWith: prefix },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        invoiceNumber: true,
      },
    });

    // 2. Si no hay ninguna, empezamos en 1, de lo contrario sumamos +1 al número actual
    let nextNumber = 1;
    if (lastInvoice && lastInvoice.invoiceNumber) {
      // Separamos "F001-0000054" -> "0000054" -> 54
      const currentCorrelative = lastInvoice.invoiceNumber.split("-")[1];
      nextNumber = parseInt(currentCorrelative, 10) + 1;
    }

    // 3. Formateamos rellenando con ceros a la izquierda (ej: "F001-0000055")
    const formattedCorrelative = String(nextNumber).padStart(7, "0");
    return `${prefix}-${formattedCorrelative}`;
  },

  // ========================================
  // PERSISTIR LA FACTURA EN BASE DE DATOS
  // ========================================
  createInvoice: async (invoiceData, tx = prisma) => {
    // 🔥 Guardado real y atómico dentro de la transacción de la venta
    return tx.invoice.create({
      data: {
        saleId: Number(invoiceData.saleId),
        companyId: Number(invoiceData.companyId),
        invoiceNumber: invoiceData.invoiceNumber,
        type: invoiceData.type, // "FACTURA" o "BOLETA"
        total: Number(invoiceData.total),
        status: "PENDING_SEND", // Estado para saber si ya se mandó a la entidad fiscal
      },
    });
  },
};
