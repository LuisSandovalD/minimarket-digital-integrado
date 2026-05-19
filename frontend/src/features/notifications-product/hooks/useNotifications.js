// ========================================
// features/notifications/hooks/useNotifications.js
// ========================================

import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getNotifications,
} from "../services/notifications.service";

export default function
useNotifications() {

  const queryClient =
    useQueryClient();

  // ========================================
  // QUERY
  // ========================================

  const {

    data = [],

    isLoading,

    error,

    refetch,

  } = useQuery({

    queryKey: [
      "notifications",
    ],

    queryFn:
      getNotifications,

    staleTime:
      1000 * 30,

    refetchOnWindowFocus:
      false,

  });

  // ========================================
  // REFRESH
  // ========================================

  const refreshNotifications =
    () => {

      queryClient.invalidateQueries({

        queryKey: [
          "notifications",
        ],

      });

    };

  // ========================================
  // MARK AS READ
  // ========================================

  const markAsRead =
    (id) => {

      queryClient.setQueryData(

        ["notifications"],

        (old = []) =>

          old.map((n) =>

            n.id === id

              ? {
                  ...n,
                  read: true,
                }

              : n

          )

      );

    };

  // ========================================
  // TOGGLE READ
  // ========================================

  const toggleRead =
    (id) => {

      queryClient.setQueryData(

        ["notifications"],

        (old = []) =>

          old.map((n) =>

            n.id === id

              ? {
                  ...n,
                  read: !n.read,
                }

              : n

          )

      );

    };

  // ========================================
  // REMOVE
  // ========================================

  const removeNotification =
    (id) => {

      queryClient.setQueryData(

        ["notifications"],

        (old = []) =>

          old.filter(
            (n) => n.id !== id
          )

      );

    };

  // ========================================
  // UNREAD COUNT
  // ========================================

  const unreadCount =
    data.filter(
      (n) => !n.read
    ).length;

  return {

    notifications: data,

    loading: isLoading,

    error,

    unreadCount,

    refetch,

    refreshNotifications,

    markAsRead,

    toggleRead,

    removeNotification,

  };

}