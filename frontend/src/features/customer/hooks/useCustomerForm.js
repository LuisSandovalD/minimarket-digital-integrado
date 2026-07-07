// ========================================
// features/customers/hooks/useCustomerForm.js
// ========================================

import { useCallback, useState } from "react";

import customerService from "../services/customer.service";
import { initialCustomerForm } from "../utils/customerForm";

export function useCustomerForm(fetchCustomers) {
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState(initialCustomerForm);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function resetForm() {
    setForm(initialCustomerForm);
  }

  function openCreate() {
    resetForm();
    setModalOpen(true);
  }

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
      // Nuevos campos mapeados desde el backend
      creditLimit: customer.creditLimit ?? "",
      currentDebt: customer.currentDebt ?? 0,
      isActive: customer.isActive ?? true,
    });

    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    resetForm();
  }

  const save = useCallback(async () => {
    if (!form.name.trim()) return;

    try {
      setSaving(true);

      const payload = {
        name: form.name.trim(),
        documentType: form.documentType || null,
        documentNumber: form.documentNumber || null,
        email: form.email || null,
        phone: form.phone || null,
        address: form.address || null,
        city: form.city || null,
        notes: form.notes || null,
        // Procesamos los valores antes de enviarlos a la base de datos
        creditLimit: form.creditLimit !== "" ? Number(form.creditLimit) : null,
        currentDebt: Number(form.currentDebt) || 0,
        isActive: form.isActive === true || form.isActive === "true",
      };

      if (form.id) {
        await customerService.update(form.id, payload);
      } else {
        await customerService.create(payload);
      }

      closeModal();

      // Mantiene filtros, búsqueda y página actual
      await fetchCustomers();
    } catch (error) {
      console.error("Error saving customer:", error);
    } finally {
      setSaving(false);
    }
  }, [form, fetchCustomers]);

  const remove = useCallback(
    async (id) => {
      try {
        await customerService.remove(id);

        // Mantiene filtros, búsqueda y página actual
        await fetchCustomers();
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    },
    [fetchCustomers],
  );

  return {
    form,
    setForm,

    saving,

    modalOpen,
    setModalOpen,

    handleChange,

    openCreate,
    openEdit,
    closeModal,

    save,
    remove,

    resetForm,
  };
}
