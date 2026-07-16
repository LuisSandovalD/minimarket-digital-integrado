// ========================================
// features/sale-detail/hooks/useSaleDetails.js
// ========================================

import { useCallback, useEffect, useState } from "react";
import { getSaleDetailsService } from "../services/saleDetail.service"; // 🚀 Sincronizado con tu servicio de Axios

export const useSaleDetails = (initialFilters = { page: 1, limit: 10 }) => {
  const [loading, setLoading] = useState(true);
  const [saleDetails, setSaleDetails] = useState([]);
  const [error, setError] = useState(null);

  // Estados locales para la metadata de paginación extraída de "info"
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [metrics, setMetrics] = useState({ totalItems: 0 });

  // Estado que almacena los filtros activos de la consulta (incluyendo paginación)
  const [filters, setFilters] = useState(initialFilters);

  // 🛡️ useCallback memoriza la función para evitar bucles infinitos en el useEffect
  const loadSaleDetails = useCallback(
    async (currentFilters = filters) => {
      try {
        setLoading(true);
        setError(null);

        // Enviamos el objeto con los filtros estructurados directamente al servicio de Axios
        const response = await getSaleDetailsService(currentFilters);

        // 🚀 CORRECCIÓN: Evaluamos el contrato { success: true, info: {...}, results: [...] } de tu API
        if (response && response.success) {
          setSaleDetails(response.results || []);

          // Seteamos la paginación dinámica desde "info"
          setPagination({
            page: response.info?.page || 1,
            totalPages: response.info?.totalPages || 1,
          });

          // Guardamos el conteo global total de ítems
          setMetrics({
            totalItems: response.info?.total || 0,
          });
        } else {
          setSaleDetails([]);
        }
      } catch (err) {
        console.error("Error en el hook useSaleDetails:", err);
        setError(err.response?.data?.message || "Error al conectar con el servidor de detalles");
        setSaleDetails([]);
      } finally {
        setLoading(false);
      }
    },
    [filters],
  );

  // Ejecuta de forma reactiva la petición HTTP cada vez que el estado de los filtros muta
  useEffect(() => {
    loadSaleDetails();
  }, [loadSaleDetails]);

  // ========================================
  // ACCIONES COMPATIBLES CON SALEDETAILSPAGE
  // ========================================

  const handleApplyFilters = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1, // Reinicia a la primera página ante cualquier filtro nuevo
    }));
  };

  const handleClearFilters = () => {
    setFilters({ page: 1, limit: 10 });
  };

  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      setFilters((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  };

  const handlePrevPage = () => {
    if (pagination.page > 1) {
      setFilters((prev) => ({
        ...prev,
        page: prev.page - 1,
      }));
    }
  };

  return {
    loading,
    saleDetails, // Vinculado a results
    metrics, // Contiene totalItems
    pagination, // Contiene page y totalPages
    error,
    filters,
    actions: {
      handleApplyFilters,
      handleClearFilters,
      handleNextPage,
      handlePrevPage,
    },
    reload: () => loadSaleDetails(),
  };
};
