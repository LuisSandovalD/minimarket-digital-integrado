import {
  Activity,
  AlertTriangle,
  Boxes,
  Building2,
  CheckCircle2,
  Lock,
  Minus,
  Package,
  Plus,
  Settings2,
  ShieldAlert,
} from "lucide-react";

// Importamos TFooter directo de tus componentes compartidos de visualización
import { Table, TFooter, THead } from "@/components/data-display/";
import { getStockStatus } from "../utils/stockStatus";

export default function InventoriesTable({
  inventories = [],
  loading = false,
  actionLoading = false,
  page = 1,
  totalPages = 1,
  onNextPage,
  onPrevPage,
  handleAddStock,
  handleRemoveStock,
  handleDamagedStock,
}) {
  // ========================================
  // TABLE COLUMNS
  // ========================================
  const columns = [
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
      key: "stock",
      label: (
        <div className="flex items-center gap-2">
          <Boxes size={14} />
          Stock
        </div>
      ),
    },
    {
      key: "reserved",
      label: (
        <div className="flex items-center gap-2">
          <Lock size={14} />
          Reservado
        </div>
      ),
    },
    {
      key: "damaged",
      label: (
        <div className="flex items-center gap-2">
          <AlertTriangle size={14} />
          Dañado
        </div>
      ),
    },
    {
      key: "available",
      label: (
        <div className="flex items-center gap-2">
          <CheckCircle2 size={14} />
          Disponible
        </div>
      ),
    },
    {
      key: "status",
      label: (
        <div className="flex items-center gap-2">
          <Activity size={14} />
          Estado
        </div>
      ),
    },
    {
      key: "actions",
      label: (
        <div className="flex items-center gap-2">
          <Settings2 size={14} />
          Acciones
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      {/* ========================================
       * TABLE CONTAINER
       * ====================================== */}
      <Table>
        <THead columns={columns} />

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={8} className="px-6 py-16 text-center text-slate-500">
                <div className="flex items-center justify-center gap-2 text-sm font-medium">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-500 border-t-transparent" />
                  Cargando inventario...
                </div>
              </td>
            </tr>
          ) : inventories.length > 0 ? (
            inventories.map((inventory) => {
              const status = getStockStatus(inventory.stock, inventory.product?.minStock);
              const availableStock = (inventory.stock || 0) - (inventory.reservedStock || 0);

              return (
                <tr
                  key={inventory.id}
                  className="
                    border-b
                    border-slate-200/50
                    dark:border-slate-800
                    transition-all
                    hover:bg-slate-50
                    dark:hover:bg-slate-900/40
                  "
                >
                  {/* PRODUCT */}
                  <td className="px-6 py-5">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800 dark:text-white">
                        {inventory.product?.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">SKU: {inventory.product?.sku || "-"}</p>
                    </div>
                  </td>

                  {/* BRANCH */}
                  <td className="px-6 py-5 text-sm font-medium text-slate-600 dark:text-slate-300">
                    {inventory.branch?.name}
                  </td>

                  {/* STOCK */}
                  <td className="px-6 py-5 text-sm font-bold text-slate-800 dark:text-slate-100">{inventory.stock}</td>

                  {/* RESERVED */}
                  <td className="px-6 py-5 text-sm text-slate-500 dark:text-slate-400">
                    {inventory.reservedStock || 0}
                  </td>

                  {/* DAMAGED */}
                  <td className="px-6 py-5 text-sm font-semibold text-red-600 dark:text-red-400">
                    {inventory.damagedStock || 0}
                  </td>

                  {/* AVAILABLE */}
                  <td className="px-6 py-5 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {availableStock}
                  </td>

                  {/* STATUS BADGE */}
                  <td className="px-6 py-5">
                    <span
                      className={`
                        inline-flex
                        items-center
                        rounded-xl
                        px-3
                        py-1
                        text-xs
                        font-medium
                        ${status.color}
                      `}
                    >
                      {status.label}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        disabled={actionLoading}
                        onClick={() => handleAddStock(inventory.id)}
                        className="
                          inline-flex items-center gap-1.5 
                          bg-green-600 hover:bg-green-700 text-white 
                          px-3 py-1.5 rounded-xl text-xs font-medium
                          transition-colors disabled:opacity-50
                        "
                      >
                        <Plus size={13} /> Agregar
                      </button>

                      <button
                        disabled={actionLoading}
                        onClick={() => handleRemoveStock(inventory.id)}
                        className="
                          inline-flex items-center gap-1.5 
                          bg-orange-500 hover:bg-orange-600 text-white 
                          px-3 py-1.5 rounded-xl text-xs font-medium
                          transition-colors disabled:opacity-50
                        "
                      >
                        <Minus size={13} /> Remover
                      </button>

                      <button
                        disabled={actionLoading}
                        onClick={() => handleDamagedStock(inventory.id)}
                        className="
                          inline-flex items-center gap-1.5 
                          bg-red-600 hover:bg-red-700 text-white 
                          px-3 py-1.5 rounded-xl text-xs font-medium
                          transition-colors disabled:opacity-50
                        "
                      >
                        <ShieldAlert size={13} /> Dañado
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={8} className="px-6 py-16 text-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
                    <Boxes className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Sin unidades en inventario
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">No se encontraron registros de stock asignados.</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
        {inventories.length > 0 && (
          <TFooter page={page} totalPages={totalPages} onPrev={onPrevPage} onNext={onNextPage} />
        )}
      </Table>
    </div>
  );
}
