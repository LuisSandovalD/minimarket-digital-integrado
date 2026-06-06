// ========================================
// features/sales/components/SaleActions.jsx
// ========================================

import { ModernButton } from "@/components/buttons";
import {
  Ban,
  DollarSign,
  Eye,
  MoreVertical,
  Printer,
  Undo2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function SaleActions({
  sale,
  onView,
  onPayment,
  onCancel,
  onReturn,
  onPrint,
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Cerrar el menú automáticamente si se hace clic fuera de él
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

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Botón de tres puntos */}
      <ModernButton
        icon={MoreVertical}
        variant="ghost"
        size="icon"
        text=""
        onClick={() => setOpen((prev) => !prev)}
      />

      {/* Contenedor Flotante del Menú */}
      {open && (
        <div
          className="
            absolute
            right-0
            mt-1
            w-52
            rounded-xl
            border
            border-slate-200/80
            bg-white/95
            p-1
            shadow-xl
            backdrop-blur-md
            dark:border-slate-800
            dark:bg-slate-950/95
            z-50
          "
        >
          {/* Opción 1: Ver Detalle */}
          <ModernButton
            fullWidth
            variant="ghost"
            icon={Eye}
            text="Ver detalle"
            className="justify-start font-normal text-slate-700 dark:text-slate-300 h-9 rounded-lg"
            onClick={() => {
              onView?.(sale);
              setOpen(false);
            }}
          />

          {/* Opción 2: Registrar / Ver Pagos */}
          <ModernButton
            fullWidth
            variant="ghost"
            icon={DollarSign}
            text="Gestionar pago"
            className="justify-start font-normal text-slate-700 dark:text-slate-300 h-9 rounded-lg"
            onClick={() => {
              onPayment?.(sale);
              setOpen(false);
            }}
          />

          {/* Opción 3: Imprimir Ticket o Comprobante */}
          <ModernButton
            fullWidth
            variant="ghost"
            icon={Printer}
            text="Imprimir ticket"
            className="justify-start font-normal text-slate-700 dark:text-slate-300 h-9 rounded-lg"
            onClick={() => {
              onPrint?.(sale);
              setOpen(false);
            }}
          />

          {/* Separador visual */}
          <div className="my-1 border-t border-slate-100 dark:border-slate-900" />

          {/* Opción 4: Devolución de Productos */}
          <ModernButton
            fullWidth
            variant="ghost"
            icon={Undo2}
            text="Devolución / Retorno"
            className="justify-start font-normal text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-950/30 h-9 rounded-lg"
            onClick={() => {
              onReturn?.(sale);
              setOpen(false);
            }}
          />

          {/* Opción 5: Anular o Cancelar Venta */}
          <ModernButton
            fullWidth
            variant="ghost"
            icon={Ban}
            text="Anular venta"
            className="justify-start font-normal text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 h-9 rounded-lg"
            onClick={() => {
              onCancel?.(sale);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
