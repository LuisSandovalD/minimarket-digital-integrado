// ========================================
// features/notifications/components/NotificationsEmpty.jsx
// ========================================

import {
  CheckCircle2,
} from "lucide-react";

export default function NotificationsEmpty() {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        gap-3

        px-6
        py-12

        text-center
      "
    >
      {/* ICON */}
      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center

          rounded-full

          bg-emerald-500/10

          border
          border-emerald-500/20
        "
      >
        <CheckCircle2
          size={24}
          className="
            text-emerald-500
          "
        />
      </div>

      {/* TEXT */}
      <div>
        <h4
          className="
            text-sm
            font-semibold

            text-white
          "
        >
          Todo en orden
        </h4>

        <p
          className="
            mt-1

            text-xs

            text-slate-400
          "
        >
          No tienes notificaciones
          pendientes en este momento
        </p>
      </div>

      {/* DIVIDER */}
      <div
        className="
          mt-2

          w-8

          h-px

          bg-gradient-to-r
          from-transparent
          via-slate-600
          to-transparent
        "
      />

      {/* FOOTER */}
      <p
        className="
          text-[11px]

          text-slate-500

          uppercase
          tracking-wider
        "
      >
        ✓ Sistema sincronizado
      </p>
    </div>
  );
}