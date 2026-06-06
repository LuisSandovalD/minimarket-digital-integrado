// ========================================
// repositories/sale-payment.repository.js
// ========================================

const prisma = require("../../../prisma/client");

module.exports = {

  // ========================================
  // CREATE PAYMENT
  // ========================================

  createPayment: async (
    data,
    tx = prisma
  ) => {

    return await tx.payment.create({
      data,
    });

  },

  // ========================================
  // CREATE MANY PAYMENTS
  // ========================================

  createManyPayments: async (
    saleId,
    payments = [],
    tx = prisma
  ) => {

    const createdPayments = [];

    for (const payment of payments) {

      const createdPayment =
        await tx.payment.create({

          data: {

            sale: {
              connect: {
                id: saleId,
              },
            },

            method: {
              connect: {
                id: Number(
                  payment.paymentMethodId
                ),
              },
            },

            amount:
              Number(payment.amount),

            reference:
              payment.reference || null,

            status:
              "COMPLETED",

          },

        });

      createdPayments.push(
        createdPayment
      );

    }

    return createdPayments;

  },
  // ========================================
  // GET PAYMENTS
  // ========================================

  getSalePayments: async (
    saleId
  ) => {

    return prisma.payment.findMany({

      where: {
        saleId,
      },

      include: {
        method: true,
      },

      orderBy: {
        createdAt: "desc",
      },

    });

  },

  // ========================================
  // UPDATE PAYMENT STATUS
  // ========================================

  updatePaymentStatus: async (
    id,
    status,
    tx = prisma
  ) => {

    return await tx.payment.update({

      where: {
        id,
      },

      data: {
        status,
      },

    });

  },

};