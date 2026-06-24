// ========================================
// modules/notification/validations/notification.validation.js
// ========================================

const Joi = require('joi');
const { NOTIFICATION_TYPES } = require("../constants/notification.constants");

// Validador sincrónico para query string params (?type=LOW_STOCK)
const getNotificationsQuerySchema = Joi.object({
  type: Joi.string()
    .valid(...Object.values(NOTIFICATION_TYPES))
    .messages({
      'any.only': 'El tipo de alerta enviado no corresponde a un miembro válido de NotificationType'
    })
});

const createSchema = Joi.object({});
const updateSchema = Joi.object({});

module.exports = {
  getNotificationsQuerySchema,
  createSchema,
  updateSchema
};