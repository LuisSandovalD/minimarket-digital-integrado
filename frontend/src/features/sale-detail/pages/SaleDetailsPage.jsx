// ========================================
// features/sale-detail/pages/SaleDetailsPage.jsx
// ========================================
import { useCallback, useMemo, useState } from "react";

import { useSaleDetails } from "../hooks/useSaleDetails";

import SaleDetailFilters from "../components/SaleDetailFilters";
import SaleDetailHeader from "../components/SaleDetailHeader";
import SaleDetailLoading from "../components/SaleDetailLoading";
import SaleDetailModal from "../components/SaleDetailModal";
import SaleDetailsTable from "../components/SaleDetailsTable";

// ========================================
// SALE DETAILS PAGE
// ========================================

export default function SaleDetailsPage() {
  const {
    saleDetails = [], // Mapeado directo a data.results de tu API
    loading = false,
    pagination = {}, // Contiene { page, totalPages } extraídos de data.info
    metrics = {}, // Contiene { totalItems } extraído de data.info.total
    actions = {}, // Contiene las funciones de cambio de página y filtros
  } = useSaleDetails();

  const [selectedDetail, setSelectedDetail] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // ========================================
  // STATS (Cómputo optimizado con useMemo)
  // ========================================

  // Total global de registros en la base de datos (Ej: 2081 ítems)
  const total = Number(metrics?.totalItems || 0);

  // Memorizado defensivo para evitar recalcular reducers en re-renders innecesarios
  const { totalQuantity, totalRevenue } = useMemo(() => {
    return saleDetails.reduce(
      (acc, item) => {
        if (!item) return acc;
        acc.totalQuantity += Number(item.quantity || 0);
        acc.totalRevenue += Number(item.subtotal || 0);
        return acc;
      },
      { totalQuantity: 0, totalRevenue: 0 },
    );
  }, [saleDetails]);

  // ========================================
  // CONTROL DE MODALES (useCallback)
  // ========================================

  const handleView = useCallback((detail) => {
    if (!detail) return;
    setSelectedDetail(detail);
    setModalOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setModalOpen(false);
    // Retraso técnico opcional para evitar parpadeos visuales en la animación de salida
    setTimeout(() => {
      setSelectedDetail(null);
    }, 200);
  }, []);

  // ========================================
  // LOADING (Estrategia No Bloqueante en Background Fetch)
  // ========================================

  if (loading && saleDetails.length === 0) {
    return <SaleDetailLoading />;
  }

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="space-y-6">
      {/* HEADER: Muestra estadísticas de la página actual e indicadores globales */}
      <SaleDetailHeader
        total={total}
        totalQuantity={totalQuantity}
        totalRevenue={totalRevenue}
      />

      {/* PANEL DE FILTROS ORIENTADO A BACKEND */}
      <SaleDetailFilters
        onSearch={actions?.handleApplyFilters}
        onClear={actions?.handleClearFilters}
        loading={loading}
      />

      {/* TABLE: Renderiza las filas actuales de la API y controla los botones de TFooter */}
      <SaleDetailsTable
        details={saleDetails}
        onView={handleView}
        page={pagination?.page || 1}
        totalPages={pagination?.totalPages || 1}
        onPrevPage={actions?.handlePrevPage || (() => {})}
        onNextPage={actions?.handleNextPage || (() => {})}
      />

      {/* MODAL DEL DETALLE DE PARTIDA / ÍTEM */}
      <SaleDetailModal
        open={modalOpen}
        detail={selectedDetail}
        onClose={handleClose}
      />
    </div>
  );
}
