// ========================================
// features/sales/pages/SalesPage.jsx
// ========================================
import { getUser } from "@/features/auth/services/session.service";
import { useCallback, useState } from "react";

import SaleFilters from "../components/SaleFilters";
import SaleHeader from "../components/SaleHeader";
import SaleTable from "../components/SaleTable";

import SaleCancelModal from "../components/modals/SaleCancelModal";
import SaleDetailModal from "../components/modals/SaleDetailModal";
import SaleFormModal from "../components/modals/SaleFormModal";
import SalePaymentModal from "../components/modals/SalePaymentModal";
import SaleReturnModal from "../components/modals/SaleReturnModal";
import SalesReportsModal from "../components/modals/SalesReportsModal";

import BillingModal from "../components/modals/BillingModal";
import SalesLoading from "../components/SalesLoading";

import { useSaleForm } from "../hooks/useSaleForm";
import { useSalesPage } from "../hooks/useSalesPage";

export default function SalesPage() {
  const user = getUser();
  const canManageSales = ["ADMIN", "MANAGER"].includes(user?.role);
  const canAccessReports = ["ADMIN", "MANAGER"].includes(user?.role);

  const {
    sales = [],
    loading = false,
    customers = [],
    products = [],
    metrics = {},
    modals = {},
    actions = {},
    pagination = {},
  } = useSalesPage();

  const [billingOpen, setBillingOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [selectedSaleData, setSelectedSaleData] = useState(null);

  const saleForm = useSaleForm({
    onSubmit: (payload) => actions?.handleCreate?.(payload),
    onClose: () => {
      if (modals?.setCreateOpen) modals.setCreateOpen(false);
    },
  });

  const handleOpenBilling = useCallback((sale) => {
    if (!sale) return;
    const saleDetailsArray = sale.details || sale.SaleDetails || [];
    const formattedData = {
      id: sale.id,
      saleNumber: sale.saleNumber || `TRX-${String(sale.id).toUpperCase()}`,
      total: Number(sale.total || 0),
      customer: sale.customer ? { name: sale.customer.name } : { name: "Cliente General" },
      details: saleDetailsArray.map((d) => ({
        id: d.id,
        quantity: Number(d.quantity || 1),
        product: { name: d.product?.name || "Artículo" },
      })),
    };
    setSelectedSaleData(formattedData);
    setBillingOpen(true);
  }, []);

  const handlePrint = useCallback((sale) => {
    if (!sale) return;
    console.log("🖨️ Comando POS:", sale);
  }, []);

  const handlePaymentChangeState = useCallback(
    async (saleId, nextState) => {
      const upperState = String(nextState || "")
        .toUpperCase()
        .trim();
      if (upperState === "CANCELED") {
        await actions?.handleCancel?.(saleId);
        if (modals?.setDetailOpen) modals.setDetailOpen(false);
      }
    },
    [actions, modals],
  );

  if (loading && sales.length === 0) return <SalesLoading />;

  return (
    <div className="space-y-6">
      <SaleHeader
        totalSales={Number(metrics?.totalOrders || 0)}
        totalRevenue={Number(metrics?.totalRevenue || 0)}
        totalOrders={Number(metrics?.totalOrders || 0)}
        averageTicket={Number(metrics?.averageTicket || 0)}
        onCreate={canManageSales ? () => modals?.setCreateOpen?.(true) : undefined}
        onOpenReports={canAccessReports ? () => setReportsOpen(true) : undefined}
      />

      <SaleFilters onSearch={actions?.handleApplyFilters} onClear={actions?.handleClearFilters} loading={loading} />

      <SaleTable
        sales={sales}
        onView={modals?.openDetail || (() => {})}
        onPayment={canManageSales ? modals?.openPayment : undefined}
        onCancel={canManageSales ? modals?.openCancel : undefined}
        onReturn={canManageSales ? modals?.openReturn : undefined}
        onInvoice={canManageSales ? handleOpenBilling : undefined}
        onPrint={handlePrint}
        page={pagination?.page || 1}
        totalPages={pagination?.totalPages || 1}
        onPrevPage={actions?.handlePrevPage || (() => {})}
        onNextPage={actions?.handleNextPage || (() => {})}
      />

      {canManageSales && (
        <>
          <SaleFormModal
            open={!!modals?.createOpen}
            onClose={() => modals?.setCreateOpen?.(false)}
            customers={customers}
            products={products}
            loading={loading}
            {...saleForm}
          />
          <SalePaymentModal
            open={!!modals?.paymentOpen}
            onClose={() => modals?.setPaymentOpen?.(false)}
            sale={modals?.selectedSale || null}
            onSubmit={actions?.handlePayment || (async () => {})}
          />
          <SaleCancelModal
            open={!!modals?.cancelOpen}
            onClose={() => modals?.setCancelOpen?.(false)}
            sale={modals?.selectedSale || null}
            onConfirm={() => actions?.handleCancel?.(modals?.selectedSale?.id)}
          />
          <SaleReturnModal
            open={!!modals?.returnOpen}
            onClose={() => modals?.setReturnOpen?.(false)}
            sale={modals?.selectedSale || null}
            onSuccess={() => actions?.handleFetch?.()}
          />
          <BillingModal
            open={billingOpen}
            onClose={() => {
              setBillingOpen(false);
              setSelectedSaleData(null);
            }}
            sale={selectedSaleData}
            onConfirmBilling={async (p) => await actions?.handleEmitBilling?.(p)}
          />
        </>
      )}

      <SaleDetailModal
        open={!!modals?.detailOpen}
        onClose={() => modals?.setDetailOpen?.(false)}
        sale={modals?.selectedSale || null}
        onPaymentChangeState={canManageSales ? handlePaymentChangeState : undefined}
      />

      {canAccessReports && (
        <SalesReportsModal open={reportsOpen} onClose={() => setReportsOpen(false)} companyId={metrics?.companyId} />
      )}
    </div>
  );
}
