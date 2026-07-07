import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

export default function Modal({
  open,
  onClose,
  children,
  size = "md",
  closeOnOutside = true,
  blur = true,
}) {
  const sizes = {
    sm: "md:max-w-md",
    md: "md:max-w-xl",
    lg: "md:max-w-3xl",
    xl: "md:max-w-5xl",
    full: "md:max-w-7xl",
  };

  const handleOutside = (e) => {
    if (e.target === e.currentTarget && closeOnOutside) {
      onClose?.();
    }
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          onClick={handleOutside}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className={`fixed inset-0 z-[999] flex items-center justify-center p-4 bg-[#0b1120]/60 ${blur ? "backdrop-blur-sm" : ""}`}
        >
          {/* CONTAINER DEL MODAL */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`relative flex flex-col w-full max-h-[90vh] overflow-y-auto rounded-[24px] border border-[#d7e0e7]/80 bg-white shadow-2xl dark:border-[#365d86]/20 dark:bg-[#0f172a] ${sizes[size]}`}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
