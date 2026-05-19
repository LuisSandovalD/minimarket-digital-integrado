const {
  PURCHASE_STATUS
} = require("../constants/purchase.constants");

const {
  cancelPurchaseRepository
} = require("../repositories/cancel-purchase.repository");

async function cancelPurchaseService(id) {

  return cancelPurchaseRepository(
    id,
    PURCHASE_STATUS.CANCELLED
  );

}

module.exports = {
  cancelPurchaseService
};