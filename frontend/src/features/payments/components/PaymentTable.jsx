// ========================================
// features/payments/components/PaymentTable.jsx
// ========================================

import { Activity, Calendar, CreditCard, FileText, Hash, HelpCircle, Settings2, Wallet } from "lucide-react";

import { Table, TFooter, THead } from "@/components/data-display";
import PaymentActions from "./PaymentActions";
import PaymentStatusBadge from "./PaymentStatusBadge";

// ========================================
// HELPERS
// ========================================

function formatMoney(value = 0) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(Number(value || 0));
}

function formatDate(dateString) {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("es-PE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ========================================
// COMPONENT
// ========================================

export default function PaymentTable({
  payments = [],
  onView,
  onEdit,
  onDelete,
  page = 1,
  totalPages = 1,
  onPrevPage,
  onNextPage,
}) {
  // ========================================
  // TABLE COLUMNS
  // ========================================

  const columns = [
    {
      key: "id",
      label: (
        <div className="flex items-center gap-2">
          <Hash size={14} />
          ID
        </div>
      ),
    },
    {
      key: "reference_doc",
      label: (
        <div className="flex items-center gap-2">
          <FileText size={14} />
          Origen / Folio
        </div>
      ),
    },
    {
      key: "method",
      label: (
        <div className="flex items-center gap-2">
          <CreditCard size={14} />
          Método
        </div>
      ),
    },
    {
      key: "amount",
      label: (
        <div className="flex items-center gap-2">
          <Wallet size={14} />
          Monto
        </div>
      ),
    },
    {
      key: "date",
      label: (
        <div className="flex items-center gap-2">
          <Calendar size={14} />
          Fecha Pago
        </div>
      ),
    },
    {
      key: "status",
      label: (
        <div className="flex items-center gap-2">
          <Activity size={14} />
          Estado
        </div>
      ),
    },
    {
      key: "actions",
      label: (
        <div className="flex items-center gap-2">
          <Settings2 size={14} />
          Acciones
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      {/* ========================================
       * HEADER
       * ====================================== */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">Historial de Pagos</h2>
        <p className="mt-1 text-sm text-slate-500">
          Visualiza, gestiona y concilia las transacciones de ingresos y egresos.
        </p>
      </div>

      {/* ========================================
       * TABLE
       * ====================================== */}
      <Table>
        <THead columns={columns} />

        <tbody>
          {payments.length > 0 ? (
            payments.map((payment) => {
              // Evaluación del origen del pago (Relaciones Prisma)
              const isSale = !!payment.sale;
              const isPurchase = !!payment.purchase;

              // Obtención del número de folio/documento
              const documentNumber = isSale ? payment.sale?.saleNumber : payment.purchase?.purchaseNumber;

              // Asignación dinámica de etiquetas y colores según el tipo real
              let typeLabel = "General";
              let typeBadgeStyles = "bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400";
              let amountStyles = "text-slate-700 dark:text-slate-300 font-bold";
              let amountSign = "";

              if (isSale || payment.type === "SALE") {
                typeLabel = "Venta";
                typeBadgeStyles = "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";
                amountStyles = "text-emerald-600 dark:text-emerald-400 font-bold";
                amountSign = "+";
              } else if (isPurchase || payment.type === "PURCHASE") {
                typeLabel = "Compra";
                typeBadgeStyles = "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400";
                amountStyles = "text-red-500 dark:text-red-400 font-bold";
                amountSign = "-";
              }

              return (
                <tr
                  key={payment.id}
                  className="border-b border-slate-200/50 dark:border-slate-800 transition-all hover:bg-slate-50 dark:hover:bg-slate-900/40"
                >
                  {/* ID */}
                  <td className="px-6 py-5 text-sm font-medium text-slate-500">#{payment.id}</td>

                  {/* ORIGEN / FOLIO */}
                  <td className="px-6 py-5">
                    <div>
                      <span
                        className={`inline-flex items-center rounded-xl px-2.5 py-0.5 text-xs font-medium ${typeBadgeStyles}`}
                      >
                        {typeLabel}
                      </span>
                      <p className="mt-1.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {documentNumber || "N/A"}
                      </p>
                    </div>
                  </td>

                  {/* MÉTODO DE PAGO */}
                  <td className="px-6 py-5">
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {payment.method?.name || "No especificado"}
                      </p>
                      {payment.reference && <p className="mt-0.5 text-xs text-slate-400">Ref: {payment.reference}</p>}
                    </div>
                  </td>

                  {/* MONTO */}
                  <td className="px-6 py-5">
                    <div>
                      <p className={amountStyles}>
                        {amountSign} {formatMoney(payment.amount)}
                      </p>
                    </div>
                  </td>

                  {/* FECHA DE PAGO */}
                  <td className="px-6 py-5">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {formatDate(payment.paidAt || payment.createdAt)}
                    </p>
                  </td>

                  {/* ESTADO */}
                  <td className="px-6 py-5">
                    <PaymentStatusBadge status={payment.status} />
                  </td>

                  {/* ACCIONES */}
                  <td className="px-6 py-5">
                    <PaymentActions payment={payment} onView={onView} onEdit={onEdit} onDelete={onDelete} />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7} className="px-6 py-16 text-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
                    <HelpCircle className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">No hay pagos registrados</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    No se encontraron transacciones para mostrar en este periodo.
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>

        {/* CONTROLES DE PAGINACIÓN (Envoltorio tfoot para semántica HTML limpia) */}
        {payments.length > 0 && <TFooter page={page} totalPages={totalPages} onPrev={onPrevPage} onNext={onNextPage} />}
      </Table>
    </div>
  );
}
