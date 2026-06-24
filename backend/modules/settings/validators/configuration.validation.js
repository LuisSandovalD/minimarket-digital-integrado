const { z } = require("zod");

// =========================================================================
// ESQUEMA ANIDADO DE LA EMPRESA (Corregido sin ID estricto para el Payload)
// =========================================================================
const companyNestedSchema = z.object({
  id: z.number().int().optional(), // 👈 Cambiado a opcional para que no rompa al actualizar
  name: z.string().min(1, "El nombre de la empresa es requerido").max(255).optional(), // Opcional por si mandan parches parciales
  ruc: z.string().max(20, "El RUC no puede exceder los 20 caracteres").optional(),
  email: z.string().email("Formato de correo inválido").max(255).optional(),
  logo: z.string().max(500, "La URL del logo es demasiado larga").nullable().optional(),
});

// =========================================================================
// ESQUEMA DE CONFIGURACIÓN PRINCIPAL
// =========================================================================
const updateConfigurationSchema = z.object({
  theme: z.enum(["light", "dark", "system"]).optional(),
  language: z.string().max(10).optional(),
  currency: z.string().max(10).optional(),

  taxRate: z.coerce.number().min(0).max(100).optional(),
  defaultTaxEnabled: z.boolean().optional(),

  notifyLowStock: z.boolean().optional(),
  lowStockThreshold: z.number().int().min(0).optional(),
  notifyExpiring: z.boolean().optional(),
  expiringDaysAlert: z.number().int().min(1).optional(),

  requireTwoFactor: z.boolean().optional(),
  sessionTimeout: z.number().int().min(300).optional(),
  passwordMinLength: z.number().int().min(6).max(50).optional(),
  passwordExpiresDays: z.number().int().min(1).nullable().optional(),
  requirePasswordChange: z.boolean().optional(),
  allowMultipleLogins: z.boolean().optional(),
  maxLoginAttempts: z.number().int().min(1).max(10).optional(),

  autoBackup: z.boolean().optional(),
  backupFrequency: z.enum(["DAILY", "WEEKLY", "MONTHLY"]).optional(),
  allowExport: z.boolean().optional(),
  allowImport: z.boolean().optional(),

  company: companyNestedSchema.optional(),
});

module.exports = {
  updateConfigurationSchema,
};