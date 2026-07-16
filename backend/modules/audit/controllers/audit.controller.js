const prisma = require("../../../config/prisma.config");
const {
  successResponse,
  errorResponse,
} = require("../../auth/responses/auth.response");

exports.getAuditLogs = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const { action, entityType, limit = 10, page = 1 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const whereClause = {
      companyId: Number(companyId),
    };

    if (action) whereClause.action = action.toUpperCase();
    if (entityType) whereClause.entityType = entityType;

    const [logs, total] = await prisma.$transaction([
      prisma.auditLog.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: Number(limit),
        skip,
      }),
      prisma.auditLog.count({
        where: whereClause,
      }),
    ]);

    return successResponse(res, {
      logs,
      pagination: {
        totalItems: total,
        totalPages: Math.ceil(total / Number(limit)),
        currentPage: Number(page),
        limit: Number(limit),
      },
    });
  } catch (error) {
    console.error("❌ Error al obtener AuditLogs:", error.message);

    return errorResponse(res, error, 500);
  }
};
