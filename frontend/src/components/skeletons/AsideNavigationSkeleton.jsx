export default function AsideNavigationSkeleton({ isCollapsed }) {
  const skeletonSections = [1, 2];
  const skeletonItems = [1, 2, 3];

  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 animate-pulse">
      <div className="space-y-6">
        {skeletonSections.map((sectionId) => (
          <div key={sectionId} className="space-y-2">
            {!isCollapsed ? (
              <div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded mb-3 ml-2" />
            ) : (
              <div className="h-1 w-8 bg-slate-200 dark:bg-slate-700 rounded mx-auto mb-3" />
            )}
            <div className="space-y-1">
              {skeletonItems.map((itemId) => (
                <div
                  key={itemId}
                  className={`flex items-center gap-3 rounded-xl ${isCollapsed ? "justify-center p-3" : "px-4 py-3"}`}
                >
                  <div className="w-5 h-5 bg-slate-200 dark:bg-slate-700 rounded-lg flex-shrink-0" />
                  {!isCollapsed && (
                    <div
                      className="h-3.5 bg-slate-200 dark:bg-slate-700 rounded flex-1"
                      style={{
                        width: itemId === 1 ? "60%" : itemId === 2 ? "75%" : "50%",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
