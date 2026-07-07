import clsx from "clsx";

export default function CardHeader({
  children,
  className = "",

  // Distribución
  justify = "between",
  align = "start",

  // Espaciado
  gap = 4,

  // Mostrar borde inferior
  divider = false,

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
    <header
      className={clsx(
        "flex w-full flex-wrap",
        justifyClasses[justify],
        alignClasses[align],
        gapClasses[gap],
        divider && "border-b border-slate-200 pb-4 dark:border-white/10",
        className,
      )}
      {...props}
    >
      {children}
    </header>
  );
}
