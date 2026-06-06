import { motion } from "framer-motion";

const IMAGE =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2070&auto=format&fit=crop";

export default function RegisterSidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative hidden w-[38%] shrink-0 overflow-hidden lg:block"
    >
      <motion.img
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
        src={IMAGE}
        alt="ERP Empresarial"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/70 via-[#0f172a]/40 to-[#274c77]/20" />

      <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-[#6096ba]/20 blur-3xl" />

      <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-[#274c77]/20 blur-3xl" />
    </motion.div>
  );
}
