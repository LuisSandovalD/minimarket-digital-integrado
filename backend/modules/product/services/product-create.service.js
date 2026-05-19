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

  // ========================================
  // VALIDATIONS
  // ========================================

  if (purchase < 0) {

    throw new Error(
      "El precio de compra no puede ser negativo"
    );
  }

  if (margin < 0) {

    throw new Error(
      "El margen de ganancia no puede ser negativo"
    );
  }

  // ========================================
  // CALCULATIONS
  // ========================================

  const cost =
    purchase;

  const sale =
    cost * (1 + margin / 100);

  const profit =
    sale - cost;

  // ========================================
  // SECURITY VALIDATION
  // ========================================

  if (sale < cost) {

    throw new Error(
      "El precio de venta no puede ser menor al costo"
    );
  }

  // ========================================
  // RETURN
  // ========================================

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
  user
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
        user.companyId
      );
  }

  if (!body.barcode) {

    body.barcode =
      generateBarcode();
  }

  // ========================================
  // 3. VALIDATE INPUT
  // ========================================

  await validateProductCreate(
    body,
    user.companyId
  );

  // ========================================
  // 4. CALCULATE PRICING
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

  const result =
    await prisma.$transaction(
      async (tx) => {

        // ========================================
        // CREATE PRODUCT
        // ========================================

        const product =
          await tx.product.create({
            data: {

              // ========================================
              // BASIC INFO
              // ========================================

              name:
                body.name,

              description:
                body.description,

              // ========================================
              // IDENTIFIERS
              // ========================================

              sku:
                body.sku,

              barcode:
                body.barcode,

              // ========================================
              // PRICING
              // ========================================

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

              // ========================================
              // STOCK CONFIG
              // ========================================

              minStock:
                body.minStock || 5,

              maxStock:
                body.maxStock || null,

              // ========================================
              // RELATIONS
              // ========================================

              categoryId:
                Number(body.categoryId),

              unitId:
                Number(body.unitId),

              // ========================================
              // EXTRA INFO
              // ========================================

              expirationDate:
                body.expirationDate || null,

              batchNumber:
                body.batchNumber || null,

              requiresExpiration:
                Boolean(
                  body.requiresExpiration
                ),

              isActive:
                body.isActive !== undefined
                  ? Boolean(body.isActive)
                  : true,

              isFeatured:
                body.isFeatured !== undefined
                  ? Boolean(body.isFeatured)
                  : false,

              // ========================================
              // COMPANY
              // ========================================

              companyId:
                user.companyId,
            },
          });

        // ========================================
        // CREATE INVENTORY
        // ========================================

        let inventory = null;

        if (body.branchId) {

          inventory =
            await tx.inventory.create({
              data: {

                productId:
                  product.id,

                branchId:
                  Number(body.branchId),

                companyId:
                  user.companyId,

                stock:
                  Number(body.stock || 0),

                reservedStock: 0,

                damagedStock: 0,
              },
            });

          // ========================================
          // INVENTORY HISTORY
          // ========================================

          if (Number(body.stock) > 0) {

            await tx.inventoryHistory.create({
              data: {

                type:
                  "INITIAL_STOCK",

                quantity:
                  Number(body.stock),

                previousStock: 0,

                newStock:
                  Number(body.stock),

                reason:
                  "Stock inicial del producto",

                reference:
                  product.sku,

                productId:
                  product.id,

                inventoryId:
                  inventory.id,

                branchId:
                  Number(body.branchId),

                companyId:
                  user.companyId,
              },
            });
          }
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

        return product;
      }
    );

  return result;
};