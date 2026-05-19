const {
  createCustomerRepository,
} = require("../repositories/customer.repository");

async function createCustomerService(
  data
) {

  return createCustomerRepository(
    data
  );

}

module.exports =
  createCustomerService;