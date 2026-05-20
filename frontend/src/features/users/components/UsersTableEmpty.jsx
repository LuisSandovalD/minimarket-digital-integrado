// ========================================
// components/users/UsersEmpty.jsx
// ========================================

import { Users } from "lucide-react";

export default function UsersEmpty() {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-dashed
        border-white/10
        bg-white/[0.04]
        px-6
        py-20
        text-center
        backdrop-blur-2xl
      "
    >
      {/* Glow */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-br
          from-white/[0.04]
          via-transparent
          to-white/[0.02]
        "
      />

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          flex
          flex-col
          items-center
        "
      >
        {/* ICON */}

        <div
          className="
            mb-5
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            border
            border-white/10
            bg-white/[0.05]
            text-white/60
            shadow-[0_4px_20px_rgba(255,255,255,0.05)]
          "
        >
          <Users size={28} />
        </div>

        {/* TITLE */}

        <h3
          className="
            text-base
            font-semibold
            tracking-tight
            text-slate-800

            dark:text-white
          "
        >
          No hay usuarios
        </h3>

        {/* DESCRIPTION */}

        <p
          className="
            mt-2
            max-w-sm
            text-sm
            leading-relaxed
            text-slate-500
          "
        >
          Actualmente no existen usuarios registrados en el sistema.
        </p>
      </div>
    </div>
  );
}
