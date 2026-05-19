// ========================================
// repositories/product-barcode.repository.js
// ========================================

const prisma =
  require("../../../prisma/client");

// ========================================
// FIND BY BARCODE
// ========================================

exports.findByBarcode = async (
  barcode,
  companyId
) => {

  return prisma.product.findFirst({

    where: {

      barcode,

      companyId,

      isDeleted: false,

    },

  });

};