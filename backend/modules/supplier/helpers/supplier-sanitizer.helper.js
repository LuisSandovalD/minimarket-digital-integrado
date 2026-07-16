function sanitizeSupplierData(data) {
  return {
    name: data.name?.trim(),

    ruc: data.ruc?.trim(),

    email: data.email?.trim().toLowerCase(),

    phone: data.phone?.trim(),

    address: data.address?.trim(),

    contactPerson: data.contactPerson?.trim(),

    website: data.website?.trim(),

    notes: data.notes?.trim(),
  };
}

module.exports = {
  sanitizeSupplierData,
};
