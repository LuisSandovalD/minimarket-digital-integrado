// ========================================
// components/card/CardTitle.jsx
// ========================================

import clsx from "clsx";

export default function CardTitle({
  children,
  className = "",
  size = "sm", // Reducido por defecto para mejor balance en las tarjetas
  weight = "semibold", // Semibold suele verse más limpio que bold puro en títulos modernos
  align = "left",
  lines,
  ...props
}) {
  // Escala de tamaños de fuente optimizada (más compacta y refinada)
  const sizes = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
  };

  const weights = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    black: "font-black",
  };

  const aligns = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const clamp = {
    1: "line-clamp-1",
    2: "line-clamp-2",
    3: "line-clamp-3",
    4: "line-clamp-4",
  };

  return (
    <h3
      className={clsx(
        "tracking-tight text-slate-800 dark:text-slate-100", // Tonos ligeramente suavizados
        sizes[size],
        weights[weight],
        aligns[align],
        lines && clamp[lines],
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
}
