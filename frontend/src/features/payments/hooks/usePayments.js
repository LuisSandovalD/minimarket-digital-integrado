import { useEffect, useState } from "react";
import { getPaymentsService } from "../services/payment.service";

export const usePayments = (initialLimit = 10) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: initialLimit,
    totalPages: 1,
  });

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    paymentMethod: "",
    startDate: "",
    endDate: "",
    type: "",
  });

  const loadPayments = async () => {
    setLoading(true);
    try {
      const queryParams = {
        page,
        limit: initialLimit,
        ...filters,
      };

      // REGRESA LOS FILTROS LIMPIOS: Evita enviar cadenas vacías "" al backend
      Object.keys(queryParams).forEach((key) => {
        if (
          queryParams[key] === "" ||
          queryParams[key] === null ||
          queryParams[key] === undefined
        ) {
          delete queryParams[key];
        }
      });

      const response = await getPaymentsService(queryParams);

      setPayments(response.data || []);
      if (response.meta) {
        setMeta(response.meta);
      }
    } catch (error) {
      console.error("Error cargando pagos:", error);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, [page, filters]);

  const handleNextPage = () => {
    if (page < meta.totalPages) setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1);
  };

  return {
    payments,
    loading,
    page,
    totalPages: meta.totalPages,
    totalItems: meta.total,
    filters,
    updateFilters,
    onNextPage: handleNextPage,
    onPrevPage: handlePrevPage,
    reload: loadPayments,
  };
};
