const {
  updatePurchaseRepository
} = require("../repositories/update-purchase.repository");

async function updatePurchaseStatusService(
  id,
  status
) {

  return updatePurchaseRepository(id, {
    status
  });

}

module.exports = {
  updatePurchaseStatusService
};