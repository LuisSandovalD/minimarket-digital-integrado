const {
  deleteCustomerRepository,
} = require("../repositories/customer.repository");

async function deleteCustomerService(
  id
) {

  return deleteCustomerRepository(
    id
  );

}

module.exports =
  deleteCustomerService;