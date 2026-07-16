// ========================================
// features/product/components/ProductsTable.jsx
// ========================================

import { Table, TFooter, THead } from "@/components/data-display/";
import { Activity, Barcode, Boxes, DollarSign, Hash, Package, Settings2, Tag, TrendingUp } from "lucide-react";
import { formatPrice } from "../utils/product.helpers";
import ProductActions from "./ProductActions";
import ProductStatusBadge from "./ProductStatusBadge";

export default function ProductsTable({
  products = [],
  onEdit,
  onDelete,
  page = 1,
  totalPages = 1,
  onPrevPage,
  onNextPage,
  loading = false,
}) {
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
      key: "sku",
      label: (
        <div className="flex items-center gap-2">
          <Hash size={14} />
          SKU
        </div>
      ),
    },
    {
      key: "barcode",
      label: (
        <div className="flex items-center gap-2">
          <Barcode size={14} />
          Código
        </div>
      ),
    },
    {
      key: "category",
      label: (
        <div className="flex items-center gap-2">
          <Tag size={14} />
          Categoría
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
      key: "prices",
      label: (
        <div className="flex items-center gap-2">
          <DollarSign size={14} />
          Precios
        </div>
      ),
    },
    {
      key: "profit",
      label: (
        <div className="flex items-center gap-2">
          <TrendingUp size={14} />
          Ganancia
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

  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">Productos</h2>
        <p className="mt-1 text-sm text-slate-500">Gestiona inventario, precios y productos.</p>
      </div>

      {/* TABLE CONTENEDOR */}
      <div className="w-full overflow-x-auto rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-950/40">
        <Table className="min-w-[1100px] w-full table-auto">
          <THead columns={columns} />

          <tbody className={loading ? "opacity-50 transition-opacity" : ""}>
            {safeProducts.length > 0 ? (
              safeProducts.map((product) => {
                const stock = Number(product.availableStock ?? product.totalStock ?? 0);
                const purchase = Number(product.purchasePrice || 0);
                const cost = Number(product.costPrice || 0);
                const sale = Number(product.salePrice || 0);
                const profit = Number(product.profitAmount || 0);
                const margin = Number(product.profitMargin || 0);

                return (
                  <tr
                    key={product.id}
                    className="border-b border-slate-200/50 dark:border-slate-800/70 transition-all hover:bg-slate-50 dark:hover:bg-slate-900/40 last:border-b-0"
                  >
                    <td className="px-8 py-5.5 min-w-[240px]">
                      <h3 className="text-sm font-semibold tracking-tight text-slate-800 dark:text-white">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500 line-clamp-2 max-w-[300px] font-normal">
                        {product.description || "Sin descripción"}
                      </p>
                    </td>
                    <td className="px-8 py-5.5 text-sm font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      {product.sku || "-"}
                    </td>
                    <td className="px-8 py-5.5 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {product.barcode || "-"}
                    </td>
                    <td className="px-8 py-5.5 whitespace-nowrap">
                      <span className="inline-flex items-center rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-1 text-xs font-medium bg-slate-50/50 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300">
                        {product.category?.name || "-"}
                      </span>
                    </td>
                    <td className="px-8 py-5.5 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                          {stock} unidades
                        </span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          Min: {product.minStock} • Max: {product.maxStock || "-"}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5.5 whitespace-nowrap">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 w-12">
                            Comp:
                          </span>
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {formatPrice(purchase)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 w-12">
                            Cost:
                          </span>
                          <span className="text-sm font-semibold text-orange-500">{formatPrice(cost)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 w-12">
                            Vent:
                          </span>
                          <span className="text-sm font-bold text-green-600 dark:text-green-500">
                            {formatPrice(sale)}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5.5 whitespace-nowrap">
                      <div>
                        <p
                          className={`text-sm font-bold ${profit >= 0 ? "text-emerald-600 dark:text-emerald-500" : "text-red-500"}`}
                        >
                          {profit >= 0 ? "+" : ""}
                          {formatPrice(profit)}
                        </p>
                        <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                          {margin.toFixed(2)}% margen
                        </p>
                      </div>
                    </td>
                    <td className="px-8 py-5.5 whitespace-nowrap">
                      <ProductStatusBadge active={product.isActive} />
                    </td>
                    <td className="px-8 py-5.5 whitespace-nowrap">
                      <ProductActions product={product} onEdit={onEdit} onDelete={onDelete} />
                    </td>
                  </tr>
                );
              })
            ) : (
              /* EMPTY STATE */
              <tr>
                <td colSpan={9} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400">
                      <Package className="h-7 w-7" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">No hay productos</h3>
                    <p className="mt-1 text-sm text-slate-500">Empieza creando tu primer producto.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>

          {/* CONTROLES DE PAGINACIÓN UNIFICADOS CON TFOOTER */}
          {safeProducts.length > 0 && (
            <TFooter page={page} totalPages={totalPages} onPrev={onPrevPage} onNext={onNextPage} disabled={loading} />
          )}
        </Table>
      </div>
    </div>
  );
}
