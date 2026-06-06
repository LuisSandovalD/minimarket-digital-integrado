// ========================================
// features/sales/pages/SalesPage.jsx
// ========================================

import SaleHeader from "../components/SaleHeader";
import SaleTable from "../components/SaleTable";

import SaleCancelModal from "../components/modals/SaleCancelModal";
import SaleDetailModal from "../components/modals/SaleDetailModal";
import SaleFormModal from "../components/modals/SaleFormModal";
import SalePaymentModal from "../components/modals/SalePaymentModal";
import SaleReturnModal from "../components/modals/SaleReturnModal";

import SalesLoading from "../components/SalesLoading";

import { useSaleForm } from "../hooks/useSaleForm";
import { useSalesPage } from "../hooks/useSalesPage";

export default function SalesPage() {
  const { sales, loading, customers, products, metrics, modals, actions } =
    useSalesPage();

  // ========================================
  // FORMULARIO DE VENTA
  // ========================================

  const saleForm = useSaleForm({
    onSubmit: actions.handleCreate,
    onClose: () => modals.setCreateOpen(false),
  });

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return <SalesLoading />;
  }

  return (
    <div className="space-y-6">
      {/* ========================================
       * HEADER
       * ====================================== */}
      <SaleHeader
        totalSales={metrics.totalOrders}
        totalRevenue={metrics.totalRevenue}
        totalOrders={metrics.totalOrders}
        averageTicket={metrics.averageTicket}
        onCreate={() => modals.setCreateOpen(true)}
      />

      {/* ========================================
       * TABLA
       * ====================================== */}
      <SaleTable
        sales={sales}
        onView={modals.openDetail}
        onPayment={modals.openPayment}
        onCancel={modals.openCancel}
        onReturn={modals.openReturn}
      />

      {/* ========================================
       * NUEVA VENTA
       * ====================================== */}
      <SaleFormModal
        open={modals.createOpen}
        onClose={() => modals.setCreateOpen(false)}
        customers={customers}
        products={products}
        loading={loading}
        {...saleForm}
      />

      {/* ========================================
       * DETALLE
       * ====================================== */}
      <SaleDetailModal
        open={modals.detailOpen}
        onClose={() => modals.setDetailOpen(false)}
        sale={modals.selectedSale}
      />

      {/* ========================================
       * PAGOS
       * ====================================== */}
      <SalePaymentModal
        open={modals.paymentOpen}
        onClose={() => modals.setPaymentOpen(false)}
        sale={modals.selectedSale}
        onSubmit={actions.handlePayment}
      />

      {/* ========================================
       * ANULAR VENTA
       * ====================================== */}
      <SaleCancelModal
        open={modals.cancelOpen}
        onClose={() => modals.setCancelOpen(false)}
        sale={modals.selectedSale}
        onConfirm={() => actions.handleCancel(modals.selectedSale?.id)}
      />

      {/* ========================================
       * DEVOLUCIONES
       * ====================================== */}
      <SaleReturnModal
        open={modals.returnOpen}
        onClose={() => modals.setReturnOpen(false)}
        sale={modals.selectedSale}
        onSubmit={actions.handleReturn}
      />
    </div>
  );
}
