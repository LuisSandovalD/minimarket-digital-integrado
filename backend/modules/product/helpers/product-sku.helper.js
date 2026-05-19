exports.generateSku = (companyId) => {
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  const company = companyId.toString().slice(-2);

  return `SKU-${company}-${random}`;
};