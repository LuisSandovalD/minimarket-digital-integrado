// ========================================
// features/sale-detail/pages/SaleDetailsPage.jsx
// ========================================
import { getUser } from "@/features/auth/services/session.service";
import { useCallback, useMemo, useState } from "react";

import { useSaleDetails } from "../hooks/useSaleDetails";

import SaleDetailFilters from "../components/SaleDetailFilters";
import SaleDetailHeader from "../components/SaleDetailHeader";
import SaleDetailLoading from "../components/SaleDetailLoading";
import SaleDetailModal from "../components/SaleDetailModal";
import SaleDetailsTable from "../components/SaleDetailsTable";

/**
 * PÁGINA: DETALLES DE VENTAS
 * Permite la visualización de los detalles de ítems vendidos.
 * El acceso a los datos está protegido a nivel de API mediante middleware de backend.
 */
export default function SaleDetailsPage() {
  const user = getUser();

  const {
    saleDetails = [],
    loading = false,
    pagination = {},
    metrics = {},
    actions = {},
  } = useSaleDetails();

  const [selectedDetail, setSelectedDetail] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // ========================================
  // STATS (Cómputo optimizado)
  // ========================================
  const total = Number(metrics?.totalItems || 0);

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
  // CONTROL DE MODALES
  // ========================================
  const handleView = useCallback((detail) => {
    if (!detail) return;
    setSelectedDetail(detail);
    setModalOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setModalOpen(false);
    setTimeout(() => {
      setSelectedDetail(null);
    }, 200);
  }, []);

  // ========================================
  // RENDERING
  // ========================================
  if (loading && saleDetails.length === 0) {
    return <SaleDetailLoading />;
  }

  return (
    <div className="space-y-6">
      {/* HEADER: Indicadores globales */}
      <SaleDetailHeader
        total={total}
        totalQuantity={totalQuantity}
        totalRevenue={totalRevenue}
      />

      {/* FILTROS: Interacción con el servidor */}
      <SaleDetailFilters
        onSearch={actions?.handleApplyFilters}
        onClear={actions?.handleClearFilters}
        loading={loading}
      />

      {/* TABLE: Listado de detalles */}
      <SaleDetailsTable
        details={saleDetails}
        onView={handleView}
        page={pagination?.page || 1}
        totalPages={pagination?.totalPages || 1}
        onPrevPage={actions?.handlePrevPage || (() => {})}
        onNextPage={actions?.handleNextPage || (() => {})}
      />

      {/* MODAL: Detalle de ítem */}
      <SaleDetailModal
        open={modalOpen}
        detail={selectedDetail}
        onClose={handleClose}
      />
    </div>
  );
}
