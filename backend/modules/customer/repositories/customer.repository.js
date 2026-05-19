// ========================================
// modules/customer/repositories/customer.repository.js
// ========================================

const prisma =
  require("../../../prisma/client");

const {
  customerSelect,
} = require("../includes/customer.include");

// ========================================
// GET CUSTOMERS
// ========================================

async function getCustomersRepository(
  companyId
) {

  return prisma.customer.findMany({

    where: {

      companyId,

      deletedAt: null,

    },

    select:
      customerSelect,

    orderBy: {
      createdAt: "desc",
    },

  });

}

// ========================================
// GET CUSTOMER
// ========================================

async function getCustomerRepository(
  id,
  companyId
) {

  return prisma.customer.findFirst({

    where: {

      id,

      companyId,

      deletedAt: null,

    },

    select:
      customerSelect,

  });

}

// ========================================
// CREATE CUSTOMER
// ========================================

async function createCustomerRepository(
  data
) {

  return prisma.customer.create({

    data,

    select:
      customerSelect,

  });

}

// ========================================
// UPDATE CUSTOMER
// ========================================

async function updateCustomerRepository(
  id,
  companyId,
  data
) {

  return prisma.customer.update({

    where: {
      id,
    },

    data,

    select:
      customerSelect,

  });

}

// ========================================
// DELETE CUSTOMER
// ========================================

async function deleteCustomerRepository(
  id,
  companyId
) {

  return prisma.customer.update({

    where: {
      id,
    },

    data: {

      deletedAt:
        new Date(),

    },

  });

}

module.exports = {

  getCustomersRepository,

  getCustomerRepository,

  createCustomerRepository,

  updateCustomerRepository,

  deleteCustomerRepository,

};