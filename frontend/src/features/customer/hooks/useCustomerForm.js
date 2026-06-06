// ========================================
// features/customers/hooks/useCustomerForm.js
// ========================================

import { useState } from "react";

import customerService from "../services/customer.service";

import { initialCustomerForm } from "../utils/customerForm";

export function useCustomerForm(fetchCustomers) {
  const [modalOpen, setModalOpen] = useState(false);

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState(initialCustomerForm);

  // ========================================
  // CHANGE
  // ========================================

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // ========================================
  // RESET
  // ========================================

  function resetForm() {
    setForm(initialCustomerForm);
  }

  // ========================================
  // CREATE
  // ========================================

  function openCreate() {
    resetForm();

    setModalOpen(true);
  }

  // ========================================
  // EDIT
  // ========================================

  function openEdit(customer) {
    setForm({
      id: customer.id,

      name: customer.name || "",

      documentType: customer.documentType || "",

      documentNumber: customer.documentNumber || "",

      email: customer.email || "",

      phone: customer.phone || "",

      address: customer.address || "",

      city: customer.city || "",

      notes: customer.notes || "",
    });

    setModalOpen(true);
  }

  // ========================================
  // CLOSE
  // ========================================

  function closeModal() {
    setModalOpen(false);

    resetForm();
  }

  // ========================================
  // SAVE
  // ========================================

  async function save() {
    try {
      if (!form.name?.trim()) {
        alert("El nombre es obligatorio");
        return;
      }

      setSaving(true);

      const payload = {
        name: form.name,

        documentType: form.documentType || null,

        documentNumber: form.documentNumber || null,

        email: form.email || null,

        phone: form.phone || null,

        address: form.address || null,

        city: form.city || null,

        notes: form.notes || null,
      };

      if (form.id) {
        await customerService.update(form.id, payload);
      } else {
        await customerService.create(payload);
      }

      closeModal();

      await fetchCustomers();
    } catch (error) {
      console.error(error);

      alert("Ocurrió un error al guardar");
    } finally {
      setSaving(false);
    }
  }

  // ========================================
  // DELETE
  // ========================================

  async function remove(id) {
    const confirmed = confirm("¿Eliminar cliente?");

    if (!confirmed) return;

    try {
      await customerService.remove(id);

      await fetchCustomers();
    } catch (error) {
      console.error(error);

      alert("No se pudo eliminar");
    }
  }

  // ========================================
  // RETURN
  // ========================================

  return {
    form,
    setForm,

    handleChange,

    saving,

    modalOpen,
    setModalOpen,

    openCreate,
    openEdit,

    closeModal,

    save,
    remove,

    resetForm,
  };
}
