// ========================================
// components/users/UserStatusBadge.jsx
// ========================================

export default function UserStatusBadge({
  active,
}) {

  return (

    <div
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        px-3
        py-1.5
        text-xs
        font-semibold

        ${
          active
            ? `
              bg-emerald-500/10
              text-emerald-400
            `
            : `
              bg-rose-500/10
              text-rose-400
            `
        }
      `}
    >

      <div
        className={`
          h-2
          w-2
          rounded-full

          ${
            active
              ? "bg-emerald-400"
              : "bg-rose-400"
          }
        `}
      />

      {active
        ? "Activo"
        : "Inactivo"}

    </div>

  );

}