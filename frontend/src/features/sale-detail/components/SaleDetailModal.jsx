// ========================================
// FEATURES / SALE DETAIL / COMPONENTS
// SALE DETAIL MODAL
// ========================================

import { DollarSign, Package, TrendingUp, X } from "lucide-react";

import { FooterModal, HeaderModal, Modal } from "@/components/overlays";

import { ModernButton } from "@/components/buttons";

// ========================================
// FORMAT PRICE
// ========================================

const formatPrice = (value) => {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(Number(value || 0));
};

// ========================================
// SALE DETAIL MODAL
// ========================================

export default function SaleDetailModal({ open, onClose, detail }) {
  if (!detail) return null;

  const product = detail.product || {};
  const sale = detail.sale || {};

  return (
    <Modal open={open} onClose={onClose} size="xl">
      <HeaderModal
        title="Detalle de venta"
        subtitle={sale.saleNumber || "Información completa"}
        onClose={onClose}
      />

      <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
        {/* RESUMEN DE VENTA — 3 columnas */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Número", value: sale.saleNumber },
            { label: "Estado", value: sale.status },
            {
              label: "Fecha",
              value: sale.createdAt
                ? new Date(sale.createdAt).toLocaleString("es-PE")
                : "-",
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-slate-50 dark:bg-slate-800/50 rounded-lg px-3 py-2"
            >
              <p className="text-[11px] text-slate-500 mb-0.5">{label}</p>
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                {value ?? "-"}
              </p>
            </div>
          ))}
        </div>

        {/* PRODUCTO — fila horizontal de 4 columnas */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-200 dark:border-slate-800">
            <Package size={14} className="text-blue-500" />
            <span className="text-xs font-medium">Producto</span>
          </div>
          <div className="grid grid-cols-4 divide-x divide-slate-200 dark:divide-slate-800">
            {[
              { label: "Nombre", value: product.name },
              { label: "SKU", value: product.sku },
              { label: "Código de barras", value: product.barcode },
              { label: "Cantidad vendida", value: detail.quantity },
            ].map(({ label, value }) => (
              <div key={label} className="px-3 py-2">
                <p className="text-[11px] text-slate-500 mb-0.5">{label}</p>
                <p className="text-sm font-medium text-slate-900 dark:text-white break-words">
                  {value ?? "-"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* COSTOS E IMPORTES — dos tablas en paralelo */}
        <div className="grid grid-cols-2 gap-3">
          {/* COSTOS */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-200 dark:border-slate-800">
              <TrendingUp size={14} className="text-amber-500" />
              <span className="text-xs font-medium">Costos y ganancia</span>
            </div>
            <table className="w-full text-sm">
              <tbody>
                {[
                  // ✅ FIX: "Precio vendido" → "Precio unitario"
                  // detail.price es el precio por unidad, no el total pagado
                  {
                    label: "Precio unitario",
                    value: formatPrice(detail.price),
                  },
                  {
                    label: "Precio actual",
                    value: formatPrice(product.salePrice),
                  },
                  { label: "Costo", value: formatPrice(product.costPrice) },
                  {
                    label: "Ganancia unitaria",
                    value: formatPrice(product.profitAmount),
                  },
                  {
                    label: "Margen",
                    value: `${Number(product.profitMargin || 0).toFixed(2)}%`,
                  },
                ].map(({ label, value }) => (
                  <tr
                    key={label}
                    className="border-b border-slate-100 dark:border-slate-800 last:border-0"
                  >
                    <td className="px-3 py-2 text-slate-500">{label}</td>
                    <td className="px-3 py-2 text-right font-medium text-slate-900 dark:text-white">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* IMPORTES */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-200 dark:border-slate-800">
              <DollarSign size={14} className="text-indigo-500" />
              <span className="text-xs font-medium">Importes</span>
            </div>
            <table className="w-full text-sm">
              <tbody>
                {/* LÍNEA: datos del detalle (sin IGV, el IGV vive en sale) */}
                {[
                  {
                    label: "Subtotal línea",
                    value: formatPrice(detail.subtotal),
                  },
                  {
                    label: "Descuento línea",
                    value: formatPrice(detail.discount),
                  },
                ].map(({ label, value }) => (
                  <tr
                    key={label}
                    className="border-b border-slate-100 dark:border-slate-800"
                  >
                    <td className="px-3 py-2 text-slate-500">{label}</td>
                    <td className="px-3 py-2 text-right font-medium text-slate-900 dark:text-white">
                      {value}
                    </td>
                  </tr>
                ))}

                {/* SEPARADOR VISUAL */}
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td
                    colSpan={2}
                    className="px-3 py-1 text-[10px] uppercase tracking-wide text-slate-400"
                  >
                    Resumen de la venta
                  </td>
                </tr>

                {/* ✅ FIX: IGV y Total vienen de sale, no del detalle */}
                {[
                  {
                    label: "Subtotal venta",
                    value: formatPrice(sale.subtotal),
                  },
                  {
                    label: "IGV",
                    value: formatPrice(sale.tax),
                  },
                ].map(({ label, value }) => (
                  <tr
                    key={label}
                    className="border-b border-slate-100 dark:border-slate-800"
                  >
                    <td className="px-3 py-2 text-slate-500">{label}</td>
                    <td className="px-3 py-2 text-right font-medium text-slate-900 dark:text-white">
                      {value}
                    </td>
                  </tr>
                ))}

                {/* TOTAL FINAL */}
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td className="px-3 py-2.5 font-medium text-slate-900 dark:text-white">
                    Total venta
                  </td>
                  <td className="px-3 py-2.5 text-right text-base font-semibold text-slate-900 dark:text-white">
                    {formatPrice(sale.total)}
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
