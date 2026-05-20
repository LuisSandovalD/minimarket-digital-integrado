import { useState } from "react";

import { supplierInitialState } from "../utils/supplier.initialState";

export default function useSupplierForm() {
  const [form, setForm] = useState(supplierInitialState);

  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setEditingId(null);

    setForm(supplierInitialState);
  };

  const handleEdit = (supplier) => {
    setEditingId(supplier.id);

    setForm({
      name: supplier.name || "",

      ruc: supplier.ruc || "",

      email: supplier.email || "",

      phone: supplier.phone || "",

      address: supplier.address || "",

      contactPerson: supplier.contactPerson || "",

      website: supplier.website || "",

      notes: supplier.notes || "",
    });
  };

  return {
    form,
    editingId,

    setForm,
    setEditingId,

    handleChange,
    handleEdit,
    resetForm,
  };
}
