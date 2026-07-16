// ========================================
// controllers/sale-detail.controller.js
// ========================================

const {
  getSaleDetails,
  getSaleDetail,
  getSaleDetailsBySale,
  getSaleDetailsByProduct,
} = require("../services/saleDetail.service"); // 🚀 Sincronizado con el nombre de archivo kebab-case

// ========================================
// GET ALL (Soporta Paginación, Filtros Avanzados y Roles)
// ========================================
const getSaleDetailsController =
    async (req, res, next) => {
      try {
        const currentUser = req.user;

        if (!currentUser) {
          return res.status(401).json({
            success: false,
            message: "No autorizado: No se encontraron datos de autenticación",
          });
        }

        // Mapeamos los filtros validados por Joi pasados en req.query
        const queryFilters = {
          page: Number(req.query.page),
          limit: Number(req.query.limit),
          search: req.query.search,
          itemType: req.query.itemType,
          companyId: req.query.companyId ? Number(req.query.companyId) : undefined,
        };

        // Aplicar restricción estricta de aislamiento de datos si es Vendedor
        const rolesPermitidos = ["ADMIN", "SUPERVISOR", "MANAGER"];
        const userRol = String(currentUser.role || currentUser.rol || "").toUpperCase();

        if (!rolesPermitidos.includes(userRol)) {
          // Inyectamos el ID del usuario en los filtros para restringir a sus propias ventas
          queryFilters.userId = Number(currentUser.id);
        }

        // getSaleDetails ahora retorna la estructura paginada: { info: {...}, results: [...] }
        const paginatedData = await getSaleDetails(queryFilters);

        return res.status(200).json({
          success: true,
          info: paginatedData.info,       // Meta de paginación (total, page, totalPages, limit)
          results: paginatedData.results, // Filas/Partidas resultantes
        });

      } catch (error) {
        next(error);
      }
    };

// ========================================
// GET ONE
// ========================================
const getSaleDetailController =
    async (req, res, next) => {
      try {
        const data = await getSaleDetail(Number(req.params.id));

        if (!data) {
          return res.status(404).json({
            success: false,
            message: "El detalle de la transacción solicitado no existe",
          });
        }

        // 🛡️ Filtro de seguridad multi-inquilino para evitar visualización cruzada
        const currentUser = req.user;
        const rolesPermitidos = ["ADMIN", "SUPERVISOR", "MANAGER"];
        const userRol = String(currentUser?.role || currentUser?.rol || "").toUpperCase();

        if (currentUser && !rolesPermitidos.includes(userRol)) {
          // Comparamos contra la propiedad corregida 'sellerId' de la relación 'sale'
          if (data.sale?.sellerId && Number(data.sale.sellerId) !== Number(currentUser.id)) {
            return res.status(403).json({
              success: false,
              message: "Acceso denegado: No tienes autorización para visualizar este registro.",
            });
          }
        }

        return res.status(200).json({
          success: true,
          data,
        });

      } catch (error) {
        next(error);
      }
    };

// ========================================
// GET BY SALE
// ========================================
const getSaleDetailsBySaleController =
    async (req, res, next) => {
      try {
        const currentUser = req.user;
        const rolesPermitidos = ["ADMIN", "SUPERVISOR", "MANAGER"];
        const userRol = String(currentUser?.role || currentUser?.rol || "").toUpperCase();

        let sellerIdRestriction = undefined;
        if (currentUser && !rolesPermitidos.includes(userRol)) {
          sellerIdRestriction = Number(currentUser.id);
        }

        const data = await getSaleDetailsBySale(
          Number(req.params.saleId),
          sellerIdRestriction,
        );

        return res.status(200).json({
          success: true,
          data,
        });

      } catch (error) {
        next(error);
      }
    };

// ========================================
// GET BY PRODUCT
// ========================================
const getSaleDetailsByProductController =
    async (req, res, next) => {
      try {
        const currentUser = req.user;
        const rolesPermitidos = ["ADMIN", "SUPERVISOR", "MANAGER"];
        const userRol = String(currentUser?.role || currentUser?.rol || "").toUpperCase();

        let sellerIdRestriction = undefined;
        if (currentUser && !rolesPermitidos.includes(userRol)) {
          sellerIdRestriction = Number(currentUser.id);
        }

        const data = await getSaleDetailsByProduct(
          Number(req.params.productId),
          sellerIdRestriction,
        );

        return res.status(200).json({
          success: true,
          data,
        });

      } catch (error) {
        next(error);
      }
    };

module.exports = {
  getSaleDetailsController,
  getSaleDetailController,
  getSaleDetailsBySaleController,
  getSaleDetailsByProductController,
};
