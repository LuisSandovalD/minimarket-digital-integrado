// ========================================
// components/BranchStatusBadge.jsx
// ========================================

export default function BranchStatusBadge({
  active,
}) {

  return (

    <span
      className={`
        px-3
        py-1
        rounded-full
        text-xs
        font-medium

        ${
          active
            ? `
              bg-emerald-100
              text-emerald-700
            `
            : `
              bg-rose-100
              text-rose-700
            `
        }
      `}
    >

      {
        active
          ? "Activa"
          : "Inactiva"
      }

    </span>

  );

}