export default function AsideHeaderSkeleton({ isCollapsed }) {
  const logoSize = isCollapsed
    ? "w-11 h-11 rounded-xl"
    : "w-12 h-12 rounded-xl";
  const statusSize = isCollapsed ? "w-3 h-3" : "w-3.5 h-3.5";

  return (
    <div className="relative border-b border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 overflow-hidden">
      <div
        className={`relative flex items-center justify-start text-left gap-2.5 animate-pulse ${isCollapsed ? "justify-center px-2 py-5" : "px-5 py-6"}`}
      >
        <div className="relative flex-shrink-0">
          <div className={`${logoSize} bg-slate-200 dark:bg-slate-700`} />
          <div
            className={`absolute -bottom-0.5 -right-0.5 rounded-full border border-white dark:border-slate-950 bg-slate-300 dark:bg-slate-600 ${statusSize}`}
          />
        </div>
        {!isCollapsed && (
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="h-3.5 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-3 w-32 bg-slate-200/70 dark:bg-slate-700/70 rounded" />
            <div className="flex items-center justify-start gap-1 mt-1.5">
              <div className="w-3.5 h-3.5 bg-slate-200 dark:bg-slate-700 rounded-sm" />
              <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded-sm" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
