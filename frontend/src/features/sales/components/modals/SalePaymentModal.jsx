// ========================================
// features/sales/components/modals/SalePaymentModal.jsx
// ========================================

import { ArrowRight, CreditCard, DollarSign, Wallet } from "lucide-react";
import { useEffect, useState } from "react";

import { ModernButton } from "@/components/buttons";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays";

export default function SalePaymentModal({ open, onClose, sale, onSubmit }) {
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [amountReceived, setAmountReceived] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // Resetear el formulario cada vez que se abre con una venta distinta
  useEffect(() => {
    if (sale) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAmountReceived(sale.total?.toString() || "");
      setPaymentMethod("CASH");
    }
  }, [sale, open]);

  // Protección crítica antes de cualquier cálculo para evitar errores de lectura asíncronos
  if (!open || !sale) return null;

  const totalToPay = Number(sale.total || 0);
  const change =
    Number(amountReceived) > totalToPay
      ? Number(amountReceived) - totalToPay
      : 0;

  const formatPrice = (value) =>
    new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(Number(value || 0));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (paymentMethod === "CASH" && Number(amountReceived) < totalToPay) {
      alert("El monto recibido no puede ser menor al total de la venta.");
      return;
    }

    try {
      setLoadingSubmit(true);
      await onSubmit?.({
        saleId: sale.id,
        paymentMethod,
        amountReceived: Number(amountReceived),
        change,
      });
      onClose();
    } catch (error) {
      console.error("Error al registrar el pago:", error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} maxWidth="md">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <HeaderModal
          title={
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-950/50 dark:text-green-400">
                <DollarSign size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Registrar Pago
                </h3>
                <p className="text-xs text-slate-500">
                  Venta: {sale.saleNumber}
                </p>
              </div>
            </div>
          }
          onClose={onClose}
          customHeader
        />

        {/* CUERPO DEL FORMULARIO */}
        <div className="p-6 space-y-5">
          {/* Resumen de deuda */}
          <div className="rounded-xl bg-slate-50 p-4 text-center dark:bg-slate-900/40">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400 block mb-1">
              Monto Total Cobrar
            </span>
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              {formatPrice(totalToPay)}
            </span>
          </div>

          {/* Selector de Método de Pago */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Método de Pago
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("CASH")}
                className={`flex flex-col items-center justify-center gap-2 rounded-xl p-3 border text-xs font-semibold transition ${
                  paymentMethod === "CASH"
                    ? "border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400"
                }`}
              >
                <Wallet size={18} /> Efectivo
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("CARD")}
                className={`flex flex-col items-center justify-center gap-2 rounded-xl p-3 border text-xs font-semibold transition ${
                  paymentMethod === "CARD"
                    ? "border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400"
                }`}
              >
                <CreditCard size={18} /> Tarjeta
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("TRANSFER")}
                className={`flex flex-col items-center justify-center gap-2 rounded-xl p-3 border text-xs font-semibold transition ${
                  paymentMethod === "TRANSFER"
                    ? "border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400"
                }`}
              >
                <ArrowRight size={18} /> Transferencia
              </button>
            </div>
          </div>

          {/* Inputs Condicionales para Efectivo */}
          {paymentMethod === "CASH" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500">
                  Monto Recibido
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={amountReceived}
                  onChange={(e) => setAmountReceived(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 font-mono text-sm font-semibold text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500">
                  Vuelto (Cambio)
                </label>
                <div className="w-full rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-2.5 font-mono text-sm font-bold text-green-600 dark:border-slate-800/50 dark:bg-slate-900/60 dark:text-green-400">
                  {formatPrice(change)}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ACCIONES DEL PIE */}
        <FooterModal>
          <div className="flex justify-end gap-3">
            <ModernButton
              text="Cancelar"
              variant="ghost" // Asumiendo que tu ModernButton soporta estilos secundarios o ghost
              onClick={onClose}
              type="button"
            />
            <ModernButton
              text={loadingSubmit ? "Procesando..." : "Completar Pago"}
              variant="success" // O el color/estilo verde correspondiente de tu set de componentes
              loading={loadingSubmit}
              type="submit"
            />
          </div>
        </FooterModal>
      </form>
    </Modal>
  );
}
