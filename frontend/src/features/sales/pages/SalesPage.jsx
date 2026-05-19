// ========================================
// SALES PAGE (POS MAIN VIEW)
// ========================================

import React from "react";

// HOOKS
import { useSales } from "../hooks/useSales";
import { useSaleModals } from "../hooks/useSaleModals";

// COMPONENTS
import SaleHeader from "../components/SaleHeader";

import { SaleTable } from "../components/table/SaleTable";

import { SaleCreateModal } from "../components/modals/SaleCreateModal";
import { SaleDetailModal } from "../components/modals/SaleDetailModal";
import { SalePaymentModal } from "../components/modals/SalePaymentModal";
import { SaleCancelModal } from "../components/modals/SaleCancelModal";
import { SaleReturnModal } from "../components/modals/SaleReturnModal";

// ========================================
// PAGE
// ========================================

export const SalesPage = () => {

  // ======================================
  // DATA
  // ======================================

  const {
    sales,
    loading,
    addSale,
    removeSale,
    refundSale,
    fetchSales,
  } = useSales();

  // ======================================
  // MODALS
  // ======================================

  const {
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

    openDetail,
    openPayment,
    openCancel,
    openReturn,
  } = useSaleModals();

  // ======================================
  // CREATE SALE
  // ======================================

  const handleCreate =
    async (data) => {

      await addSale(data);

      setCreateOpen(false);

    };

  // ======================================
  // CANCEL SALE
  // ======================================

  const handleCancel =
    async (id) => {

      await removeSale(id);

      setCancelOpen(false);

    };

  // ======================================
  // RETURN SALE
  // ======================================

  const handleReturn =
    async (
      id,
      items
    ) => {

      await refundSale(
        id,
        items
      );

      setReturnOpen(false);

    };

  // ======================================
  // PAYMENT
  // ======================================

  const handlePayment =
    async (
      id,
      amount
    ) => {

      console.log(
        "Pago:",
        id,
        amount
      );

      setPaymentOpen(false);

    };

  // ======================================
  // STATS
  // ======================================

  const totalRevenue =
    sales.reduce(
      (
        acc,
        sale
      ) =>
        acc +
        Number(
          sale.total || 0
        ),
      0
    );

  const totalOrders =
    sales.length;

  const averageTicket =
    totalOrders > 0
      ? totalRevenue /
        totalOrders
      : 0;

  // ======================================
  // RENDER
  // ======================================

  return (

    <div className="space-y-6">

      {/* ==================================
       * HEADER
       * ================================== */}

      <SaleHeader

        totalSales={
          totalOrders
        }

        totalRevenue={
          totalRevenue
        }

        totalOrders={
          totalOrders
        }

        averageTicket={
          averageTicket
        }

        onCreate={() =>
          setCreateOpen(true)
        }

      />

      {/* ==================================
       * TABLE
       * ================================== */}

      <SaleTable

        sales={sales}

        loading={loading}

        onView={
          openDetail
        }

        onPay={
          openPayment
        }

        onCancel={
          openCancel
        }

        onReturn={
          openReturn
        }

      />

      {/* ==================================
       * CREATE MODAL
       * ================================== */}

      <SaleCreateModal

        open={
          createOpen
        }

        onClose={() =>
          setCreateOpen(false)
        }

        onSubmit={
          handleCreate
        }

      />

      {/* ==================================
       * DETAIL MODAL
       * ================================== */}

      <SaleDetailModal

        open={
          detailOpen
        }

        sale={
          selectedSale
        }

        onClose={() =>
          setDetailOpen(false)
        }

      />

      {/* ==================================
       * PAYMENT MODAL
       * ================================== */}

      <SalePaymentModal

        open={
          paymentOpen
        }

        sale={
          selectedSale
        }

        onClose={() =>
          setPaymentOpen(false)
        }

        onPay={
          handlePayment
        }

      />

      {/* ==================================
       * CANCEL MODAL
       * ================================== */}

      <SaleCancelModal

        open={
          cancelOpen
        }

        sale={
          selectedSale
        }

        onClose={() =>
          setCancelOpen(false)
        }

        onCancel={
          handleCancel
        }

      />

      {/* ==================================
       * RETURN MODAL
       * ================================== */}

      <SaleReturnModal

        open={
          returnOpen
        }

        sale={
          selectedSale
        }

        onClose={() =>
          setReturnOpen(false)
        }

        onReturn={
          handleReturn
        }

      />

    </div>

  );

};