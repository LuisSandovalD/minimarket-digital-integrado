// ========================================
// services/inventory-alert.service.js
// ========================================

const prisma =
  require("../../../prisma/client");

// ========================================
// CHECK LOW STOCK
// ========================================

exports.checkLowStock =
  async (
    inventory
  ) => {

    const product =
      await prisma.product.findUnique({

        where: {
          id: inventory.productId,
        },
      });

    if (
      inventory.stock <=
      product.minStock
    ) {

      const admin =
        await prisma.user.findFirst({

          where: {

            companyId:
              product.companyId,

            role: "ADMIN",
          },
        });

      if (!admin) {
        return;
      }

      await prisma.notification.create({

        data: {

          title:
            "Stock Bajo",

          message:
            `El producto ${product.name} tiene stock bajo`,

          type:
            "LOW_STOCK",

          productId:
            product.id,

          companyId:
            product.companyId,

          userId:
            admin.id,
        },
      });

    }

  };

// ========================================
// CHECK EXPIRING PRODUCTS
// ========================================

exports.checkExpiringProducts =
  async (
    companyId
  ) => {

    const next30Days =
      new Date();

    next30Days.setDate(
      next30Days.getDate() + 30
    );

    return prisma.product.findMany({

      where: {

        companyId,

        expirationDate: {

          lte: next30Days,
        },

        requiresExpiration: true,
      },
    });

  };