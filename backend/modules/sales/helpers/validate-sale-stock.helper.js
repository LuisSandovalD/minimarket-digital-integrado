// ========================================
// helpers/validate-sale-stock.helper.js
// ========================================

const prisma =
  require("../../../prisma/client");

module.exports = {

  // ========================================
  // VALIDATE STOCK
  // ========================================

  validateSaleStock:
    async (details = []) => {

      for (const item of details) {

        const product =
          await prisma.product.findUnique({

            where: {
              id: item.productId,
            },

            select: {
              id: true,
              name: true,
              stock: true,
            },

          });

        // ========================================
        // PRODUCT EXISTS
        // ========================================

        if (!product) {

          throw new Error(
            `Producto ${item.productId} no encontrado`
          );

        }

        // ========================================
        // STOCK VALIDATION
        // ========================================

        if (
          Number(product.stock) <
          Number(item.quantity)
        ) {

          throw new Error(

            `Stock insuficiente para ${product.name}`

          );

        }

      }

      return true;

    },

};