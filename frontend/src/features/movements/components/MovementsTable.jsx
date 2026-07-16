// ========================================
// features/movements/components/MovementsTable.jsx
// ========================================

import {
  ArrowDown,
  ArrowUp,
  Boxes,
  Building2,
  CalendarDays,
  FileText,
  History,
  Package,
  PackageX,
  RefreshCcw,
} from "lucide-react";

import { Table, TFooter, THead } from "@/components/data-display/";
import MovementTypeBadge from "./MovementTypeBadge";

export default function MovementsTable({ movements = [], page = 1, totalPages = 1, onNextPage, onPrevPage }) {
  // ========================================
  // TABLE COLUMNS
  // ========================================

  const columns = [
    {
      key: "date",
      label: (
        <div className="flex items-center gap-2">
          <CalendarDays size={14} />
          Fecha
        </div>
      ),
    },
    {
      key: "product",
      label: (
        <div className="flex items-center gap-2">
          <Package size={14} />
          Producto
        </div>
      ),
    },
    {
      key: "branch",
      label: (
        <div className="flex items-center gap-2">
          <Building2 size={14} />
          Sucursal
        </div>
      ),
    },
    {
      key: "type",
      label: (
        <div className="flex items-center gap-2">
          <History size={14} />
          Tipo
        </div>
      ),
    },
    {
      key: "quantity",
      label: (
        <div className="flex items-center gap-2">
          <Boxes size={14} />
          Cantidad
        </div>
      ),
    },
    {
      key: "previous",
      label: (
        <div className="flex items-center gap-2">
          <ArrowDown size={14} />
          Stock Antes
        </div>
      ),
    },
    {
      key: "new",
      label: (
        <div className="flex items-center gap-2">
          <ArrowUp size={14} />
          Stock Después
        </div>
      ),
    },
    {
      key: "reason",
      label: (
        <div className="flex items-center gap-2">
          <FileText size={14} />
          Motivo
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <Table>
        <THead columns={columns} />
        <tbody>
          {movements.length > 0 ? (
            movements.map((movement) => (
              <tr
                key={movement.id}
                className="border-b border-slate-200/50 dark:border-slate-800 transition-all hover:bg-slate-50 dark:hover:bg-slate-900/40"
              >
                {/* DATE */}
                <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  {new Date(movement.createdAt).toLocaleString()}
                </td>

                {/* PRODUCT */}
                <td className="px-6 py-5">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800 dark:text-white">
                      {movement.product?.name || "Sin producto"}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">SKU: {movement.product?.sku || "-"}</p>
                  </div>
                </td>

                {/* BRANCH */}
                <td className="px-6 py-5 text-sm font-medium text-slate-600 dark:text-slate-300">
                  {movement.branch?.name || "-"}
                </td>

                {/* TYPE */}
                <td className="px-6 py-5">
                  <MovementTypeBadge type={movement.type} />
                </td>

                {/* QUANTITY */}
                <td className="px-6 py-5 text-sm font-bold text-slate-800 dark:text-slate-100">{movement.quantity}</td>

                {/* PREVIOUS */}
                <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300">{movement.previousStock}</td>

                {/* NEW */}
                <td className="px-6 py-5 text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {movement.newStock}
                </td>

                {/* REASON */}
                <td className="px-6 py-5">
                  <div className="inline-flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {movement.type === "DAMAGED" ? (
                      <PackageX size={13} />
                    ) : movement.type === "TRANSFER" ? (
                      <RefreshCcw size={13} />
                    ) : (
                      <FileText size={13} />
                    )}
                    {movement.reason || "Sin motivo"}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="px-6 py-16 text-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
                    <History className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Sin movimientos registrados
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">No se encontraron movimientos de inventario.</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>

        {/* FOOTER CON PAGINACIÓN PROPIA DE LA TABLA */}
        {movements.length > 0 && (
          <TFooter page={page} totalPages={totalPages} onPrev={onPrevPage} onNext={onNextPage} />
        )}
      </Table>
    </div>
  );
}
