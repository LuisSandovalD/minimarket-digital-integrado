// ========================================
// repositories/product-search.repository.js
// ========================================

const prisma =
  require("../../../prisma/client");
// ========================================
// FIND BY SKU
// ========================================

exports.findBySku = async (
  sku,
  companyId
) => {

  return prisma.product.findFirst({

    where: {
      sku,
      companyId,
    },
  });

};