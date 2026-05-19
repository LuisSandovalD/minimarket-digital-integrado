const supplierRepository = require('../repositories/supplier.repository')

async function updateSupplier(id, companyId, data) {
  const supplier = await supplierRepository.findById(id, companyId)

  if (!supplier) {
    throw new Error('Supplier not found')
  }

  if (data.name && data.name !== supplier.name) {
    const existingSupplier = await supplierRepository.findByName(
      data.name,
      companyId
    )

    if (existingSupplier) {
      throw new Error('Supplier name already exists')
    }
  }

  if (data.ruc && data.ruc !== supplier.ruc) {
    const existingRuc = await supplierRepository.findByRuc(
      data.ruc,
      companyId
    )

    if (existingRuc) {
      throw new Error('RUC already registered')
    }
  }

  await supplierRepository.update(id, companyId, {
    ...(data.name && { name: data.name }),
    ...(data.ruc && { ruc: data.ruc }),
    ...(data.email && { email: data.email }),
    ...(data.phone && { phone: data.phone }),
    ...(data.address && { address: data.address }),
    ...(data.contactPerson && {
      contactPerson: data.contactPerson
    }),
    ...(data.website && { website: data.website }),
    ...(data.notes && { notes: data.notes }),
    ...(typeof data.isActive === 'boolean' && {
      isActive: data.isActive
    })
  })

  return supplierRepository.findById(id, companyId)
}

module.exports = {
  updateSupplier
}