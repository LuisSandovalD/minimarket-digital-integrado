// ========================================
// modules/employees/services/update-employee.service.js
// ========================================

const bcrypt =
  require("bcryptjs");

const {
  updateEmployeeRepository,
} = require("../repositories/employee.repository");

// ========================================
// UPDATE EMPLOYEE
// ========================================

async function updateEmployeeService(

  id,

  companyId,

  body

) {

  const data = {
    ...body,
  };

  // ========================================
  // PASSWORD OPTIONAL
  // ========================================

  if (data.password) {

    data.password =
      await bcrypt.hash(
        data.password,
        10
      );

  } else {

    delete data.password;

  }

  return updateEmployeeRepository(

    id,

    companyId,

    data

  );

}

module.exports =
  updateEmployeeService;