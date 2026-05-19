// ========================================
// features/purchase/components/PurchaseFormModal.jsx
// ========================================

import { useMemo, useState } from "react";

import {
  ClipboardList,
  Building2,
  Plus,
  Minus,
  Trash2,
  Search,
  X,
  Package,
  DollarSign,
} from "lucide-react";

import Modal from "@/components/modals/Modal";
import HeaderModal from "@/components/modals/HeaderModal";
import FooterModal from "@/components/modals/FooterModal";

import {
  ModernButton,
  SubmitButton,
} from "@/components/buttons";

import Input from "@/components/inputs/Input";
import Select from "@/components/selects/Select";

export default function PurchaseFormModal({
  open,
  onClose,
  onSubmit,
  form,
  setForm,
  onChange,
  suppliers = [],
  products = [],
  loading = false,
  isEdit = false,
}) {

  // ========================================
  // STATE
  // ========================================

  const [search, setSearch] =
    useState("");

  // ========================================
  // DETAILS
  // ========================================

  const details =
    Array.isArray(form?.details)
      ? form.details
      : [];

  // ========================================
  // FILTER PRODUCTS
  // ========================================

  const filteredProducts =
    useMemo(() => {

      if (!search.trim())
        return products;

      return products.filter((p) => {

        const text =
          `
            ${p.name || ""}
            ${p.sku || ""}
          `
            .toLowerCase();

        return text.includes(
          search.toLowerCase()
        );

      });

    }, [products, search]);

  // ========================================
  // TOTALS
  // ========================================

  const subtotal =
    details.reduce((acc, item) => {

      return (
        acc +
        (
          Number(item.quantity || 0) *
          Number(item.costPrice || 0)
        )
      );

    }, 0);

  const tax =
    subtotal * 0.18;

  const total =
    subtotal + tax;

  // ========================================
  // ADD PRODUCT
  // ========================================

  const addProduct = (
    product
  ) => {

    const exists =
      details.find(
        item =>
          item.productId === product.id
      );

    // ========================================
    // IF EXISTS => INCREASE
    // ========================================

    if (exists) {

      const updated =
        details.map(item => {

          if (
            item.productId ===
            product.id
          ) {

            const quantity =
              Number(item.quantity || 0) + 1;

            return {

              ...item,

              quantity,

              subtotal:
                quantity *
                Number(item.costPrice || 0),

            };

          }

          return item;

        });

      setForm(prev => ({

        ...prev,

        details: updated,

      }));

      return;

    }

    // ========================================
    // PRICES
    // ========================================

    const purchasePrice =
      Number(
        product.purchasePrice || 0
      );

    const salePrice =
      Number(
        product.salePrice || 0
      );

    const profitAmount =
      salePrice - purchasePrice;

    const profitMargin =
      purchasePrice > 0
        ? (
            (
              profitAmount /
              purchasePrice
            ) * 100
          ).toFixed(2)
        : 0;

    // ========================================
    // NEW ITEM
    // ========================================

    const newItem = {

      productId:
        product.id,

      productName:
        product.name,

      sku:
        product.sku || "",

      stock:
        product.stock || 0,

      quantity: 1,

      costPrice:
        purchasePrice,

      purchasePrice,

      salePrice,

      profitAmount,

      profitMargin,

      subtotal:
        purchasePrice,

    };

    setForm(prev => ({

      ...prev,

      details: [

        ...(prev.details || []),

        newItem,

      ],

    }));

  };

  // ========================================
  // UPDATE QUANTITY
  // ========================================

  const updateQuantity = (
    productId,
    type
  ) => {

    const updated =
      details
        .map(item => {

          if (
            item.productId !==
            productId
          ) {
            return item;
          }

          let quantity =
            Number(item.quantity || 0);

          quantity =
            type === "increase"
              ? quantity + 1
              : quantity - 1;

          if (quantity < 1)
            quantity = 1;

          return {

            ...item,

            quantity,

            subtotal:
              quantity *
              Number(item.costPrice || 0),

          };

        });

    setForm(prev => ({

      ...prev,

      details: updated,

    }));

  };

  // ========================================
  // UPDATE COST
  // ========================================

  const updateCostPrice = (
    productId,
    costPrice
  ) => {

    const updated =
      details.map(item => {

        if (
          item.productId !==
          productId
        ) {
          return item;
        }

        const numericCost =
          Number(costPrice || 0);

        const salePrice =
          Number(
            item.salePrice || 0
          );

        const profitAmount =
          salePrice - numericCost;

        const profitMargin =
          numericCost > 0
            ? (
                (
                  profitAmount /
                  numericCost
                ) * 100
              ).toFixed(2)
            : 0;

        return {

          ...item,

          costPrice:
            numericCost,

          purchasePrice:
            numericCost,

          profitAmount,

          profitMargin,

          subtotal:
            Number(item.quantity || 0) *
            numericCost,

        };

      });

    setForm(prev => ({

      ...prev,

      details: updated,

    }));

  };

  // ========================================
  // REMOVE ITEM
  // ========================================

  const removeItem = (
    productId
  ) => {

    const updated =
      details.filter(
        item =>
          item.productId !==
          productId
      );

    setForm(prev => ({

      ...prev,

      details: updated,

    }));

  };

  // ========================================
  // SUBMIT
  // ========================================

  const handleSubmit = (
    e
  ) => {

    e.preventDefault();

    // ========================================
    // VALIDATIONS
    // ========================================

    if (!form?.supplierId) {

      alert(
        "Seleccione proveedor"
      );

      return;

    }

    if (details.length === 0) {

      alert(
        "Debe agregar productos"
      );

      return;

    }

    // ========================================
    // PAYLOAD
    // ========================================

    const payload = {

      supplierId:
        Number(form.supplierId),

      notes:
        form.notes || "",

      details:
        details.map(item => ({

          productId:
            Number(item.productId),

          quantity:
            Number(item.quantity),

          costPrice:
            Number(item.costPrice),

        })),

    };

    console.log(
      "FINAL PURCHASE PAYLOAD:",
      JSON.stringify(
        payload,
        null,
        2
      )
    );

    onSubmit(payload);

  };

  return (

    <Modal
      open={open}
      onClose={onClose}
      size="xl"
    >

      {/* ========================================
       * HEADER
       * ====================================== */}

      <HeaderModal

        title={
          isEdit
            ? "Editar Compra"
            : "Nueva Compra"
        }

        subtitle="Ingreso automático al inventario"

        onClose={onClose}

      />

      {/* ========================================
       * FORM
       * ====================================== */}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-[85vh]"
      >

        {/* ========================================
         * TOP
         * ====================================== */}

        <div
          className="
            border-b
            px-6
            py-5
            grid
            grid-cols-1
            md:grid-cols-2
            gap-4
          "
        >

          <Select

            label="Proveedor"

            name="supplierId"

            value={
              form?.supplierId || ""
            }

            onChange={onChange}

            required

            icon={Building2}

            options={
              suppliers.map(s => ({

                value: s.id,

                label: s.name,

              }))
            }

          />

          <Input

            label="Notas"

            name="notes"

            value={
              form?.notes || ""
            }

            onChange={onChange}

            placeholder="Observaciones"

          />

        </div>

        {/* ========================================
         * CONTENT
         * ====================================== */}

        <div
          className="
            flex-1
            overflow-hidden
            grid
            grid-cols-1
            lg:grid-cols-12
          "
        >

          {/* ========================================
           * PRODUCTS
           * ====================================== */}

          <div
            className="
              lg:col-span-5
              border-r
              flex
              flex-col
              overflow-hidden
            "
          >

            {/* SEARCH */}

            <div className="p-4 border-b">

              <div className="relative">

                <Search
                  size={16}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="text"
                  placeholder="Buscar producto..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    dark:border-slate-800
                    bg-white
                    dark:bg-slate-950
                    pl-10
                    pr-4
                    py-3
                    text-sm
                    outline-none
                  "
                />

              </div>

            </div>

            {/* PRODUCTS */}

            <div
              className="
                flex-1
                overflow-y-auto
                p-4
                space-y-3
              "
            >

              {filteredProducts.map(product => (

                <div

                  key={product.id}

                  className="
                    border
                    rounded-2xl
                    p-4
                    flex
                    items-center
                    justify-between
                    gap-3
                    bg-white
                    dark:bg-slate-950
                  "

                >

                  <div className="min-w-0">

                    <h4
                      className="
                        text-sm
                        font-semibold
                        truncate
                      "
                    >
                      {product.name}
                    </h4>

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-xs
                        text-slate-500
                        mt-1
                      "
                    >

                      <Package size={12} />

                      <span>
                        SKU:
                        {" "}
                        {product.sku || "-"}
                      </span>

                    </div>

                    <div
                      className="
                        text-xs
                        text-green-600
                        mt-2
                        font-medium
                      "
                    >
                      S/
                      {" "}
                      {Number(
                        product.purchasePrice || 0
                      ).toFixed(2)}
                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      addProduct(product)
                    }
                    className="
                      h-10
                      w-10
                      rounded-xl
                      bg-blue-600
                      text-white
                      flex
                      items-center
                      justify-center
                      hover:bg-blue-700
                      transition
                    "
                  >

                    <Plus size={18} />

                  </button>

                </div>

              ))}

            </div>

          </div>

          {/* ========================================
           * CART
           * ====================================== */}

          <div
            className="
              lg:col-span-7
              flex
              flex-col
              overflow-hidden
            "
          >

            {/* HEADER */}

            <div
              className="
                border-b
                px-5
                py-4
                flex
                items-center
                justify-between
              "
            >

              <div>

                <h3
                  className="
                    font-semibold
                    flex
                    items-center
                    gap-2
                  "
                >

                  <ClipboardList
                    size={18}
                  />

                  Carrito

                </h3>

                <p
                  className="
                    text-xs
                    text-slate-500
                  "
                >
                  {details.length}
                  {" "}
                  productos agregados
                </p>

              </div>

            </div>

            {/* ITEMS */}

            <div
              className="
                flex-1
                overflow-y-auto
                p-4
                space-y-3
              "
            >

              {details.length === 0 && (

                <div
                  className="
                    h-full
                    flex
                    items-center
                    justify-center
                    text-sm
                    text-slate-400
                  "
                >
                  No hay productos agregados
                </div>

              )}

              {details.map(item => (

                <div

                  key={item.productId}

                  className="
                    border
                    rounded-2xl
                    p-4
                    bg-white
                    dark:bg-slate-950
                  "

                >

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >

                    {/* INFO */}

                    <div className="min-w-0 flex-1">

                      <h4
                        className="
                          text-sm
                          font-semibold
                          truncate
                        "
                      >
                        {item.productName}
                      </h4>

                      <p
                        className="
                          text-xs
                          text-slate-500
                          mt-1
                        "
                      >
                        SKU:
                        {" "}
                        {item.sku || "-"}
                      </p>

                      <div
                        className="
                          flex
                          items-center
                          gap-4
                          mt-3
                          text-xs
                        "
                      >

                        <span>
                          Compra:
                          {" "}
                          <strong>
                            S/
                            {" "}
                            {Number(
                              item.costPrice || 0
                            ).toFixed(2)}
                          </strong>
                        </span>

                        <span
                          className="
                            text-green-600
                          "
                        >
                          Venta:
                          {" "}
                          <strong>
                            S/
                            {" "}
                            {Number(
                              item.salePrice || 0
                            ).toFixed(2)}
                          </strong>
                        </span>

                      </div>

                    </div>

                    {/* DELETE */}

                    <button
                      type="button"
                      onClick={() =>
                        removeItem(
                          item.productId
                        )
                      }
                      className="
                        text-red-500
                        hover:opacity-70
                      "
                    >

                      <Trash2 size={16} />

                    </button>

                  </div>

                  {/* CONTROLS */}

                  <div
                    className="
                      mt-4
                      grid
                      grid-cols-1
                      md:grid-cols-3
                      gap-4
                    "
                  >

                    {/* QUANTITY */}

                    <div>

                      <label
                        className="
                          text-xs
                          text-slate-500
                        "
                      >
                        Cantidad
                      </label>

                      <div
                        className="
                          mt-1
                          flex
                          items-center
                          border
                          rounded-xl
                          overflow-hidden
                        "
                      >

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              "decrease"
                            )
                          }
                          className="
                            px-3
                            py-2
                            hover:bg-slate-100
                            dark:hover:bg-slate-900
                          "
                        >

                          <Minus size={14} />

                        </button>

                        <div
                          className="
                            flex-1
                            text-center
                            text-sm
                            font-semibold
                          "
                        >
                          {item.quantity}
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              "increase"
                            )
                          }
                          className="
                            px-3
                            py-2
                            hover:bg-slate-100
                            dark:hover:bg-slate-900
                          "
                        >

                          <Plus size={14} />

                        </button>

                      </div>

                    </div>

                    {/* COST */}

                    <div>

                      <Input

                        label="Costo"

                        type="number"

                        min="0"

                        step="0.01"

                        value={
                          item.costPrice
                        }

                        onChange={(e) =>
                          updateCostPrice(
                            item.productId,
                            e.target.value
                          )
                        }

                        icon={DollarSign}

                      />

                    </div>

                    {/* SUBTOTAL */}

                    <div>

                      <label
                        className="
                          text-xs
                          text-slate-500
                        "
                      >
                        Subtotal
                      </label>

                      <div
                        className="
                          h-[46px]
                          mt-1
                          rounded-xl
                          border
                          flex
                          items-center
                          px-4
                          font-semibold
                        "
                      >

                        S/
                        {" "}
                        {(
                          Number(
                            item.quantity || 0
                          ) *
                          Number(
                            item.costPrice || 0
                          )
                        ).toFixed(2)}

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            {/* TOTALS */}

            <div
              className="
                border-t
                p-5
                grid
                grid-cols-3
                gap-4
                bg-slate-50
                dark:bg-slate-950
              "
            >

              <div>

                <p
                  className="
                    text-xs
                    text-slate-500
                  "
                >
                  Subtotal
                </p>

                <p
                  className="
                    font-semibold
                  "
                >
                  S/
                  {" "}
                  {subtotal.toFixed(2)}
                </p>

              </div>

              <div>

                <p
                  className="
                    text-xs
                    text-slate-500
                  "
                >
                  IGV (18%)
                </p>

                <p
                  className="
                    font-semibold
                  "
                >
                  S/
                  {" "}
                  {tax.toFixed(2)}
                </p>

              </div>

              <div>

                <p
                  className="
                    text-xs
                    text-slate-500
                  "
                >
                  Total
                </p>

                <p
                  className="
                    text-xl
                    font-bold
                    text-blue-600
                  "
                >
                  S/
                  {" "}
                  {total.toFixed(2)}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ========================================
         * FOOTER
         * ====================================== */}

        <FooterModal>

          <div
            className="
              flex
              justify-end
              gap-3
              w-full
            "
          >

            <ModernButton

              type="button"

              text="Cancelar"

              icon={X}

              onClick={onClose}

            />

            <SubmitButton

              text={
                loading
                  ? "Guardando..."
                  : "Guardar Compra"
              }

              loading={loading}

            />

          </div>

        </FooterModal>

      </form>

    </Modal>

  );

}