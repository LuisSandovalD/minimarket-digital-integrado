// ========================================
// modules/employees/repositories/employee.repository.js
// ========================================

const prisma =
  require("../../../prisma/client");

const {
  employeeSelect,
} = require("../includes/employee.include");

// ========================================
// GET EMPLOYEES
// ========================================

async function getEmployeesRepository({
  companyId,
}) {

  return prisma.user.findMany({

    where: {
      companyId,
      role: "EMPLOYEE",
      isDeleted: false,
    },

    select:
      employeeSelect,

    orderBy: {
      createdAt: "desc",
    },

  });

}

// ========================================
// CREATE EMPLOYEE
// ========================================

async function createEmployeeRepository(
  data
) {

  return prisma.user.create({

    data: {

      name:
        data.name,

      email:
        data.email,

      password:
        data.password,

      phone:
        data.phone,

      branchId:
        data.branchId,

      companyId:
        data.companyId,

      managerId:
        data.managerId || null,

      role:
        "EMPLOYEE",

      // ========================================
      // EMPLOYEE PROFILE
      // ========================================

      employeeProfile: {

        create: {

          position:
            data.position || "",

          department:
            data.department || "",

          shift:
            data.shift || null,

        },

      },

    },

    select:
      employeeSelect,

  });

}

// ========================================
// UPDATE EMPLOYEE
// ========================================

async function updateEmployeeRepository(
  id,
  companyId,
  data
) {

  return prisma.user.update({

    where: {
      id,
    },

    data: {

      name:
        data.name,

      email:
        data.email,

      phone:
        data.phone,

      branchId:
        data.branchId,

      managerId:
        data.managerId || null,

      ...(data.password && {
        password: data.password,
      }),

      // ========================================
      // EMPLOYEE PROFILE
      // ========================================

      employeeProfile: {

        upsert: {

          update: {

            position:
              data.position || "",

            department:
              data.department || "",

            shift:
              data.shift || null,

          },

          create: {

            position:
              data.position || "",

            department:
              data.department || "",

            shift:
              data.shift || null,

          },

        },

      },

    },

    select:
      employeeSelect,

  });

}

// ========================================
// DELETE EMPLOYEE
// ========================================

async function deleteEmployeeRepository(
  id
) {

  return prisma.user.update({

    where: {
      id,
    },

    data: {

      isDeleted: true,

      deletedAt:
        new Date(),

    },

  });

}

module.exports = {

  getEmployeesRepository,

  createEmployeeRepository,

  updateEmployeeRepository,

  deleteEmployeeRepository,

};