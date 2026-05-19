const bcrypt = require("bcryptjs");
const {
  createEmployeeRepository,
} = require("../repositories/employee.repository");

async function createEmployeeService({
  name,
  email,
  password,
  phone,
  branchId,
  companyId,
  position,
  department,
  shift,
}) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return createEmployeeRepository({
    name,
    email,
    password: hashedPassword,
    phone,
    branchId,
    companyId,

    // 👇 employee profile data
    position,
    department,
    shift,
  });
}

module.exports = createEmployeeService;