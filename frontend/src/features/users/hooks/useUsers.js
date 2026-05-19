// ========================================
// hooks/useUsers.js
// ========================================

import {
  useEffect,
  useState,
} from "react";

import {

  getUsers,

  getRootUsers,

  getUsersByManager,

  toggleUserStatus,

} from "../services/users.service";

// ========================================
// HOOK
// ========================================

export default function useUsers() {

  // ========================================
  // STATE
  // ========================================

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [expandedUsers,
    setExpandedUsers] =
    useState({});

  // ========================================
  // FETCH ALL USERS
  // ========================================

  const fetchUsers =
    async () => {

      try {

        setLoading(true);

        setError("");

        const response =
          await getUsers();

        setUsers(
          response.data || []
        );

      } catch (error) {

        console.error(error);

        setError(
          error.message ||
          "Error al obtener usuarios"
        );

      } finally {

        setLoading(false);

      }

    };

  // ========================================
  // FETCH ROOT USERS
  // ========================================

  const fetchRootUsers =
    async () => {

      try {

        setLoading(true);

        setError("");

        const response =
          await getRootUsers();

        setUsers(
          response.data || []
        );

      } catch (error) {

        console.error(error);

        setError(
          error.message ||
          "Error al obtener jerarquía"
        );

      } finally {

        setLoading(false);

      }

    };

  // ========================================
  // LOAD SUBORDINATES
  // ========================================

  const loadSubordinates =
    async (managerId) => {

      try {

        const response =
          await getUsersByManager(
            managerId
          );

        const subordinates =
          response.data || [];

        setUsers((prev) =>

          prev.map((user) =>

            user.id === managerId

              ? {
                  ...user,
                  subordinates,
                }

              : user

          )

        );

        setExpandedUsers(
          (prev) => ({

            ...prev,

            [managerId]:
              true,

          })
        );

      } catch (error) {

        console.error(error);

      }

    };

  // ========================================
  // TOGGLE EXPAND
  // ========================================

  const toggleExpand =
    async (user) => {

      const isExpanded =
        expandedUsers[user.id];

      // ====================================
      // COLLAPSE
      // ====================================

      if (isExpanded) {

        setExpandedUsers(
          (prev) => ({

            ...prev,

            [user.id]:
              false,

          })
        );

        return;

      }

      // ====================================
      // ALREADY LOADED
      // ====================================

      if (
        user.subordinates &&
        user.subordinates.length > 0
      ) {

        setExpandedUsers(
          (prev) => ({

            ...prev,

            [user.id]:
              true,

          })
        );

        return;

      }

      // ====================================
      // FETCH FROM API
      // ====================================

      await loadSubordinates(
        user.id
      );

    };

  // ========================================
  // ADD USER
  // ========================================

  const addUser = (
    newUser
  ) => {

    // ====================================
    // USER WITH MANAGER
    // ====================================

    if (newUser.managerId) {

      setUsers((prev) =>

        prev.map((user) =>

          user.id ===
          newUser.managerId

            ? {

                ...user,

                subordinates: [

                  ...(user.subordinates || []),

                  newUser,

                ],

              }

            : user

        )

      );

      return;

    }

    // ====================================
    // ROOT USER
    // ====================================

    setUsers((prev) => [

      newUser,

      ...prev,

    ]);

  };

  // ========================================
  // UPDATE USER
  // ========================================

  const updateUserLocal =
    (updatedUser) => {

      const updateRecursive =
        (items) => {

          return items.map(
            (user) => {

              if (
                user.id ===
                updatedUser.id
              ) {

                return {

                  ...user,

                  ...updatedUser,

                };

              }

              if (
                user.subordinates
              ) {

                return {

                  ...user,

                  subordinates:
                    updateRecursive(
                      user.subordinates
                    ),

                };

              }

              return user;

            }
          );

        };

      setUsers((prev) =>

        updateRecursive(prev)

      );

    };

  // ========================================
  // REMOVE USER
  // ========================================

  const removeUserLocal =
    (userId) => {

      const removeRecursive =
        (items) => {

          return items

            .filter(
              (user) =>
                user.id !==
                userId
            )

            .map((user) => ({

              ...user,

              subordinates:
                user.subordinates

                  ? removeRecursive(
                      user.subordinates
                    )

                  : [],

            }));

        };

      setUsers((prev) =>

        removeRecursive(prev)

      );

    };

  // ========================================
  // TOGGLE STATUS
  // ========================================

  const handleToggleStatus =
    async (userId) => {

      try {

        const response =
          await toggleUserStatus(
            userId
          );

        updateUserLocal(
          response.data
        );

      } catch (error) {

        console.error(error);

      }

    };

  // ========================================
  // INITIAL LOAD
  // ========================================

  useEffect(() => {

    fetchRootUsers();

  }, []);

  // ========================================
  // RETURN
  // ========================================

  return {

    users,

    loading,

    error,

    expandedUsers,

    fetchUsers,

    fetchRootUsers,

    loadSubordinates,

    toggleExpand,

    addUser,

    updateUserLocal,

    removeUserLocal,

    toggleUserStatus:
      handleToggleStatus,

  };

}