const supplierRepository = require('../repositories/supplier.repository')

async function createSupplier(data) {
  const existingSupplier = await supplierRepository.findByName(
    data.name,
    data.companyId
  )

  if (existingSupplier) {
    throw new Error('Supplier already exists')
  }

  if (data.ruc) {
    const existingRuc = await supplierRepository.findByRuc(
      data.ruc,
      data.companyId
    )

    if (existingRuc) {
      throw new Error('RUC already registered')
    }
  }

  return supplierRepository.create({
    name: data.name,
    ruc: data.ruc || null,
    email: data.email || null,
    phone: data.phone || null,
    address: data.address || null,
    contactPerson: data.contactPerson || null,
    website: data.website || null,
    notes: data.notes || null,
    currentDebt: data.currentDebt || 0,
    companyId: Number(data.companyId)
  })
}

module.exports = {
  createSupplier
}