// features/purchase/pages/PurchasePage.jsx

import { useMemo, useState } from "react";

import useProducts from "@/features/product/hooks/useProducts";
import useSuppliers from "@/features/supplier/hooks/useSuppliers";
import usePurchase from "../hooks/usePurchase";

import PurchaseFilters from "../components/PurchaseFilters";
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

    pagination,
    filters,

    loading,
    actionLoading,

    searchPurchases,
    clearFilters,

    changePage,
    changeLimit,

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

  const [step, setStep] = useState(1);

  // ========================================
  // MEMOS
  // ========================================

  const stats = useMemo(() => getPurchaseStats(purchases), [purchases]);

  // ========================================
  // LOADING
  // ========================================

  const pageLoading = loading || loadingSuppliers || loadingProducts;

  // ========================================
  // FORM
  // ========================================

  function resetForm() {
    setEditingId(null);
    setForm(initialPurchaseForm);
    setStep(1);
    setOpenModal(false);
  }

  function handleCreate() {
    setEditingId(null);

    setForm({
      ...initialPurchaseForm,
      branchId: 1,
    });

    setStep(1);

    setOpenModal(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
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

    let success = false;

    if (editingId) {
      success = await updatePurchase(editingId, payload);
    } else {
      success = await createPurchase(payload);
    }

    if (success) resetForm();
  }

  function handleEdit(purchase) {
    setEditingId(purchase.id);

    setForm(mapPurchaseToForm(purchase));

    setStep(1);

    setOpenModal(true);
  }

  async function handleDelete(purchase) {
    if (!window.confirm("¿Eliminar compra?")) return;

    await deletePurchase(purchase.id);
  }

  // ========================================
  // PAGINATION
  // ========================================

  function handleNextPage() {
    if (pagination.hasNext) {
      changePage(filters.page + 1);
    }
  }

  function handlePrevPage() {
    if (pagination.hasPrevious) {
      changePage(filters.page - 1);
    }
  }

  // ========================================
  // LOADING
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

      <PurchaseFilters
        filters={filters}
        suppliers={suppliers}
        onSearch={searchPurchases}
        onClear={clearFilters}
      />

      <PurchaseTable
        purchases={purchases}
        page={pagination.page}
        limit={pagination.limit}
        total={pagination.total}
        totalPages={pagination.totalPages}
        hasNext={pagination.hasNext}
        hasPrevious={pagination.hasPrevious}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        onLimitChange={changeLimit}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

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
        handleNext={() => setStep((s) => Math.min(s + 1, 3))}
        handlePrevious={() => setStep((s) => Math.max(s - 1, 1))}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
