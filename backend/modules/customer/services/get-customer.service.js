const {
  getCustomerRepository,
} = require("../repositories/customer.repository");

async function getCustomerService(
  id,
  companyId
) {

  return getCustomerRepository(
    id,
    companyId
  );

}

module.exports =
  getCustomerService;