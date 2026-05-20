import { useState } from "react";

import {
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../services/supplier.service";

export default function useSupplierActions({
  form,
  editingId,

  resetForm,
  loadSuppliers,
}) {
  const [saving, setSaving] = useState(false);

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async () => {
    try {
      setSaving(true);

      // =========================
      // NORMALIZE DATA
      // =========================

      const payload = {
        ...form,

        isActive: form.isActive === true || form.isActive === "true",
      };

      // =========================
      // UPDATE
      // =========================

      if (editingId) {
        await updateSupplier(editingId, payload);
      }

      // =========================
      // CREATE
      // =========================
      else {
        await createSupplier(payload);
      }

      // =========================
      // RESET
      // =========================

      resetForm();

      await loadSuppliers();

      return true;
    } catch (error) {
      console.error(error);

      return false;
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Eliminar proveedor?");

    if (!confirmDelete) return;

    try {
      await deleteSupplier(id);

      await loadSuppliers();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    saving,

    handleSubmit,
    handleDelete,
  };
}
