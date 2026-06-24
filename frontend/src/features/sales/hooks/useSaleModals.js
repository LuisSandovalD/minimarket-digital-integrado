// ========================================
// FEATURES / SALES / HOOKS / useSaleModals.js
// ========================================

import { useState } from "react";

export const useSaleModals = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);

  const [selectedSale, setSelectedSale] = useState(null);

  // ======================================
  // OPEN ACTIONS
  // ======================================

  const openDetail = (sale) => {
    setSelectedSale(sale);
    setDetailOpen(true);
  };

  const openPayment = (sale) => {
    setSelectedSale(sale);
    setPaymentOpen(true);
  };

  const openCancel = (sale) => {
    setSelectedSale(sale);
    setCancelOpen(true);
  };

  const openReturn = (sale) => {
    setSelectedSale(sale);
    setReturnOpen(true);
  };

  // ======================================
  // CLOSE ALL (Utilidad para limpiar el POS)
  // ======================================

  const closeAll = () => {
    setCreateOpen(false);
    setDetailOpen(false);
    setPaymentOpen(false);
    setCancelOpen(false);
    setReturnOpen(false);
    setSelectedSale(null);
  };

  return {
    // States
    createOpen,
    setCreateOpen,
    detailOpen,
    setDetailOpen,
    paymentOpen,
    setPaymentOpen,
    cancelOpen,
    setCancelOpen,
    returnOpen,
    setReturnOpen,
    selectedSale,
    setSelectedSale,

    // Actions
    openDetail,
    openPayment,
    openCancel,
    openReturn,
    closeAll,
  };
};
