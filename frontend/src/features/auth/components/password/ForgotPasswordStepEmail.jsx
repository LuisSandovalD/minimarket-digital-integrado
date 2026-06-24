import { useState } from "react";

import { SubmitButton } from "@/components/buttons";
import { FormError, Input } from "@/components/forms";
import { Mail } from "lucide-react";

import { sendRecoveryEmailService } from "../../services/auth.service";

export default function ForgotPasswordStepEmail({ email, setEmail, onNext }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      await sendRecoveryEmailService(email);

      onNext();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "No se pudo enviar el código. Intenta de nuevo.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-[#6096ba] dark:text-[#8fb8d8]">
        Ingresa tu correo electrónico y te enviaremos un código para restablecer
        tu contraseña.
      </p>

      <Input
        label="Correo electrónico"
        icon={Mail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        required
      />

      <FormError message={error} />

      <SubmitButton
        text={loading ? "Enviando..." : "Enviar código"}
        loading={loading}
        disabled={loading}
        className="w-full"
      />
    </form>
  );
}
