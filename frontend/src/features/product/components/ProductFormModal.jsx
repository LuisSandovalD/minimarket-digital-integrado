// ========================================
// features/product/components/ProductFormModal.jsx
// ========================================

import { Boxes, DollarSign, Layers3, Package, Percent, TrendingUp, X } from "lucide-react";

import { FooterModal, HeaderModal, Modal } from "@/components/overlays/";

import { ModernButton, SubmitButton } from "@/components/buttons";

import { Input, Select } from "@/components/forms/";

export default function ProductFormModal({
  open,
  onClose,
  onSubmit,
  form,
  onChange,
  categories = [],
  units = [],
  loading = false,
  isEdit = false,
}) {
  // ========================================
  // LIVE CALCULATIONS
  // ========================================

  const purchase = Number(form?.purchasePrice || 0);

  const margin = Number(form?.profitMargin || 0);

  const cost = purchase;

  const sale = cost * (1 + margin / 100);

  const profit = sale - cost;

  // ========================================
  // SUBMIT
  // ========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...form,

      costPrice: Number(cost.toFixed(2)),

      salePrice: Number(sale.toFixed(2)),

      profitAmount: Number(profit.toFixed(2)),
    });
  };

  return (
    <Modal open={open} onClose={onClose} size="xl">
      {/* HEADER */}

      <HeaderModal
        title={isEdit ? "Editar Producto" : "Nuevo Producto"}
        subtitle="Configura toda la información del producto."
        onClose={onClose}
      />

      {/* FORM */}

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="max-h-[72vh] overflow-y-auto space-y-8 px-6 py-6">
          {/* ========================================
           * GENERAL
           * ====================================== */}

          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <Package size={20} />

              <div>
                <h3 className="text-sm font-semibold">Información General</h3>

                <p className="text-xs text-slate-500">Datos principales del producto</p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input label="Nombre" name="name" value={form?.name || ""} onChange={onChange} required icon={Package} />

              <Select
                label="Categoría"
                name="categoryId"
                value={form?.categoryId || ""}
                onChange={onChange}
                required
                icon={Layers3}
                options={categories.map((cat) => ({
                  value: cat.id,
                  label: cat.name,
                }))}
              />
            </div>
          </section>

          {/* ========================================
           * PRICES
           * ====================================== */}

          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <DollarSign size={20} />

              <div>
                <h3 className="text-sm font-semibold">Gestión de Precios</h3>

                <p className="text-xs text-slate-500">Cálculo automático en tiempo real</p>
              </div>
            </div>

            {/* EDITABLE */}

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Precio Compra"
                name="purchasePrice"
                type="number"
                step="0.01"
                value={form?.purchasePrice || ""}
                onChange={onChange}
                required
                icon={DollarSign}
              />

              <Input
                label="Margen %"
                name="profitMargin"
                type="number"
                step="0.01"
                value={form?.profitMargin || ""}
                onChange={onChange}
                required
                icon={Percent}
              />
            </div>

            {/* RESULTS */}

            <div className="grid gap-4 md:grid-cols-3">
              {/* COST */}

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
                <p className="text-xs text-slate-500">Costo Total</p>

                <div className="mt-2 flex items-center gap-2">
                  <DollarSign size={18} className="text-slate-400" />

                  <p className="text-2xl font-bold text-slate-900 dark:text-white">S/ {cost.toFixed(2)}</p>
                </div>
              </div>

              {/* SALE */}

              <div className="rounded-2xl border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 p-5">
                <p className="text-xs text-green-700 dark:text-green-400">Precio Venta</p>

                <div className="mt-2 flex items-center gap-2">
                  <TrendingUp size={18} className="text-green-500" />

                  <p className="text-2xl font-bold text-green-600">S/ {sale.toFixed(2)}</p>
                </div>
              </div>

              {/* PROFIT */}

              <div className="rounded-2xl border border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900 p-5">
                <p className="text-xs text-blue-700 dark:text-blue-400">Ganancia</p>

                <div className="mt-2 flex items-center gap-2">
                  <Percent size={18} className="text-blue-500" />

                  <div>
                    <p className="text-2xl font-bold text-blue-600">S/ {profit.toFixed(2)}</p>

                    <p className="text-xs text-slate-500 mt-1">{margin.toFixed(2)}% margen</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* INVENTORY */}

          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <Boxes size={20} />

              <div>
                <h3 className="text-sm font-semibold">Inventario</h3>

                <p className="text-xs text-slate-500">Control de stock</p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <Input
                label="Stock Mínimo"
                name="minStock"
                type="number"
                value={form?.minStock || ""}
                onChange={onChange}
                icon={Boxes}
              />

              <Input
                label="Stock Máximo"
                name="maxStock"
                type="number"
                value={form?.maxStock || ""}
                onChange={onChange}
                icon={Boxes}
              />

              <Select
                label="Unidad"
                name="unitId"
                value={form?.unitId || ""}
                onChange={onChange}
                icon={Package}
                options={units.map((u) => ({
                  value: u.id,
                  label: `${u.name} (${u.abbreviation})`,
                }))}
              />
            </div>
          </section>
        </div>

        {/* FOOTER */}

        <FooterModal>
          <div className="flex w-full items-center justify-end gap-3 pb-5">
            <ModernButton type="button" text="Cancelar" variant="outline" icon={X} onClick={onClose} />

            <SubmitButton text={loading ? "Guardando..." : isEdit ? "Actualizar" : "Guardar"} loading={loading} />
          </div>
        </FooterModal>
      </form>
    </Modal>
  );
}
