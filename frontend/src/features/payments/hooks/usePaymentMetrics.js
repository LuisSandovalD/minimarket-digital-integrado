// ========================================
// FEATURES / PAYMENTS / HOOKS
// usePaymentMetrics.js
// ========================================

export const usePaymentMetrics = (payments = []) => {
  const safePayments = Array.isArray(payments) ? payments : [];

  const totalPayments = safePayments.length;

  const totalAmount = safePayments.reduce((total, payment) => {
    const amount =
      payment.amount ??
      payment.totalAmount ??
      payment.total ??
      payment.paymentAmount ??
      0;

    return total + Number(amount);
  }, 0);

  const completed = safePayments.filter((payment) => {
    const status = String(payment.status || "").toUpperCase();

    return [
      "COMPLETED",
      "PAID",
      "SUCCESS",
      "SUCCESSFUL",
      "PAGADO",
      "COMPLETADO",
    ].includes(status);
  }).length;

  const pending = safePayments.filter((payment) => {
    const status = String(payment.status || "").toUpperCase();

    return ["PENDING", "PENDIENTE", "WAITING"].includes(status);
  }).length;

  return {
    totalPayments,
    totalAmount,
    completed,
    pending,
  };
};
