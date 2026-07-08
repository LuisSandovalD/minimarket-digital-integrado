// ========================================
// components/card/CardDescription.jsx
// ========================================

import clsx from "clsx";

export default function CardDescription({
  children,
  className = "",
  size = "sm",
  color = "default",
  align = "left",
  leading = "relaxed",
  lines,
  ...props
}) {
  const sizes = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const colors = {
    default: "text-slate-500 dark:text-slate-400",
    muted: "text-slate-400 dark:text-slate-500",
    primary: "text-[#274c77] dark:text-[#a3cef1]",
    success: "text-emerald-600 dark:text-emerald-400",
    warning: "text-amber-600 dark:text-amber-400",
    danger: "text-rose-600 dark:text-rose-400",
  };

  const aligns = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const leadings = {
    none: "leading-none",
    tight: "leading-tight",
    normal: "leading-normal",
    relaxed: "leading-relaxed",
    loose: "leading-loose",
  };

  const clamp = {
    1: "line-clamp-1",
    2: "line-clamp-2",
    3: "line-clamp-3",
    4: "line-clamp-4",
    5: "line-clamp-5",
    6: "line-clamp-6",
  };

  return (
    <p
      className={clsx(
        sizes[size],
        colors[color],
        aligns[align],
        leadings[leading],
        lines && clamp[lines],
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
