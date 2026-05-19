const {
  getEmployeesRepository,
} = require("../repositories/employee.repository");

async function getEmployeesService(companyId) {
  return getEmployeesRepository(companyId);
}

module.exports = getEmployeesService;