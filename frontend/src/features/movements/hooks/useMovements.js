// ========================================
// features/movements/hooks/useMovements.js
// ========================================

import { useEffect, useMemo, useState } from "react";

import { getMovementsService } from "../../inventory/services/inventory.service";

export default function useMovements() {
  // ========================================
  // STATES
  // ========================================

  const [movements, setMovements] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // ========================================
  // FETCH
  // ========================================

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchMovements();
  }, []);

  // ========================================
  // FETCH MOVEMENTS
  // ========================================

  const fetchMovements = async () => {
    try {
      setLoading(true);

      const response = await getMovementsService();

      const movementsData = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response?.data?.data)
            ? response.data.data
            : [];

      setMovements(movementsData);
    } catch (error) {
      console.error(error);

      setMovements([]);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // FILTERED
  // ========================================

  const filteredMovements = useMemo(() => {
    if (!Array.isArray(movements)) {
      return [];
    }

    return movements.filter((movement) => {
      const product = movement?.product?.name?.toLowerCase() || "";

      const sku = movement?.product?.sku?.toLowerCase() || "";

      const type = movement?.type?.toLowerCase() || "";

      const branch = movement?.branch?.name?.toLowerCase() || "";

      const searchValue = search.toLowerCase();

      return (
        product.includes(searchValue) ||
        sku.includes(searchValue) ||
        type.includes(searchValue) ||
        branch.includes(searchValue)
      );
    });
  }, [movements, search]);

  return {
    movements: filteredMovements,

    loading,

    search,

    setSearch,

    refetch: fetchMovements,
  };
}
