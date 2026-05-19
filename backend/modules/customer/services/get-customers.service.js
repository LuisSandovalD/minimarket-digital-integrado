const {
  getCustomersRepository,
} = require("../repositories/customer.repository");

async function getCustomersService(
  companyId
) {

  return getCustomersRepository(
    companyId
  );

}

module.exports =
  getCustomersService;