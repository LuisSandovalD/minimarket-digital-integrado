const prisma =
  require("../../../prisma/client");

async function createInventoryHistoryService(data) {

  return prisma.inventoryHistory.create({
    data,
  });

}

module.exports = {
  createInventoryHistoryService,
};
