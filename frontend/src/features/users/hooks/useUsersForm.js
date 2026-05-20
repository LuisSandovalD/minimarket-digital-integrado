// ========================================
// hooks/useUserForm.js
// ========================================

import { useMemo, useState } from "react";

import { createUser, updateUser } from "../services/users.service";

// ========================================
// INITIAL STATE
// ========================================

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
  slug: "",
  role: "EMPLOYEE",
  phone: "",
  avatar: "",
  branchId: "",
  managerId: "",
  isActive: true,
  twoFactorEnabled: false,
};

// ========================================
// HOOK
// ========================================

export default function useUserForm({ user, onClose, onSuccess }) {
  // ========================================
  // EDIT MODE
  // ========================================

  const isEdit = !!user;

  // ========================================
  // INITIAL FORM DATA
  // ========================================

  const initialFormData = useMemo(() => {
    if (!user) {
      return INITIAL_STATE;
    }

    return {
      name: user.name || "",
      email: user.email || "",
      password: "",
      slug: user.slug || "",
      role: user.role || "EMPLOYEE",
      phone: user.phone || "",
      avatar: user.avatar || "",
      branchId: user.branchId || "",
      managerId: user.managerId || "",
      isActive: user.isActive ?? true,
      twoFactorEnabled: user.twoFactorEnabled ?? false,
    };
  }, [user]);

  // ========================================
  // STATE
  // ========================================

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(initialFormData);

  // ========================================
  // HANDLE CHANGE
  // ========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ========================================
  // HANDLE IMAGE
  // ========================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        avatar: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  // ========================================
  // RESET FORM
  // ========================================

  const resetForm = () => {
    setFormData(INITIAL_STATE);
  };

  // ========================================
  // VALIDATIONS
  // ========================================

  const validateForm = () => {
    if (!formData.name) {
      throw new Error("El nombre es obligatorio");
    }

    if (!formData.email) {
      throw new Error("El email es obligatorio");
    }

    if (!isEdit && !formData.password) {
      throw new Error("La contraseña es obligatoria");
    }
  };

  // ========================================
  // CLEAN DATA
  // ========================================

  const buildPayload = () => {
    return {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      phone: formData.phone,
      avatar: formData.avatar,
      branchId: formData.branchId ? Number(formData.branchId) : null,
      managerId: formData.managerId ? Number(formData.managerId) : null,
      isActive: formData.isActive,
      twoFactorEnabled: formData.twoFactorEnabled,
    };
  };

  // ========================================
  // SUBMIT
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      validateForm();

      const payload = buildPayload();

      let response;

      // ====================================
      // UPDATE
      // ====================================

      if (isEdit) {
        response = await updateUser(user.id, payload);
      }

      // ====================================
      // CREATE
      // ====================================
      else {
        response = await createUser(payload);
      }

      // ====================================
      // UPDATE UI INSTANTLY
      // ====================================

      onSuccess?.(response, isEdit);

      // ====================================
      // CLOSE MODAL
      // ====================================

      onClose?.();

      // ====================================
      // RESET
      // ====================================

      resetForm();
    } catch (error) {
      console.error("Error saving user:", error);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // RETURN
  // ========================================

  return {
    loading,
    formData,
    isEdit,
    handleChange,
    handleImageChange,
    handleSubmit,
    resetForm,
  };
}
