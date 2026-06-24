import NotificationFilters from "../components/NotificationFilters";
import NotificationHeader from "../components/NotificationHeader";
import NotificationsTable from "../components/NotificationsTable";
import { useNotifications } from "../hooks/useNotifications";

export default function NotificationsPages() {
  const {
    currentNotifications,
    highPriorityCount,
    mediumPriorityCount,
    unreadCount,
    loading,
    searchTerm,
    setSearchTerm,
    filterPriority,
    setFilterPriority,
    currentPage,
    totalPages,
    goToPrevPage,
    goToNextPage,
    markAsRead,
    refresh,
  } = useNotifications();

  return (
    <div className="space-y-6">
      {/* HEADER: Título principal de la sección y contadores dinámicos */}
      <NotificationHeader
        totalAlerts={unreadCount}
        highPriorityCount={highPriorityCount}
        mediumPriorityCount={mediumPriorityCount}
        loading={loading}
        onRefresh={refresh}
      />

      <NotificationFilters
        search={searchTerm}
        setSearch={setSearchTerm}
        priority={filterPriority}
        setPriority={setFilterPriority}
      />
      {/* CONTENEDOR PRINCIPAL */}
      <div className="space-y-4">
        {/* CONTENIDO PRINCIPAL / TABLA */}
        <div>
          {loading && currentNotifications.length === 0 ? (
            <div className="p-12 text-center text-sm text-slate-400">
              Sincronizando estados de almacén y recalculando inventarios...
            </div>
          ) : (
            <NotificationsTable
              notifications={currentNotifications}
              page={currentPage}
              totalPages={totalPages}
              onPrev={goToPrevPage}
              onNext={goToNextPage}
              onOcultar={markAsRead}
            />
          )}
        </div>
      </div>
    </div>
  );
}
