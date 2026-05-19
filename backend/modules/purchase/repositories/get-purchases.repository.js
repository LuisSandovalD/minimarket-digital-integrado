const prisma =
  require("../../../prisma/client");

const {
  purchaseInclude
} = require("../includes/purchase.include");

async function getPurchasesRepository() {

  return prisma.purchase.findMany({

    include: purchaseInclude,

    orderBy: {
      createdAt: "desc"
    }

  });

}

module.exports = {
  getPurchasesRepository
};