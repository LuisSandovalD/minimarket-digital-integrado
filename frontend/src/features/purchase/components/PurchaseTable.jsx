// ========================================
// features/purchase/components/PurchaseTable.jsx
// ========================================

import React, {
  useState,
} from "react";

import {
  Receipt,
  DollarSign,
  Percent,
  BadgeDollarSign,
  ClipboardList,
  Activity,
  Settings2,
  FileText,
  Package,
  Eye,
} from "lucide-react";

import {
  Table,
  THead,
} from "@/components/table";

import {
  ModernButton,
} from "@/components/buttons";

import PurchaseActions
  from "./PurchaseActions";

import PurchaseProductsModal
  from "./PurchaseProductsModal";

export default function PurchaseTable({
  purchases = [],
  onEdit,
  onDelete,
}) {

  // ========================================
  // MODAL
  // ========================================

  const [
    selectedPurchase,
    setSelectedPurchase,
  ] = useState(null);

  const [
    openProducts,
    setOpenProducts,
  ] = useState(false);

  // ========================================
  // TABLE COLUMNS
  // ========================================

  const columns = [

    {
      key: "number",

      label: (
        <div className="flex items-center gap-2">
          <Receipt size={14} />
          Número
        </div>
      ),
    },

    {
      key: "subtotal",

      label: (
        <div className="flex items-center gap-2">
          <DollarSign size={14} />
          Subtotal
        </div>
      ),
    },

    {
      key: "tax",

      label: (
        <div className="flex items-center gap-2">
          <Percent size={14} />
          Impuesto
        </div>
      ),
    },

    {
      key: "discount",

      label: (
        <div className="flex items-center gap-2">
          <BadgeDollarSign size={14} />
          Descuento
        </div>
      ),
    },

    {
      key: "total",

      label: (
        <div className="flex items-center gap-2">
          <DollarSign size={14} />
          Total
        </div>
      ),
    },

    {
      key: "products",

      label: (
        <div className="flex items-center gap-2">
          <Package size={14} />
          Productos
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
      key: "notes",

      label: (
        <div className="flex items-center gap-2">
          <FileText size={14} />
          Notas
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

  // ========================================
  // FORMAT PRICE
  // ========================================

  const formatPrice = (
    value
  ) => {

    return new Intl.NumberFormat(
      "es-PE",
      {
        style: "currency",
        currency: "PEN",
      }
    ).format(Number(value || 0));

  };

  // ========================================
  // STATUS STYLES
  // ========================================

  const getStatusStyles = (
    status
  ) => {

    switch (status) {

      case "COMPLETED":
        return `
          bg-green-100
          text-green-700
          dark:bg-green-900/30
          dark:text-green-400
        `;

      case "PENDING":
        return `
          bg-yellow-100
          text-yellow-700
          dark:bg-yellow-900/30
          dark:text-yellow-400
        `;

      case "CANCELLED":
        return `
          bg-red-100
          text-red-700
          dark:bg-red-900/30
          dark:text-red-400
        `;

      default:
        return `
          bg-slate-100
          text-slate-700
          dark:bg-slate-800
          dark:text-slate-300
        `;
    }

  };

  // ========================================
  // OPEN PRODUCTS
  // ========================================

  const handleOpenProducts =
    (purchase) => {

      setSelectedPurchase(
        purchase
      );

      setOpenProducts(true);

    };

  return (

    <>

      {/* ========================================
       * MODAL PRODUCTS
       * ====================================== */}

      <PurchaseProductsModal

        open={openProducts}

        onClose={() =>
          setOpenProducts(false)
        }

        purchase={selectedPurchase}

      />

      {/* ========================================
       * TABLE
       * ====================================== */}

      <div className="space-y-5">

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
            Compras
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Gestiona órdenes,
            pagos y registros de compras.
          </p>

        </div>

        <Table>

          <THead columns={columns} />

          <tbody>

            {purchases.length > 0 ? (

              purchases.map((purchase) => (

                <tr
                  key={purchase.id}
                  className="
                    border-b
                    border-slate-200/50
                    dark:border-slate-800
                    hover:bg-slate-50
                    dark:hover:bg-slate-900/40
                  "
                >

                  {/* NUMBER */}

                  <td className="px-6 py-5">

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >

                      <div
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-xl
                          bg-slate-100
                          dark:bg-slate-800
                        "
                      >

                        <ClipboardList
                          size={18}
                          className="text-slate-500"
                        />

                      </div>

                      <div>

                        <h3
                          className="
                            text-sm
                            font-semibold
                            text-slate-800
                            dark:text-white
                          "
                        >
                          {
                            purchase.purchaseNumber
                          }
                        </h3>

                      </div>

                    </div>

                  </td>

                  {/* SUBTOTAL */}

                  <td className="px-6 py-5 text-sm">
                    {formatPrice(
                      purchase.subtotal
                    )}
                  </td>

                  {/* TAX */}

                  <td className="px-6 py-5 text-sm">
                    {formatPrice(
                      purchase.tax
                    )}
                  </td>

                  {/* DISCOUNT */}

                  <td className="px-6 py-5 text-sm">
                    {formatPrice(
                      purchase.discount
                    )}
                  </td>

                  {/* TOTAL */}

                  <td className="px-6 py-5">

                    <p
                      className="
                        text-sm
                        font-bold
                        text-slate-900
                        dark:text-white
                      "
                    >
                      {formatPrice(
                        purchase.total
                      )}
                    </p>

                  </td>

                  {/* PRODUCTS */}

                  <td className="px-6 py-5">

                    <ModernButton

                      type="button"

                      text={`${purchase.details?.length || 0} Productos`}

                      icon={Eye}

                      onClick={() =>
                        handleOpenProducts(
                          purchase
                        )
                      }

                      variant="secondary"

                    />

                  </td>

                  {/* STATUS */}

                  <td className="px-6 py-5">

                    <span
                      className={`
                        inline-flex
                        items-center
                        rounded-xl
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        ${getStatusStyles(
                          purchase.status
                        )}
                      `}
                    >

                      {purchase.status}

                    </span>

                  </td>

                  {/* NOTES */}

                  <td
                    className="
                      px-6
                      py-5
                      text-sm
                      text-slate-500
                      max-w-[250px]
                    "
                  >

                    <p className="line-clamp-2">

                      {
                        purchase.notes ||
                        "Sin notas"
                      }

                    </p>

                  </td>

                  {/* ACTIONS */}

                  <td className="px-6 py-5">

                    <PurchaseActions
                      purchase={purchase}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />

                  </td>

                </tr>

              ))

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

                      <Receipt
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
                      No hay compras
                    </h3>

                    <p
                      className="
                        mt-1
                        text-sm
                        text-slate-500
                      "
                    >
                      Empieza registrando
                      tu primera compra.
                    </p>

                  </div>

                </td>

              </tr>

            )}

          </tbody>

        </Table>

      </div>

    </>

  );

}