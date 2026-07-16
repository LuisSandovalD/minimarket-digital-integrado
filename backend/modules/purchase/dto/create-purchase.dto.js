const Joi = require("joi");

const createPurchaseSchema = Joi.object({
  supplierId: Joi.number().integer().positive().optional().allow(null),
  branchId: Joi.number().integer().positive().optional(),
  notes: Joi.string().max(500).optional().allow("", null),
  expectedDelivery: Joi.date().optional().allow(null),
  details: Joi.array().min(1).required().items(
    Joi.object({
      productId: Joi.number().integer().positive().required(),
      quantity: Joi.number().positive().required(),
      costPrice: Joi.number().positive().required(),
      // 🔥 Asegúrate de que estas dos líneas existan tal cual:
      batchNumber: Joi.string().max(100).optional().allow("", null),
      expirationDate: Joi.date().optional().allow(null),
    }),
  ),
});

module.exports = { createPurchaseSchema };
