// ========================================
// features/purchase/components/steps/SummaryStep.jsx
// ========================================

import {
  Building2,
  ClipboardList,
  DollarSign,
  FileText,
  Package,
} from "lucide-react";

export default function SummaryStep({ form, suppliers = [] }) {
  const details = Array.isArray(form?.details) ? form.details : [];

  const supplier = suppliers.find(
    (s) => Number(s.id) === Number(form?.supplierId),
  );

  const subtotal = details.reduce(
    (acc, item) =>
      acc + Number(item.quantity || 0) * Number(item.costPrice || 0),
    0,
  );

  const tax = subtotal * 0.18;

  const total = subtotal + tax;

  return (
    <div className="p-6 space-y-6">
      {/* ========================================
       * SUPPLIER
       * ====================================== */}

      <div
        className="
          rounded-2xl
          border
          p-5
          bg-white
          dark:bg-slate-950
        "
      >
        <div className="flex items-center gap-2 mb-4">
          <Building2 size={18} />

          <h3 className="font-semibold">Proveedor</h3>
        </div>

        <div className="space-y-2 text-sm">
          <p>
            <strong>Nombre:</strong> {supplier?.name || "-"}
          </p>

          <p>
            <strong>RUC:</strong> {supplier?.ruc || "-"}
          </p>

          <p>
            <strong>Teléfono:</strong> {supplier?.phone || "-"}
          </p>

          <p>
            <strong>Correo:</strong> {supplier?.email || "-"}
          </p>
        </div>
      </div>

      {/* ========================================
       * NOTES
       * ====================================== */}

      {form?.notes && (
        <div
          className="
            rounded-2xl
            border
            p-5
            bg-white
            dark:bg-slate-950
          "
        >
          <div className="flex items-center gap-2 mb-3">
            <FileText size={18} />

            <h3 className="font-semibold">Observaciones</h3>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400">
            {form.notes}
          </p>
        </div>
      )}

      {/* ========================================
       * PRODUCTS
       * ====================================== */}

      <div
        className="
          rounded-2xl
          border
          bg-white
          dark:bg-slate-950
          overflow-hidden
        "
      >
        <div
          className="
            px-5
            py-4
            border-b
            flex
            items-center
            gap-2
          "
        >
          <Package size={18} />

          <h3 className="font-semibold">Productos</h3>
        </div>

        <div className="divide-y">
          {details.map((item) => (
            <div
              key={item.productId}
              className="
                px-5
                py-4
                flex
                justify-between
                gap-4
              "
            >
              <div>
                <h4 className="font-medium">{item.productName}</h4>

                <p
                  className="
                    text-xs
                    text-slate-500
                    mt-1
                  "
                >
                  SKU: {item.sku || "-"}
                </p>
              </div>

              <div
                className="
                  text-right
                  text-sm
                "
              >
                <p>
                  Cantidad: <strong>{item.quantity}</strong>
                </p>

                <p>
                  Costo: <strong>S/ {Number(item.costPrice).toFixed(2)}</strong>
                </p>

                <p
                  className="
                    font-semibold
                    mt-1
                  "
                >
                  S/{" "}
                  {(Number(item.quantity) * Number(item.costPrice)).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================
       * TOTALS
       * ====================================== */}

      <div
        className="
          rounded-2xl
          border
          p-5
          bg-slate-50
          dark:bg-slate-950
        "
      >
        <div className="flex items-center gap-2 mb-4">
          <DollarSign size={18} />

          <h3 className="font-semibold">Resumen Financiero</h3>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Subtotal</span>

            <strong>S/ {subtotal.toFixed(2)}</strong>
          </div>

          <div className="flex justify-between">
            <span>IGV (18%)</span>

            <strong>S/ {tax.toFixed(2)}</strong>
          </div>

          <div className="border-t pt-3 flex justify-between">
            <span className="font-semibold">Total</span>

            <span
              className="
                text-xl
                font-bold
                text-blue-600
              "
            >
              S/ {total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================
       * SUMMARY
       * ====================================== */}

      <div
        className="
          rounded-2xl
          border
          p-5
          bg-emerald-50
          dark:bg-emerald-500/10
        "
      >
        <div className="flex items-center gap-2">
          <ClipboardList size={18} />

          <h3 className="font-semibold">Confirmación</h3>
        </div>

        <p
          className="
            mt-2
            text-sm
            text-slate-600
            dark:text-slate-400
          "
        >
          Al confirmar la compra se registrará el ingreso de inventario y se
          actualizará automáticamente el stock de los productos seleccionados.
        </p>
      </div>
    </div>
  );
}
