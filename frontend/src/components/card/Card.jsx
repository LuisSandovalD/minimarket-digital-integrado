import clsx from "clsx";

export default function Card({
  children,
  className = "",

  // Variantes
  variant = "default",

  // Estados
  hover = true,
  bordered = true,
  shadow = "sm",

  // Layout
  padding = "md",
  rounded = "2xl",

  // HTML
  as: Component = "div",
  ...props
}) {
  const variants = {
    default: "bg-white dark:bg-[#0f172a] border-slate-200 dark:border-white/10",

    glass:
      "bg-white/70 backdrop-blur-xl dark:bg-white/5 border-slate-200/60 dark:border-white/10",

    muted:
      "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-white/10",

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

        hover && [
          "hover:-translate-y-1",
          "hover:shadow-xl",
          "transform-gpu",
          "will-change-transform",
        ],

        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
