// ========================================
// helpers/product-sanitizer.helper.js
// ========================================

exports.sanitizeProductInput = (
  body
) => {

  return {

    // ========================================
    // GENERAL
    // ========================================

    name:
      body.name?.trim(),

    description:
      body.description?.trim() || null,

    // ========================================
    // AUTO GENERATED
    // ========================================

    sku:
      body.sku || null,

    barcode:
      body.barcode || null,

    // ========================================
    // PRICES
    // ========================================

    purchasePrice:
      Number(body.purchasePrice || 0),

    salePrice:
      Number(body.salePrice || 0),

    costPrice:
      Number(body.costPrice || 0),

    // ✅ NUEVOS CAMPOS
    profitMargin:
      Number(body.profitMargin || 0),

    profitAmount:
      Number(body.profitAmount || 0),

    // ========================================
    // STOCK CONFIG
    // ========================================

    minStock:
      Number(body.minStock || 0),

    maxStock:
      body.maxStock
        ? Number(body.maxStock)
        : null,

    // ========================================
    // RELATIONS
    // ========================================

    categoryId:
      Number(body.categoryId),

    unitId:
      Number(body.unitId),

    // ========================================
    // EXPIRATION
    // ========================================

    expirationDate:
      body.expirationDate
        ? new Date(body.expirationDate)
        : null,

    batchNumber:
      body.batchNumber || null,

    requiresExpiration:
      body.requiresExpiration === true ||
      body.requiresExpiration === "true",

    // ========================================
    // STATUS
    // ========================================

    isActive:
      body.isActive === true ||
      body.isActive === "true",

    isFeatured:
      body.isFeatured === true ||
      body.isFeatured === "true",
  };

};