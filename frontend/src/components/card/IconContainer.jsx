import clsx from "clsx";

export default function IconContainer({
  children,
  className = "",

  // Tamaño
  size = "md",

  // Estilo
  variant = "default",

  // Forma
  rounded = "xl",

  // Estados
  bordered = false,
  shadow = false,

  ...props
}) {
  const sizes = {
    xs: "h-8 w-8 [&>svg]:h-4 [&>svg]:w-4",
    sm: "h-10 w-10 [&>svg]:h-5 [&>svg]:w-5",
    md: "h-12 w-12 [&>svg]:h-6 [&>svg]:w-6",
    lg: "h-14 w-14 [&>svg]:h-7 [&>svg]:w-7",
    xl: "h-16 w-16 [&>svg]:h-8 [&>svg]:w-8",
  };

  const variants = {
    default: "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200",

    primary:
      "bg-[#274c77]/10 text-[#274c77] dark:bg-[#274c77]/20 dark:text-[#a3cef1]",

    success:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",

    warning:
      "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",

    danger: "bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",

    info: "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  };

  const radius = {
    sm: "rounded-md",
    md: "rounded-lg",
    lg: "rounded-xl",
    xl: "rounded-2xl",
    full: "rounded-full",
  };

  return (
    <div
      className={clsx(
        "inline-flex shrink-0 items-center justify-center transition-all duration-300",

        sizes[size],

        variants[variant],

        radius[rounded],

        bordered && "border border-slate-200 dark:border-white/10",

        shadow && "shadow-sm",

        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
