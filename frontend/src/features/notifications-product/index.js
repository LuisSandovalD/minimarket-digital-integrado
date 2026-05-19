// ========================================
// features/notifications/index.js
// ========================================

export { default as NotificationsModal } from "./components/NotificationsModal";

export { default as NotificationItem } from "./components/NotificationItem";

export { default as NotificationsEmpty } from "./components/NotificationsEmpty";

export { default as useNotifications } from "./hooks/useNotifications";

export {
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
  clearAllNotifications,
} from "./services/notifications.service";