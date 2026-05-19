const {
  updateCustomerRepository,
} = require("../repositories/customer.repository");

async function updateCustomerService(
  id,
  companyId,
  data
) {

  return updateCustomerRepository(

    id,

    companyId,

    data

  );

}

module.exports =
  updateCustomerService;