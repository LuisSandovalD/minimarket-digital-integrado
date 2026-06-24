// =========================================================================
// features/configuration/utils/configuration.mapper.js
// =========================================================================

/**
 * Transforma la data cruda que viene de la API en un objeto
 * plano y seguro para inicializar el estado de un formulario.
 * * @param {Object} data - Objeto de configuración retornado por la API (con relación prisma 'company')
 * @returns {Object} Estructura aplanada lista para los inputs del formulario
 */
export const mapConfigurationToForm = (data) => {
  if (!data) return {};

  return {
    // 🏢 COMPANY (Extraídos directamente del nodo anidado real de la API)
    name: data.company?.name ?? "",
    ruc: data.company?.ruc ?? "",
    email: data.company?.email ?? "",
    logo: data.company?.logo ?? "", // Controlado con "" para evitar errores de React en inputs

    // 🎨 UI
    theme: data.theme ?? "system",
    language: data.language ?? "es",
    currency: data.currency ?? "PEN",

    // 💰 TAX
    taxRate:
      data.taxRate !== undefined && data.taxRate !== null
        ? Number(data.taxRate)
        : 0,
    defaultTaxEnabled: data.defaultTaxEnabled ?? true,

    // 📦 INVENTORY
    notifyLowStock: data.notifyLowStock ?? true,
    lowStockThreshold: data.lowStockThreshold ?? 5,
    notifyExpiring: data.notifyExpiring ?? true,
    expiringDaysAlert: data.expiringDaysAlert ?? 30,

    // 🔐 SECURITY
    requireTwoFactor: data.requireTwoFactor ?? false,
    sessionTimeout: data.sessionTimeout ?? 3600,
    passwordMinLength: data.passwordMinLength ?? 8,
    passwordExpiresDays: data.passwordExpiresDays ?? "", // "" previene crashes en inputs de tipo número
    requirePasswordChange: data.requirePasswordChange ?? false,
    allowMultipleLogins: data.allowMultipleLogins ?? true,
    maxLoginAttempts: data.maxLoginAttempts ?? 5,

    // 🔄 SYSTEM
    autoBackup: data.autoBackup ?? true,
    backupFrequency: data.backupFrequency ?? "DAILY",
    allowExport: data.allowExport ?? true,
    allowImport: data.allowImport ?? true,
  };
};

/**
 * Sanitiza y castea los datos del formulario plano antes de enviarlos al backend.
 * Agrupa la información corporativa en el objeto anidado 'company' esperado por Zod y Prisma.
 * * @param {Object} form - Estado actual del formulario plano en el frontend
 * @returns {Object} Payload estructurado listo para ConfigurationService.update()
 */
export const mapFormToPayload = (form) => {
  if (!form) return {};

  // Extraemos las variables corporativas del estado plano
  const { name, ruc, email, logo, ...rest } = form;

  return {
    ...rest, // Mantenemos los parámetros generales (theme, taxRate, etc.) en la raíz

    // Casteos numéricos rigurosos para cumplir con las reglas del esquema Zod
    taxRate: form.taxRate === "" ? 0 : Number(form.taxRate),
    lowStockThreshold:
      form.lowStockThreshold === "" ? 0 : Number(form.lowStockThreshold),
    expiringDaysAlert:
      form.expiringDaysAlert === "" ? 30 : Number(form.expiringDaysAlert),
    sessionTimeout:
      form.sessionTimeout === "" ? 3600 : Number(form.sessionTimeout),
    passwordMinLength:
      form.passwordMinLength === "" ? 8 : Number(form.passwordMinLength),
    maxLoginAttempts:
      form.maxLoginAttempts === "" ? 5 : Number(form.maxLoginAttempts),

    // Tratamiento especial para campos anulables (nullables) de Prisma
    passwordExpiresDays:
      form.passwordExpiresDays === "" || form.passwordExpiresDays === null
        ? null
        : Number(form.passwordExpiresDays),

    // =========================================================================
    // ENCAPSULAMIENTO CORPORATIVO
    // Construimos el nodo estructurado limpio para la transacción del Backend
    // =========================================================================
    company: {
      name: name.trim(),
      ruc: ruc.trim(),
      email: email.trim(),
      logo: logo === "" ? null : logo, // Guardar null si no hay URL remueve el logo viejo en DB
    },
  };
};
