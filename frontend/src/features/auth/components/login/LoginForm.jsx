import { SubmitButton } from "@/components/buttons";
import { Checkbox, FormError, Input, PasswordInput } from "@/components/forms/";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import useLoginForm from "../../hooks/useLoginForm";
import LoginOptions from "./LoginOptions";

const SOCIAL_PROVIDERS = [
  { id: "google", label: "Google", icon: "🌐" },
  { id: "facebook", label: "Facebook", icon: "📘" },
];

export default function LoginForm({ onClose }) {
  const { form, loading, error, handleChange, handleSubmit } =
    useLoginForm(onClose);

  return (
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
        <Checkbox
          name="remember"
          label="Recordarme"
          checked={form.remember}
          onChange={handleChange}
        />
      </LoginOptions>

      <SubmitButton
        form="login-form"
        type="submit"
        text={loading ? "Ingresando..." : "Iniciar Sesión"}
        loading={loading}
        disabled={loading}
        once
        className="w-full bg-gradient-to-r from-[#274c77] via-[#365d86] to-[#6096ba] shadow-lg shadow-[#274c77]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#274c77]/30 hover:scale-[1.01] active:scale-[0.99]"
      />

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d7e0e7] to-transparent dark:via-white/10" />
        <span className="text-xs font-medium text-[#94a3b8] dark:text-white/30">
          o continúa con
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d7e0e7] to-transparent dark:via-white/10" />
      </div>

      {/* Social buttons */}
      <div className="grid grid-cols-2 gap-3">
        {SOCIAL_PROVIDERS.map(({ id, label, icon }) => (
          <motion.button
            key={id}
            type="button"
            disabled
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            title="Próximamente"
            className="relative flex items-center justify-center gap-2.5 rounded-2xl border border-[#d7e0e7] bg-white/80 px-4 py-3 text-sm font-semibold text-[#0f172a] backdrop-blur-xl transition-colors duration-200 hover:border-[#6096ba]/40 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            <span className="text-base">{icon}</span>
            <span>{label}</span>
            <span className="absolute right-2 top-1.5 rounded-full bg-[#dbeafe] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#274c77] dark:bg-[#274c77]/40 dark:text-[#a3cef1]">
              Soon
            </span>
          </motion.button>
        ))}
      </div>
    </form>
  );
}
