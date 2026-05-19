// ========================================
// features/product/components/ProductsTable.jsx
// ========================================

import {
  Package,
  Hash,
  Boxes,
  Tag,
  DollarSign,
  Activity,
  Settings2,
  TrendingUp,
  Barcode,
} from "lucide-react";

import {
  Table,
  THead,
} from "@/components/table";

import ProductStatusBadge
  from "./ProductStatusBadge";

import ProductActions
  from "./ProductActions";

import {
  formatPrice,
} from "../utils/product.helpers";

export default function ProductsTable({
  products = [],
  onEdit,
  onDelete,
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

  return (

    <div className="space-y-5">

      {/* ========================================
       * HEADER
       * ====================================== */}

      <div>

        <h2
          className="
            text-xl
            font-semibold
            tracking-tight
            text-slate-900
            dark:text-white
          "
        >
          Productos
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-slate-500
          "
        >
          Gestiona inventario,
          precios y productos.
        </p>

      </div>

      {/* ========================================
       * TABLE
       * ====================================== */}

      <Table>

        <THead columns={columns} />

        <tbody>

          {products.length > 0 ? (

            products.map((product) => {

              // ========================================
              // STOCK REAL
              // ========================================

              const stock =
                Number(
                  product.totalStock ??
                  product.availableStock ??
                  product.inventory?.reduce(
                    (acc, item) =>
                      acc + Number(item.stock || 0),
                    0
                  ) ??
                  0
                );

              // ========================================
              // PRICES
              // ========================================

              const purchase =
                Number(product.purchasePrice || 0);

              const cost =
                Number(product.costPrice || 0);

              const sale =
                Number(product.salePrice || 0);

              // ========================================
              // PROFIT
              // ========================================

              // ✅ USA LOS CAMPOS REALES DE LA DB
              const profit =
                Number(product.profitAmount || 0);

              const margin =
                Number(product.profitMargin || 0);

              return (

                <tr
                  key={product.id}
                  className="
                    border-b
                    border-slate-200/50
                    dark:border-slate-800
                    transition-all
                    hover:bg-slate-50
                    dark:hover:bg-slate-900/40
                  "
                >

                  {/* ========================================
                   * PRODUCT
                   * ====================================== */}

                  <td className="px-6 py-5">

                    <div>

                      <h3
                        className="
                          text-sm
                          font-semibold
                          text-slate-800
                          dark:text-white
                        "
                      >
                        {product.name}
                      </h3>

                      <p
                        className="
                          mt-1
                          text-xs
                          text-slate-500
                          line-clamp-2
                        "
                      >
                        {
                          product.description ||
                          "Sin descripción"
                        }
                      </p>

                    </div>

                  </td>

                  {/* ========================================
                   * SKU
                   * ====================================== */}

                  <td
                    className="
                      px-6 py-5
                      text-sm
                      font-medium
                      text-slate-600
                      dark:text-slate-300
                    "
                  >
                    {product.sku || "-"}
                  </td>

                  {/* ========================================
                   * BARCODE
                   * ====================================== */}

                  <td
                    className="
                      px-6 py-5
                      text-sm
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    {product.barcode || "-"}
                  </td>

                  {/* ========================================
                   * CATEGORY
                   * ====================================== */}

                  <td className="px-6 py-5">

                    <span
                      className="
                        inline-flex
                        items-center
                        rounded-xl
                        border
                        border-slate-200
                        dark:border-slate-700
                        px-3
                        py-1
                        text-xs
                        font-medium
                      "
                    >
                      {
                        product.category?.name ||
                        "-"
                      }
                    </span>

                  </td>

                  {/* ========================================
                   * STOCK
                   * ====================================== */}

                  <td className="px-6 py-5">

                    <div className="flex flex-col gap-1">

                      <span
                        className="
                          text-sm
                          font-semibold
                          text-slate-800
                          dark:text-slate-100
                        "
                      >
                        {stock}
                        {" "}
                        unidades
                      </span>

                      <span
                        className="
                          text-xs
                          text-slate-500
                        "
                      >
                        Min:
                        {" "}
                        {product.minStock}
                      </span>

                      <span
                        className="
                          text-xs
                          text-slate-500
                        "
                      >
                        Max:
                        {" "}
                        {product.maxStock || "-"}
                      </span>

                    </div>

                  </td>

                  {/* ========================================
                   * PRICES
                   * ====================================== */}

                  <td className="px-6 py-5">

                    <div className="space-y-1">

                      <div>

                        <p
                          className="
                            text-xs
                            text-slate-500
                          "
                        >
                          Compra
                        </p>

                        <h3
                          className="
                            text-sm
                            font-semibold
                            text-slate-800
                            dark:text-white
                          "
                        >
                          {formatPrice(purchase)}
                        </h3>

                      </div>

                      <div>

                        <p
                          className="
                            text-xs
                            text-slate-500
                          "
                        >
                          Costo
                        </p>

                        <h3
                          className="
                            text-sm
                            font-semibold
                            text-orange-500
                          "
                        >
                          {formatPrice(cost)}
                        </h3>

                      </div>

                      <div>

                        <p
                          className="
                            text-xs
                            text-slate-500
                          "
                        >
                          Venta
                        </p>

                        <h3
                          className="
                            text-sm
                            font-bold
                            text-green-600
                          "
                        >
                          {formatPrice(sale)}
                        </h3>

                      </div>

                    </div>

                  </td>

                  {/* ========================================
                   * PROFIT
                   * ====================================== */}

                  <td className="px-6 py-5">

                    <div>

                      <p
                        className={`
                          text-sm
                          font-bold
                          ${
                            profit >= 0
                              ? "text-emerald-600"
                              : "text-red-500"
                          }
                        `}
                      >
                        {
                          profit >= 0
                            ? "+"
                            : ""
                        }

                        {formatPrice(profit)}
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          text-slate-500
                        "
                      >
                        {margin.toFixed(2)}%
                        {" "}
                        margen
                      </p>

                    </div>

                  </td>

                  {/* ========================================
                   * STATUS
                   * ====================================== */}

                  <td className="px-6 py-5">

                    <ProductStatusBadge
                      active={product.isActive}
                    />

                  </td>

                  {/* ========================================
                   * ACTIONS
                   * ====================================== */}

                  <td className="px-6 py-5">

                    <ProductActions
                      product={product}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />

                  </td>

                </tr>

              );

            })

          ) : (

            <tr>

              <td
                colSpan={9}
                className="
                  px-6
                  py-16
                  text-center
                "
              >

                <div
                  className="
                    flex
                    flex-col
                    items-center
                    justify-center
                  "
                >

                  <div
                    className="
                      mb-4
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-slate-100
                      dark:bg-slate-800
                    "
                  >

                    <Package
                      className="
                        h-8
                        w-8
                        text-slate-400
                      "
                    />

                  </div>

                  <h3
                    className="
                      text-sm
                      font-semibold
                      text-slate-700
                      dark:text-slate-200
                    "
                  >
                    No hay productos
                  </h3>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-slate-500
                    "
                  >
                    Empieza creando
                    tu primer producto.
                  </p>

                </div>

              </td>

            </tr>

          )}

        </tbody>

      </Table>

    </div>

  );

}