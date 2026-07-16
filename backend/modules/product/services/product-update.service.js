// ========================================
// services/product-update.service.js
// ========================================

const prisma =
  require("../../../prisma/client");

const repository =
  require("../repositories/product.repository");

const {
  sanitizeProductInput,
} = require("../helpers/product-sanitizer.helper");

// ========================================
// PRICING ENGINE
// ========================================

function calculatePricing({
  purchasePrice,
  profitMargin,
}) {

  const purchase =
    Number(purchasePrice || 0);

  const margin =
    Number(profitMargin || 0);

  // ========================================
  // VALIDATIONS
  // ========================================

  if (isNaN(purchase)) {

    throw new Error(
      "Precio de compra inválido",
    );

  }

  if (isNaN(margin)) {

    throw new Error(
      "Margen de ganancia inválido",
    );

  }

  if (purchase < 0) {

    throw new Error(
      "El precio de compra no puede ser negativo",
    );

  }

  if (margin < 0) {

    throw new Error(
      "El margen de ganancia no puede ser negativo",
    );

  }

  // ========================================
  // CALCULATIONS
  // ========================================

  const cost =
    purchase;

  const sale =
    cost * (
      1 + margin / 100
    );

  const profit =
    sale - cost;

  return {

    purchasePrice:
      Number(
        purchase.toFixed(2),
      ),

    costPrice:
      Number(
        cost.toFixed(2),
      ),

    salePrice:
      Number(
        sale.toFixed(2),
      ),

    profitMargin:
      Number(
        margin.toFixed(2),
      ),

    profitAmount:
      Number(
        profit.toFixed(2),
      ),
  };

}

// ========================================
// UPDATE PRODUCT
// ========================================

exports.update = async (
  id,
  body,
  user,
) => {

  // ========================================
  // GET PRODUCT
  // ========================================

  const oldProduct =
    await repository.getById(
      id,
      user.companyId,
    );

  if (!oldProduct) {

    throw new Error(
      "Producto no encontrado",
    );

  }

  // ========================================
  // SANITIZE INPUT
  // ========================================

  body =
    sanitizeProductInput({

      // ========================================
      // GENERAL
      // ========================================

      name:
        body.name ??
        oldProduct.name,

      description:
        body.description ??
        oldProduct.description,

      // ========================================
      // IDENTIFIERS
      // ========================================

      sku:
        oldProduct.sku,

      barcode:
        oldProduct.barcode,

      // ========================================
      // PRICING
      // ========================================

      purchasePrice:
        body.purchasePrice ??
        oldProduct.purchasePrice,

      profitMargin:
        body.profitMargin ??
        oldProduct.profitMargin,

      // ========================================
      // STOCK
      // ========================================

      minStock:
        body.minStock ??
        oldProduct.minStock,

      maxStock:
        body.maxStock ??
        oldProduct.maxStock,

      // ========================================
      // RELATIONS
      // ========================================

      categoryId:
        body.categoryId ??
        oldProduct.categoryId,

      unitId:
        body.unitId ??
        oldProduct.unitId,

      // ========================================
      // EXPIRATION
      // ========================================

      expirationDate:
        body.expirationDate ??
        oldProduct.expirationDate,

      batchNumber:
        body.batchNumber ??
        oldProduct.batchNumber,

      requiresExpiration:
        body.requiresExpiration ??
        oldProduct.requiresExpiration,

      // ========================================
      // STATUS
      // ========================================

      isActive:
        body.isActive ??
        oldProduct.isActive,

      isFeatured:
        body.isFeatured ??
        oldProduct.isFeatured,
    });

  // ========================================
  // RECALCULATE PRICING
  // ========================================

  const pricing =
    calculatePricing({

      purchasePrice:
        body.purchasePrice,

      profitMargin:
        body.profitMargin,
    });

  // ========================================
  // UPDATE DATA
  // ========================================

  // ========================================
  // UPDATE DATA (CORREGIDO)
  // ========================================

  const updateData = {
    name: body.name,
    description: body.description,

    // Incluimos los campos que habías olvidado guardar en la BD:
    sku: body.sku,
    barcode: body.barcode,
    expirationDate: body.expirationDate ? new Date(body.expirationDate) : null,
    batchNumber: body.batchNumber,

    purchasePrice: pricing.purchasePrice,
    costPrice: pricing.costPrice,
    salePrice: pricing.salePrice,
    profitMargin: pricing.profitMargin,
    profitAmount: pricing.profitAmount,

    minStock: Number(body.minStock || 0),
    maxStock: body.maxStock ? Number(body.maxStock) : null,

    requiresExpiration: Boolean(body.requiresExpiration),
    isActive: Boolean(body.isActive),
    isFeatured: Boolean(body.isFeatured),
  };

  // Conectar relaciones SOLO si cambiaron respecto al producto original
  if (body.categoryId && Number(body.categoryId) !== oldProduct.categoryId) {
    updateData.category = {
      connect: { id: Number(body.categoryId) },
    };
  }

  if (body.unitId && Number(body.unitId) !== oldProduct.unitId) {
    updateData.unit = {
      connect: { id: Number(body.unitId) },
    };
  }
  // ========================================
  // TRANSACTION
  // ========================================

  const product =
    await prisma.$transaction(
      async (tx) => {

        // ========================================
        // UPDATE PRODUCT
        // ========================================

        const updated =
          await repository.update(

            id,

            updateData,

            tx,
          );

        // ========================================
        // AUDIT LOG
        // ========================================

        await tx.auditLog.create({
          data: {

            action:
              "UPDATE",

            entityType:
              "Product",

            entityId:
              updated.id,

            description:
              `Producto ${updated.name} actualizado correctamente`,

            // ========================================
            // OLD VALUES
            // ========================================

            oldValues: {

              name:
                oldProduct.name,

              purchasePrice:
                oldProduct.purchasePrice,

              salePrice:
                oldProduct.salePrice,

              profitMargin:
                oldProduct.profitMargin,

              profitAmount:
                oldProduct.profitAmount,
            },

            // ========================================
            // NEW VALUES
            // ========================================

            newValues: {

              name:
                updated.name,

              purchasePrice:
                updated.purchasePrice,

              salePrice:
                updated.salePrice,

              profitMargin:
                updated.profitMargin,

              profitAmount:
                updated.profitAmount,
            },

            companyId:
              user.companyId,

            userId:
              user.id,
          },
        });

        return updated;

      },
    );

  return product;

};
