// ========================================
// features/customers/hooks/useCustomers.js
// ========================================

import { useCallback, useEffect, useState } from "react";
import customerService from "../services/customer.service";

const initialFilters = {
  page: 1,
  limit: 10,
  search: "",
  city: "",
  isActive: undefined,
};

export function useCustomers() {
  const [customers, setCustomers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(initialFilters);

  // ========================================
  // FETCH
  // ========================================
  const fetchCustomers = useCallback(async (params) => {
    try {
      setLoading(true);
      const response = await customerService.getAll(params);

      setCustomers(response?.data?.data ?? []);
      setPagination(response?.data?.pagination ?? null);
    } catch (error) {
      console.error("Error loading customers:", error);
      setCustomers([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // ========================================
  // CUANDO CAMBIAN LOS FILTROS
  // ========================================
  useEffect(() => {
    fetchCustomers(filters);
  }, [filters, fetchCustomers]);

  // ========================================
  // ACTUALIZAR FILTROS
  // ========================================
  const updateFilters = useCallback((values) => {
    setFilters((prev) => ({
      ...prev,
      ...values,
    }));
  }, []);

  // ========================================
  // CONTROLES DE PAGINACIÓN
  // ========================================
  const nextPage = useCallback(() => {
    if (pagination && filters.page < pagination.totalPages) {
      updateFilters({ page: filters.page + 1 });
    }
  }, [filters.page, pagination, updateFilters]);

  const prevPage = useCallback(() => {
    if (filters.page > 1) {
      updateFilters({ page: filters.page - 1 });
    }
  }, [filters.page, updateFilters]);

  // ========================================
  // LIMPIAR FILTROS
  // ========================================
  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  // ========================================
  // RECARGAR
  // ========================================
  const refresh = useCallback(() => {
    fetchCustomers(filters);
  }, [fetchCustomers, filters]);

  return {
    customers,
    pagination,
    loading,
    filters,
    updateFilters,
    clearFilters,
    refresh,
    nextPage,
    prevPage,
  };
}
