import {
  Mail,
  Lock,
} from "lucide-react";

import {
  Input,
  PasswordInput,
  Checkbox,
  FormError,
} from "@/components/inputs";

import {
  SubmitButton,
} from "@/components/buttons";

import LoginOptions from "./LoginOptions";

import useLoginForm from "../../hooks/useLoginForm";

export default function LoginForm({
  onClose,
}) {

  // ======================================
  // LOGIN HOOK
  // ======================================

  const {

    form,

    loading,

    error,

    handleChange,

    handleSubmit,

  } = useLoginForm(onClose);

  // ======================================
  // RENDER
  // ======================================

  return (

    <form
      id="login-form"
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      {/* ======================================
          EMAIL
      ====================================== */}

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

      {/* ======================================
          PASSWORD
      ====================================== */}

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

      {/* ======================================
          ERROR
      ====================================== */}

      <FormError
        message={error}
      />

      {/* ======================================
          OPTIONS
      ====================================== */}

      <LoginOptions>

        <Checkbox
          name="remember"
          label="Recordarme"
          checked={form.remember}
          onChange={handleChange}
        />

      </LoginOptions>

      {/* ======================================
          SUBMIT
      ====================================== */}

      <SubmitButton
        form="login-form"
        type="submit"
        text={
          loading
            ? "Ingresando..."
            : "Iniciar Sesión"
        }
        loading={loading}
        disabled={loading}
        once
        className="
          w-full

          bg-gradient-to-r
          from-[#274c77]
          via-[#365d86]
          to-[#6096ba]

          shadow-lg
          shadow-[#274c77]/20

          transition-all
          duration-300

          hover:shadow-xl
          hover:shadow-[#274c77]/30
          hover:scale-[1.01]

          active:scale-[0.99]
        "
      />

    </form>

  );

}