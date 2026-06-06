// ========================================
// features/customers/hooks/useCustomers.js
// ========================================

import { useCallback, useEffect, useState } from "react";

import customerService from "../services/customer.service";

// ========================================
// HOOK
// ========================================

export function useCustomers() {
  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(true);

  // ========================================
  // FETCH
  // ========================================

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);

      const response = await customerService.getAll();

      setCustomers(response?.data?.data || []);
    } catch (error) {
      console.error("Error loading customers:", error);

      setCustomers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ========================================
  // INITIAL LOAD
  // ========================================

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCustomers();
  }, [fetchCustomers]);

  // ========================================
  // RETURN
  // ========================================

  return {
    customers,

    loading,

    setCustomers,

    fetchCustomers,
  };
}
