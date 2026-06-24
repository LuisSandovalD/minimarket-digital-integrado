// ========================================
// controllers/get-sales.controller.js
// ========================================

const {
  getSalesService,
  getSaleService,
  getSaleByNumberService, // 🚀 Añadido por consistencia del módulo de consultas
} = require("../services/sale-query.service");

module.exports = {

  // ========================================
  // GET SALES (Filtros Avanzados, Paginación y Roles)
  // ========================================
  getSalesController: async (req, res, next) => {
    try {
      const currentUser = req.user;

      if (!currentUser) {
        return res.status(401).json({
          success: false,
          message: "No autorizado: No se encontraron datos de usuario en la petición",
        });
      }

      // Sanitización estricta de Paginación para evitar divisiones por cero o valores negativos
      const page = req.query.page ? Math.max(1, parseInt(req.query.page, 10)) : 1;
      const limit = req.query.limit ? Math.max(1, parseInt(req.query.limit, 10)) : 10;

      // Evaluar Rol para aplicar Restricción de Vendedor de manera estricta
      const rolesPermitidos = ["ADMIN", "SUPERVISOR", "MANAGER"];
      const userRol = String(currentUser.role || currentUser.rol || "").toUpperCase();

      let assignedUserId = undefined;

      if (!rolesPermitidos.includes(userRol)) {
        // 🔒 Forzamos que el vendedor de piso solo vea sus propias ventas
        assignedUserId = Number(currentUser.id);
      } else {
        // 🔓 El administrador/supervisor puede ver todo o filtrar por un empleado específico en el combobox
        assignedUserId = req.query.userId && String(req.query.userId).trim() !== ""
          ? Number(req.query.userId)
          : undefined;
      }

      // Construcción del Objeto de Filtros Completo (Sanitizado contra strings vacíos "")
      const filters = {
        companyId: req.query.companyId && String(req.query.companyId).trim() !== "" ? Number(req.query.companyId) : undefined,
        branchId: req.query.branchId && String(req.query.branchId).trim() !== "" ? Number(req.query.branchId) : undefined,
        customerId: req.query.customerId && String(req.query.customerId).trim() !== "" ? Number(req.query.customerId) : undefined,
        userId: assignedUserId,
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

      // Llamada al servicio analítico
      const result = await getSalesService(filters);

      // 🎯 RETORNO HOMOGÉNEO DE LA RESPUESTA PARA EL HOOK (success, meta, data)
      return res.json({
        success: true,
        meta: result.meta,
        data: result.data, // Array estructurado con totalProducts, subtotales e include de clientes/detalles
      });
    } catch (error) {
      next(error);
    }
  },

  // ========================================
  // GET SALE BY ID
  // ========================================
  getSaleController: async (req, res, next) => {
    try {
      const id = Number(req.params.id);

      if (!req.params.id || Number.isNaN(id) || !Number.isInteger(id)) {
        return res.status(400).json({
          success: false,
          message: "Parámetro 'id' inválido o faltante en la URL",
        });
      }

      // Llama al servicio blindado con casteo numérico
      const sale = await getSaleService(id);

      if (!sale) {
        return res.status(404).json({
          success: false,
          message: "La transacción solicitada no existe en el sistema",
        });
      }

      // Control de brecha de seguridad a nivel de datos (Data Leakage)
      const currentUser = req.user;
      const rolesPermitidos = ["ADMIN", "SUPERVISOR", "MANAGER"];
      const userRol = String(currentUser?.role || currentUser?.rol || "").toUpperCase();

      if (currentUser && !rolesPermitidos.includes(userRol)) {
        if (Number(sale.userId) !== Number(currentUser.id)) {
          return res.status(403).json({
            success: false,
            message: "Acceso denegado: No tienes autorización para auditar esta venta.",
          });
        }
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