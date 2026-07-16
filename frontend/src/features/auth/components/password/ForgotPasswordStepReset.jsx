import { useState } from "react";

import { SubmitButton } from "@/components/buttons";
import { FormError, PasswordInput } from "@/components/forms";
import { Lock } from "lucide-react";

import { resetPasswordService } from "../../services/auth.service";

export default function ForgotPasswordStepReset({ code, onSuccess }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setLoading(true);

      await resetPasswordService(code, password);

      onSuccess();
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "No se pudo actualizar la contraseña. Intenta de nuevo.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-[#6096ba] dark:text-[#8fb8d8]">Crea una nueva contraseña segura para tu cuenta.</p>

      <PasswordInput
        label="Nueva contraseña"
        icon={Lock}
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password"
        required
      />

      <PasswordInput
        label="Confirmar contraseña"
        icon={Lock}
        placeholder="••••••••"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        autoComplete="new-password"
        required
      />

      <FormError message={error} />

      <SubmitButton
        text={loading ? "Actualizando..." : "Cambiar contraseña"}
        loading={loading}
        disabled={loading}
        className="w-full"
      />
    </form>
  );
}
