// ========================================
// repositories/sale-create.repository.js
// ========================================

const prisma = require("../../../prisma/client");
const { saleInclude } = require("../includes/sale.include");

module.exports = {

  // ========================================
  // 1. CREATE SALE (Soporta Cliente Genérico o Registrado)
  // ========================================
  createSale: async (data, tx = prisma) => {
    // Limpiamos el customerId por si viene como string vacío, undefined o texto "null"
    const parsedCustomerId = data.customerId && data.customerId !== "null"
      ? Number(data.customerId)
      : null;

    return tx.sale.create({
      data: {
        saleNumber: data.saleNumber,
        subtotal: Number(data.subtotal),
        tax: Number(data.tax),
        total: Number(data.total),
        discount: Number(data.discount || 0),
        notes: data.notes || null,
        status: data.status || "COMPLETED", // 🔥 COMPLETED (contado) o CREDIT_PENDING (crédito)

        // Relaciones obligatorias de la auditoría de caja
        company: { connect: { id: Number(data.companyId) } },
        branch: { connect: { id: Number(data.branchId) } },
        seller: { connect: { id: Number(data.userId) } },

        // Relación Opcional: Si es una persona X con plata, no se conecta ningún cliente
        ...(parsedCustomerId && {
          customer: { connect: { id: parsedCustomerId } },
        }),
      },
      include: saleInclude,
    });
  },

  // ========================================
  // 2. CREATE MANY DETAILS (Optimizado para alto volumen)
  // ========================================
  createManyDetails: async (detailsArray, tx = prisma) => {
    // Mapeamos el arreglo asegurando que todos los tipos de datos numéricos sean estrictos
    const formattedDetails = detailsArray.map(detail => ({
      saleId: Number(detail.saleId),
      productId: Number(detail.productId),
      quantity: Number(detail.quantity),
      price: Number(detail.price),
      subtotal: Number(detail.subtotal),
      discount: Number(detail.discount || 0),
      tax: Number(detail.tax || 0),
      batchId: detail.batchId ? Number(detail.batchId) : null,
    }));

    return tx.saleDetail.createMany({
      data: formattedDetails,
    });
  },

  // ========================================
  // 3. CREATE MANY PAYMENTS (Soporta Cuotas, Iniciales y Contado)
  // ========================================
  createManyPayments: async (saleId, paymentsArray, tx = prisma) => {
    const formattedPayments = paymentsArray.map(payment => {
      const isCreditInstallment = payment.status === "PENDING";

      return {
        saleId: Number(saleId),
        amount: Number(payment.amount),
        remainingAmount: isCreditInstallment ? Number(payment.amount) : 0, // 🔥 Saldo pendiente inicial si es crédito
        status: payment.status || "COMPLETED",
        paymentMethod: Number(payment.paymentMethodId), // Convertido a entero para tu relación o enum int
        reference: payment.reference || null,
        notes: payment.notes || null,
        dueDate: payment.dueDate ? new Date(payment.dueDate) : null,
        paidAt: isCreditInstallment ? null : new Date(),
      };
    });

    return tx.payment.createMany({
      data: formattedPayments,
    });
  },

  // ========================================
  // 4. UPDATE CUSTOMER DEBT (Afecta Línea de Crédito)
  // ========================================
  updateCustomerDebt: async (customerId, amount, tx = prisma) => {
    if (!customerId) return null;

    return tx.customer.update({
      where: { id: Number(customerId) },
      data: { currentDebt: { increment: Number(amount) } }, // Incremeto seguro en la BD
    });
  },

  // ========================================
  // 5. UPDATE SALE
  // ========================================
  updateSale: async (id, data, tx = prisma) => {
    const parsedCustomerId = data.customerId && data.customerId !== "null"
      ? Number(data.customerId)
      : null;

    return tx.sale.update({
      where: { id: Number(id) },
      data: {
        subtotal: Number(data.subtotal),
        tax: Number(data.tax),
        total: Number(data.total),
        discount: Number(data.discount || 0),
        notes: data.notes || null,
        customerId: parsedCustomerId, // Permite desvincular o cambiar el cliente en una edición
      },
      include: saleInclude,
    });
  },
};
