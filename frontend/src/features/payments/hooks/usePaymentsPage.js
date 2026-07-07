import { useState } from "react";
import { usePaymentMetrics } from "./usePaymentMetrics";
import { usePayments } from "./usePayments";

export const usePaymentsPage = (initialLimit = 10) => {
  // 1. Extraemos TODO lo necesario de usePayments
  const {
    payments,
    loading,
    page,
    totalPages,
    totalItems,
    filters,
    updateFilters,
    onNextPage,
    onPrevPage,
    reload,
  } = usePayments(initialLimit);

  // 2. Calculamos las métricas usando los pagos obtenidos
  const metrics = usePaymentMetrics(payments);

  // 3. Control de estado para el modal de detalle
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const openDetail = (payment) => {
    setSelectedPayment(payment);
    setDetailOpen(true);
  };

  const closeDetail = () => {
    setSelectedPayment(null);
    setDetailOpen(false);
  };

  // Función Helper para limpiar todos los filtros desde la página
  const clearFilters = () => {
    updateFilters({
      search: "",
      status: "",
      paymentMethod: "",
      startDate: "",
      endDate: "",
      type: "",
    });
  };

  // 4. Retornamos una API limpia para que la consuma tu archivo PaymentsPage.jsx
  return {
    // Datos y Estado de carga
    payments,
    loading,
    reload,
    metrics,

    // Paginación y Filtros
    page,
    totalPages,
    totalItems,
    filters,
    updateFilters,
    clearFilters,
    onNextPage,
    onPrevPage,

    // Modal UI
    detailOpen,
    selectedPayment,
    openDetail,
    closeDetail,
  };
};
