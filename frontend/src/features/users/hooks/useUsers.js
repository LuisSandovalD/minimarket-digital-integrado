// ============================================================================
// hooks/useUsers.js
// CORREGIDO: Adaptado para alimentar la tabla con la jerarquía estructurada
// ============================================================================

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getHierarchy, getUsers, toggleUserStatus } from "../services/users.service";

export default function useUsers(initialFilters = {}) {
  const queryClient = useQueryClient();

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

  const invalidateCache = async () => {
    await queryClient.invalidateQueries({ queryKey: ["users"] });
    await queryClient.invalidateQueries({ queryKey: ["users-hierarchy"] });
  };

  // 1. Consulta para la lista plana (Útil para buscadores, selectores o modales)
  const usersQuery = useQuery({
    queryKey: ["users", filters],
    queryFn: async () => {
      let cleanedActive = filters.isActive;
      if (filters.isActive === "true" || filters.isActive === true) cleanedActive = true;
      if (filters.isActive === "false" || filters.isActive === false) cleanedActive = false;
      if (filters.isActive === "" || filters.isActive === "all") cleanedActive = undefined;

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

  // 2. Consulta de Jerarquía (🌟 Esta alimentará nuestra tabla por niveles)
  const hierarchyQuery = useQuery({
    queryKey: ["users-hierarchy"],
    queryFn: async () => {
      const response = await getHierarchy();
      return Array.isArray(response?.data) ? response.data : response || [];
    },
    refetchOnWindowFocus: false,
  });

  const toggleStatusMutation = useMutation({
    mutationFn: toggleUserStatus,
    onSuccess: invalidateCache,
    onError: (err) => console.error(err),
  });

  return {
    // 🌟 IMPORTANTE: Mapeamos el retorno de la jerarquía directa al prop "users"
    // para que la tabla consuma directamente la estructura de árbol sin desfasar páginas.
    users: hierarchyQuery.data || [],

    // Lista plana para modales o asignaciones de managers (anteriormente users)
    allUsersRaw: usersQuery.data?.data || [],

    pagination: usersQuery.data?.pagination || {},
    loading: hierarchyQuery.isLoading || usersQuery.isLoading, // Carga si cualquiera está activo
    error: hierarchyQuery.error ? hierarchyQuery.error.message : usersQuery.error ? usersQuery.error.message : "",

    hierarchy: hierarchyQuery.data || [],
    loadingHierarchy: hierarchyQuery.isLoading,

    filters,
    setFilters,

    fetchUsers: usersQuery.refetch,
    fetchHierarchy: hierarchyQuery.refetch,
    toggleUserStatus: async (id) => toggleStatusMutation.mutateAsync(id),

    togglingStatus: toggleStatusMutation.isPending,
  };
}
