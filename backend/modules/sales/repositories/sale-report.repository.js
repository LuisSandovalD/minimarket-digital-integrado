// ========================================
// repositories/sale-report.repository.js
// ========================================

const prisma = require("../../../prisma/client");

module.exports = {

  // ========================================
  // DAILY SALES
  // ========================================

  getDailySales: async (
    companyId,
    startDate,
    endDate
  ) => {

    const where = {
      status: {
        not: "CANCELLED",
      },
    };

    if (
      startDate &&
      !isNaN(new Date(startDate).getTime())
    ) {
      where.createdAt = {
        ...(where.createdAt || {}),
        gte: new Date(startDate),
      };
    }

    if (
      endDate &&
      !isNaN(new Date(endDate).getTime())
    ) {
      where.createdAt = {
        ...(where.createdAt || {}),
        lte: new Date(endDate),
      };
    }

    if (
      companyId !== undefined &&
      companyId !== null &&
      companyId !== ""
    ) {
      where.companyId = Number(companyId);
    }

    return prisma.sale.findMany({

      where,

      orderBy: {
        createdAt: "desc",
      },

      include: {

        customer: {
          select: {
            id: true,
            name: true,
            documentNumber: true,
            phone: true,
          },
        },

        details: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                sku: true,
              },
            },
          },
        },

        seller: {
          select: {
            id: true,
            name: true,
          },
        },

        branch: {
          select: {
            id: true,
            name: true,
          },
        },

      },

    });

  },

  // ========================================
  // TOP PRODUCTS
  // ========================================

  getTopProducts: async (
    companyId
  ) => {

    const where = {};

    if (
      companyId !== undefined &&
      companyId !== null &&
      companyId !== ""
    ) {
      where.sale = {
        companyId: Number(companyId),
      };
    }

    const rows =
      await prisma.saleDetail.groupBy({

        by: ["productId"],

        where,

        _sum: {
          quantity: true,
          subtotal: true,
        },

        orderBy: {
          _sum: {
            quantity: "desc",
          },
        },

        take: 10,

      });

    const products =
      await prisma.product.findMany({

        where: {
          id: {
            in: rows.map(
              (r) => r.productId
            ),
          },
        },

        select: {
          id: true,
          name: true,
          sku: true,
        },

      });

    return rows.map((row) => {

      const product =
        products.find(
          (p) =>
            p.id === row.productId
        );

      return {

        productId: row.productId,

        productName:
          product?.name || "Sin nombre",

        sku:
          product?.sku || "",

        quantity:
          Number(
            row._sum.quantity || 0
          ),

        total:
          Number(
            row._sum.subtotal || 0
          ),

      };

    });

  },

};