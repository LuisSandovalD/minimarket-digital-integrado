// ========================================
// features/purchase/pages/PurchasePage.jsx
// ========================================

import React, {
  useMemo,
  useState,
} from "react";

import usePurchase
  from "../hooks/usePurchase";

import useSuppliers
  from "@/features/supplier/hooks/useSuppliers";

import useProducts
  from "@/features/product/hooks/useProducts";

import PurchaseHeader
  from "../components/PurchaseHeader";

import PurchaseFormModal
  from "../components/PurchaseFormModal";

import PurchaseTable
  from "../components/PurchaseTable";

import {
  initialPurchaseForm
} from "../utils/purchase-form.util";

import {
  mapPurchaseToForm
} from "../utils/purchase-form.mapper";

import {
  getPurchaseStats
} from "../utils/purchase-stats.util";

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

  const {

    suppliers,

    loading:
      loadingSuppliers,

  } = useSuppliers();

  const {

    products,

    loading:
      loadingProducts,

  } = useProducts();

  // ========================================
  // STATES
  // ========================================

  const [
    editingId,
    setEditingId
  ] = useState(null);

  const [
    openModal,
    setOpenModal
  ] = useState(false);

  const [
    form,
    setForm
  ] = useState(
    initialPurchaseForm
  );

  // ========================================
  // STATS
  // ========================================

  const stats =
    useMemo(() => {

      return getPurchaseStats(
        purchases
      );

    }, [purchases]);

  // ========================================
  // HANDLE CHANGE
  // ========================================

  function handleChange(e) {

    const {
      name,
      value
    } = e.target;

    setForm(prev => ({

      ...prev,

      [name]: value,

    }));

  }

  // ========================================
  // RESET FORM
  // ========================================

  function resetForm() {

    setEditingId(null);

    setForm(
      initialPurchaseForm
    );

    setOpenModal(false);

  }

  // ========================================
  // CREATE
  // ========================================

  function handleCreate() {

    setEditingId(null);

    setForm({
      ...initialPurchaseForm,

      // 🔥 SUCURSAL ACTUAL
      branchId: 1,
    });

    setOpenModal(true);

  }

  // ========================================
  // SUBMIT
  // ========================================

  async function handleSubmit(
    payload
  ) {

    try {

      // ========================================
      // BACKEND PAYLOAD
      // ========================================

      const finalPayload = {

        supplierId:
          Number(
            payload.supplierId
          ),

        branchId:
          Number(
            payload.branchId
          ),

        notes:
          payload.notes || "",

        details:
          payload.details.map(
            item => ({

              productId:
                Number(
                  item.productId
                ),

              quantity:
                Number(
                  item.quantity
                ),

              // 🔥 BACKEND EXPECTS costPrice
              costPrice:
                Number(
                  item.costPrice
                ),

            })
          ),

      };

      console.log(
        "FINAL PURCHASE PAYLOAD:",
        finalPayload
      );

      // ========================================
      // CREATE / UPDATE
      // ========================================

      let success =
        false;

      if (editingId) {

        success =
          await updatePurchase(
            editingId,
            finalPayload
          );

      } else {

        success =
          await createPurchase(
            finalPayload
          );

      }

      // ========================================
      // SUCCESS
      // ========================================

      if (success) {

        resetForm();

      }

    } catch (error) {

      console.error(
        "SUBMIT PURCHASE ERROR:",
        error
      );

      alert(
        "Error guardando compra"
      );

    }

  }

  // ========================================
  // EDIT
  // ========================================

  function handleEdit(
    purchase
  ) {

    setEditingId(
      purchase.id
    );

    setForm(
      mapPurchaseToForm(
        purchase
      )
    );

    setOpenModal(true);

  }

  // ========================================
  // DELETE
  // ========================================

  async function handleDelete(
    purchase
  ) {

    const confirmDelete =
      window.confirm(
        "¿Eliminar compra?"
      );

    if (!confirmDelete)
      return;

    try {

      await deletePurchase(
        purchase.id
      );

    } catch (error) {

      console.error(
        "DELETE PURCHASE ERROR:",
        error
      );

      alert(
        "Error eliminando compra"
      );

    }

  }

  // ========================================
  // RENDER
  // ========================================

  return (

    <div className="space-y-6">

      {/* HEADER */}

      <PurchaseHeader

        total={
          stats.total
        }

        pending={
          stats.pending
        }

        completed={
          stats.completed
        }

        onCreate={
          handleCreate
        }

      />

      {/* TABLE */}

      <PurchaseTable

        purchases={
          purchases
        }

        loading={
          loading
        }

        onEdit={
          handleEdit
        }

        onDelete={
          handleDelete
        }

      />

      {/* MODAL */}

      <PurchaseFormModal

        open={
          openModal
        }

        onClose={
          resetForm
        }

        onSubmit={
          handleSubmit
        }

        form={
          form
        }

        setForm={
          setForm
        }

        onChange={
          handleChange
        }

        suppliers={
          suppliers
        }

        products={
          products
        }

        loading={
          actionLoading ||
          loadingSuppliers ||
          loadingProducts
        }

        isEdit={
          !!editingId
        }

      />

    </div>

  );

}