const prisma =
  require("../../../prisma/client");

async function updatePurchaseRepository(id, data) {

  return prisma.purchase.update({

    where: {
      id
    },

    data

  });

}

module.exports = {
  updatePurchaseRepository
};