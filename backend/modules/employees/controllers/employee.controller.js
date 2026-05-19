// ========================================
// modules/employees/controllers/employee.controller.js
// ========================================

const createEmployeeService =
  require("../services/create-employee.service");

const getEmployeesService =
  require("../services/get-employees.service");

const updateEmployeeService =
  require("../services/update-employee.service");

const deleteEmployeeService =
  require("../services/delete-employee.service");

const {
  getEmployeeRepository,
} = require("../repositories/employee.repository");

// ========================================
// GET EMPLOYEES
// ========================================

async function getEmployees(
  req,
  res
) {

  try {

    const employees =
      await getEmployeesService(
        req.user.companyId
      );

    return res.json({

      ok: true,

      data:
        employees,

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      ok: false,

      message:
        "Error al obtener empleados",

    });

  }

}

// ========================================
// GET EMPLOYEE
// ========================================

async function getEmployee(
  req,
  res
) {

  try {

    const employee =
      await getEmployeeRepository(

        Number(req.params.id),

        req.user.companyId

      );

    if (!employee) {

      return res.status(404).json({

        ok: false,

        message:
          "Empleado no encontrado",

      });

    }

    return res.json({

      ok: true,

      data:
        employee,

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      ok: false,

      message:
        "Error al obtener empleado",

    });

  }

}

// ========================================
// CREATE EMPLOYEE
// ========================================

async function createEmployee(
  req,
  res
) {

  try {

    const employee =
      await createEmployeeService({

        ...req.body,

        companyId:
          req.user.companyId,

      });

    return res.status(201).json({

      ok: true,

      data:
        employee,

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      ok: false,

      message:
        "Error al crear empleado",

    });

  }

}

// ========================================
// UPDATE EMPLOYEE
// ========================================

async function updateEmployee(
  req,
  res
) {

  try {

    const employee =
      await updateEmployeeService(

        Number(req.params.id),

        req.user.companyId,

        req.body

      );

    return res.json({

      ok: true,

      data:
        employee,

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      ok: false,

      message:
        "Error al actualizar empleado",

    });

  }

}

// ========================================
// DELETE EMPLOYEE
// ========================================

async function deleteEmployee(
  req,
  res
) {

  try {

    await deleteEmployeeService(

      Number(req.params.id),

      req.user.companyId

    );

    return res.json({

      ok: true,

      message:
        "Empleado eliminado correctamente",

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      ok: false,

      message:
        "Error al eliminar empleado",

    });

  }

}

module.exports = {

  getEmployees,

  getEmployee,

  createEmployee,

  updateEmployee,

  deleteEmployee,

};