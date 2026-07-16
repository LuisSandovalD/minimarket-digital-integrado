// ========================================
// validators/sale-detail.validator.js
// ========================================

const Joi = require("joi");

// ========================================
// SCHEMAS DE PARÁMETROS (URL Params)
// ========================================

const idSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required(),
});

const saleIdSchema = Joi.object({
  saleId: Joi.number()
    .integer()
    .positive()
    .required(),
});

const productIdSchema = Joi.object({
  productId: Joi.number()
    .integer()
    .positive()
    .required(),
});

// ========================================
// SCHEMA DE CONSULTAS (Query Params con Paginación y Filtros)
// ========================================
const querySchema = Joi.object({
  // Parámetros estándar de paginación sincronizados con Ventas
  page: Joi.number()
    .integer()
    .min(1)
    .default(1)
    .optional(),

  limit: Joi.number()
    .integer()
    .min(1)
    .max(100) // Techo operativo para proteger el rendimiento de la DB
    .default(10)
    .optional(),

  // Filtros analíticos avanzados
  search: Joi.string()
    .trim()
    .allow("")
    .optional(),

  itemType: Joi.string()
    .trim()
    .uppercase()
    .allow("")
    .optional(),

  companyId: Joi.number()
    .integer()
    .positive()
    .optional()
    .allow(""),
});

// ========================================
// MIDDLEWARES DE VALIDACIÓN
// ========================================

const validateSaleDetailId = (req, res, next) => {
  const { error } = idSchema.validate(req.params);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};

const validateSaleId = (req, res, next) => {
  const { error } = saleIdSchema.validate(req.params);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};

const validateProductId = (req, res, next) => {
  const { error } = productIdSchema.validate(req.params);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};

// 🚀 MIDDLEWARE NUEVO: Paginación y Filtros de Búsqueda
const validateSaleDetailQuery = (req, res, next) => {
  // .validate() con abortEarly false o asignación limpia
  const { error, value } = querySchema.validate(req.query, {
    stripUnknown: true, // Remueve parámetros basura de la URL no declarados en el esquema
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: `Error en parámetros de consulta: ${error.details[0].message}`,
    });
  }

  // Reasignamos los valores sanitizados y con defaults aplicados a req.query
  req.query = value;
  next();
};

module.exports = {
  validateSaleDetailId,
  validateSaleId,
  validateProductId,
  validateSaleDetailQuery, // 🚀 Exportado para proteger la ruta principal GET "/"
};
