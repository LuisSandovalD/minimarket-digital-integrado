export const usePaymentMetrics = (payments) => {
  return {
    totalPayments: payments.length,

    totalAmount: payments.reduce((sum, p) => sum + Number(p.amount), 0),

    completed: payments.filter((p) => p.status === "COMPLETED").length,

    pending: payments.filter((p) => p.status === "PENDING").length,
  };
};
