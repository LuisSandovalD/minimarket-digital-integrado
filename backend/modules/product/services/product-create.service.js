// ========================================
// services/product-create.service.js
// ========================================

const prisma =
  require("../../../prisma/client");

const {
  generateSku,
} = require("../helpers/product-sku.helper");

const {
  generateBarcode,
} = require("../helpers/product-barcode.helper");

const {
  sanitizeProductInput,
} = require("../helpers/product-sanitizer.helper");

const {
  validateProductCreate,
} = require("../validators/product.validator");

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

  const cost = purchase;

  const sale =
    cost * (1 + margin / 100);

  const profit =
    sale - cost;

  if (sale < cost) {
    throw new Error(
      "El precio de venta no puede ser menor al costo",
    );
  }

  return {
    purchasePrice:
      Number(purchase.toFixed(2)),

    costPrice:
      Number(cost.toFixed(2)),

    salePrice:
      Number(sale.toFixed(2)),

    profitMargin:
      Number(margin.toFixed(2)),

    profitAmount:
      Number(profit.toFixed(2)),
  };
}

// ========================================
// CREATE PRODUCT
// ========================================

exports.create = async (
  body,
  user,
) => {

  // ========================================
  // 1. SANITIZE INPUT
  // ========================================

  body =
    sanitizeProductInput(body);

  // ========================================
  // 2. AUTO GENERATION
  // ========================================

  if (!body.sku) {

    body.sku =
      generateSku(
        user.companyId,
      );
  }

  if (!body.barcode) {

    body.barcode =
      generateBarcode();
  }

  // ========================================
  // 3. VALIDATION
  // ========================================

  await validateProductCreate(
    body,
    user.companyId,
  );

  // ========================================
  // 4. PRICING
  // ========================================

  const pricing =
    calculatePricing({
      purchasePrice:
        body.purchasePrice,

      profitMargin:
        body.profitMargin,
    });

  // ========================================
  // 5. TRANSACTION
  // ========================================

  return prisma.$transaction(
    async (tx) => {

      // ========================================
      // PRODUCT
      // ========================================

      const product =
        await tx.product.create({
          data: {

            name:
              body.name,

            description:
              body.description,

            sku:
              body.sku,

            barcode:
              body.barcode,

            purchasePrice:
              pricing.purchasePrice,

            costPrice:
              pricing.costPrice,

            salePrice:
              pricing.salePrice,

            profitMargin:
              pricing.profitMargin,

            profitAmount:
              pricing.profitAmount,

            minStock:
              body.minStock || 5,

            maxStock:
              body.maxStock || null,

            requiresExpiration:
              Boolean(
                body.requiresExpiration,
              ),

            trackBatches:
              Boolean(
                body.trackBatches,
              ),

            isActive:
              body.isActive !== undefined
                ? Boolean(body.isActive)
                : true,

            isFeatured:
              body.isFeatured !== undefined
                ? Boolean(body.isFeatured)
                : false,

            categoryId:
              Number(
                body.categoryId,
              ),

            unitId:
              Number(
                body.unitId,
              ),

            companyId:
              user.companyId,
          },
        });

      // ========================================
      // INVENTORY
      // ========================================

      let inventory = null;

      if (body.branchId) {

        inventory =
          await tx.inventory.create({
            data: {

              productId:
                product.id,

              branchId:
                Number(
                  body.branchId,
                ),

              companyId:
                user.companyId,

              stock: 0,

              reservedStock: 0,

              damagedStock: 0,
            },
          });
      }

      // ========================================
      // AUDIT LOG
      // ========================================

      await tx.auditLog.create({
        data: {

          action:
            "CREATE",

          entityType:
            "Product",

          entityId:
            product.id,

          description:
            `Producto ${product.name} creado correctamente`,

          companyId:
            user.companyId,

          userId:
            user.id,
        },
      });

      // ========================================
      // RESPONSE
      // ========================================

      return {
        ...product,
        inventory,
      };
    },
  );
};
