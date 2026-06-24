// ========================================
// components/auth/LoginModal.jsx
// ========================================

import { Modal } from "@/components/overlays/";
import { motion } from "framer-motion";
import LoginBadge from "./LoginBadge";
import LoginForm from "./LoginForm";
import LoginHeader from "./LoginHeader";

const OFFICE_IMAGE =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop";

/**
 * Modal principal de Autenticación Corporativa.
 * Estructura asimétrica de doble panel con animaciones fluidas basadas en framer-motion.
 */
export default function LoginModal({ open, onClose }) {
  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose} size="full">
      <div className="relative">
        <div className="flex h-[750px] overflow-hidden rounded-[36px] border border-black/10 dark:border-white/10">
          {/* ─── PANEL IZQUIERDO: CONTENIDO VISUAL CORPORATIVO ─── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden w-[52%] shrink-0 overflow-hidden lg:block"
          >
            {/* Imagen de fondo con efecto sutil de escala al entrar */}
            <motion.img
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
              src={OFFICE_IMAGE}
              alt="Oficina empresarial"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Overlay gradiente y etiqueta flotante */}
            <div className="relative flex h-full flex-col justify-between p-10 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent">
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 backdrop-blur-xl">
                  <div className="h-2 w-2 rounded-full bg-[#a3cef1] animate-pulse" />
                  <span className="text-sm font-semibold text-white tracking-wide">
                    ERP Empresarial
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ─── PANEL DERECHO: INTERFAZ DINÁMICA DE FORMULARIOS ─── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-1 flex-col overflow-y-auto border-l border-black/10 bg-white dark:border-white/10 dark:bg-[#0f172a]"
          >
            {/* Header de navegación / Control de cierre fijo */}
            <div className="sticky top-0 z-10 border-b border-black/10 bg-white dark:border-white/10 dark:bg-[#0f172a]">
              <LoginHeader onClose={onClose} />
            </div>

            {/* Contenedor central inyector del Login Form */}
            <div className="flex flex-1 flex-col justify-center max-w-md mx-auto w-full">
              <LoginBadge />
              <div className="mt-8">
                {/* Renderiza el formulario con la inyección automática de LoginOptions */}
                <LoginForm onClose={onClose} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Modal>
  );
}
