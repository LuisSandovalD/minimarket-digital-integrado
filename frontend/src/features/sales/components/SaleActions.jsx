// ========================================
// features/sales/components/SaleActions.jsx
// ========================================
import { ModernButton } from "@/components/buttons";
import {
  Ban,
  Coins,
  Eye,
  FileCheck2,
  MoreVertical,
  Receipt,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function SaleActions({
  sale,
  onView,
  onPayment,
  onInvoice,
  onCancel,
  onReturn, // 👈 Sincronizado con SaleReturnModal y actions.handleReturn
  onPrint,
  onWhatsAppShare,
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const isPaid =
    sale?.paymentStatus === "PAID" ||
    sale?.pendingAmount === 0 ||
    sale?.status === "COMPLETED";

  const isCanceled =
    sale?.status === "CANCELED" ||
    sale?.status === "ANULADO" ||
    sale?.status === "CANCELLED";

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <ModernButton
        icon={MoreVertical}
        variant="ghost"
        size="icon"
        text=""
        onClick={toggleMenu}
      />

      {open && (
        <div
          className="absolute right-0 mt-1 w-56 rounded-xl border border-slate-200/80 bg-white/95 p-1 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 1. VER DETALLE */}
          <ModernButton
            fullWidth
            variant="ghost"
            icon={Eye}
            text="Ver auditoría de venta"
            className="justify-start font-normal text-slate-700 dark:text-slate-300 h-9 rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              onView?.(sale);
              setOpen(false);
            }}
          />

          {/* 2. REGISTRAR COBRO / LIQUIDAR */}
          <ModernButton
            fullWidth
            variant="ghost"
            icon={Coins}
            text={isPaid ? "Ver historial de pagos" : "Registrar Cobro / Pago"}
            className={`justify-start font-normal h-9 rounded-lg ${
              !isPaid
                ? "text-emerald-600 font-medium dark:text-emerald-400"
                : "text-slate-700 dark:text-slate-300"
            }`}
            disabled={isCanceled}
            onClick={(e) => {
              e.stopPropagation();
              onPayment?.(sale);
              setOpen(false);
            }}
          />

          {/* 3. EMITIR BOLETA / FACTURA */}
          <ModernButton
            fullWidth
            variant="ghost"
            icon={FileCheck2}
            text={
              sale?.invoiceIssued || sale?.status === "COMPLETED"
                ? "Ver Comprobante"
                : "Emitir Boleta / Factura"
            }
            className="justify-start font-normal text-slate-700 dark:text-slate-300 h-9 rounded-lg"
            disabled={isCanceled}
            onClick={(e) => {
              e.stopPropagation();
              onInvoice?.(sale);
              setOpen(false);
            }}
          />

          <div className="my-1 border-t border-slate-100 dark:border-slate-900" />

          {/* 6. NOTA DE CRÉDITO / DEVOLUCIÓN */}
          <ModernButton
            fullWidth
            variant="ghost"
            icon={Receipt}
            text="Emitir Nota de Crédito"
            className="justify-start font-normal text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-950/30 h-9 rounded-lg"
            disabled={isCanceled}
            onClick={(e) => {
              e.stopPropagation();
              onReturn?.(sale); // 👈 Cambiado de onCreditNote a onReturn
              setOpen(false);
            }}
          />

          {/* 7. ANULAR OPERACIÓN */}
          <ModernButton
            fullWidth
            variant="ghost"
            icon={Ban}
            text={isCanceled ? "Venta ya Anulada" : "Anular Venta / Operación"}
            className="justify-start font-normal text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 h-9 rounded-lg"
            disabled={isCanceled}
            onClick={(e) => {
              e.stopPropagation();
              onCancel?.(sale);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
