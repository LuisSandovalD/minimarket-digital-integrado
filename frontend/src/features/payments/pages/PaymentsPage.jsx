import PaymentDetailModal from "../components/PaymentDetailModal";
import PaymentFilters from "../components/PaymentFilters";
import PaymentHeader from "../components/PaymentHeader";
import PaymentTable from "../components/PaymentTable";
import { usePaymentsPage } from "../hooks/usePaymentsPage";

export default function PaymentsPage() {
  const {
    payments,
    loading,
    metrics,
    page,
    totalPages,
    filters, // Extraemos los filtros actuales
    updateFilters,
    clearFilters,
    onNextPage,
    onPrevPage,
    detailOpen,
    selectedPayment,
    openDetail,
    closeDetail,
    reload,
  } = usePaymentsPage(10);

  return (
    <div className="space-y-6 animate-fade-in">
      <PaymentHeader
        totalPayments={metrics.totalPayments}
        totalAmount={metrics.totalAmount}
        completed={metrics.completed}
        pending={metrics.pending}
      />

      <PaymentFilters
        loading={loading}
        onSearch={updateFilters}
        onClear={clearFilters}
        globalFilters={filters} // Sincroniza los textos de la interfaz con el estado
      />

      <div className={loading ? "opacity-50 pointer-events-none transition-opacity" : ""}>
        <PaymentTable
          payments={payments}
          page={page}
          totalPages={totalPages}
          onNextPage={onNextPage}
          onPrevPage={onPrevPage}
          onView={openDetail}
        />
      </div>

      <PaymentDetailModal open={detailOpen} payment={selectedPayment} onClose={closeDetail} onRefresh={reload} />
    </div>
  );
}
