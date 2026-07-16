// ========================================
// controllers/inventory-history.controller.js
// ========================================

const service =
  require("../services/inventory.service");

// ========================================
// GET HISTORY BY INVENTORY
// ========================================

exports.getHistoryByInventory =
  async (
    req,
    res,
  ) => {

    try {

      const history =
        await service.getHistoryByInventory(

          Number(
            req.params.inventoryId,
          ),
        );

      res.json({

        success: true,

        data:
          history,
      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,
      });

    }

  };

// ========================================
// GET HISTORY BY DATE RANGE
// ========================================

exports.getHistoryByDateRange =
  async (
    req,
    res,
  ) => {

    try {

      const history =
        await service.getHistoryByDateRange(

          req.user.companyId,

          new Date(
            req.query.startDate,
          ),

          new Date(
            req.query.endDate,
          ),
        );

      res.json({

        success: true,

        data:
          history,
      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,
      });

    }

  };
