const supplierRepository = require('../repositories/supplier.repository')

async function getSupplierById(id, companyId) {
  const supplier = await supplierRepository.findById(
    id,
    companyId
  )

  if (!supplier) {
    throw new Error('Supplier not found')
  }

  return supplier
}

async function getSuppliers(companyId, filters) {
  const page = Number(filters.page || 1)
  const limit = Number(filters.limit || 10)

  const suppliers = await supplierRepository.getAll(
    companyId,
    {
      search: filters.search,
      isActive:
        filters.isActive !== undefined
          ? filters.isActive === 'true'
          : undefined,
      page,
      limit
    }
  )

  const total = await supplierRepository.count(
    companyId,
    {
      search: filters.search,
      isActive:
        filters.isActive !== undefined
          ? filters.isActive === 'true'
          : undefined
    }
  )

  return {
    data: suppliers,

    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  }
}

async function searchSuppliers(companyId, search) {
  return supplierRepository.searchSuppliers(
    companyId,
    search
  )
}

module.exports = {
  getSupplierById,
  getSuppliers,
  searchSuppliers
}