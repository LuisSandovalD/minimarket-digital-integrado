// ========================================
// features/account/components/ChangePasswordModal.jsx
// ========================================
import { AlertCircle, Check, LockKeyhole, ShieldCheck, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { ModernButton } from "@/components/buttons";
import { PasswordInput } from "@/components/forms/";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays/";
// CONECTADO: Acoplamiento directo con el ecosistema global de tu feature
import useAccountProfile from "../hooks/useAccountProfile";

export default function ChangePasswordModal({ open, onClose }) {
  // Extraemos los estados lógicos, flags y handlers del Store unificado
  const {
    passwordLoading,
    serverError,
    validationErrors: storeValidationErrors,
    handleUpdatePassword,
  } = useAccountProfile();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [localErrors, setLocalErrors] = useState({});

  // Resetear el formulario de forma segura al abrir o cerrar el modal
  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setLocalErrors({});
    }
  }, [open]);

  // Evaluaciones reactivas visuales en caliente para el panel de ayuda (UI)
  const validations = useMemo(
    () => ({
      length: form.newPassword.length >= 8,
      uppercase: /[A-Z]/.test(form.newPassword),
      number: /[0-9]/.test(form.newPassword),
      special: /[^A-Za-z0-9]/.test(form.newPassword),
      match:
        form.newPassword.length > 0 && form.confirmPassword.length > 0 && form.newPassword === form.confirmPassword,
    }),
    [form],
  );

  const isStrongPassword = useMemo(() => {
    return validations.length && validations.uppercase && validations.number && validations.special;
  }, [validations]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Limpieza selectiva de errores en caliente mientras el usuario interactúa
    if (localErrors[name]) {
      setLocalErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  /* ======================================
   * ORQUESTADOR DE MUTACIÓN DE CREDENCIALES
   * ==================================== */
  async function handleSubmit() {
    setLocalErrors({});
    const newErrors = {};

    // 1. Validaciones preventivas de UX previas al despacho del Store
    if (!form.currentPassword) {
      newErrors.currentPassword = "Debes ingresar tu contraseña actual";
    }
    if (!form.newPassword) {
      newErrors.newPassword = "Debes ingresar una nueva contraseña";
    } else if (!isStrongPassword) {
      newErrors.newPassword = "La contraseña no cumple con los requisitos mínimos";
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Por favor, confirma tu contraseña";
    } else if (!validations.match) {
      newErrors.confirmPassword = "Las contraseñas ingresadas no coinciden";
    }

    if (Object.keys(newErrors).length > 0) {
      setLocalErrors(newErrors);
      return;
    }

    // 2. Despacho al Hook del Perfil (ejecuta de fondo la lógica de validación e infraestructura)
    const success = await handleUpdatePassword({
      currentPassword: form.currentPassword,
      newPassword: form.newPassword,
      confirmPassword: form.confirmPassword, // Pasado completo para validar igualdad en store si es necesario
    });

    if (success) {
      onClose();
    }
  }

  // Consolidación de errores: prioriza errores de UI del store, locales o respuestas del servidor
  const activeErrors = { ...storeValidationErrors, ...localErrors };

  return (
    <Modal open={open} onClose={onClose} size="md">
      <HeaderModal
        title="Cambiar Contraseña"
        subtitle="Elige una combinación robusta para mantener blindada tu cuenta corporativa"
        onClose={onClose}
        icon={LockKeyhole}
      />

      <div className="px-6 py-6 space-y-5">
        {/* Banner de Error Global del Servidor (Contraseña incorrecta o caídas de red) */}
        {serverError && (
          <div className="p-3.5 text-xs font-semibold rounded-xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-950/30 flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        {/* Campos del Formulario */}
        <div className="space-y-4">
          <PasswordInput
            label="Contraseña Actual"
            name="currentPassword"
            placeholder="••••••••••••"
            value={form.currentPassword}
            onChange={handleChange}
            error={activeErrors.currentPassword}
            disabled={passwordLoading}
          />

          <PasswordInput
            label="Nueva Contraseña"
            name="newPassword"
            placeholder="••••••••••••"
            value={form.newPassword}
            onChange={handleChange}
            error={activeErrors.newPassword}
            disabled={passwordLoading}
          />

          <PasswordInput
            label="Confirmar Nueva Contraseña"
            name="confirmPassword"
            placeholder="••••••••••••"
            value={form.confirmPassword}
            onChange={handleChange}
            error={activeErrors.confirmPassword}
            disabled={passwordLoading}
          />
        </div>

        {/* Panel dinámico de Requisitos */}
        {form.newPassword.length > 0 && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60 space-y-2.5">
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Requisitos obligatorios de seguridad:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <ValidationCheck valid={validations.length} text="Mínimo 8 caracteres" />
              <ValidationCheck valid={validations.uppercase} text="Una Mayúscula (A-Z)" />
              <ValidationCheck valid={validations.number} text="Un Número (0-9)" />
              <ValidationCheck valid={validations.special} text="Carácter especial (@$!%)" />
            </div>
          </div>
        )}
      </div>

      <FooterModal>
        <div className="flex gap-3 justify-end w-full">
          <ModernButton text="Cancelar" variant="outline" onClick={onClose} disabled={passwordLoading} />
          <ModernButton
            text={passwordLoading ? "Guardando..." : "Actualizar Contraseña"}
            icon={ShieldCheck}
            onClick={handleSubmit}
            disabled={passwordLoading}
          />
        </div>
      </FooterModal>
    </Modal>
  );
}

function ValidationCheck({ valid, text }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <div
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md transition-colors ${
          valid ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-600"
        }`}
      >
        {valid ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={3} />}
      </div>
      <span
        className={`font-medium transition-colors ${
          valid ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"
        }`}
      >
        {text}
      </span>
    </div>
  );
}
