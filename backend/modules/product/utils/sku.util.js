// ========================================
// utils/sku.util.js
// ========================================

const prisma =
  require("../../../prisma/client");

// ========================================
// GENERATE SKU
// ========================================

exports.generateSKU =
  async () => {

    // LAST PRODUCT

    const lastProduct =
      await prisma.product.findFirst({

        orderBy: {
          id: "desc",
        },
      });

    // NEXT NUMBER

    const nextNumber =
      lastProduct
        ? lastProduct.id + 1
        : 1;

    // FORMAT

    return `DAD-${String(
      nextNumber,
    ).padStart(5, "0")}`;

  };
