export default function AsideSection({ children, bordered = false }) {
  return (
    <div
      className={`
        space-y-1
        ${bordered ? "mt-8 pt-4 border-t border-slate-200 dark:border-slate-800" : ""}
      `}
    >
      {children}
    </div>
  );
}
