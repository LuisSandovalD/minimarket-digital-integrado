// ========================================
// helpers/product-sanitizer.helper.js
// ========================================

exports.sanitizeProductInput = (body) => {
  return {
    // ========================================
    // GENERAL
    // ========================================

    name: body.name?.trim(),

    description: body.description?.trim() || null,

    // ========================================
    // IDENTIFICADORES
    // ========================================

    sku: body.sku?.trim() || null,

    barcode: body.barcode?.trim() || null,

    // ========================================
    // PRECIOS
    // ========================================

    purchasePrice: Number(body.purchasePrice || 0),

    salePrice: Number(body.salePrice || 0),

    costPrice: Number(body.costPrice || 0),

    profitMargin: Number(body.profitMargin || 0),

    profitAmount: Number(body.profitAmount || 0),

    // ========================================
    // STOCK
    // ========================================

    minStock: Number(body.minStock || 5),

    maxStock:
      body.maxStock !== undefined &&
        body.maxStock !== null &&
        body.maxStock !== ""
        ? Number(body.maxStock)
        : null,

    // ========================================
    // CONFIGURACIÓN
    // ========================================

    requiresExpiration:
      body.requiresExpiration === true ||
      body.requiresExpiration === "true",

    trackBatches:
      body.trackBatches === true ||
      body.trackBatches === "true",

    // ========================================
    // RELACIONES
    // ========================================

    categoryId: Number(body.categoryId),

    unitId: Number(body.unitId),

    // ========================================
    // ESTADO
    // ========================================

    isActive:
      body.isActive === undefined
        ? true
        : body.isActive === true ||
        body.isActive === "true",

    isFeatured:
      body.isFeatured === true ||
      body.isFeatured === "true",
  };
};