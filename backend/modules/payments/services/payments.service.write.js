// ========================================
// PAYMENTS SERVICE - WRITE (COMMANDS)
// ========================================

const paymentsRepositoryWrite =
    require("../repositories/payments.repository.write");

// ========================================
// CREATE
// ========================================

const createPayment = async (data) => {
  return await paymentsRepositoryWrite.create(data);
};

// ========================================
// UPDATE
// ========================================

const updatePayment = async (id, data) => {
  return await paymentsRepositoryWrite.update(id, data);
};

// ========================================
// DELETE
// ========================================

const deletePayment = async (id) => {
  return await paymentsRepositoryWrite.delete(id);
};

module.exports = {
  createPayment,
  updatePayment,
  deletePayment,
};
