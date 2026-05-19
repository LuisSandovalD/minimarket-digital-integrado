const {
  getPurchasesRepository
} = require("../repositories/get-purchases.repository");

async function getPurchasesService() {

  return getPurchasesRepository();

}

module.exports = {
  getPurchasesService
};