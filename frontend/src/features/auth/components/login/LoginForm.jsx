import { ModernButton, SubmitButton } from "@/components/buttons";
import { Checkbox, FormError, Input, PasswordInput } from "@/components/forms";
import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import useLoginForm from "../../hooks/useLoginForm";
import ForgotPasswordModal from "../password/ForgotPasswordModal";
import LoginOptions from "./LoginOptions";
import TwoFactorLoginModal from "./TwoFactorLoginModal";

export default function LoginForm({ onClose }) {
  const {
    form,
    loading,
    error,
    showTwoFactor,
    setShowTwoFactor,
    pendingUserId,
    email,
    completeLogin,
    handleChange,
    handleSubmit,
  } = useLoginForm(onClose);

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <>
      <form id="login-form" onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Correo electrónico"
          name="email"
          type="email"
          placeholder="correo@gmail.com"
          icon={Mail}
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />

        <PasswordInput
          label="Contraseña"
          name="password"
          placeholder="••••••••"
          icon={Lock}
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />

        <FormError message={error} />

        <LoginOptions>
          <Checkbox name="remember" label="Recordarme" checked={form.remember} onChange={handleChange} />
          <ModernButton
            type="button"
            text="¿Olvidaste tu contraseña?"
            size="sm"
            variant="ghost"
            onClick={() => setShowForgotPassword(true)}
            className="h-auto px-0 font-semibold text-[#274c77] hover:text-[#6096ba] dark:text-[#a3cef1]"
          />
        </LoginOptions>

        <SubmitButton
          form="login-form"
          type="submit"
          text={loading ? "Ingresando..." : "Iniciar Sesión"}
          loading={loading}
          disabled={loading}
          once
          className="w-full"
        />

        <p className="text-center text-xs leading-relaxed text-[#94a3b8] dark:text-white/30">
          Al iniciar sesión aceptas nuestros{" "}
          <button type="button" className="font-medium text-[#274c77] hover:text-[#6096ba] dark:text-[#a3cef1]">
            Términos y Condiciones
          </button>
          {" y nuestra "}
          <button type="button" className="font-medium text-[#274c77] hover:text-[#6096ba] dark:text-[#a3cef1]">
            Política de Privacidad
          </button>
          .
        </p>
      </form>

      <ForgotPasswordModal isOpen={showForgotPassword} onClose={() => setShowForgotPassword(false)} />

      <TwoFactorLoginModal
        open={showTwoFactor}
        userId={pendingUserId}
        email={email}
        onClose={() => setShowTwoFactor(false)}
        onSuccess={completeLogin}
      />
    </>
  );
}
