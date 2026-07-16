// ========================================
// validators/update-sale.validator.js
// ========================================

const Joi = require("joi");

// 1. Definimos el esquema de validación interno con Joi
const updateSaleSchema = Joi.object({
  customerId: Joi.number().integer().positive().allow(null),
  discount: Joi.number().min(0).default(0),
  notes: Joi.string().max(1000).allow("", null),
  details: Joi.array()
    .items(
      Joi.object({
        productId: Joi.number().integer().positive().required(),
        quantity: Joi.number().positive().required(),
        price: Joi.number().min(0).required(),
      }),
    )
    .min(1)
    .required(),
});

// 2. Exportamos nominalmente como un MIDDLEWARE nativo para Express
module.exports = {
  updateSaleValidator: (req, res, next) => {
    // Validamos el cuerpo de la petición (req.body) contra nuestro esquema
    const { error, value } = updateSaleSchema.validate(req.body, {
      abortEarly: false, // Trae todos los errores acumulados, no solo el primero
      stripUnknown: true, // Limpia campos basura que no pertenezcan al esquema
    });

    if (error) {
      return res.status(400).json({
        status: "error",
        message: "Error de validación en los datos enviados.",
        errors: error.details.map((detail) => ({
          field: detail.path.join("."),
          message: detail.message,
        })),
      });
    }

    // Sobrescribimos req.body con los valores limpios y formateados por Joi
    req.body = value;
    next();
  },
};
