// ========================================
// features/sales/components/forms/SaleForm.jsx
// CONNECTADO AL BACKEND
// ========================================

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Plus,
  Trash2,
  ShoppingCart,
  User,
  Phone,
  Package,
  Calculator,
} from "lucide-react";

// API
import 
  getProducts from "../../../product/services/product.service";

// UI
import {Input} from "@/components/inputs/";
import {Select} from "@/components/selects/";

import {ModernButton}
  from "@/components/buttons/";

// ========================================
// FORM
// ========================================

export const SaleForm = ({
  onSubmit,
  loading = false,
}) => {

  // ======================================
  // STATES
  // ======================================

  const [products, setProducts] =
    useState([]);

  const [fetchingProducts, setFetchingProducts] =
    useState(false);

  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",

    items: [
      {
        productId: "",
        quantity: 1,
        price: 0,
      },
    ],
  });

  // ======================================
  // LOAD PRODUCTS
  // ======================================

  useEffect(() => {

    loadProducts();

  }, []);

const loadProducts = async () => {

  try {

    setFetchingProducts(true);

    const response =
      await getProducts();

    setProducts(
      response?.data || []
    );

  } catch (error) {

    console.error(error);

    setProducts([]);

  } finally {

    setFetchingProducts(false);

  }

};

  // ======================================
  // INPUTS
  // ======================================

  const handleChange = (e) => {

    setForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));

  };

  // ======================================
  // ADD ITEM
  // ======================================

  const addItem = () => {

    setForm((prev) => ({
      ...prev,

      items: [
        ...prev.items,

        {
          productId: "",
          quantity: 1,
          price: 0,
        },
      ],
    }));

  };

  // ======================================
  // REMOVE ITEM
  // ======================================

  const removeItem = (index) => {

    const items =
      [...form.items];

    items.splice(index, 1);

    setForm((prev) => ({
      ...prev,
      items,
    }));

  };

  // ======================================
  // UPDATE ITEM
  // ======================================

  const updateItem = (
    index,
    field,
    value
  ) => {

    const items =
      [...form.items];

    items[index][field] =
      value;

    // AUTO PRICE
    if (field === "productId") {

      const product =
        products.find(
          (p) =>
            p.id === Number(value)
        );

      if (product) {

        items[index].price =
          Number(
            product.salePrice
          );

      }

    }

    setForm((prev) => ({
      ...prev,
      items,
    }));

  };

  // ======================================
  // TOTAL
  // ======================================

  const total = useMemo(() => {

    return form.items.reduce(
      (acc, item) => {

        return (
          acc +
          (
            Number(item.quantity) *
            Number(item.price)
          )
        );

      },
      0
    );

  }, [form.items]);

  // ======================================
  // PRODUCT OPTIONS
  // ======================================

  const productOptions =
    products.map((product) => ({

      value: product.id,

      label:
        `${product.name} - S/ ${product.salePrice}`,

    }));

  // ======================================
  // SUBMIT
  // ======================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    const payload = {

      customerName:
        form.customerName,

      customerPhone:
        form.customerPhone,

      items:
        form.items.map(
          (item) => ({

            productId:
              Number(item.productId),

            quantity:
              Number(item.quantity),

            price:
              Number(item.price),

          })
        ),

    };

    await onSubmit?.(
      payload
    );

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="
        space-y-6
      "
    >

      {/* ========================================
       * CUSTOMER
       * ====================================== */}

      <div
        className="
          grid
          gap-4

          md:grid-cols-2
        "
      >

        <Input
          label="Cliente"
          name="customerName"
          placeholder="Nombre del cliente"
          value={form.customerName}
          onChange={handleChange}
          icon={User}
        />

        <Input
          label="Teléfono"
          name="customerPhone"
          placeholder="999999999"
          value={form.customerPhone}
          onChange={handleChange}
          icon={Phone}
        />

      </div>

      {/* ========================================
       * ITEMS HEADER
       * ====================================== */}

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div>

          <h3
            className="
              text-lg
              font-semibold
              text-slate-800
              dark:text-white
            "
          >
            Productos
          </h3>

          <p
            className="
              text-sm
              text-slate-500
            "
          >
            Agrega productos a la venta
          </p>

        </div>

        <ModernButton
          type="button"
          text="Agregar"
          icon={Plus}
          onClick={addItem}
        />

      </div>

      {/* ========================================
       * ITEMS
       * ====================================== */}

      <div
        className="
          space-y-4
        "
      >

        {form.items.map(
          (item, index) => (

            <div
              key={index}
              className="
                grid
                gap-4

                rounded-3xl
                border
                border-slate-200/70

                bg-white/60

                p-5

                dark:border-slate-800
                dark:bg-slate-900/40

                md:grid-cols-12
              "
            >

              {/* PRODUCT */}

              <div
                className="
                  md:col-span-5
                "
              >

                <Select
                  label="Producto"
                  value={
                    item.productId
                  }
                  onChange={(e) =>
                    updateItem(
                      index,
                      "productId",
                      e.target.value
                    )
                  }
                  options={
                    productOptions
                  }
                  placeholder={
                    fetchingProducts
                      ? "Cargando..."
                      : "Seleccione producto"
                  }
                  icon={Package}
                />

              </div>

              {/* QUANTITY */}

              <div
                className="
                  md:col-span-2
                "
              >

                <Input
                  label="Cantidad"
                  type="number"
                  min="1"
                  value={
                    item.quantity
                  }
                  onChange={(e) =>
                    updateItem(
                      index,
                      "quantity",
                      e.target.value
                    )
                  }
                />

              </div>

              {/* PRICE */}

              <div
                className="
                  md:col-span-3
                "
              >

                <Input
                  label="Precio"
                  type="number"
                  step="0.01"
                  value={
                    item.price
                  }
                  onChange={(e) =>
                    updateItem(
                      index,
                      "price",
                      e.target.value
                    )
                  }
                  icon={Calculator}
                />

              </div>

              {/* DELETE */}

              <div
                className="
                  flex
                  items-end

                  md:col-span-2
                "
              >

                <button
                  type="button"
                  onClick={() =>
                    removeItem(index)
                  }
                  disabled={
                    form.items.length === 1
                  }
                  className="
                    flex
                    h-12
                    w-full
                    items-center
                    justify-center

                    rounded-2xl

                    border
                    border-red-200

                    bg-red-50

                    text-red-500

                    transition-all

                    hover:bg-red-100

                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </div>

          )
        )}

      </div>

      {/* ========================================
       * TOTAL
       * ====================================== */}

      <div
        className="
          flex
          items-center
          justify-between

          rounded-3xl

          border
          border-slate-200/70

          bg-slate-50/70

          p-5

          dark:border-slate-800
          dark:bg-slate-900/40
        "
      >

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
              h-12
              w-12
              items-center
              justify-center

              rounded-2xl

              bg-blue-100

              text-blue-600
            "
          >
            <ShoppingCart size={22} />
          </div>

          <div>

            <p
              className="
                text-sm
                text-slate-500
              "
            >
              Total de venta
            </p>

            <h2
              className="
                text-2xl
                font-black

                text-slate-800
                dark:text-white
              "
            >
              S/ {total.toFixed(2)}
            </h2>

          </div>

        </div>

        <ModernButton
          type="submit"
          text={
            loading
              ? "Guardando..."
              : "Guardar Venta"
          }
          icon={ShoppingCart}
          disabled={loading}
        />

      </div>

    </form>

  );

};