export const mapConfigurationToForm = (data) => {
  return {
    // 🏢 COMPANY
    companyName: data.companyName ?? "",
    logo: data.logo ?? null,

    // 🎨 UI
    theme: data.theme ?? "light",
    language: data.language ?? "es",
    currency: data.currency ?? "PEN",

    // 💰 TAX
    taxRate: Number(data.taxRate ?? 0),
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
    passwordExpiresDays: data.passwordExpiresDays ?? null,
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

export const mapFormToPayload = (form) => {
  return {
    ...form,
    taxRate: Number(form.taxRate),
    lowStockThreshold: Number(form.lowStockThreshold),
    expiringDaysAlert: Number(form.expiringDaysAlert),
    sessionTimeout: Number(form.sessionTimeout),
    passwordMinLength: Number(form.passwordMinLength),
    maxLoginAttempts: Number(form.maxLoginAttempts),
  };
};
