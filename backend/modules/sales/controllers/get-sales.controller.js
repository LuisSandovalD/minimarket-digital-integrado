// ========================================
// controllers/get-sales.controller.js
// ========================================

const {
  getSalesService,
  getSaleService,
  getSaleByNumberService,
} = require("../services/sale-query.service");

module.exports = {

  // ========================================
  // GET SALES (Control de Visibilidad Jerárquico)
  // ========================================
  getSalesController: async (req, res, next) => {
    try {
      const currentUser = req.user;

      if (!currentUser || !currentUser.companyId) {
        return res.status(401).json({
          success: false,
          message: "No autorizado: Contexto de empresa no identificado.",
        });
      }

      // 1. 🔒 FILTRO DE EMPRESA OBLIGATORIO (Aislamiento Multi-tenant)
      const tenantCompanyId = Number(currentUser.companyId);

      // Sanitización de paginación básica
      const page = req.query.page ? Math.max(1, parseInt(req.query.page, 10)) : 1;
      const limit = req.query.limit ? Math.max(1, parseInt(req.query.limit, 10)) : 10;

      // Evaluar roles
      const userRol = String(currentUser.role || currentUser.rol || "").toUpperCase();
      const isAdmin = userRol === "ADMIN";

      let assignedUserId = undefined;

      // 2. 👁️ APLICACIÓN DE POLÍTICAS DE VISIBILIDAD JERÁRQUICA
      if (isAdmin) {
        // ✅ Si es ADMIN: Puede ver todo lo de su empresa.
        // Si además el admin seleccionó un empleado específico en un combobox del frontend, lo filtramos.
        assignedUserId = req.query.userId && String(req.query.userId).trim() !== ""
          ? Number(req.query.userId)
          : undefined;
      } else {
        // 🔒 Si NO es admin (Vendedor, Gerente, Supervisor, etc.): SÓLO ve sus propias ventas.
        assignedUserId = Number(currentUser.id);
      }

      // Construcción del objeto de filtros sanitizado
      const filters = {
        companyId: tenantCompanyId, // Bloqueado a su entorno corporativo
        branchId: req.query.branchId && String(req.query.branchId).trim() !== "" ? Number(req.query.branchId) : undefined,
        customerId: req.query.customerId && String(req.query.customerId).trim() !== "" ? Number(req.query.customerId) : undefined,
        userId: assignedUserId, // Aplica la restricción jerárquica calculada arriba
        search: req.query.search && String(req.query.search).trim() !== "" ? String(req.query.search).trim() : undefined,
        status: req.query.status && String(req.query.status).trim() !== "" ? String(req.query.status).trim() : undefined,
        paymentStatus: req.query.paymentStatus && String(req.query.paymentStatus).trim() !== "" ? String(req.query.paymentStatus).trim() : undefined,
        startDate: req.query.startDate && String(req.query.startDate).trim() !== "" ? String(req.query.startDate) : undefined,
        endDate: req.query.endDate && String(req.query.endDate).trim() !== "" ? String(req.query.endDate) : undefined,
        minTotal: req.query.minTotal && String(req.query.minTotal).trim() !== "" ? Number(req.query.minTotal) : undefined,
        maxTotal: req.query.maxTotal && String(req.query.maxTotal).trim() !== "" ? Number(req.query.maxTotal) : undefined,
        sortBy: req.query.sortBy && String(req.query.sortBy).trim() !== "" ? String(req.query.sortBy) : "createdAt",
        sortOrder: req.query.sortOrder && String(req.query.sortOrder).toLowerCase() === "asc" ? "asc" : "desc",
        page,
        limit,
      };

      const result = await getSalesService(filters);

      return res.json({
        success: true,
        meta: result.meta,
        data: result.data,
      });
    } catch (error) {
      next(error);
    }
  },

  // ========================================
  // GET SALE BY ID (Protección de rutas individuales)
  // ========================================
  getSaleController: async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const currentUser = req.user;

      if (!req.params.id || Number.isNaN(id) || !Number.isInteger(id)) {
        return res.status(400).json({ success: false, message: "ID de venta inválido." });
      }

      const sale = await getSaleService(id);

      if (!sale) {
        return res.status(404).json({ success: false, message: "La venta solicitada no existe." });
      }

      // 🛡️ CONTROL MULTI-TENANT: ¿Pertenece a otra empresa? 403 de inmediato.
      if (Number(sale.companyId) !== Number(currentUser.companyId)) {
        return res.status(403).json({
          success: false,
          message: "Acceso denegado: Esta transacción no pertenece a tu organización.",
        });
      }

      // 🛡️ CONTROL JERÁRQUICO: Si no es Admin, verifica si es el dueño de la venta
      const userRol = String(currentUser?.role || currentUser?.rol || "").toUpperCase();
      if (userRol !== "ADMIN" && Number(sale.userId) !== Number(currentUser.id)) {
        return res.status(403).json({
          success: false,
          message: "Acceso denegado: No tienes autorización para ver las ventas de otros usuarios.",
        });
      }

      return res.json({
        success: true,
        data: sale,
      });
    } catch (error) {
      next(error);
    }
  },
};