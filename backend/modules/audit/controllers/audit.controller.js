// ========================================
// modules/audit/controllers/audit.controller.js
// ========================================

const prisma = require("../../../config/prisma.config");
const { successResponse, errorResponse } = require("../../auth/responses/auth.response");

exports.getAuditLogs = async (req, res) => {
    try {
        // 🔒 Seguridad Multi-tenant: Solo traemos logs que pertenezcan a la empresa del usuario actual
        const companyId = req.company.id;

        // Capturamos filtros opcionales de la URL (Query params) para paginación o búsquedas
        const { action, entityType, limit = 10, page = 1 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);

        // Construimos el filtro dinámico
        const whereClause = {
            companyId: Number(companyId),
        };

        if (action) whereClause.action = action.toUpperCase();
        if (entityType) whereClause.entityType = entityType;

        // Ejecutamos la consulta en la base de datos
        const [logs, total] = await prisma.$transaction([
            prisma.auditLog.findMany({
                where: whereClause,
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            role: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc" // Los más recientes primero
                },
                take: Number(limit),
                skip: skip
            }),
            prisma.auditLog.count({ where: whereClause })
        ]);

        // Devolvemos la respuesta formateada con metadatos de paginación
        return successResponse(res, {
            logs,
            pagination: {
                totalItems: total,
                totalPages: Math.ceil(total / Number(limit)),
                currentPage: Number(page),
                limit: Number(limit)
            }
        });

    } catch (error) {
        console.error("❌ Error al obtener AuditLogs:", error.message);
        return errorResponse(res, error, 500);
    }
};