const supplierRepository = require("../repositories/supplier.repository");

exports.deleteSupplier = async (id, companyId) => {
  const supplier = await supplierRepository.findById(id, companyId);

  if (!supplier) {
    throw new Error("Supplier not found");
  }

  await supplierRepository.softDelete(id, companyId);

  return {
    success: true,
    message: "Supplier deleted successfully",
  };
};

exports.restoreSupplier = async (id, companyId) => {
  await supplierRepository.restore(id, companyId);

  return {
    success: true,
    message: "Supplier restored successfully",
  };
};

