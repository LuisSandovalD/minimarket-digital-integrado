// ========================================
// features/notifications/hooks/useNotifications.js
// ========================================

import { useCallback, useEffect, useState } from "react";
import { getNotifications } from "../services/notification.service";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados del pipeline de filtrado y paginación trasladados aquí
  const [filterPriority, setFilterPriority] = useState("all"); // Actúa como filtro por tipo de enum
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Obtener las alertas desde el único endpoint real (GET /api/v1/notifications)
  const fetchAlerts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      setError(err.message || "Error al obtener las alertas de inventario");
    } finally {
      setLoading(false);
    }
  }, []);

  // Ocultar una notificación individual de forma local en memoria
  const markAsRead = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Limpiar todas las notificaciones de la pantalla de forma local
  const clearAll = () => {
    setNotifications([]);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAlerts();
    // Auto-refresco de stock crítico cada 3 minutos desde el backend
    const interval = setInterval(fetchAlerts, 3 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchAlerts]);

  // ========================================================
  // PIPELINE DE FILTRADO Y COMPUTACIÓN DE MÉTRICAS (EN VIVO)
  // ========================================================

  const filteredNotifications = notifications.filter((notif) => {
    // CAMBIO CLAVE: Comparamos contra notif.type (el valor enviado por el select)
    const matchesPriority = filterPriority === "all" || notif.type === filterPriority;

    const matchesSearch =
      notif.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.product?.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.branch?.name?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesPriority && matchesSearch;
  });

  // Mapeo inteligente de contadores basado en la naturaleza del Enum
  const highPriorityCount = notifications.filter(
    (n) => n.type === "LOW_STOCK" || n.type === "INVENTORY_MISMATCH" || n.type === "PAYMENT_OVERDUE",
  ).length;

  const mediumPriorityCount = notifications.filter(
    (n) =>
      n.type === "EXPIRING_PRODUCT" ||
      n.type === "PURCHASE_READY" ||
      n.type === "SYSTEM_ALERT" ||
      n.type === "USER_ALERT",
  ).length;

  // Segmentación para la paginación de la tabla
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotifications = filteredNotifications.slice(indexOfFirstItem, indexOfLastItem);

  return {
    // Datos procesados
    currentNotifications,
    highPriorityCount,
    mediumPriorityCount,
    unreadCount: notifications.length,
    loading,
    error,

    // Controles de Filtros y Búsqueda
    searchTerm,
    setSearchTerm: (val) => {
      setSearchTerm(val);
      setCurrentPage(1); // Reset de página automático al buscar
    },
    filterPriority,
    setFilterPriority: (val) => {
      setFilterPriority(val);
      setCurrentPage(1); // Reset de página automático al cambiar prioridad o tipo
    },

    // Controles de Paginación
    currentPage,
    totalPages,
    goToPrevPage: () => setCurrentPage((prev) => Math.max(prev - 1, 1)),
    goToNextPage: () => setCurrentPage((prev) => Math.min(prev + 1, totalPages)),

    // Acciones globales
    refresh: fetchAlerts,
    markAsRead,
    clearAll,
  };
}
