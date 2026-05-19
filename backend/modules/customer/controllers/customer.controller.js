const createCustomerService =
  require("../services/create-customer.service");

const getCustomersService =
  require("../services/get-customers.service");

const getCustomerService =
  require("../services/get-customer.service");

const updateCustomerService =
  require("../services/update-customer.service");

const deleteCustomerService =
  require("../services/delete-customer.service");

// ========================================
// GET CUSTOMERS
// ========================================

async function getCustomers(
  req,
  res
) {

  try {

    const customers =
      await getCustomersService(
        req.user.companyId
      );

    return res.json({

      ok: true,

      data:
        customers,

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      ok: false,

      message:
        "Error al obtener clientes",

    });

  }

}

// ========================================
// GET CUSTOMER
// ========================================

async function getCustomer(
  req,
  res
) {

  try {

    const customer =
      await getCustomerService(

        Number(req.params.id),

        req.user.companyId

      );

    if (!customer) {

      return res.status(404).json({

        ok: false,

        message:
          "Cliente no encontrado",

      });

    }

    return res.json({

      ok: true,

      data:
        customer,

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      ok: false,

      message:
        "Error al obtener cliente",

    });

  }

}

// ========================================
// CREATE CUSTOMER
// ========================================

async function createCustomer(
  req,
  res
) {

  try {

    const customer =
      await createCustomerService({

        ...req.body,

        companyId:
          req.user.companyId,

      });

    return res.status(201).json({

      ok: true,

      data:
        customer,

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      ok: false,

      message:
        "Error al crear cliente",

    });

  }

}

// ========================================
// UPDATE CUSTOMER
// ========================================

async function updateCustomer(
  req,
  res
) {

  try {

    const customer =
      await updateCustomerService(

        Number(req.params.id),

        req.user.companyId,

        req.body

      );

    return res.json({

      ok: true,

      data:
        customer,

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      ok: false,

      message:
        "Error al actualizar cliente",

    });

  }

}

// ========================================
// DELETE CUSTOMER
// ========================================

async function deleteCustomer(
  req,
  res
) {

  try {

    await deleteCustomerService(
      Number(req.params.id)
    );

    return res.json({

      ok: true,

      message:
        "Cliente eliminado",

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      ok: false,

      message:
        "Error al eliminar cliente",

    });

  }

}

module.exports = {

  getCustomers,

  getCustomer,

  createCustomer,

  updateCustomer,

  deleteCustomer,

};