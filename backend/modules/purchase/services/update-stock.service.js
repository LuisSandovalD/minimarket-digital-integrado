const prisma =
  require("../../../prisma/client");

async function updateStockService(
  productId,
  branchId,
  quantity,
) {

  return prisma.inventory.updateMany({

    where: {
      productId,
      branchId,
    },

    data: {

      stock: {
        increment: quantity,
      },

    },

  });

}

module.exports = {
  updateStockService,
};
