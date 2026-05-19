const prisma =
  require("../../../prisma/client");

const {
  purchaseInclude
} = require("../includes/purchase.include");

async function getPurchaseByIdRepository(id) {

  return prisma.purchase.findUnique({

    where: {
      id
    },

    include: purchaseInclude

  });

}

module.exports = {
  getPurchaseByIdRepository
};