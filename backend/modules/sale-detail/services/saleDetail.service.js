// ========================================
// services/sale-detail.service.js
// ========================================

const repository =
    require("../repositories/saleDetail.repository");

// ========================================
// GET ALL
// ========================================

const getSaleDetails =
    async () => {
        return repository.findAll();
    };

// ========================================
// GET ONE
// ========================================

const getSaleDetail =
    async (id) => {
        return repository.findById(id);
    };

// ========================================
// GET BY SALE
// ========================================

const getSaleDetailsBySale =
    async (saleId) => {
        return repository.findBySaleId(saleId);
    };

// ========================================
// GET BY PRODUCT
// ========================================

const getSaleDetailsByProduct =
    async (productId) => {
        return repository.findByProductId(productId);
    };

module.exports = {

    getSaleDetails,

    getSaleDetail,

    getSaleDetailsBySale,

    getSaleDetailsByProduct,

};