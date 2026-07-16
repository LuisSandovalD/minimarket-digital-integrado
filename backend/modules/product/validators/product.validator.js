// ========================================
// validators/product.validator.js
// ========================================

const repository =
  require("../repositories/product.repository");

// ========================================
// VALIDATE PRODUCT CREATE
// ========================================

exports.validateProductCreate =
  async (
    body,
    companyId,
  ) => {

    // ====================================
    // REQUIRED
    // ====================================

    if (!body.name) {

      throw new Error(
        "El nombre es obligatorio",
      );

    }

    if (!body.categoryId) {

      throw new Error(
        "La categoría es obligatoria",
      );

    }

    if (!body.unitId) {

      throw new Error(
        "La unidad es obligatoria",
      );

    }

    // ====================================
    // VALIDATE PRICES
    // ====================================

    const purchasePrice =
      Number(body.purchasePrice || 0);

    const profitMargin =
      Number(body.profitMargin || 0);

    const salePrice =
      Number(body.salePrice || 0);

    const profitAmount =
      Number(body.profitAmount || 0);

    // ====================================
    // PURCHASE PRICE
    // ====================================

    if (purchasePrice <= 0) {

      throw new Error(
        "El precio de compra debe ser mayor a 0",
      );

    }

    // ====================================
    // PROFIT MARGIN
    // ====================================

    if (profitMargin < 0) {

      throw new Error(
        "El margen de ganancia no puede ser negativo",
      );

    }

    // ====================================
    // SALE PRICE
    // ====================================

    if (salePrice < purchasePrice) {

      throw new Error(
        "El precio de venta no puede ser menor al costo",
      );

    }

    // ====================================
    // PROFIT AMOUNT
    // ====================================

    if (profitAmount < 0) {

      throw new Error(
        "La ganancia no puede ser negativa",
      );

    }

    // ====================================
    // VALIDATE REAL CALCULATIONS
    // ====================================

    const expectedSalePrice =

      purchasePrice +

      (
        purchasePrice *
        profitMargin
      ) / 100;

    const expectedProfitAmount =

      expectedSalePrice -
      purchasePrice;

    // ====================================
    // ROUNDING
    // ====================================

    const round = (num) =>
      Number(
        Number(num).toFixed(2),
      );

    // ====================================
    // VALIDATE SALE PRICE
    // ====================================

    if (

      round(salePrice) !==
      round(expectedSalePrice)

    ) {

      throw new Error(
        "El precio de venta no coincide con el margen calculado",
      );

    }

    // ====================================
    // VALIDATE PROFIT
    // ====================================

    if (

      round(profitAmount) !==
      round(expectedProfitAmount)

    ) {

      throw new Error(
        "La ganancia calculada es inválida",
      );

    }

    // ====================================
    // VALIDATE STOCK
    // ====================================

    const stock =
      Number(body.stock || 0);

    const minStock =
      Number(body.minStock || 0);

    const maxStock =
      Number(body.maxStock || 0);

    if (stock < 0) {

      throw new Error(
        "El stock no puede ser negativo",
      );

    }

    if (minStock < 0) {

      throw new Error(
        "El stock mínimo no puede ser negativo",
      );

    }

    if (
      maxStock > 0 &&
      maxStock < minStock
    ) {

      throw new Error(
        "El stock máximo no puede ser menor al mínimo",
      );

    }

    // ====================================
    // VALIDATE SKU
    // ====================================

    if (body.sku) {

      const existingSku =
        await repository.findBySku(

          body.sku,

          companyId,

        );

      if (existingSku) {

        throw new Error(
          "El SKU ya existe",
        );

      }

    }

    // ====================================
    // VALIDATE BARCODE
    // ====================================

    if (body.barcode) {

      const existingBarcode =
        await repository.findByBarcode(

          body.barcode,

          companyId,

        );

      if (existingBarcode) {

        throw new Error(
          "El código de barras ya existe",
        );

      }

    }

  };
