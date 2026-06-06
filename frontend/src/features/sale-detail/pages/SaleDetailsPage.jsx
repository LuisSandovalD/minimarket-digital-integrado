// ========================================
// PAGES / SALE DETAILS PAGE
// ========================================

import { useState } from "react";

import { useSaleDetails } from "../hooks/useSaleDetails";

import SaleDetailHeader from "../components/SaleDetailHeader";
import SaleDetailLoading from "../components/SaleDetailLoading";
import SaleDetailModal from "../components/SaleDetailModal";
import SaleDetailsTable from "../components/SaleDetailsTable";

// ========================================
// SALE DETAILS PAGE
// ========================================

export default function SaleDetailsPage() {
  const { saleDetails, loading } = useSaleDetails();

  const [selectedDetail, setSelectedDetail] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  // ========================================
  // STATS
  // ========================================

  const total = saleDetails?.length || 0;

  const totalQuantity =
    saleDetails?.reduce((acc, item) => acc + Number(item.quantity || 0), 0) ||
    0;

  const totalRevenue =
    saleDetails?.reduce((acc, item) => acc + Number(item.subtotal || 0), 0) ||
    0;

  // ========================================
  // MODAL
  // ========================================

  const handleView = (detail) => {
    setSelectedDetail(detail);

    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);

    setSelectedDetail(null);
  };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return <SaleDetailLoading />;
  }

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <SaleDetailHeader
        total={total}
        totalQuantity={totalQuantity}
        totalRevenue={totalRevenue}
      />

      {/* TABLE */}

      <SaleDetailsTable details={saleDetails} onView={handleView} />

      {/* MODAL */}

      <SaleDetailModal
        open={modalOpen}
        detail={selectedDetail}
        onClose={handleClose}
      />
    </div>
  );
}
