// ========================================
// FEATURES / SALE DETAIL / COMPONENTS
// SALE DETAIL MODAL - RECONCILIADO CON LA TABLA
// ========================================

import { ModernButton } from "@/components/buttons";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays";
import { DollarSign, Package, TrendingUp, X } from "lucide-react";

const formatPrice = (value) => {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(Number(value || 0));
};

export default function SaleDetailModal({ open, onClose, detail }) {
  if (!detail) return null;

  const product = detail.product || detail.Product || {};
  const sale = detail.sale || detail.Sale || {};

  // ==========================================================
  // RECONCILIACIÓN MATEMÁTICA IDÉNTICA A LA TABLA
  // ==========================================================
  const priceUnit = Number(detail.price || 0);
  const qty = Number(detail.quantity || 0);
  const discountAmount = Number(detail.discount || 0);

  const baseBruta = priceUnit * qty - discountAmount;

  let subtotalAmount, taxAmount, lineTotal;

  if (detail.subtotal !== undefined && detail.subtotal !== null) {
    subtotalAmount = Number(detail.subtotal || 0);
    taxAmount = detail.tax !== undefined ? Number(detail.tax || 0) : subtotalAmount * 0.18;
    lineTotal = subtotalAmount + taxAmount;
  } else {
    // Si la propiedad subtotal no viene del backend, desglosamos igual que en tu tabla
    lineTotal = baseBruta;
    subtotalAmount = lineTotal / 1.18;
    taxAmount = lineTotal - subtotalAmount;
  }

  return (
    <Modal open={open} onClose={onClose} size="xl">
      <HeaderModal
        title="Detalle de venta"
        subtitle={sale.saleNumber || sale.invoiceNumber || "Información completa"}
        onClose={onClose}
      />

      <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
        {/* RESUMEN DE VENTA */}
        <div className="grid grid-cols-3 gap-2">
          {[
            {
              label: "Número de Comprobante",
              value: sale.saleNumber || sale.invoiceNumber || `TRX-${sale.id || ""}`,
            },
            { label: "Estado", value: sale.status },
            {
              label: "Fecha",
              value: sale.createdAt ? new Date(sale.createdAt).toLocaleString("es-PE") : "-",
            },
          ].map(({ label, value }) => (
            <div key={label} className="bg-slate-50 dark:bg-slate-800/50 rounded-lg px-3 py-2">
              <p className="text-[11px] text-slate-500 mb-0.5">{label}</p>
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{value ?? "-"}</p>
            </div>
          ))}
        </div>

        {/* PRODUCTO */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-200 dark:border-slate-800">
            <Package size={14} className="text-blue-500" />
            <span className="text-xs font-medium">Producto</span>
          </div>
          <div className="grid grid-cols-4 divide-x divide-slate-200 dark:divide-slate-800">
            {[
              { label: "Nombre", value: product.name || detail.productName },
              { label: "SKU", value: product.sku || detail.productSku },
              { label: "Código de barras", value: product.barcode },
              { label: "Cantidad vendida", value: `${qty} u.` },
            ].map(({ label, value }) => (
              <div key={label} className="px-3 py-2">
                <p className="text-[11px] text-slate-500 mb-0.5">{label}</p>
                <p className="text-sm font-medium text-slate-900 dark:text-white break-words">{value ?? "-"}</p>
              </div>
            ))}
          </div>
        </div>

        {/* COSTOS E IMPORTES */}
        <div className="grid grid-cols-2 gap-3">
          {/* COSTOS Y RENDIMIENTO */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-200 dark:border-slate-800">
              <TrendingUp size={14} className="text-amber-500" />
              <span className="text-xs font-medium">Costos y Rendimiento</span>
            </div>
            <table className="w-full text-sm">
              <tbody>
                {[
                  {
                    label: "Precio unitario pactado",
                    value: formatPrice(priceUnit),
                  },
                  {
                    label: "Precio catálogo actual",
                    value: formatPrice(product.salePrice),
                  },
                  {
                    label: "Costo unitario base",
                    value: formatPrice(product.costPrice),
                  },
                  {
                    label: "Ganancia unitaria",
                    value: formatPrice(product.profitAmount),
                  },
                  {
                    label: "Margen comercial",
                    value: `${Number(product.profitMargin || 0).toFixed(2)}%`,
                  },
                ].map(({ label, value }) => (
                  <tr key={label} className="border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <td className="px-3 py-2 text-slate-500">{label}</td>
                    <td className="px-3 py-2 text-right font-medium text-slate-900 dark:text-white">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* DESGLOSE MONETARIO */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-200 dark:border-slate-800">
              <DollarSign size={14} className="text-indigo-500" />
              <span className="text-xs font-medium">Desglose Económico de esta Partida</span>
            </div>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="px-3 py-2 text-slate-500">Subtotal Neto (Línea)</td>
                  <td className="px-3 py-2 text-right font-medium text-slate-900 dark:text-white">
                    {formatPrice(subtotalAmount)}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-slate-500">IGV Asignado (18%)</td>
                  <td className="px-3 py-2 text-right font-medium text-slate-600 dark:text-slate-400">
                    {formatPrice(taxAmount)}
                  </td>
                </tr>
                {discountAmount > 0 && (
                  <tr>
                    <td className="px-3 py-2 text-emerald-600 font-medium">Descuento aplicado</td>
                    <td className="px-3 py-2 text-right font-medium text-emerald-600">
                      -{formatPrice(discountAmount)}
                    </td>
                  </tr>
                )}
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
                  <td className="px-3 py-2.5 font-semibold text-slate-900 dark:text-white">Total Línea</td>
                  <td className="px-3 py-2.5 text-right font-bold text-slate-900 dark:text-white text-base">
                    {formatPrice(lineTotal)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <FooterModal>
        <div className="flex justify-end w-full">
          <ModernButton text="Cerrar" icon={X} onClick={onClose} />
        </div>
      </FooterModal>
    </Modal>
  );
}
