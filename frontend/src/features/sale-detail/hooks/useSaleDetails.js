// ========================================
// hooks/useSaleDetails.js
// ========================================

import { useEffect, useState } from "react";

import { getSaleDetailsService } from "../services/saleDetail.service";

export const useSaleDetails = () => {
  const [loading, setLoading] = useState(true);

  const [saleDetails, setSaleDetails] = useState([]);

  const loadSaleDetails = async () => {
    try {
      setLoading(true);

      const response = await getSaleDetailsService();

      setSaleDetails(response.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSaleDetails();
  }, []);

  return {
    loading,

    saleDetails,

    reload: loadSaleDetails,
  };
};
