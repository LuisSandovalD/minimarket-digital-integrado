// ========================================
// hooks/useForgotPassword.js
// ========================================

import { useState } from "react";

import {
  resetPasswordService,
  sendRecoveryEmailService,
  verifyRecoveryCodeService,
} from "../services/auth.service";

export default function useForgotPassword(onClose) {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  /* ======================================
   * PASO 1
   * ENVIAR CÓDIGO
   * ==================================== */
  const sendCode = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await sendRecoveryEmailService(email);

      setSuccess(response.message || "Código enviado correctamente");

      setStep(2);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error.message ||
          "No fue posible enviar el código",
      );
    } finally {
      setLoading(false);
    }
  };

  /* ======================================
   * PASO 2
   * VALIDAR CÓDIGO
   * ==================================== */
  const verifyCode = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await verifyRecoveryCodeService(code);

      setSuccess(response.message || "Código validado");

      setStep(3);
    } catch (error) {
      setError(
        error?.response?.data?.message || error.message || "Código inválido",
      );
    } finally {
      setLoading(false);
    }
  };

  /* ======================================
   * PASO 3
   * CAMBIAR CONTRASEÑA
   * ==================================== */
  const resetPassword = async () => {
    try {
      setLoading(true);
      setError("");

      if (newPassword !== confirmPassword) {
        throw new Error("Las contraseñas no coinciden");
      }

      if (newPassword.length < 8) {
        throw new Error("La contraseña debe tener al menos 8 caracteres");
      }

      const response = await resetPasswordService(code, newPassword);

      setSuccess(response.message || "Contraseña actualizada");

      setTimeout(() => {
        resetForm();

        if (onClose) {
          onClose();
        }
      }, 1500);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error.message ||
          "No fue posible actualizar la contraseña",
      );
    } finally {
      setLoading(false);
    }
  };

  /* ======================================
   * RESET FORM
   * ==================================== */
  const resetForm = () => {
    setStep(1);

    setEmail("");
    setCode("");

    setNewPassword("");
    setConfirmPassword("");

    setError("");
    setSuccess("");
  };

  return {
    step,

    email,
    setEmail,

    code,
    setCode,

    newPassword,
    setNewPassword,

    confirmPassword,
    setConfirmPassword,

    loading,
    error,
    success,

    sendCode,
    verifyCode,
    resetPassword,

    resetForm,
  };
}
