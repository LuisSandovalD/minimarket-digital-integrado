// ========================================
// components/card/Card.jsx
// ========================================

import clsx from "clsx";

export default function Card({
  children,
  className = "",
  variant = "default",
  hover = true,
  bordered = true,
  shadow = "sm",
  padding = "md",
  rounded = "xl", // Sincronizado por defecto con el key "xl"
  as: Component = "div",
  ...props
}) {
  const variants = {
    default: "bg-white dark:bg-[#0f172a] border-slate-100 dark:border-slate-800/60",
    glass: "bg-white/70 backdrop-blur-xl dark:bg-slate-900/40 border-slate-100/80 dark:border-slate-800/50",
    muted: "bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800/60",
    transparent: "bg-transparent border-transparent",
  };

  const shadows = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-xl",
    xl: "shadow-2xl",
  };

  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const radius = {
    none: "",
    lg: "rounded-xl",
    xl: "rounded-2xl",
    "2xl": "rounded-3xl",
    full: "rounded-full",
  };

  return (
    <Component
      className={clsx(
        "relative overflow-hidden transition-all duration-300",
        bordered && "border",
        variants[variant],
        shadows[shadow],
        paddings[padding],
        radius[rounded],
        hover && "hover:-translate-y-1 hover:shadow-xl transform-gpu will-change-transform",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
