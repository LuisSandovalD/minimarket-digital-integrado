// ========================================
// features/sale-detail/components/SaleDetailTable.jsx
// ========================================

import { ModernButton } from "@/components/buttons";
import { Table, TFooter, THead } from "@/components/data-display";
import { Eye, FileSearch, Package, Receipt } from "lucide-react";

// Configuración de columnas nativas (Asegúrate de remover Descuento, Impuesto y Estado aquí)
import { saleDetailColumns } from "../constants/saleDetail.columns";

export default function SaleDetailTable({
  details = [],
  onView,
  onTrackInvoice,
  page = 1,
  totalPages = 1,
  onPrevPage,
  onNextPage,
}) {
  const safeDetails = Array.isArray(details) ? details : [];

  // ========================================
  // MAPEO DINÁMICO DE COLUMNAS
  // ========================================
  const columns = saleDetailColumns.map((col) => ({
    key: col.key,
    label: (
      <div className="flex items-center gap-2">
        {col.Icon && <col.Icon size={14} />}
        {col.text}
      </div>
    ),
  }));

  // ========================================
  // FORMATEADOR DE MONEDA NACIONAL (PEN)
  // ========================================
  const formatMoney = (value) =>
    new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(Number(value || 0));

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">Detalles de Ventas</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Audita el historial físico de productos vendidos y montos aplicados por línea de transacción.
        </p>
      </div>

      <Table>
        <THead columns={columns} />

        <tbody>
          {safeDetails.length > 0 ? (
            safeDetails.map((detail, index) => {
              if (!detail) return null;

              const rowKey = detail.id || `detail-${index}`;

              // Tolerancia relacional (Sequelize minúsculas/mayúsculas)
              const currentSale = detail.sale || detail.Sale || {};
              const currentProduct = detail.product || detail.Product || {};

              // Parseo seguro de métricas nativas de la partida
              const priceUnit = Number(detail.price || 0);
              const qty = Number(detail.quantity || 0);
              const discountAmount = Number(detail.discount || 0);

              // ==========================================================
              // RECONCILIACIÓN MATEMÁTICA CON IGV
              // ==========================================================
              const baseBruta = priceUnit * qty - discountAmount;

              let subtotalAmount, lineTotal;

              if (detail.subtotal !== undefined) {
                subtotalAmount = Number(detail.subtotal || 0);
                const taxAmount = detail.tax !== undefined ? Number(detail.tax || 0) : subtotalAmount * 0.18;
                lineTotal = subtotalAmount + taxAmount;
              } else {
                lineTotal = baseBruta;
                subtotalAmount = lineTotal / 1.18;
              }

              return (
                <tr
                  key={rowKey}
                  className="border-b border-slate-200/50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors"
                >
                  {/* 1. NÚMERO DE COMPROBANTE */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500">
                        <Receipt size={16} />
                      </div>
                      <span className="text-sm font-semibold text-slate-800 dark:text-white">
                        {currentSale.saleNumber ||
                          currentSale.invoiceNumber ||
                          `TRX-${detail.saleId || currentSale.id || ""}`}
                      </span>
                    </div>
                  </td>

                  {/* 2. DESCRIPCIÓN DEL PRODUCTO */}
                  <td className="px-6 py-4">
                    <p
                      className="text-sm font-medium text-slate-900 dark:text-white max-w-[240px] truncate"
                      title={currentProduct.name || detail.productName}
                    >
                      {currentProduct.name || detail.productName || "Artículo Descontinuado"}
                    </p>
                    {(currentProduct.sku || detail.productSku) && (
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 block mt-0.5">
                        SKU: {currentProduct.sku || detail.productSku}
                      </span>
                    )}
                  </td>

                  {/* 3. CANTIDAD VENDIDA */}
                  <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">{qty} u.</td>

                  {/* 4. PRECIO UNITARIO */}
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{formatMoney(priceUnit)}</td>

                  {/* 5. SUBTOTAL DE LÍNEA (SIN IMPUESTO) */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {formatMoney(subtotalAmount)}
                    </span>
                  </td>

                  {/* 6. TOTAL DE LA PARTIDA (CON IMPUESTO) */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800/60 px-2.5 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700/50">
                      {formatMoney(lineTotal)}
                    </span>
                  </td>

                  {/* 7. PANEL DE ACCIONES */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <ModernButton
                        type="button"
                        icon={Eye}
                        variant="secondary"
                        text="Ver"
                        onClick={() => onView?.(detail)}
                      />
                      {onTrackInvoice && (
                        <ModernButton
                          type="button"
                          icon={FileSearch}
                          variant="outline"
                          onClick={() => onTrackInvoice(detail)}
                          className="p-2 h-9 w-9 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                          title="Rastrear Comprobante"
                        />
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7} className="px-6 py-16 text-center">
                <div className="flex flex-col items-center">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
                    <Package className="h-6 w-6 text-slate-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    No hay detalles de venta registrados
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    Las partidas de las transacciones aparecerán reflejadas en esta lista.
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>

        {/* PIE DE PÁGINA CON PAGINACIÓN */}
        {safeDetails.length > 0 && (
          <TFooter page={page} totalPages={totalPages} onPrev={onPrevPage} onNext={onNextPage} />
        )}
      </Table>
    </div>
  );
}
