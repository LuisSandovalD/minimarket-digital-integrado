// ========================================
// services/inventory-transfer.service.js
// ========================================

const prisma =
  require("../../../prisma/client");

// ========================================
// TRANSFER STOCK
// ========================================

exports.transferStock =
  async (
    originInventoryId,
    targetInventoryId,
    quantity,
    userId,
  ) => {

    return prisma.$transaction(

      async (tx) => {

        const originInventory =
          await tx.inventory.findUnique({

            where: {
              id: originInventoryId,
            },
          });

        const targetInventory =
          await tx.inventory.findUnique({

            where: {
              id: targetInventoryId,
            },
          });

        if (
          !originInventory ||
          !targetInventory
        ) {

          throw new Error(
            "Inventario inválido",
          );

        }

        if (
          originInventory.stock <
          quantity
        ) {

          throw new Error(
            "Stock insuficiente",
          );

        }

        await tx.inventory.update({

          where: {
            id: originInventoryId,
          },

          data: {

            stock: {
              decrement: quantity,
            },
          },
        });

        await tx.inventory.update({

          where: {
            id: targetInventoryId,
          },

          data: {

            stock: {
              increment: quantity,
            },
          },
        });

        await tx.inventoryHistory.create({

          data: {

            type:
              "TRANSFER_OUT",

            quantity,

            previousStock:
              originInventory.stock,

            newStock:
              originInventory.stock -
              quantity,

            reason:
              "Transferencia salida",

            inventoryId:
              originInventory.id,

            productId:
              originInventory.productId,

            branchId:
              originInventory.branchId,

            companyId:
              originInventory.companyId,

            userId,
          },
        });

        await tx.inventoryHistory.create({

          data: {

            type:
              "TRANSFER_IN",

            quantity,

            previousStock:
              targetInventory.stock,

            newStock:
              targetInventory.stock +
              quantity,

            reason:
              "Transferencia ingreso",

            inventoryId:
              targetInventory.id,

            productId:
              targetInventory.productId,

            branchId:
              targetInventory.branchId,

            companyId:
              targetInventory.companyId,

            userId,
          },
        });

        return {
          success: true,
        };

      },

    );

  };
