import { useState } from "react";

import { usePaymentMetrics } from "./usePaymentMetrics";
import { usePayments } from "./usePayments";

export const usePaymentsPage = () => {
  const { payments, loading, reload } = usePayments();

  const metrics = usePaymentMetrics(payments);

  const [selectedPayment, setSelectedPayment] = useState(null);

  const [detailOpen, setDetailOpen] = useState(false);

  const openDetail = (payment) => {
    setSelectedPayment(payment);
    setDetailOpen(true);
  };

  return {
    payments,
    loading,
    reload,
    metrics,

    detailOpen,
    selectedPayment,

    setDetailOpen,

    openDetail,
  };
};
