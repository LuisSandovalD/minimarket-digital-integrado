// ========================================
// hooks/useAccountProfile.js
// ========================================
import { useState } from "react";
import useAccountStore from "../store/account.store";
import {
  validatePassword,
  validateProfile,
} from "../validations/account.validation";

export default function useAccountProfile() {
  const user = useAccountStore((state) => state.user);
  const loading = useAccountStore((state) => state.loading);
  const saving = useAccountStore((state) => state.saving);
  const passwordLoading = useAccountStore((state) => state.passwordLoading);
  const deleteLoading = useAccountStore((state) => state.deleteLoading);
  const storeError = useAccountStore((state) => state.error);

  const fetchAccount = useAccountStore((state) => state.fetchAccount);
  const updateProfile = useAccountStore((state) => state.updateProfile);
  const updatePassword = useAccountStore((state) => state.updatePassword);
  const removeAccount = useAccountStore((state) => state.removeAccount);

  // Estados locales para errores de validación en tiempo de ejecución (UI)
  const [validationErrors, setValidationErrors] = useState({});

  // Acción: Actualizar datos personales
  const handleUpdateProfile = async (formData) => {
    setValidationErrors({});
    const errors = validateProfile(formData);

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return false;
    }

    try {
      await updateProfile(formData);
      return true;
    } catch (err) {
      return false;
    }
  };

  // Acción: Cambiar contraseña de seguridad
  const handleUpdatePassword = async (passwordData) => {
    setValidationErrors({});
    const errors = validatePassword(passwordData);

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return false;
    }

    try {
      await updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      return true;
    } catch (err) {
      return false;
    }
  };

  // ========================================
  // hooks/useAccountProfile.js (CORREGIDO)
  // ========================================

  // Acción: Dar de baja la cuenta (Requiere password de confirmación)
  const handleDeleteAccount = async (password) => {
    if (!password) {
      setValidationErrors({
        deletePassword: "Debes ingresar tu contraseña para confirmar",
      });
      return false;
    }

    try {
      // 🚀 SOLUCIÓN: Empaquetamos la variable en un objeto con la propiedad 'password'
      // de esta manera tu service la recibe limpia y estructurada
      await removeAccount({ password: password });
      return true;
    } catch (err) {
      return false;
    }
  };

  return {
    user,
    loading,
    saving,
    passwordLoading,
    deleteLoading,
    serverError: storeError,
    validationErrors,
    fetchAccount,
    handleUpdateProfile,
    handleUpdatePassword,
    handleDeleteAccount,
  };
}
