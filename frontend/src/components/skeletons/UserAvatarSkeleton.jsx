export default function UserAvatarSkeleton({
  size = "md",
  showStatus = true,
  showInfo = true,
  showEmail = true,
  className = "",
}) {
  const sizes = {
    sm: { avatar: "w-9 h-9 rounded-xl", status: "w-2.5 h-2.5" },
    md: { avatar: "w-11 h-11 rounded-xl", status: "w-3 h-3" },
    lg: { avatar: "w-13 h-13 rounded-2xl", status: "w-3.5 h-3.5" },
  };
  const currentSize = sizes[size] || sizes.md;

  return (
    <div
      className={`flex items-center justify-start text-left gap-2.5 animate-pulse ${className}`}
    >
      <div className="relative flex-shrink-0">
        <div
          className={`${currentSize.avatar} bg-slate-200 dark:bg-slate-700`}
        />
        {showStatus && (
          <div
            className={`absolute -bottom-0.5 -right-0.5 rounded-full border border-white dark:border-slate-950 bg-slate-300 dark:bg-slate-600 ${currentSize.status}`}
          />
        )}
      </div>
      {showInfo && (
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="h-3.5 w-28 bg-slate-200 dark:bg-slate-700 rounded" />
          {showEmail && (
            <div className="h-3 w-36 bg-slate-200/70 dark:bg-slate-700/70 rounded" />
          )}
          <div className="flex items-center justify-start gap-1 mt-1.5">
            <div className="w-3.5 h-3.5 bg-slate-200 dark:bg-slate-700 rounded-sm" />
            <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded-sm" />
          </div>
        </div>
      )}
    </div>
  );
}
