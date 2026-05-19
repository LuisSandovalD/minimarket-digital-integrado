const supplierRepository = require('../repositories/supplier.repository')

async function deleteSupplier(id, companyId) {
  const supplier = await supplierRepository.findById(id, companyId)

  if (!supplier) {
    throw new Error('Supplier not found')
  }

  await supplierRepository.softDelete(id, companyId)

  return {
    success: true,
    message: 'Supplier deleted successfully'
  }
}

async function restoreSupplier(id, companyId) {
  await supplierRepository.restore(id, companyId)

  return {
    success: true,
    message: 'Supplier restored successfully'
  }
}

module.exports = {
  deleteSupplier,
  restoreSupplier
}