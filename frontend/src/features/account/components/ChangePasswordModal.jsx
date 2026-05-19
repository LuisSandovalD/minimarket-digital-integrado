import { useMemo, useState } from "react";
import { ShieldCheck, Check, X } from "lucide-react";
import {
  Modal,
  HeaderModal,
  FooterModal,
} from "@/components/modals";
import { ModernButton } from "@/components/buttons";
import PasswordInput from "@/components/inputs/PasswordInput";

export default function ChangePasswordModal({
  open,
  onClose,
  onSubmit,
  loading = false,
}) {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validations = useMemo(() => ({
    length: form.newPassword.length >= 8,
    uppercase: /[A-Z]/.test(form.newPassword),
    number: /[0-9]/.test(form.newPassword),
    special: /[^A-Za-z0-9]/.test(form.newPassword),
    match:
      form.newPassword &&
      form.confirmPassword &&
      form.newPassword === form.confirmPassword,
  }), [form]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const newErrors = {};
    if (!form.currentPassword) {
      newErrors.currentPassword = "Ingresa tu contraseña actual";
    }
    if (!validations.length) {
      newErrors.newPassword = "Mínimo 8 caracteres";
    }
    if (!validations.uppercase) {
      newErrors.newPassword = "Debe contener mayúsculas";
    }
    if (!validations.number) {
      newErrors.newPassword = "Debe contener números";
    }
    if (!validations.special) {
      newErrors.newPassword = "Debe contener caracteres especiales";
    }
    if (!validations.match) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    await onSubmit?.(form);
    setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setErrors({});
  }

  return (
    <Modal open={open} onClose={onClose} size="md">
      <HeaderModal
        title="Cambiar contraseña"
        subtitle="Elige una contraseña fuerte para proteger tu cuenta"
        onClose={onClose}
      />

      <div className="px-6 py-6 space-y-6">
        {/* Form Fields */}
        <div className="space-y-4">
          <PasswordInput
            label="Contraseña actual"
            name="currentPassword"
            placeholder="Tu contraseña actual"
            value={form.currentPassword}
            onChange={handleChange}
            error={errors.currentPassword}
          />

          <PasswordInput
            label="Nueva contraseña"
            name="newPassword"
            placeholder="Tu nueva contraseña"
            value={form.newPassword}
            onChange={handleChange}
            error={errors.newPassword}
          />

          <PasswordInput
            label="Confirmar contraseña"
            name="confirmPassword"
            placeholder="Repite la nueva contraseña"
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
        </div>

        {/* Inline Validations - Solo si hay input */}
        {form.newPassword && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Requisitos
            </p>
            <div className="space-y-2">
              <ValidationCheck valid={validations.length} text="8+ caracteres" />
              <ValidationCheck valid={validations.uppercase} text="Mayúscula" />
              <ValidationCheck valid={validations.number} text="Número" />
              <ValidationCheck valid={validations.special} text="Carácter especial" />
            </div>
          </div>
        )}
      </div>

      <FooterModal>
        <div className="flex gap-3 sm:justify-end w-full">
          <ModernButton
            text="Cancelar"
            variant="outline"
            onClick={onClose}
          />
          <ModernButton
            text={loading ? "Guardando..." : "Actualizar"}
            icon={ShieldCheck}
            onClick={handleSubmit}
            disabled={loading}
          />
        </div>
      </FooterModal>
    </Modal>
  );
}

function ValidationCheck({ valid, text }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div
        className={`flex h-5 w-5 items-center justify-center rounded transition-colors ${
          valid
            ? "bg-emerald-500 text-white"
            : "bg-slate-200 text-slate-400 dark:bg-slate-800"
        }`}
      >
        {valid ? <Check size={14} /> : <X size={14} />}
      </div>
      <span
        className={`font-medium ${
          valid
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-slate-500 dark:text-slate-400"
        }`}
      >
        {text}
      </span>
    </div>
  );
}