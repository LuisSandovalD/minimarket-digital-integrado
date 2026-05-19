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

    // Maneja tanto response.data.data como response.data
    const data =
      response.data?.data ||
      response.data ||
      [];

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(
      "Error fetching notifications:",
      error
    );
    throw error;
  }
};

// ========================================
// MARK AS READ
// ========================================

export const markNotificationAsRead = async (
  id
) => {
  try {
    const response = await api.put(
      `${BASE_URL}/${id}/read`,
      {}
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error marking notification as read:",
      error
    );
    throw error;
  }
};

// ========================================
// DELETE NOTIFICATION
// ========================================

export const deleteNotification = async (id) => {
  try {
    const response = await api.delete(
      `${BASE_URL}/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting notification:",
      error
    );
    throw error;
  }
};

// ========================================
// CLEAR ALL NOTIFICATIONS
// ========================================

export const clearAllNotifications = async () => {
  try {
    const response = await api.delete(BASE_URL);
    return response.data;
  } catch (error) {
    console.error(
      "Error clearing notifications:",
      error
    );
    throw error;
  }
};