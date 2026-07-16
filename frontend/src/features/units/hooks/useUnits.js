import { useCallback, useEffect, useState } from "react";
import { getUnits } from "../services/unit.service";

export const useUnits = () => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    search: undefined,
    type: undefined,
    isActive: undefined,
    page: 1, // Mantenemos la página únicamente aquí dentro
    limit: 10,
    sortBy: "name",
    sortOrder: "asc",
  });

  // Al usar JSON.stringify, el useCallback solo se invalida si los VALORES reales cambian,
  // previniendo bucles por recreación de objetos en memoria.
  const loadUnits = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getUnits(filters);
      setUnits(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [filters]); // <--- Truco maestro para evitar bucles con objetos

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadUnits();
  }, [loadUnits]);

  const search = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1, // Resetea a página 1 en búsquedas
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: undefined,
      type: undefined,
      isActive: undefined,
      page: 1,
      limit: 10,
      sortBy: "name",
      sortOrder: "asc",
    });
  };

  const nextPage = () => {
    if (filters.page < totalPages) {
      setFilters((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  };

  const prevPage = () => {
    if (filters.page > 1) {
      setFilters((prev) => ({
        ...prev,
        page: prev.page - 1,
      }));
    }
  };

  return {
    units,
    loading,
    page: filters.page, // Le seguimos exponiendo al componente la página actual de forma transparente
    totalPages,
    filters,
    search,
    clearFilters,
    nextPage,
    prevPage,
    reload: loadUnits,
  };
};
