import { Building2, CheckCircle2, DollarSign, Mail, Package, Phone } from "lucide-react";

export default function SummaryStep({ form, suppliers = [] }) {
  const details = Array.isArray(form?.details) ? form.details : [];

  const supplier = suppliers.find((s) => String(s.id) === String(form?.supplierId));

  const subtotal = details.reduce((acc, item) => acc + Number(item.quantity || 0) * Number(item.costPrice || 0), 0);

  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    // FIX: flex-1 + overflow-y-auto es donde el scroll debe vivir
    <div className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-900/40">
      <div className="p-6 max-w-2xl mx-auto space-y-6">
        {/* HEADER */}
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Resumen de la Compra
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Verifica la información del proveedor, los insumos y los montos antes de procesar la orden.
          </p>
        </div>

        {/* ========================================
         * SUPPLIER CARD
         * ====================================== */}
        <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden">
          <div className="px-5 py-4 bg-slate-50/50 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-900 flex items-center gap-2.5 text-slate-800 dark:text-slate-200">
            <Building2 size={18} className="text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-sm">Información del Proveedor</h3>
          </div>

          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-0.5">
              <span className="text-xs font-medium text-slate-400 dark:text-slate-500">Razon Social / Nombre</span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                {supplier?.companyName || supplier?.name || supplier?.razonSocial || "-"}
              </p>
            </div>

            <div className="space-y-0.5">
              <span className="text-xs font-medium text-slate-400 dark:text-slate-500">RUC</span>
              <p className="font-medium text-slate-700 dark:text-slate-300">
                {supplier?.ruc || supplier?.documentId || "-"}
              </p>
            </div>

            <div className="space-y-0.5 flex items-center gap-2 pt-1 sm:pt-0">
              <Phone size={14} className="text-slate-400" />
              <div>
                <span className="text-xs font-medium text-slate-400 dark:text-slate-500 block">Teléfono</span>
                <p className="text-slate-700 dark:text-slate-300">{supplier?.phone || supplier?.telephone || "-"}</p>
              </div>
            </div>

            <div className="space-y-0.5 flex items-center gap-2 pt-1 sm:pt-0">
              <Mail size={14} className="text-slate-400" />
              <div>
                <span className="text-xs font-medium text-slate-400 dark:text-slate-500 block">Correo Electrónico</span>
                <p className="text-slate-700 dark:text-slate-300 truncate max-w-[220px]">{supplier?.email || "-"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================
         * PURCHASE ITEMS
         * ====================================== */}
        <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden">
          <div className="px-5 py-4 bg-slate-50/50 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-900 flex items-center gap-2.5 text-slate-800 dark:text-slate-200">
            <Package size={18} className="text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-sm">Detalle de Artículos</h3>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-900 max-h-80 overflow-y-auto">
            {details.length > 0 ? (
              details.map((item) => (
                <div
                  key={item.productId}
                  className="px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/30 dark:hover:bg-slate-900/10 transition-colors"
                >
                  <div className="min-w-0">
                    <h4 className="font-medium text-sm text-slate-900 dark:text-slate-100 truncate">
                      {item.productName || item.name}
                    </h4>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">SKU: {item.sku || "Sin código"}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {item.quantity} x{" "}
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        S/ {Number(item.costPrice || 0).toFixed(2)}
                      </span>
                    </p>
                    <p className="font-semibold text-sm text-slate-900 dark:text-slate-100 mt-0.5">
                      S/ {(Number(item.quantity || 0) * Number(item.costPrice || 0)).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-xs text-slate-400 dark:text-slate-600">
                No hay productos agregados en el carrito.
              </div>
            )}
          </div>
        </div>

        {/* ========================================
         * FINANCIAL BREAKDOWN
         * ====================================== */}
        <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 shadow-sm space-y-3.5">
          <div className="flex items-center gap-2.5 text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-900 pb-2.5">
            <DollarSign size={18} className="text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-sm">Resumen Financiero</h3>
          </div>

          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
              <span>Subtotal afecto</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">S/ {subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
              <span>IGV (18%)</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">S/ {tax.toFixed(2)}</span>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-900 pt-3.5 flex justify-between items-center">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Total a Pagar</span>
              <span className="text-2xl font-black text-blue-600 dark:text-blue-400 tracking-tight">
                S/ {total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* ========================================
         * SYSTEM CONFIRMATION NOTIFICATION
         * ====================================== */}
        <div className="rounded-2xl border border-emerald-200/60 dark:border-emerald-500/10 p-5 bg-emerald-50/50 dark:bg-emerald-500/5 flex items-start gap-3.5">
          <CheckCircle2 size={20} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-sm text-emerald-800 dark:text-emerald-400">
              Efecto en el Sistema de Inventarios
            </h3>
            <p className="mt-1 text-xs text-emerald-700/90 dark:text-emerald-500/80 leading-relaxed">
              Al procesar esta acción, se generará la orden de compra y se registrará de inmediato el ingreso físico de
              mercancía a los almacenes del sistema.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
