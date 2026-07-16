const jwt = require("jsonwebtoken");
const prisma = require("../prisma/client");
const { auditStorage } = require("../config/auditContext");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Token requerido",
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Formato de token inválido",
      });
    }

    const token = authHeader.split(" ")[1];

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Token inválido o expirado",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        companyId: true,
        branchId: true,
        isActive: true,
        isDeleted: true,
      },
    });

    if (!user || !user.isActive || user.isDeleted) {
      return res.status(401).json({
        success: false,
        message: "Usuario inválido",
      });
    }

    req.user = user;
    req.companyId = user.companyId;

    const contextData = {
      userId: user.id,
      companyId: user.companyId,
      branchId: user.branchId || null,
      ipAddress: req.ip || req.headers["x-forwarded-for"] || "127.0.0.1",
      userAgent: req.headers["user-agent"] || "Unknown",
    };

    auditStorage.run(contextData, () => {
      next();
    });

  } catch (error) {
    console.error("AUTH ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Error interno de autenticación",
    });
  }
};
