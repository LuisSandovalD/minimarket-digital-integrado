// ========================================
// features/employees/hooks/useEmployeeForm.js
// ========================================

import { useState } from "react";

import employeeService from "../services/employee.service";

const initialForm = {
  id: null,

  name: "",

  email: "",

  password: "",

  phone: "",

  position: "",

  department: "",

  branchId: 1,
};

export function useEmployeeForm(fetchEmployees) {
  const [modalOpen, setModalOpen] = useState(false);

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState(initialForm);

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
    setForm(initialForm);
  }

  // ========================================
  // OPEN CREATE
  // ========================================

  function openCreate() {
    resetForm();

    setModalOpen(true);
  }

  // ========================================
  // OPEN EDIT
  // ========================================

  function openEdit(employee) {
    setForm({
      id: employee.id,

      name: employee.name || "",

      email: employee.email || "",

      password: "",

      phone: employee.phone || "",

      position: employee.employeeProfile?.position || "",

      department: employee.employeeProfile?.department || "",

      branchId: employee.branchId || 1,
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
      setSaving(true);

      const payload = {
        name: form.name,

        email: form.email,

        phone: form.phone,

        position: form.position,

        department: form.department,

        branchId: Number(form.branchId),
      };

      if (form.password?.trim()) {
        payload.password = form.password;
      }

      if (form.id) {
        await employeeService.update(form.id, payload);
      } else {
        await employeeService.create(payload);
      }

      closeModal();

      await fetchEmployees();
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
    const confirmed = confirm("¿Eliminar empleado?");

    if (!confirmed) return;

    try {
      await employeeService.remove(id);

      await fetchEmployees();
    } catch (error) {
      console.error(error);

      alert("No se pudo eliminar");
    }
  }

  return {
    form,

    saving,

    modalOpen,

    setForm,
    handleChange,

    openCreate,
    openEdit,
    closeModal,

    save,
    remove,
  };
}
