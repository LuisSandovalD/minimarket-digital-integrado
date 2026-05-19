const prisma =
  require("../../../prisma/client");

async function createPurchaseRepository(data) {

  return prisma.purchase.create({
    data
  });

}

module.exports = {
  createPurchaseRepository
};