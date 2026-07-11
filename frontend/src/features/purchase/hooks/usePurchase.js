import { useCallback, useEffect, useState } from "react";
import {
  createPurchaseService,
  deletePurchaseService,
  getPurchasesService,
  updatePurchaseService,
} from "../services/purchase.service";

export default function usePurchase() {
  // ========================================
  // STATES
  // ========================================

  const [purchases, setPurchases] = useState([]);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false,
  });

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    status: "",
    supplierId: "",
    buyerId: "",
    branchId: "",
    startDate: "",
    endDate: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // ========================================
  // FETCH
  // ========================================

  const fetchPurchases = useCallback(
    async (newFilters = {}) => {
      try {
        setLoading(true);

        const params = {
          ...filters,
          ...newFilters,
        };

        const response = await getPurchasesService(params);

        setPurchases(response.data || []);

        setPagination(
          response.pagination || {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 0,
            hasNext: false,
            hasPrevious: false,
          },
        );

        setFilters(params);
      } catch (error) {
        console.error(error);
        setPurchases([]);
      } finally {
        setLoading(false);
      }
    },
    [filters],
  );

  // ========================================
  // SEARCH
  // ========================================

  function searchPurchases(searchFilters) {
    fetchPurchases({
      ...searchFilters,
      page: 1,
    });
  }

  // ========================================
  // CLEAR FILTERS
  // ========================================

  function clearFilters() {
    fetchPurchases({
      page: 1,
      limit: 10,
      search: "",
      status: "",
      supplierId: "",
      buyerId: "",
      branchId: "",
      startDate: "",
      endDate: "",
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  }

  // ========================================
  // CHANGE PAGE
  // ========================================

  function changePage(page) {
    fetchPurchases({
      page,
    });
  }

  // ========================================
  // CHANGE LIMIT
  // ========================================

  function changeLimit(limit) {
    fetchPurchases({
      page: 1,
      limit,
    });
  }

  // ========================================
  // CREATE
  // ========================================

  async function createPurchase(form) {
    try {
      setActionLoading(true);

      if (!form.details?.length) {
        throw new Error("Debe agregar productos.");
      }

      const payload = {
        supplierId: Number(form.supplierId),
        notes: form.notes || "",
        details: form.details.map((item) => ({
          productId: Number(item.productId),
          quantity: Number(item.quantity),
          costPrice: Number(item.costPrice),
        })),
      };

      await createPurchaseService(payload);

      await fetchPurchases();

      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setActionLoading(false);
    }
  }

  // ========================================
  // UPDATE
  // ========================================

  async function updatePurchase(id, data) {
    try {
      setActionLoading(true);

      await updatePurchaseService(id, data);

      await fetchPurchases();

      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setActionLoading(false);
    }
  }

  // ========================================
  // DELETE
  // ========================================

  async function deletePurchase(id) {
    try {
      setActionLoading(true);

      await deletePurchaseService(id);

      await fetchPurchases();

      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setActionLoading(false);
    }
  }

  // ========================================
  // INIT
  // ========================================

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPurchases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    purchases,

    filters,
    pagination,

    loading,
    actionLoading,

    fetchPurchases,
    searchPurchases,
    clearFilters,
    changePage,
    changeLimit,

    createPurchase,
    updatePurchase,
    deletePurchase,
  };
}
