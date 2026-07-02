import { Modal } from "@/components/overlays";
import { motion } from "framer-motion";
import RegisterHeader from "./RegisterHeader";

// Importamos el componente de las tarjetas de precios
import PricingCards from "../../../public/pricing/components/PricingCards";

export default function RegisterModal({ open, onClose }) {
  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose} size="full">
      <div className="flex h-[850px] max-h-[95vh] overflow-hidden rounded-[36px] border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950">
        {/* Contenedor Principal del Modal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-1 flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex-none border-b border-black/10 dark:border-white/10">
            <RegisterHeader onClose={onClose} />
          </div>

          {/* Contenido Principal — Renderiza PricingCards con scroll independiente */}
          <div className="flex-1 overflow-y-auto p-8 lg:p-12">
            <PricingCards />
          </div>
        </motion.div>
      </div>
    </Modal>
  );
}
