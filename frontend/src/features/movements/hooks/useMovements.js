import { useEffect, useState } from "react";

import { getMovementsService } from "../../inventory/services/inventory.service";

export default function useMovements(initialFilters = {}) {
  const [movements, setMovements] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,

    search: "",
    branchId: "",
    productId: "",
    type: "",

    ...initialFilters,
  });

  useEffect(() => {
    fetchMovements();
  }, [filters]);

  const fetchMovements = async () => {
    try {
      setLoading(true);

      const response = await getMovementsService(filters);

      setMovements(response?.data || []);
      setPagination(response?.pagination || {});
    } catch (error) {
      console.error(error);

      setMovements([]);
      setPagination({});
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (values) => {
    setFilters((prev) => ({
      ...prev,
      ...values,
      page: 1,
    }));
  };

  const nextPage = () => {
    if (!pagination?.hasNext) return;

    setFilters((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const prevPage = () => {
    if (!pagination?.hasPrev) return;

    setFilters((prev) => ({
      ...prev,
      page: prev.page - 1,
    }));
  };

  return {
    movements,
    pagination,
    loading,

    filters,
    setFilters,
    updateFilters,

    nextPage,
    prevPage,

    refetch: fetchMovements,
  };
}
