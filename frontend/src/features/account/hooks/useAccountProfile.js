import { updateUser } from "@/features/auth/store/authSlice"; // 2. Importamos la acción de tu slice de Redux
import { useState } from "react";
import { useDispatch } from "react-redux"; // 1. Importamos el dispatch de Redux
import useAccountStore from "../store/account.store";
import { validatePassword, validateProfile } from "../validations/account.validation";

export default function useAccountProfile() {
  const dispatch = useDispatch(); // 3. Inicializamos el dispatch

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
      // Zustand hace la petición a la API y actualiza su store local
      await updateProfile(formData);

      // 🚀 LA SOLUCIÓN: Sincronizamos Redux inmediatamente.
      // Le pasamos a Redux los mismos datos que se acaban de guardar (incluyendo el avatar).
      // Al actualizar Redux, el hook useAuth() de la barra lateral se entera y cambia la foto sin F5.
      dispatch(
        updateUser({
          name: formData.name,
          email: formData.email,
          avatar: formData.avatar, // O la propiedad exacta donde manejes la URL de la imagen
        }),
      );

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

  // Acción: Dar de baja la cuenta
  const handleDeleteAccount = async (password) => {
    if (!password) {
      setValidationErrors({
        deletePassword: "Debes ingresar tu contraseña para confirmar",
      });
      return false;
    }

    try {
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
