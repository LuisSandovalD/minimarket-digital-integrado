// ========================================
// features/purchase/pages/PurchasePage.jsx
// ========================================

import { useMemo, useState } from "react";

import useProducts from "@/features/product/hooks/useProducts";
import useSuppliers from "@/features/supplier/hooks/useSuppliers";
import usePurchase from "../hooks/usePurchase";

import PurchaseFormModal from "../components/PurchaseFormModal";
import PurchaseHeader from "../components/PurchaseHeader";
import PurchaseLoading from "../components/PurchaseLoading";
import PurchaseTable from "../components/PurchaseTable";

import { mapPurchaseToForm } from "../utils/purchase-form.mapper";
import { initialPurchaseForm } from "../utils/purchase-form.util";
import { getPurchaseStats } from "../utils/purchase-stats.util";

// Hook interno del stepper (paso actual, next, previous)

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

  // Control del stepper (paso 1, 2, 3)
  const [step, setStep] = useState(1);

  // ========================================
  // MEMOS
  // ========================================

  const stats = useMemo(() => getPurchaseStats(purchases), [purchases]);

  // ========================================
  // PAGE LOADING
  // ========================================

  const pageLoading = loading || loadingSuppliers || loadingProducts;

  // ========================================
  // STEPPER HANDLERS
  // ========================================

  function handleNext() {
    setStep((prev) => Math.min(prev + 1, 3));
  }

  function handlePrevious() {
    setStep((prev) => Math.max(prev - 1, 1));
  }

  // ========================================
  // RESET FORM
  // ========================================

  function resetForm() {
    setEditingId(null);
    setForm(initialPurchaseForm);
    setStep(1);
    setOpenModal(false);
  }

  // ========================================
  // CREATE
  // ========================================

  function handleCreate() {
    setEditingId(null);
    setForm({ ...initialPurchaseForm, branchId: 1 });
    setStep(1);
    setOpenModal(true);
  }

  // ========================================
  // SUBMIT
  // FIX: incluye batchNumber y expirationDate del carrito
  // ========================================

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const finalPayload = {
        supplierId: Number(form.supplierId),
        branchId: Number(form.branchId),
        notes: form.notes || "",
        details: form.details.map((item) => ({
          productId: Number(item.productId),
          quantity: Number(item.quantity),
          costPrice: Number(item.costPrice),
          batchNumber: item.batchNumber || null,
          expirationDate: item.expirationDate || null,
        })),
      };

      console.log("FINAL PURCHASE PAYLOAD:", finalPayload);

      let success = false;

      if (editingId) {
        success = await updatePurchase(editingId, finalPayload);
      } else {
        success = await createPurchase(finalPayload);
      }

      if (success) resetForm();
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
    setStep(1);
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

  if (pageLoading) return <PurchaseLoading />;

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

      {/* FIX: props alineados con lo que PurchaseFormModal espera */}
      <PurchaseFormModal
        open={openModal}
        onClose={resetForm}
        suppliers={suppliers}
        products={products}
        loading={actionLoading}
        initialFormState={editingId ? form : null}
        form={form}
        setForm={setForm}
        step={step}
        setStep={setStep}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
