// ========================================
// repositories/sale-payment.repository.js
// ========================================

const prisma = require("../../../prisma/client");

// ========================================
// CREATE SINGLE PAYMENT
// ========================================
const createPayment = async (data, tx = prisma) => {
  return tx.payment.create({
    data: {
      saleId: data.saleId ? Number(data.saleId) : null,
      paymentMethod: data.paymentMethodId ? Number(data.paymentMethodId) : Number(data.payment || 1),
      amount: Number(data.amount),
      status: data.status || "PENDING",
      reference: data.reference || null,
      notes: data.notes || null,
      transactionId: data.transactionId || null,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      paidAt: data.status === "PENDING" ? null : new Date(),
    }
  });
};

// ========================================
// CREATE MANY PAYMENTS
// ========================================
const createManyPayments = async (saleId, payments = [], tx = prisma) => {
  if (!payments || payments.length === 0) return [];

  const formattedPayments = payments.map((payment) => {
    const isPending = payment.status === "PENDING";

    return {
      saleId: Number(saleId),
      paymentMethod: payment.paymentMethodId ? Number(payment.paymentMethodId) : Number(payment.payment || 1),
      amount: Number(payment.amount),
      status: payment.status || "PENDING",
      reference: payment.reference || null,
      notes: payment.notes || null,
      transactionId: payment.transactionId || null,
      dueDate: payment.dueDate ? new Date(payment.dueDate) : null,
      paidAt: isPending ? null : new Date(),
    };
  });

  await tx.payment.createMany({
    data: formattedPayments,
  });

  return tx.payment.findMany({
    where: { saleId: Number(saleId) }
  });
};

// ========================================
// GET PAYMENTS BY SALE
// ========================================
const getSalePayments = async (saleId) => {
  return prisma.payment.findMany({
    where: {
      saleId: Number(saleId),
    },
    include: {
      paymentMethod_DB: true,
    },
    orderBy: {
      id: "desc",
    },
  });
};

// ========================================
// UPDATE PAYMENT STATUS
// ========================================
const updatePaymentStatus = async (id, status, tx = prisma) => {
  const isCompleted = status === "COMPLETED";

  return tx.payment.update({
    where: {
      id: Number(id),
    },
    data: {
      status: status,
      paidAt: isCompleted ? new Date() : null,
    },
  });
};

// ========================================
// DELETE PAYMENTS BY SALE
// ========================================
const deletePaymentsBySale = async (saleId, tx = prisma) => {
  return tx.payment.deleteMany({
    where: {
      saleId: Number(saleId),
    },
  });
};

// ========================================
// EXPORTS (Patrón de Constantes Independientes)
// ========================================
module.exports = {
  createPayment,
  createManyPayments,
  getSalePayments,
  updatePaymentStatus,
  deletePaymentsBySale,
};