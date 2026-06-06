import { useEffect, useState } from "react";

import { getPaymentsService } from "../services/payment.service";

export const usePayments = () => {
  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);

  const loadPayments = async () => {
    try {
      const response = await getPaymentsService();

      setPayments(response.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  return {
    payments,
    loading,
    reload: loadPayments,
  };
};
