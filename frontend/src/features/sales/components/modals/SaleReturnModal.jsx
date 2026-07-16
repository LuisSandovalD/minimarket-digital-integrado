// ========================================
// features/sales/components/SaleReturnModal.jsx
// ========================================
import { ModernButton } from "@/components/buttons";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays";
import { AlertTriangle, Receipt, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { returnSale } from "../../services/sale.service";

export default function SaleReturnModal({ open, onClose, sale, onSuccess }) {
  const [returnItems, setReturnItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sale?.details) {
      // Mapeamos los artículos permitiendo elegir cuántas unidades se devuelven
      const initial = sale.details.map((item) => ({
        productId: item.productId,
        name: item.product?.name || "Producto",
        sku: item.product?.sku || "",
        maxQuantity: item.quantity,
        quantityToReturn: 0, // Inicia en cero
      }));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReturnItems(initial);
    }
  }, [sale]);

  const handleQtyChange = (productId, val) => {
    setReturnItems((prev) =>
      prev.map((item) => {
        if (item.productId === productId) {
          const target = Math.min(Math.max(Number(val), 0), item.maxQuantity);
          return { ...item, quantityToReturn: target };
        }
        return item;
      }),
    );
  };

  const handleSubmit = async () => {
    const payload = returnItems
      .filter((i) => i.quantityToReturn > 0)
      .map((i) => ({ productId: i.productId, quantity: i.quantityToReturn }));

    if (payload.length === 0) return alert("Selecciona al menos una unidad para devolver.");

    try {
      setLoading(true);
      await returnSale(sale.id, payload);
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error("Error al procesar nota de crédito:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!open || !sale) return null;

  return (
    <Modal open={open} onClose={onClose} size="lg">
      <HeaderModal
        title={`Emitir Nota de Crédito / Devolución — Ticket: ${sale.saleNumber}`}
        subtitle="Ajuste de inventario físico en tiempo real"
        icon={Receipt}
        onClose={onClose}
      />

      <div className="p-4 space-y-4 text-xs text-slate-600 dark:text-slate-300">
        <div className="bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 p-3 rounded-xl flex gap-2 items-start">
          <AlertTriangle size={16} className="shrink-0 mt-0.5" />
          <p>
            Esta acción reintegrará las cantidades seleccionadas al stock de la sucursal de origen y generará un balance
            a favor si aplica.
          </p>
        </div>

        <div className="border dark:border-slate-800 rounded-xl overflow-hidden">
          <div className="grid grid-cols-12 gap-2 bg-slate-50 dark:bg-slate-900 p-2 font-bold uppercase tracking-wider text-[10px] text-slate-400 border-b dark:border-slate-800">
            <span className="col-span-6">Descripción del Producto</span>
            <span className="col-span-3 text-center">Cant. Vendida</span>
            <span className="col-span-3 text-right">Cant. a Devolver</span>
          </div>

          <div className="divide-y dark:divide-slate-800 bg-white dark:bg-slate-950">
            {returnItems.map((item) => (
              <div key={item.productId} className="grid grid-cols-12 gap-2 p-2.5 items-center">
                <div className="col-span-6 min-w-0">
                  <p className="font-semibold truncate text-slate-800 dark:text-slate-200">{item.name}</p>
                  <span className="font-mono text-[10px] text-slate-400">{item.sku}</span>
                </div>
                <span className="col-span-3 text-center font-mono font-bold bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded">
                  x{item.maxQuantity}
                </span>
                <div className="col-span-3 text-right">
                  <input
                    type="number"
                    min="0"
                    max={item.maxQuantity}
                    value={item.quantityToReturn}
                    onChange={(e) => handleQtyChange(item.productId, e.target.value)}
                    className="w-16 text-center border dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-1 rounded font-mono font-bold focus:outline-none focus:ring-1 focus:ring-amber-500 text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FooterModal>
        <div className="flex justify-end gap-2">
          <ModernButton variant="ghost" text="Cancelar" onClick={onClose} />
          <ModernButton
            disabled={loading}
            icon={RefreshCcw}
            text={loading ? "Extrayendo..." : "Procesar Devolución"}
            className="bg-amber-600 hover:bg-amber-700 text-white shadow-sm"
            onClick={handleSubmit}
          />
        </div>
      </FooterModal>
    </Modal>
  );
}
