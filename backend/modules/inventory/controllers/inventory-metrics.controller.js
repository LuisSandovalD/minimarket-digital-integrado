// ========================================
// controllers/inventory-metrics.controller.js
// ========================================

const service =
  require("../services/inventory.service");

// ========================================
// GET INVENTORY METRICS
// ========================================

exports.getInventoryMetrics =
  async (
    req,
    res,
  ) => {

    try {

      const metrics =
        await service.getInventoryMetrics(
          req.user.companyId,
        );

      res.json({

        success: true,

        data:
          metrics,
      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,
      });

    }

  };
