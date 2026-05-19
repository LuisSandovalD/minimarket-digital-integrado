// ========================================
// features/product/components/ProductStatusBadge.jsx
// ========================================

export default function ProductStatusBadge({
  active = true,
}) {

  return (

    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-medium

        ${
          active
            ? `
              bg-emerald-500/15
              text-emerald-500
            `
            : `
              bg-red-500/15
              text-red-500
            `
        }
      `}
    >
      {
        active
          ? "Activo"
          : "Inactivo"
      }
    </span>

  );

}