import clsx from "clsx";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";

export default function Trend({
  value = 0,
  label,
  showIcon = true,
  showSign = true,

  size = "md",
  variant = "auto",

  className = "",
}) {
  const isPositive = value > 0;
  const isNegative = value < 0;
  const isNeutral = value === 0;

  const colors = {
    success: "text-emerald-600 dark:text-emerald-400",
    danger: "text-rose-600 dark:text-rose-400",
    neutral: "text-slate-500 dark:text-slate-400",
  };

  const sizes = {
    xs: {
      text: "text-xs",
      icon: 14,
    },
    sm: {
      text: "text-sm",
      icon: 16,
    },
    md: {
      text: "text-base",
      icon: 18,
    },
    lg: {
      text: "text-lg",
      icon: 20,
    },
  };

  const currentSize = sizes[size] || sizes.md;

  let colorClass = colors.neutral;

  if (variant === "auto") {
    if (isPositive) colorClass = colors.success;
    else if (isNegative) colorClass = colors.danger;
  } else {
    colorClass = colors[variant] || colors.neutral;
  }

  const Icon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;

  return (
    <div className={clsx("inline-flex items-center gap-2 font-semibold", currentSize.text, colorClass, className)}>
      {showIcon && <Icon size={currentSize.icon} strokeWidth={2.2} />}

      <span>
        {showSign && value > 0 && "+"}
        {value}%
      </span>

      {label && <span className="font-normal text-slate-500 dark:text-slate-400">{label}</span>}
    </div>
  );
}
