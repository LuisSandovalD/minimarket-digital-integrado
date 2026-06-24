// ========================================
// features/notifications/services/notifications.service.js
// ========================================

import api from "../../../api/axios";

const BASE_URL = "/notifications";

// ========================================
// GET ALL NOTIFICATIONS
// ========================================
export const getNotifications = async () => {
  try {
    const response = await api.get(BASE_URL);
    const data = response.data?.data || response.data || [];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};
