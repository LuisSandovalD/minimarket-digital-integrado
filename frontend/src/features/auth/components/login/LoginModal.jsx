import { Modal } from "@/components/overlays";
import { motion } from "framer-motion";
import LoginBadge from "./LoginBadge";
import LoginForm from "./LoginForm";
import LoginHeader from "./LoginHeader";

const OFFICE_IMAGE =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop";

const STATS = [
  { value: "+500", label: "Empresas" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Soporte" },
];

export default function LoginModal({ open, onClose }) {
  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose} size="full">
      <div className="relative">
        {/* Floating header */}
        <div className="absolute inset-x-0 top-0 z-50">
          <div className="border-b border-white/10 bg-white/5 backdrop-blur-xl dark:bg-black/10">
            <LoginHeader onClose={onClose} />
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[750px] overflow-hidden rounded-[36px] border border-white/10 bg-white/60 pt-24 backdrop-blur-3xl dark:bg-[#020617]/90">
          {/* Left panel — wider for more image presence */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden w-[52%] shrink-0 overflow-hidden lg:block"
          >
            {/* Image with subtle zoom-in */}
            <motion.img
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
              src={OFFICE_IMAGE}
              alt="Oficina empresarial"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Lighter overlay so the image breathes */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/70 via-[#0f172a]/40 to-[#274c77]/20" />

            {/* Subtle vignette on edges */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(2,6,23,0.55)_100%)]" />

            <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-[#6096ba]/20 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-[#274c77]/30 blur-3xl" />

            {/* Content */}
            <div className="relative flex h-full flex-col justify-between p-10">
              {/* Brand badge */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 shadow-lg backdrop-blur-xl">
                  <div className="h-2 w-2 rounded-full bg-[#a3cef1]" />
                  <span className="text-sm font-semibold text-white">
                    ERP Empresarial
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-1 flex-col overflow-y-auto border-l border-white/10 bg-white/70 backdrop-blur-2xl dark:bg-[#0f172a]/80"
          >
            <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-[#6096ba]/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#274c77]/10 blur-3xl" />

            <div className="relative flex flex-1 flex-col justify-center px-10 py-8">
              <LoginBadge />
              <div className="mt-8">
                <LoginForm onClose={onClose} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Modal>
  );
}
