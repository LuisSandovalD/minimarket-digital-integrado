// ========================================
// services/create-purchase.service.js
// ========================================

const prisma =
  require("../../../prisma/client");

const {
  calculatePurchase
} = require("../helpers/calculate-purchase.helper");

const {
  generatePurchaseNumber
} = require("../helpers/generate-purchase-number.helper");

const {
  getDefaultPurchaseStatus
} = require("../helpers/purchase-status.helper");

const {
  purchaseInclude
} = require("../includes/purchase.include");

async function createPurchaseService(body) {

  // ========================================
  // VALIDAR PRODUCTOS DUPLICADOS
  // ========================================

  const productIds =
    body.details.map(
      item => item.productId
    );

  const duplicatedProducts =
    productIds.some(
      (id, index) =>
        productIds.indexOf(id) !== index
    );

  if (duplicatedProducts) {

    throw new Error(
      "Hay productos repetidos en la compra"
    );

  }

  // ========================================
  // CALCULAR TOTALES
  // ========================================

  const calculations =
    calculatePurchase(
      body.details
    );

  // ========================================
  // GENERAR DATOS
  // ========================================

  const purchaseNumber =
    await generatePurchaseNumber();

  const status =
    getDefaultPurchaseStatus();

  // ========================================
  // TRANSACTION
  // ========================================

  return prisma.$transaction(
    async (tx) => {

      // ========================================
      // VALIDAR SUCURSAL
      // ========================================

      const branch =
        await tx.branch.findFirst({

          where: {

            id:
              body.branchId,

            companyId:
              body.companyId

          }

        });

      if (!branch) {

        throw new Error(
          "La sucursal no pertenece a la empresa"
        );

      }

      // ========================================
      // VALIDAR SUPPLIER
      // ========================================

      if (body.supplierId) {

        const supplier =
          await tx.supplier.findFirst({

            where: {

              id:
                body.supplierId,

              companyId:
                body.companyId

            }

          });

        if (!supplier) {

          throw new Error(
            "Proveedor inválido"
          );

        }

      }

      // ========================================
      // VALIDAR PRODUCTOS
      // ========================================

      const products =
        await tx.product.findMany({

          where: {

            id: {
              in: productIds
            },

            companyId:
              body.companyId

          },

          select: {
            id: true
          }

        });

      if (
        products.length !==
        productIds.length
      ) {

        throw new Error(
          "Uno o más productos no existen o no pertenecen a la empresa"
        );

      }

      // ========================================
      // CREAR COMPRA
      // ========================================

      const purchase =
        await tx.purchase.create({

          data: {

            purchaseNumber,

            subtotal:
              calculations.subtotal,

            tax:
              calculations.tax,

            total:
              calculations.total,

            discount: 0,

            status,

            notes:
              body.notes || null,

            expectedDelivery:
              body.expectedDelivery || null,

            supplierId:
              body.supplierId || null,

            buyerId:
              body.buyerId,

            branchId:
              body.branchId,

            companyId:
              body.companyId,

            details: {

  create:
    calculations.items.map(
      item => ({

        productId:
          item.productId,

        quantity:
          item.quantity,

        price:
          item.costPrice,

        subtotal:
          item.subtotal,

        tax: 0

      })
    )

}
          },

          include:
            purchaseInclude

        });

      // ========================================
      // ACTUALIZAR INVENTARIO
      // ========================================

      for (
        const item
        of calculations.items
      ) {

        // ========================================
        // UPSERT INVENTORY
        // ========================================

        const inventory =
          await tx.inventory.upsert({

            where: {

              productId_branchId: {

                productId:
                  item.productId,

                branchId:
                  body.branchId

              }

            },

            update: {

              stock: {

                increment:
                  item.quantity

              }

            },

            create: {

              productId:
                item.productId,

              branchId:
                body.branchId,

              companyId:
                body.companyId,

              stock:
                item.quantity

            }

          });

        // ========================================
        // STOCKS
        // ========================================

        const newStock =
          inventory.stock;

        const previousStock =
          newStock - item.quantity;

        // ========================================
        // INVENTORY HISTORY
        // ========================================

        await tx.inventoryHistory.create({

          data: {

            inventoryId:
              inventory.id,

            productId:
              item.productId,

            branchId:
              body.branchId,

            companyId:
              body.companyId,

            type:
              "PURCHASE",

            quantity:
              item.quantity,

            previousStock,

            newStock,

            reason:
              `Compra ${purchaseNumber}`

          }

        });

      }

      return purchase;

    }
  );

}

module.exports = {
  createPurchaseService
};