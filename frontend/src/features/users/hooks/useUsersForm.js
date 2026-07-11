// ========================================
// hooks/useUserForm.js
// ========================================

import { useEffect, useMemo, useState } from "react";
import { createUser, updateUser } from "../services/users.service";

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
      // Normalizamos a String o vacío para que los estados de los inputs/botones no se confundan con ceros o undefined
      branchId: user.branchId || user.branch?.id || "",
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

  // Sincroniza el estado cuando el usuario cambia en la UI principal
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData(initialFormData);
    setFormError("");
  }, [initialFormData]);

  // ========================================
  // HANDLE CHANGE
  // ========================================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      let finalValue = type === "checkbox" ? checked : value;

      // Normalización de selectores booleanos si los hubiera
      if (name === "isActive") {
        finalValue = value === "true";
      }

      return {
        ...prev,
        [name]: finalValue,
      };
    });
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
  // CLEAN DATA (BUILD PAYLOAD)
  // ========================================
  const buildPayload = () => {
    const strictActive =
      formData.isActive === true ||
      String(formData.isActive).toLowerCase() === "true";

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      role: formData.role,
      phone: formData.phone,
      avatar: formData.avatar,
      // Enviamos IDs limpios (Números reales si existen, o null si están vacíos)
      branchId: formData.branchId ? Number(formData.branchId) : null,
      managerId: formData.managerId ? Number(formData.managerId) : null,
      isActive: strictActive,
      twoFactorEnabled: !!formData.twoFactorEnabled,
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

  return {
    loading,
    formData,
    formError,
    isEdit,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
