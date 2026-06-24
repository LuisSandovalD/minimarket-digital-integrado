import { useState } from "react";

import { SubmitButton } from "@/components/buttons";
import { FormError } from "@/components/forms";

import {
  sendRecoveryEmailService,
  verifyRecoveryCodeService,
} from "../../services/auth.service";

export default function ForgotPasswordStepCode({
  email,
  code,
  setCode,
  onNext,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resending, setResending] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setCode(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      await verifyRecoveryCodeService(code);

      onNext();
    } catch (err) {
      setError(
        err?.message || "Código incorrecto o expirado. Intenta de nuevo.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");

    try {
      setResending(true);
      await sendRecoveryEmailService(email);
    } catch (err) {
      setError(err?.message || "No se pudo reenviar el código.");
    } finally {
      setResending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <p className="text-sm text-[#6096ba] dark:text-[#8fb8d8]">
        Ingresa el código de 6 dígitos que enviamos a tu correo
        {email && (
          <>
            {" "}
            <span className="font-semibold text-[#274c77] dark:text-white">
              {email}
            </span>
          </>
        )}
        .
      </p>

      <input
        value={code}
        onChange={handleChange}
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        placeholder="······"
        className="
          w-full
          rounded-2xl
          border
          border-[#d7e0e7]
          bg-white/80
          p-4
          text-center
          text-2xl
          font-bold
          tracking-[1em]
          text-[#274c77]
          shadow-sm
          backdrop-blur-xl
          transition-all
          duration-200

          placeholder:tracking-[1em]
          placeholder:text-[#d7e0e7]

          focus:border-[#6096ba]
          focus:outline-none
          focus:ring-4
          focus:ring-[#6096ba]/15

          dark:border-white/10
          dark:bg-white/5
          dark:text-white
          dark:placeholder:text-white/20
        "
      />

      <FormError message={error} />

      <SubmitButton
        text={loading ? "Verificando..." : "Verificar código"}
        loading={loading}
        disabled={loading || code.length < 6}
        className="w-full"
      />

      <p className="text-center text-sm text-[#94a3b8] dark:text-white/30">
        ¿No recibiste el código?{" "}
        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          className="font-medium text-[#274c77] hover:text-[#6096ba] transition-colors disabled:opacity-50 dark:text-[#a3cef1]"
        >
          {resending ? "Reenviando..." : "Reenviar"}
        </button>
      </p>
    </form>
  );
}
