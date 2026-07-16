// ========================================
// PAYMENTS SERVICE - READ (QUERIES)
// ========================================

const paymentsRepositoryRead =
    require("../repositories/payments.repository.read");

// ========================================
// GET ALL
// ========================================

const getPayments = async (companyId, queryParams) => {
  return await paymentsRepositoryRead.findAll(companyId, queryParams);
};
// ========================================
// GET ONE
// ========================================

const getPayment = async (id) => {
  return await paymentsRepositoryRead.findById(id);
};

// ========================================
// GET BY SALE
// ========================================

const getPaymentsBySale = async (saleId) => {
  return await paymentsRepositoryRead.findBySale(saleId);
};

// ========================================
// GET BY PURCHASE
// ========================================

const getPaymentsByPurchase = async (purchaseId) => {
  return await paymentsRepositoryRead.findByPurchase(purchaseId);
};

module.exports = {
  getPayments,
  getPayment,
  getPaymentsBySale,
  getPaymentsByPurchase,
};
