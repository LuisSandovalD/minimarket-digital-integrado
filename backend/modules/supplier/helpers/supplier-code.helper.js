function generateSupplierCode(id) {
  return `SUP-${String(id).padStart(6, "0")}`;
}

module.exports = {
  generateSupplierCode,
};
