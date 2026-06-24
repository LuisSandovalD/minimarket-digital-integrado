// ========================================
// config/auditContext.js
// ========================================

const { AsyncLocalStorage } = require("async_hooks");

// Espacio aislado para guardar los datos de auditoría de la request activa
const auditStorage = new AsyncLocalStorage();

module.exports = {
    auditStorage
};