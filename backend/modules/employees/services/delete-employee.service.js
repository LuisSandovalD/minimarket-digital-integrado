const {
  deleteEmployeeRepository,
} = require("../repositories/employee.repository");

async function deleteEmployeeService(id) {
  return deleteEmployeeRepository(Number(id));
}

module.exports = deleteEmployeeService;