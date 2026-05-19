// ========================================
// FEATURES / SALES / MODALS HOOK
// ========================================

import { useState } from "react";

// ========================================
// USE SALE MODALS
// ========================================

export const useSaleModals = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);

  const [selectedSale, setSelectedSale] = useState(null);

  // ======================================
  // OPEN DETAIL
  // ======================================

  const openDetail = (sale) => {
    setSelectedSale(sale);
    setDetailOpen(true);
  };

  // ======================================
  // OPEN PAYMENT
  // ======================================

  const openPayment = (sale) => {
    setSelectedSale(sale);
    setPaymentOpen(true);
  };

  // ======================================
  // OPEN CANCEL
  // ======================================

  const openCancel = (sale) => {
    setSelectedSale(sale);
    setCancelOpen(true);
  };

  // ======================================
  // OPEN RETURN
  // ======================================

  const openReturn = (sale) => {
    setSelectedSale(sale);
    setReturnOpen(true);
  };

  // ======================================
  // CLOSE ALL (UTILIDAD POS)
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
    // states
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

    // actions
    openDetail,
    openPayment,
    openCancel,
    openReturn,
    closeAll,
  };
};