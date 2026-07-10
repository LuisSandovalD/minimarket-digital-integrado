import { Modal } from "@/components/overlays/";
import { motion } from "framer-motion";
import LoginBadge from "./LoginBadge";
import LoginForm from "./LoginForm";
import LoginHeader from "./LoginHeader";

const OFFICE_IMAGE =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop";

export default function LoginModal({ open, onClose, onSwitchToRegister }) {
  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose} size="full">
      <div className="flex h-[850px] max-h-[95vh] overflow-hidden">
        {/* PANEL IZQUIERDO */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative hidden w-[52%] shrink-0 overflow-hidden lg:block"
        >
          {/* Imagen optimizada (Sin animación de escala pesada para la GPU) */}
          <img
            src={OFFICE_IMAGE}
            alt="Oficina empresarial"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          {/* Contenedor simplificado */}
          <div className="absolute inset-0 flex flex-col justify-between p-10 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent">
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/25 bg-white/15 px-4 py-2 backdrop-blur-xl">
              <div className="h-2 w-2 rounded-full bg-[#a3cef1]" />
              <span className="text-sm font-semibold text-white tracking-wide">
                ERP Empresarial
              </span>
            </div>
          </div>
        </motion.div>

        {/* PANEL DERECHO */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative flex flex-1 flex-col overflow-y-auto bg-white dark:bg-[#0f172a]"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white dark:bg-[#0f172a]">
            <LoginHeader onClose={onClose} />
          </div>

          {/* Formulario */}
          <div className="flex flex-1 flex-col justify-center max-w-md mx-auto w-full px-6 py-8">
            <LoginBadge />
            <div className="mt-6">
              <LoginForm onClose={onClose} />
            </div>

            <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
              ¿Aún no tienes una cuenta?{" "}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="font-semibold text-[#274c77] hover:underline dark:text-[#a3cef1]"
              >
                Regístrate gratis
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </Modal>
  );
}
