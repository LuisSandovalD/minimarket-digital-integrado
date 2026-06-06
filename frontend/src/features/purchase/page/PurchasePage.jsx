// ========================================
// features/purchase/pages/PurchasePage.jsx
// ========================================

import { useMemo, useState } from "react";

import usePurchase from "../hooks/usePurchase";

import useProducts from "@/features/product/hooks/useProducts";
import useSuppliers from "@/features/supplier/hooks/useSuppliers";

import PurchaseFormModal from "../components/PurchaseFormModal";
import PurchaseHeader from "../components/PurchaseHeader";
import PurchaseLoading from "../components/PurchaseLoading";
import PurchaseTable from "../components/PurchaseTable";

import { mapPurchaseToForm } from "../utils/purchase-form.mapper";
import { initialPurchaseForm } from "../utils/purchase-form.util";
import { getPurchaseStats } from "../utils/purchase-stats.util";

export default function PurchasePage() {
  // ========================================
  // HOOKS
  // ========================================

  const {
    purchases,
    loading,
    actionLoading,
    createPurchase,
    updatePurchase,
    deletePurchase,
  } = usePurchase();

  const { suppliers, loading: loadingSuppliers } = useSuppliers();

  const { products, loading: loadingProducts } = useProducts();

  // ========================================
  // STATES
  // ========================================

  const [editingId, setEditingId] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const [form, setForm] = useState(initialPurchaseForm);

  // ========================================
  // MEMOS
  // ========================================

  const stats = useMemo(() => {
    return getPurchaseStats(purchases);
  }, [purchases]);

  // ========================================
  // PAGE LOADING
  // ========================================

  const pageLoading = loading || loadingSuppliers || loadingProducts;

  // ========================================
  // HANDLE CHANGE
  // ========================================

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // ========================================
  // RESET FORM
  // ========================================

  function resetForm() {
    setEditingId(null);

    setForm(initialPurchaseForm);

    setOpenModal(false);
  }

  // ========================================
  // CREATE
  // ========================================

  function handleCreate() {
    setEditingId(null);

    setForm({
      ...initialPurchaseForm,
      branchId: 1,
    });

    setOpenModal(true);
  }

  // ========================================
  // SUBMIT
  // ========================================

  async function handleSubmit(payload) {
    try {
      const finalPayload = {
        supplierId: Number(payload.supplierId),

        branchId: Number(payload.branchId),

        notes: payload.notes || "",

        details: payload.details.map((item) => ({
          productId: Number(item.productId),

          quantity: Number(item.quantity),

          costPrice: Number(item.costPrice),
        })),
      };

      console.log("FINAL PURCHASE PAYLOAD:", finalPayload);

      let success = false;

      if (editingId) {
        success = await updatePurchase(editingId, finalPayload);
      } else {
        success = await createPurchase(finalPayload);
      }

      if (success) {
        resetForm();
      }
    } catch (error) {
      console.error("SUBMIT PURCHASE ERROR:", error);

      alert("Error guardando compra");
    }
  }

  // ========================================
  // EDIT
  // ========================================

  function handleEdit(purchase) {
    setEditingId(purchase.id);

    setForm(mapPurchaseToForm(purchase));

    setOpenModal(true);
  }

  // ========================================
  // DELETE
  // ========================================

  async function handleDelete(purchase) {
    const confirmDelete = window.confirm("¿Eliminar compra?");

    if (!confirmDelete) return;

    try {
      await deletePurchase(purchase.id);
    } catch (error) {
      console.error("DELETE PURCHASE ERROR:", error);

      alert("Error eliminando compra");
    }
  }

  // ========================================
  // LOADING SCREEN
  // ========================================

  if (pageLoading) {
    return <PurchaseLoading />;
  }

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="space-y-6">
      <PurchaseHeader
        total={stats.total}
        pending={stats.pending}
        completed={stats.completed}
        onCreate={handleCreate}
      />

      <PurchaseTable
        purchases={purchases}
        loading={false}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <PurchaseFormModal
        open={openModal}
        onClose={resetForm}
        onSubmit={handleSubmit}
        form={form}
        setForm={setForm}
        onChange={handleChange}
        suppliers={suppliers}
        products={products}
        loading={actionLoading}
        isEdit={!!editingId}
      />
    </div>
  );
}
