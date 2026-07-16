const {
  getPurchaseByIdRepository,
} = require("../repositories/get-purchase-by-id.repository");

async function getPurchaseByIdService(id) {

  return getPurchaseByIdRepository(id);

}

module.exports = {
  getPurchaseByIdService,
};
