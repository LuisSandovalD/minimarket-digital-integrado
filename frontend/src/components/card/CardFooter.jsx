// ========================================
// components/card/CardFooter.jsx
// ========================================

import clsx from "clsx";

export default function CardFooter({
  children,
  className = "",
  justify = "between",
  align = "center",
  wrap = true,
  gap = 3,
  divider = true,
  ...props
}) {
  const justifyClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  };

  const alignClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  };

  const gapClasses = {
    0: "gap-0",
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    5: "gap-5",
    6: "gap-6",
  };

  return (
    <footer
      className={clsx(
        "mt-auto flex w-full",
        wrap ? "flex-wrap" : "flex-nowrap",
        justifyClasses[justify],
        alignClasses[align],
        gapClasses[gap],
        divider && "border-t border-slate-100 pt-4 dark:border-slate-800/60",
        className,
      )}
      {...props}
    >
      {children}
    </footer>
  );
}
