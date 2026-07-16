// ========================================
// validators/create-sale.validator.js
// ========================================

const Joi = require("joi");

// ========================================
// SCHEMA
// ========================================

const schema = Joi.object({

  customerId:
    Joi.number()
      .integer()
      .positive()
      .allow(null),

  discount:
    Joi.number()
      .min(0)
      .default(0),

  status: // 🔥 NUEVO: Permite enviar el estado de la venta
    Joi.string()
      .valid("COMPLETED", "CREDIT_PENDING", "PENDING", "DRAFT")
      .default("COMPLETED"),

  notes:
    Joi.string()
      .max(1000)
      .allow("", null),

  // ========================================
  // FACTURACIÓN
  // ========================================

  invoiceType:
    Joi.string()
      .valid("FACTURA", "BOLETA", "NOTA_VENTA")
      .required()
      .messages({
        "any.only": "El tipo de comprobante debe ser FACTURA, BOLETA o NOTA_VENTA",
        "any.required": "El tipo de comprobante (invoiceType) es obligatorio",
      }),

  clientDocument:
    Joi.string()
      .min(8)
      .max(15)
      .regex(/^[0-9A-Z-]+$/)
      .allow("", null)
      .messages({
        "string.pattern.base": "El documento del cliente solo permite números, letras y guiones",
      }),

  // ========================================
  // DETALLES
  // ========================================

  details:
    Joi.array()
      .items(
        Joi.object({
          productId:
            Joi.number()
              .integer()
              .positive()
              .required(),

          quantity:
            Joi.number()
              .positive()
              .required(),

          price:
            Joi.number()
              .min(0)
              .required(),
        }),
      )
      .min(1)
      .required(),

  // ========================================
  // PAGOS
  // ========================================

  payments:
    Joi.array()
      .items(
        Joi.object({
          paymentMethodId:
            Joi.number()
              .integer()
              .positive()
              .required(),

          amount: // 🔥 MODIFICADO: .min(0) para permitir créditos puros sin cuota inicial (0.00)
            Joi.number()
              .min(0)
              .required(),

          status: // 🔥 NUEVO: Permite definir si el pago está COMPLETED o PENDING (Deuda)
            Joi.string()
              .valid("PENDING", "COMPLETED")
              .default("COMPLETED"),

          dueDate: // 🔥 NUEVO: Permite asignar la fecha de vencimiento de la deuda
            Joi.date()
              .iso()
              .allow(null),

          reference:
            Joi.string()
              .max(255)
              .allow("", null),
        }),
      )
      .default([]),

});

// ========================================
// MIDDLEWARE
// ========================================

const validateCreateSale = (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Error de validación",
      errors: error.details.map(d => d.message),
    });
  }

  req.body = value;
  next();
};

module.exports = {
  validateCreateSale,
};
