// ========================================
// features/users/hooks/useUsers.js
// ========================================

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  getHierarchy,
  getUsers,
  toggleUserStatus,
} from "../services/users.service";

export default function useUsers(initialFilters = {}) {
  const queryClient = useQueryClient();

  // Estado unificado para el manejo de filtros y paginación desde el servidor
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: undefined,
    branchId: undefined,
    isActive: undefined,
    sortBy: "createdAt",
    sortOrder: "desc",
    ...initialFilters,
  });

  // Estado para controlar qué nodos del organigrama/jerarquía están expandidos
  const [expandedUsers, setExpandedUsers] = useState({});

  // ========================================
  // INVALIDATE CACHE
  // ========================================
  const invalidateCache = async () => {
    await queryClient.invalidateQueries({ queryKey: ["users"] });
    await queryClient.invalidateQueries({ queryKey: ["users-hierarchy"] });
  };

  // ========================================
  // QUERY: LISTADO FILTRADO Y PAGINADO
  // ========================================
  const usersQuery = useQuery({
    queryKey: ["users", filters],
    queryFn: async () => {
      // 🌟 SANITIZACIÓN: Aseguramos que isActive sea Boolean estricto o undefined
      let cleanedActive = filters.isActive;
      if (filters.isActive === "true" || filters.isActive === true)
        cleanedActive = true;
      if (filters.isActive === "false" || filters.isActive === false)
        cleanedActive = false;
      if (filters.isActive === "" || filters.isActive === "all")
        cleanedActive = undefined;

      const response = await getUsers({
        ...filters,
        isActive: cleanedActive,
      });

      return {
        data: Array.isArray(response?.data) ? response.data : [],
        pagination: {
          currentPage: response?.pagination?.currentPage || filters.page,
          totalPages: response?.pagination?.totalPages || 1,
          hasPrevPage: response?.pagination?.hasPrevPage || filters.page > 1,
          hasNextPage: response?.pagination?.hasNextPage || false,
          ...response?.pagination,
        },
      };
    },
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  });

  // ========================================
  // QUERY: ESTRUCTURA JERÁRQUICA (ÁRBOL)
  // ========================================
  const hierarchyQuery = useQuery({
    queryKey: ["users-hierarchy"],
    queryFn: async () => {
      const response = await getHierarchy();
      return Array.isArray(response?.data) ? response.data : response || [];
    },
    refetchOnWindowFocus: false,
  });

  // ========================================
  // MUTACIÓN: CAMBIAR ESTADO (ACTIVO/INACTIVO)
  // ========================================
  const toggleStatusMutation = useMutation({
    mutationFn: toggleUserStatus,
    onSuccess: invalidateCache,
    onError: (err) => console.error("TOGGLE USER STATUS ERROR:", err),
  });

  // ========================================
  // MANEJADOR DE EXPANSIÓN (ORGANIGRAMA)
  // ========================================
  const toggleExpand = (userId) => {
    setExpandedUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  return {
    // DATA & PAGINATION (Lista aplanada con filtros)
    users: usersQuery.data?.data || [],
    pagination: usersQuery.data?.pagination || {},
    loading: usersQuery.isLoading,
    error: usersQuery.error ? usersQuery.error.message : "",

    // HIERARCHY DATA (Estructura de árbol para el organigrama)
    hierarchy: hierarchyQuery.data || [],
    loadingHierarchy: hierarchyQuery.isLoading,

    // FILTERS STATE
    filters,
    setFilters,
    expandedUsers,

    // METHODS
    fetchUsers: usersQuery.refetch,
    fetchHierarchy: hierarchyQuery.refetch,
    toggleExpand,
    toggleUserStatus: async (id) => toggleStatusMutation.mutateAsync(id),

    // MUTATION LOADING STATES
    togglingStatus: toggleStatusMutation.isPending,
  };
}
