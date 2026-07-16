const {
  PURCHASE_STATUS,
} = require("../constants/purchase.constants");

function getDefaultPurchaseStatus() {

  return PURCHASE_STATUS.COMPLETED;

}

module.exports = {
  getDefaultPurchaseStatus,
};
