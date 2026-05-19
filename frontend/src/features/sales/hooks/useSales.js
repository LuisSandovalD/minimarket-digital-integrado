// ========================================
// FEATURES / SALES / HOOKS
// ========================================

import { useEffect, useState } from "react";

import {
  getSales,
  createSale,
  cancelSale,
  returnSale,
} from "../services/sale.service";

// ========================================
// USE SALES
// ========================================

export const useSales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ======================================
  // FETCH SALES
  // ======================================

  const fetchSales = async (params = {}) => {
    try {
      setLoading(true);

      const data = await getSales(params);

      setSales(data);

      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ======================================
  // CREATE SALE
  // ======================================

  const addSale = async (payload) => {
    const newSale = await createSale(payload);

    setSales((prev) => [newSale, ...prev]);

    return newSale;
  };

  // ======================================
  // CANCEL SALE
  // ======================================

  const removeSale = async (id) => {
    await cancelSale(id);

    setSales((prev) =>
      prev.map((sale) =>
        sale.id === id
          ? { ...sale, status: "CANCELLED" }
          : sale
      )
    );
  };

  // ======================================
  // RETURN SALE
  // ======================================

  const refundSale = async (id, items) => {
    const res = await returnSale(id, items);

    // opcional: refresh total
    await fetchSales();

    return res;
  };

  // ======================================
  // INIT
  // ======================================

  useEffect(() => {
    fetchSales();
  }, []);

  return {
    sales,
    loading,
    error,

    fetchSales,
    addSale,
    removeSale,
    refundSale,
  };
};