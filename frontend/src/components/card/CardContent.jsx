// ========================================
// components/card/CardContent.jsx
// ========================================

import clsx from "clsx";

export default function CardContent({
  children,
  className = "",
  gap = 4,
  grow = true,
  centered = false,
  ...props
}) {
  const gapClasses = {
    0: "gap-0",
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    5: "gap-5",
    6: "gap-6",
    8: "gap-8",
  };

  return (
    <div
      className={clsx(
        "flex w-full flex-col",
        gapClasses[gap],
        grow && "flex-1",
        centered && "items-center justify-center text-center",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
