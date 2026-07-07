import clsx from "clsx";

export default function CardTitle({
  children,
  className = "",

  // Tamaños
  size = "md",

  // Peso
  weight = "bold",

  // Alineación
  align = "left",

  // Número de líneas antes de truncar
  lines,

  ...props
}) {
  const sizes = {
    xs: "text-sm",
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
    xl: "text-2xl",
    "2xl": "text-3xl",
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
        "tracking-tight text-slate-900 dark:text-white",
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
