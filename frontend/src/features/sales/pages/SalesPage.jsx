// ========================================
// features/sales/pages/SalesPage.jsx
// ========================================
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

  // Estados locales para flujos específicos de la vista de ventas
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [billingOpen, setBillingOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [selectedSaleData, setSelectedSaleData] = useState(null);

  // Instancia segura del hook de formulario para inyección en el modal de creación
  const saleForm = useSaleForm({
    onSubmit: (payload) => actions?.handleCreate?.(payload),
    onClose: () => {
      if (modals?.setCreateOpen) modals.setCreateOpen(false);
    },
  });

  const companyId = metrics?.companyId || 1;

  // ========================================
  // ACCIONES Y MAPEOS COMERCIALES
  // ========================================

  // Mapeo financiero preventivo para la facturación electrónica (Perú: IGV 18%)
  const handleOpenBilling = useCallback((sale) => {
    if (!sale) return;

    const saleDetailsArray = sale.details || sale.SaleDetails || [];

    const formattedData = {
      id: sale.id,
      saleNumber: sale.saleNumber || `TRX-${String(sale.id).toUpperCase()}`,
      total: Number(sale.total || 0),
      customer: sale.customer
        ? {
            id: sale.customer.id,
            name: sale.customer.name,
            documentType: sale.customer.documentType || "DNI/RUC",
            documentNumber: sale.customer.documentNumber,
          }
        : {
            name: "Cliente General",
            documentType: "DNI",
            documentNumber: "00000000",
          },
      details: saleDetailsArray.map((d) => {
        const itemQty = Number(d.quantity || 1);
        const itemPrice = Number(d.price || d.unitPrice || 0);
        return {
          id: d.id,
          quantity: itemQty,
          subtotal: Number(d.subtotal || itemPrice * itemQty),
          product: {
            name: d.product?.name || d.name || "Artículo Comercial",
          },
        };
      }),
    };

    setSelectedSaleData(formattedData);
    setBillingOpen(true);
  }, []);

  const handleOpenWhatsApp = useCallback((sale) => {
    if (!sale) return;
    setSelectedSaleData(sale);
    setWhatsappOpen(true);
  }, []);

  const handlePrint = useCallback((sale) => {
    if (!sale) return;
    console.log("🖨️ Comando enviado al spool de impresión térmica POS:", sale);
  }, []);

  // Handler seguro para interceptar cambios de estado desde el visor de detalle
  const handlePaymentChangeState = useCallback(
    async (saleId, nextState) => {
      const upperState = String(nextState || "")
        .toUpperCase()
        .trim();
      if (upperState === "CANCELED" || upperState === "CANCELLED") {
        await actions?.handleCancel?.(saleId);
        if (modals?.setDetailOpen) modals.setDetailOpen(false);
      }
    },
    [actions, modals],
  );

  // Render defensivo durante cargas globales
  if (loading && sales.length === 0) {
    return <SalesLoading />;
  }

  return (
    <div className="space-y-6">
      {/* SECCIÓN: PANEL DE MÉTRICAS GENERALES */}
      <SaleHeader
        totalSales={Number(metrics?.totalOrders || 0)}
        totalRevenue={Number(metrics?.totalRevenue || 0)}
        totalOrders={Number(metrics?.totalOrders || 0)}
        averageTicket={Number(metrics?.averageTicket || 0)}
        onCreate={() => {
          if (modals?.setCreateOpen) modals.setCreateOpen(true);
        }}
        onOpenReports={() => setReportsOpen(true)}
      />

      {/* SECCIÓN: FILTROS MULTI-ENUM AVANZADOS */}
      <SaleFilters
        onSearch={actions?.handleApplyFilters}
        onClear={actions?.handleClearFilters}
        loading={loading}
      />

      {/* SECCIÓN: HISTORIAL DE VENTAS Y PAGINACIÓN */}
      <SaleTable
        sales={sales}
        onView={modals?.openDetail || (() => {})}
        onPayment={modals?.openPayment || (() => {})}
        onCancel={modals?.openCancel || (() => {})}
        onReturn={modals?.openReturn || (() => {})}
        onInvoice={handleOpenBilling}
        onWhatsAppShare={handleOpenWhatsApp}
        onPrint={handlePrint}
        page={pagination?.page || 1}
        totalPages={pagination?.totalPages || 1}
        onPrevPage={actions?.handlePrevPage || (() => {})}
        onNextPage={actions?.handleNextPage || (() => {})}
      />

      {/* MODAL: APERTURA Y REGISTRO DE NUEVA VENTA */}
      <SaleFormModal
        open={!!modals?.createOpen}
        onClose={() => {
          if (modals?.setCreateOpen) modals.setCreateOpen(false);
        }}
        customers={customers}
        products={products}
        loading={loading}
        {...saleForm}
      />

      {/* MODAL: AUDITORÍA Y DETALLE DE ÍTEMS DE LA VENTA */}
      <SaleDetailModal
        open={!!modals?.detailOpen}
        onClose={() => {
          if (modals?.setDetailOpen) modals.setDetailOpen(false);
        }}
        sale={modals?.selectedSale || null}
        onPaymentChangeState={handlePaymentChangeState}
      />

      {/* MODAL: CAJA / CONTROL DE PAGOS Y CRÉDITOS */}
      <SalePaymentModal
        open={!!modals?.paymentOpen}
        onClose={() => {
          if (modals?.setPaymentOpen) modals.setPaymentOpen(false);
        }}
        sale={modals?.selectedSale || null}
        onSubmit={actions?.handlePayment || (async () => {})}
      />

      {/* MODAL: ANULACIÓN DE TRANSACCIÓN */}
      <SaleCancelModal
        open={!!modals?.cancelOpen}
        onClose={() => {
          if (modals?.setCancelOpen) modals.setCancelOpen(false);
        }}
        sale={modals?.selectedSale || null}
        onConfirm={() => actions?.handleCancel?.(modals?.selectedSale?.id)}
      />

      {/* MODAL: EMISIÓN DE NOTA DE CRÉDITO / DEVOLUCIONES */}
      <SaleReturnModal
        open={!!modals?.returnOpen}
        onClose={() => {
          if (modals?.setReturnOpen) modals.setReturnOpen(false);
        }}
        sale={modals?.selectedSale || null}
        onSuccess={() => actions?.handleFetch?.()}
      />

      {/* MODAL: INTEGRACIÓN COMPROBANTE DE PAGO ELECTRÓNICO */}
      <BillingModal
        open={billingOpen}
        onClose={() => {
          setBillingOpen(false);
          setSelectedSaleData(null);
        }}
        sale={selectedSaleData}
        onConfirmBilling={async (payload) => {
          if (actions?.handleEmitBilling) {
            await actions.handleEmitBilling(payload);
          } else {
            console.log("Payload comercial enviado a la API de caja:", payload);
          }
        }}
      />

      {/* MODAL: EXTRACCIÓN DE REPORTES EJECUTIVOS */}
      <SalesReportsModal
        open={reportsOpen}
        onClose={() => setReportsOpen(false)}
        companyId={companyId}
      />
    </div>
  );
}
