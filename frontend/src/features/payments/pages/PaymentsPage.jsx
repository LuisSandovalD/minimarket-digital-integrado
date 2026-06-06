import PaymentHeader from "../components/PaymentHeader";
import PaymentTable from "../components/PaymentTable";

import PaymentDetailModal from "../components/PaymentDetailModal";

import { usePaymentsPage } from "../hooks/usePaymentsPage";

export default function PaymentsPage() {
  const {
    payments,
    loading,
    metrics,

    detailOpen,
    selectedPayment,

    setDetailOpen,

    openDetail,
  } = usePaymentsPage();

  if (loading) {
    return <div>Cargando pagos...</div>;
  }

  return (
    <div className="space-y-6">
      <PaymentHeader metrics={metrics} />

      <PaymentTable payments={payments} onView={openDetail} />

      <PaymentDetailModal
        open={detailOpen}
        payment={selectedPayment}
        onClose={() => setDetailOpen(false)}
      />
    </div>
  );
}
