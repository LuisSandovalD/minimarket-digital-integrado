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
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
    full: "max-w-7xl",
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
          transition={{ duration: 0.25 }}
          className={`
            fixed
            inset-0
            z-[999]
            flex
            items-center
            justify-center
            overflow-hidden
            bg-[#0b1120]/60
            p-4
            md:p-6
            ${blur ? "backdrop-blur-md" : ""}
          `}
        >
          {/* BACKDROP EFFECT */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-[#6096ba]/20 blur-3xl" />
            <div className="absolute bottom-[-120px] right-[-120px] h-96 w-96 rounded-full bg-[#274c77]/20 blur-3xl" />
          </div>

          {/* MODAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 50 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`
              relative
              z-10
              w-full
              ${sizes[size]}
              overflow-hidden
              rounded-[36px]
              border
              border-[#d7e0e7]/80
              bg-gradient-to-br
              from-white/95
              via-[#f8fbfd]/95
              to-[#eef4f8]/95
              shadow-[0_30px_100px_rgba(15,23,42,0.35)]
              backdrop-blur-2xl
              dark:border-[#365d86]/20
              dark:from-[#0f172a]/95
              dark:via-[#13263b]/95
              dark:to-[#0f172a]/95
              dark:shadow-[0_30px_100px_rgba(0,0,0,0.55)]
            `}
          >
            {/* SHINE EFFECT */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />

            {/* BORDER LIGHT */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1]" />

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
