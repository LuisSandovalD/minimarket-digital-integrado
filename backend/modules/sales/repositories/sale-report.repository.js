const prisma = require("../../../prisma/client");

module.exports = {
  // ========================================
  // DAILY SALES
  // ========================================
  getDailySales: async (companyId, startDate, endDate) => {
    const where = {
      status: {
        not: "CANCELLED",
      },
    };

    if (startDate && !isNaN(new Date(startDate).getTime())) {
      where.createdAt = {
        ...(where.createdAt || {}),
        gte: new Date(startDate),
      };
    }

    if (endDate && !isNaN(new Date(endDate).getTime())) {
      where.createdAt = {
        ...(where.createdAt || {}),
        lte: new Date(endDate),
      };
    }

    if (companyId !== undefined && companyId !== null && companyId !== "") {
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
  getTopProducts: async (companyId) => {
    const where = {};

    if (companyId !== undefined && companyId !== null && companyId !== "") {
      const parsedCompanyId = parseInt(companyId, 10);

      if (!isNaN(parsedCompanyId)) {
        // 🛠️ CORRECCIÓN: En Prisma, para filtrar relaciones N:1 en un query directo o groupBy,
        // se accede al objeto relacional de forma directa, NO usando 'is'.
        where.sale = {
          companyId: parsedCompanyId,
        };
      }
    }

    // Ejecutamos la agrupación de los detalles de venta
    const rows = await prisma.saleDetail.groupBy({
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

    if (rows.length === 0) return [];

    // Traemos los datos de los productos implicados
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: rows.map((r) => r.productId),
        },
      },
      select: {
        id: true,
        name: true,
        sku: true,
      },
    });

    // Mapeamos y estructuramos la respuesta final
    return rows.map((row) => {
      const product = products.find((p) => p.id === row.productId);

      return {
        productId: row.productId,
        productName: product?.name || "Sin nombre",
        sku: product?.sku || "",
        quantity: Number(row._sum.quantity || 0),
        total: Number(row._sum.subtotal || 0),
      };
    });
  },
};