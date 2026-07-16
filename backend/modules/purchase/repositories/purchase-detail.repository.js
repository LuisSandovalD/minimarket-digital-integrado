const prisma =
  require("../../../prisma/client");

async function createPurchaseDetailsRepository(details = []) {

  return prisma.purchaseDetail.createMany({

    data: details,

  });

}

module.exports = {
  createPurchaseDetailsRepository,
};
