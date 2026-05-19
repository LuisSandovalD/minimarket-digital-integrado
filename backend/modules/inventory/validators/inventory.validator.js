// ========================================
// validators/inventory.validator.js
// ========================================

const Joi = require("joi");

// ========================================
// COMMON
// ========================================
const paginationSchema = {
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
};

// ========================================
// CREATE INVENTORY
// ========================================
exports.createInventorySchema = Joi.object({
  productId: Joi.number().integer().positive().required(),
  branchId: Joi.number().integer().positive().required(),
  stock: Joi.number().integer().min(0).default(0),
  reservedStock: Joi.number().integer().min(0).default(0),
  damagedStock: Joi.number().integer().min(0).default(0),
});

// ========================================
// ADD STOCK
// ========================================
exports.addStockSchema = Joi.object({
  quantity: Joi.number().integer().positive().max(999999).required(),
  reason: Joi.string().trim().max(255).default("Ingreso manual").optional(),
});

// ========================================
// REMOVE STOCK
// ========================================
exports.removeStockSchema = Joi.object({
  quantity: Joi.number().integer().positive().max(999999).required(),
  reason: Joi.string().trim().max(255).required().messages({
    "any.required": "El motivo de la salida de stock es obligatorio",
    "string.empty": "Debe especificar un motivo para remover stock",
  }),
});

// ========================================
// RESERVE STOCK
// ========================================
exports.reserveStockSchema = Joi.object({
  quantity: Joi.number().integer().positive().max(999999).required(),
});

// ========================================
// TRANSFER STOCK
// ========================================
exports.transferStockSchema = Joi.object({
  originInventoryId: Joi.number().integer().positive().required(),
  targetInventoryId: Joi.number().integer().positive().required(),
  quantity: Joi.number().integer().positive().max(999999).required(),
})
  .custom((value, helpers) => {
    if (value.originInventoryId === value.targetInventoryId) {
      return helpers.error("any.invalid");
    }
    return value;
  })
  .messages({
    "any.invalid": "El inventario origen y destino no pueden ser iguales",
  });

// ========================================
// DAMAGED STOCK
// ========================================
exports.damagedStockSchema = Joi.object({
  quantity: Joi.number().integer().positive().max(999999).required(),
  reason: Joi.string().trim().max(255).required().messages({
    "any.required": "El motivo del daño del producto es obligatorio",
    "string.empty": "Debe especificar el motivo del desperfecto",
  }),
});

// ========================================
// INVENTORY FILTERS
// ========================================
exports.inventoryFiltersSchema = Joi.object({
  branchId: Joi.number().integer().positive().optional(),
  categoryId: Joi.number().integer().positive().optional(),
  productId: Joi.number().integer().positive().optional(),
  search: Joi.string().trim().max(255).optional(),
  lowStock: Joi.boolean().optional(),
  outOfStock: Joi.boolean().optional(),
  damaged: Joi.boolean().optional(),
  ...paginationSchema,
});

// ========================================
// MOVEMENT FILTERS
// ========================================
exports.movementFiltersSchema = Joi.object({
  branchId: Joi.number().integer().positive().optional(),
  productId: Joi.number().integer().positive().optional(),
  type: Joi.string()
    .valid("IN", "OUT", "DAMAGED", "TRANSFER_IN", "TRANSFER_OUT")
    .optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  ...paginationSchema,
});

// ========================================
// DATE RANGE
// ========================================
exports.historyRangeSchema = Joi.object({
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref("startDate")).required(),
});