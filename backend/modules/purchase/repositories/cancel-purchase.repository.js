const prisma =
  require("../../../prisma/client");

async function cancelPurchaseRepository(id, status) {

  return prisma.purchase.update({

    where: {
      id
    },

    data: {
      status
    }

  });

}

module.exports = {
  cancelPurchaseRepository
};