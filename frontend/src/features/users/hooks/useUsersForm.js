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
  const isEdit = !!user;

  // ========================================
  // INITIAL FORM DATA
  // ========================================

  const initialFormData = useMemo(() => {
    if (!user) return INITIAL_STATE;

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
  const [formError, setFormError] = useState("");

  // ========================================
  // HANDLE CHANGE
  // ========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      // Si cambia el rol, reiniciamos el managerId ya que cambian los filtros jerárquicos
      if (name === "role") {
        updated.managerId = "";
      }

      return updated;
    });
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
    setFormError("");
  };

  // ========================================
  // VALIDATIONS
  // ========================================

  const validateForm = () => {
    if (!formData.name.trim()) throw new Error("El nombre es obligatorio");
    if (!formData.email.trim()) throw new Error("El email es obligatorio");
    if (!isEdit && !formData.password)
      throw new Error("La contraseña es obligatoria");
  };

  // ========================================
  // CLEAN DATA
  // ========================================

  const buildPayload = () => {
    const payload = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      phone: formData.phone,
      avatar: formData.avatar,
      branchId: formData.branchId ? Number(formData.branchId) : null,
      managerId: formData.managerId ? Number(formData.managerId) : null,
      isActive: formData.isActive,
      twoFactorEnabled: formData.twoFactorEnabled,
    };

    if (!isEdit || formData.password) {
      payload.password = formData.password;
    }

    return payload;
  };

  // ========================================
  // SUBMIT
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      setFormError("");
      validateForm();

      const payload = buildPayload();
      let response;

      if (isEdit) {
        response = await updateUser(user.id, payload);
      } else {
        response = await createUser(payload);
      }

      const savedUser = response?.data || response;

      if (onSuccess) {
        onSuccess(savedUser, isEdit);
      }

      onClose?.();
      resetForm();
    } catch (error) {
      console.error("Error saving user:", error);
      setFormError(error.message || "Ocurrió un error al guardar el usuario");
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
    formError,
    isEdit,
    handleChange,
    handleImageChange,
    handleSubmit,
    resetForm,
  };
}
