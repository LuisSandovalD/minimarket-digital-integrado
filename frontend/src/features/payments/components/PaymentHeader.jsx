// ========================================
// FEATURES / PAYMENTS / COMPONENTS
// PAYMENT HEADER
// ========================================

import { CheckCircle, Clock, CreditCard, DollarSign } from "lucide-react";

import { PageHeader } from "@/components/data-display";

export default function PaymentHeader({ totalPayments = 0, totalAmount = 0, completed = 0, pending = 0 }) {
  return (
    <PageHeader
      icon={CreditCard}
      badge="Pagos"
      title="Gestión de Pagos"
      description="
        Administra cobros,
        pagos registrados,
        métodos de pago
        y movimientos financieros.
      "
      headerActions={
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          {/* FUTUROS FILTROS */}
        </div>
      }
      stats={[
        {
          icon: DollarSign,
          label: "Recaudado",
          value: `S/ ${Number(totalAmount).toFixed(2)}`,
        },

        {
          icon: CheckCircle,
          label: "Pagos",
          value: completed,
        },

        {
          icon: Clock,
          label: "Por Cobrar",
          value: pending,
        },
      ]}
    />
  );
}
