// ========================================
// controllers/sale-detail.controller.js
// ========================================

const {

    getSaleDetails,

    getSaleDetail,

    getSaleDetailsBySale,

    getSaleDetailsByProduct,

} = require("../services/saledetail.service");

// ========================================
// GET ALL
// ========================================

const getSaleDetailsController =
    async (req, res, next) => {
        try {

            const data =
                await getSaleDetails(req.query);

            res.status(200).json({
                success: true,
                data,
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

            const data =
                await getSaleDetail(
                    Number(req.params.id)
                );

            res.status(200).json({
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

            const data =
                await getSaleDetailsBySale(
                    Number(req.params.saleId)
                );

            res.status(200).json({
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

            const data =
                await getSaleDetailsByProduct(
                    Number(req.params.productId)
                );

            res.status(200).json({
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