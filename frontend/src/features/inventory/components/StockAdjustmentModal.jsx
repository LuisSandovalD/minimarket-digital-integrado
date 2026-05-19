import { useState, useEffect } from "react";
import { 
  X, 
  PlusCircle, 
  MinusCircle, 
  AlertTriangle, 
  Layers, 
  FileText 
} from "lucide-react";

export default function StockAdjustmentModal({
  isOpen,
  onClose,
  type, // "ADD" | "REMOVE" | "DAMAGED"
  inventoryItem, // El objeto de inventario seleccionado de la fila
  onSubmit, // Función del hook que llamará al servicio correspondiente
  actionLoading = false,
}) {
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState("");

  // Reiniciar el formulario cada vez que se abre para un item diferente
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setReason("");
    }
  }, [isOpen, inventoryItem]);

  if (!isOpen || !inventoryItem) return null;

  // Configuration map según el tipo de ajuste
  const config = {
    ADD: {
      title: "Agregar Stock",
      description: "Incrementa las unidades físicas disponibles en el almacén.",
      icon: PlusCircle,
      colorClass: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400",
      btnClass: "bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white",
      submitLabel: "Incrementar Stock",
    },
    REMOVE: {
      title: "Remover Stock",
      description: "Descuenta unidades del inventario por ajuste manual o merma.",
      icon: MinusCircle,
      colorClass: "text-orange-500 bg-orange-50 dark:bg-orange-950/30 dark:text-orange-400",
      btnClass: "bg-orange-500 hover:bg-orange-600 focus:ring-orange-500 text-white",
      submitLabel: "Descontar Stock",
    },
    DAMAGED: {
      title: "Registrar Stock Dañado",
      description: "Mueve unidades del stock disponible al registro de mermas/daños.",
      icon: AlertTriangle,
      colorClass: "text-red-600 bg-red-50 dark:bg-red-950/30 dark:text-red-400",
      btnClass: "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white",
      submitLabel: "Reportar Daño",
    },
  }[type] || {};

  const IconComponent = config.icon;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quantity <= 0) return;
    
    // Enviamos el ID del inventario y el body estructurado
    onSubmit(inventoryItem.id, {
      quantity: Number(quantity),
      reason: reason.trim() || `Ajuste manual de ${type.toLowerCase()}`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP CON BLUR */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* CONTENEDOR DEL MODAL */}
      <div 
        className="
          relative z-10 w-full max-w-md transform overflow-hidden 
          rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-xl border
          border-slate-200/60 dark:border-slate-800 transition-all
        "
      >
        {/* BOTÓN CERRAR */}
        <button
          onClick={onClose}
          className="
            absolute right-4 top-4 rounded-xl p-1.5 text-slate-400 
            hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800
            transition-colors
          "
        >
          <X size={16} />
        </button>

        {/* ENCABEZADO DEL MODAL */}
        <div className="flex items-start gap-3.5 mb-6">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${config.colorClass}`}>
            <IconComponent size={22} />
          </div>
          <div>
            <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
              {config.title}
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {config.description}
            </p>
          </div>
        </div>

        {/* METADATOS DEL PRODUCTO AFECTADO */}
        <div className="mb-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3.5 text-xs space-y-1.5 border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between">
            <span className="text-slate-500">Producto:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{inventoryItem.product?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Sucursal:</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">{inventoryItem.branch?.name}</span>
          </div>
          <div className="flex justify-between border-t border-slate-200/50 dark:border-slate-700/50 pt-1.5 mt-1.5">
            <span className="text-slate-500">Stock Actual Físico:</span>
            <span className="font-bold text-slate-900 dark:text-white">{inventoryItem.stock} u.</span>
          </div>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* CAMPO: CANTIDAD */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              <Layers size={13} className="text-slate-400" />
              Cantidad de unidades
            </label>
            <input
              type="number"
              min="1"
              required
              disabled={actionLoading}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="
                w-full rounded-xl border border-slate-200 dark:border-slate-700
                bg-white dark:bg-slate-800 px-3.5 py-2 text-sm text-slate-900 dark:text-white
                focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400
                disabled:opacity-50 transition-colors
              "
              placeholder="Ej: 10"
            />
          </div>

          {/* CAMPO: MOTIVO O NOTAS */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              <FileText size={13} className="text-slate-400" />
              Motivo / Justificación
            </label>
            <textarea
              required
              rows="3"
              disabled={actionLoading}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="
                w-full rounded-xl border border-slate-200 dark:border-slate-700
                bg-white dark:bg-slate-800 px-3.5 py-2 text-sm text-slate-900 dark:text-white
                focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400
                disabled:opacity-50 transition-colors resize-none
              "
              placeholder="Describa el motivo del ajuste para el historial de auditoría..."
            />
          </div>

          {/* ACCIONES DEL FORMULARIO */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              disabled={actionLoading}
              onClick={onClose}
              className="
                px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300
                bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700
                transition-colors disabled:opacity-50
              "
            >
              Cancelar
            </button>
            
            <button
              type="submit"
              disabled={actionLoading || quantity <= 0}
              className={`
                px-4 py-2 text-xs font-semibold rounded-xl transition-all
                focus:outline-none focus:ring-2 focus:ring-offset-2
                disabled:opacity-50 inline-flex items-center gap-2
                ${config.btnClass}
              `}
            >
              {actionLoading && (
                <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
              )}
              {config.submitLabel}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}