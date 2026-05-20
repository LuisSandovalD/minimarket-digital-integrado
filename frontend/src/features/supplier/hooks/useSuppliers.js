import useSupplierLoad from "./useSupplierLoad";

import useSupplierForm from "./useSupplierForm";

import useSupplierActions from "./useSupplierActions";

export default function useSupplier() {
  // =========================
  // LOAD
  // =========================

  const {
    suppliers,
    loading,

    loadSuppliers,
  } = useSupplierLoad();

  // =========================
  // FORM
  // =========================

  const {
    form,
    editingId,

    handleChange,
    handleEdit,

    resetForm,
  } = useSupplierForm();

  // =========================
  // ACTIONS
  // =========================

  const {
    saving,

    handleSubmit,
    handleDelete,
  } = useSupplierActions({
    form,
    editingId,

    resetForm,
    loadSuppliers,
  });

  // =========================
  // RETURN
  // =========================

  return {
    // DATA
    suppliers,

    // STATES
    loading,
    saving,

    // FORM
    form,
    editingId,

    // ACTIONS
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,

    resetForm,
  };
}
