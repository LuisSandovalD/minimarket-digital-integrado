import clsx from "clsx";

export default function Badge({
  children,
  icon: Icon,

  className = "",

  variant = "default",
  appearance = "soft",
  size = "md",
  rounded = "full",

  dot = false,

  ...props
}) {
  const variants = {
    default: {
      soft: "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200",
      solid: "bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900",
      outline:
        "border border-slate-300 text-slate-700 dark:border-white/15 dark:text-slate-200",
    },

    primary: {
      soft: "bg-[#274c77]/10 text-[#274c77] dark:bg-[#274c77]/20 dark:text-[#a3cef1]",
      solid: "bg-[#274c77] text-white",
      outline: "border border-[#274c77]/30 text-[#274c77] dark:text-[#a3cef1]",
    },

    success: {
      soft: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
      solid: "bg-emerald-600 text-white",
      outline:
        "border border-emerald-300 text-emerald-700 dark:text-emerald-400",
    },

    warning: {
      soft: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
      solid: "bg-amber-500 text-white",
      outline: "border border-amber-300 text-amber-700 dark:text-amber-400",
    },

    danger: {
      soft: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
      solid: "bg-rose-600 text-white",
      outline: "border border-rose-300 text-rose-700 dark:text-rose-400",
    },

    info: {
      soft: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
      solid: "bg-blue-600 text-white",
      outline: "border border-blue-300 text-blue-700 dark:text-blue-400",
    },
  };

  const sizes = {
    xs: "px-2 py-0.5 text-[10px]",
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-sm",
    xl: "px-5 py-2 text-base",
  };

  const radius = {
    sm: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 font-semibold whitespace-nowrap transition-colors duration-200",

        sizes[size],

        radius[rounded],

        variants[variant]?.[appearance],

        className,
      )}
      {...props}
    >
      {dot && <span className="h-2 w-2 rounded-full bg-current opacity-80" />}

      {Icon && <Icon className="h-4 w-4" strokeWidth={2} />}

      {children}
    </span>
  );
}
