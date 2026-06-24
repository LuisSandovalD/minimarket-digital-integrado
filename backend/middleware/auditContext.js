const { auditStorage } = require("../config/auditContext");

const auditContextMiddleware = (req, res, next) => {
    // Ajusta 'req.user' según cómo guarde tu middleware de JWT/Auth al usuario logueado
    const user = req.user;

    if (!user) {
        return next(); // Si es ruta pública o no está logueado, pasa de largo sin auditar
    }

    // Estructura de datos requerida por tu tabla AuditLog en Prisma
    const contextData = {
        userId: user.id,
        companyId: user.companyId,
        branchId: user.branchId || null,
        ipAddress: req.ip || req.headers["x-forwarded-for"] || "127.0.0.1",
        userAgent: req.headers["user-agent"] || "Unknown"
    };

    // Corre de forma aislada toda la petición dentro de este almacén
    auditStorage.run(contextData, () => {
        next();
    });
};

module.exports = { auditContextMiddleware };