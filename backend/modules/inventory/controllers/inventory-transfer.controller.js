// ========================================
// controllers/inventory-transfer.controller.js
// ========================================

const service =
  require("../services/inventory.service");

// ========================================
// TRANSFER STOCK
// ========================================

exports.transferStock =
  async (
    req,
    res
  ) => {

    try {

      const result =
        await service.transferStock(

          Number(
            req.body.originInventoryId
          ),

          Number(
            req.body.targetInventoryId
          ),

          Number(
            req.body.quantity
          ),

          req.user.id
        );

      res.json({

        success: true,

        message:
          "Transferencia realizada correctamente",

        data:
          result,
      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,
      });

    }

  };