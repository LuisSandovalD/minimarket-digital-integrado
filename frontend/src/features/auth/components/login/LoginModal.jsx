import { Modal } from "@/components/modals";

import LoginHeader from "./LoginHeader";

import LoginBadge from "./LoginBadge";

import LoginForm from "./LoginForm";

export default function LoginModal({
  open,

  onClose,
}) {
  // ======================================
  // HIDE MODAL
  // ======================================

  if (!open) {
    return null;
  }

  // ======================================
  // RENDER
  // ======================================

  return (
    <Modal open={open} onClose={onClose} size="md">
      {/* ======================================
          BACKGROUND EFFECTS
      ====================================== */}

      <div
        className="
          pointer-events-none

          absolute
          left-0
          top-0

          h-72
          w-72

          rounded-full

          bg-[#6096ba]/10

          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none

          absolute
          bottom-0
          right-0

          h-72
          w-72

          rounded-full

          bg-[#274c77]/10

          blur-3xl
        "
      />

      {/* ======================================
          HEADER
      ====================================== */}

      <LoginHeader onClose={onClose} />

      {/* ======================================
          CONTENT
      ====================================== */}

      <div
        className="
          relative

          px-8
          py-7
        "
      >
        {/* BADGE */}

        <LoginBadge />

        {/* FORM */}

        <LoginForm onClose={onClose} />
      </div>
    </Modal>
  );
}
