function formatSupplierResponse(supplier) {
  return {
    id: supplier.id,

    name: supplier.name,

    ruc: supplier.ruc,

    email: supplier.email,

    phone: supplier.phone,

    address: supplier.address,

    contactPerson: supplier.contactPerson,

    website: supplier.website,

    notes: supplier.notes,

    currentDebt: supplier.currentDebt,

    isActive: supplier.isActive,

    createdAt: supplier.createdAt,

    updatedAt: supplier.updatedAt
  }
}

module.exports = {
  formatSupplierResponse
}