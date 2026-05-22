const { z } = require("zod");

const updateConfigurationSchema =
  z.object({
    companyName:
      z.string().max(255).optional(),

    logo:
      z.string().url().optional(),

    theme:
      z.enum([
        "light",
        "dark",
      ]).optional(),

    language:
      z.string().max(10).optional(),

    taxRate:
      z.number()
        .min(0)
        .max(100)
        .optional(),

    currency:
      z.string()
        .max(10)
        .optional(),

    defaultTaxEnabled:
      z.boolean().optional(),

    notifyLowStock:
      z.boolean().optional(),

    lowStockThreshold:
      z.number()
        .int()
        .min(0)
        .optional(),

    notifyExpiring:
      z.boolean().optional(),

    expiringDaysAlert:
      z.number()
        .int()
        .min(1)
        .optional(),

    requireTwoFactor:
      z.boolean().optional(),

    sessionTimeout:
      z.number()
        .int()
        .min(300)
        .optional(),

    passwordMinLength:
      z.number()
        .int()
        .min(6)
        .max(50)
        .optional(),

    passwordExpiresDays:
      z.number()
        .int()
        .min(1)
        .nullable()
        .optional(),

    requirePasswordChange:
      z.boolean().optional(),

    allowMultipleLogins:
      z.boolean().optional(),

    autoBackup:
      z.boolean().optional(),

    backupFrequency:
      z.enum([
        "DAILY",
        "WEEKLY",
        "MONTHLY",
      ]).optional(),

    maxLoginAttempts:
      z.number()
        .int()
        .min(1)
        .max(10)
        .optional(),

    allowExport:
      z.boolean().optional(),

    allowImport:
      z.boolean().optional(),
  });

module.exports = {
  updateConfigurationSchema,
};