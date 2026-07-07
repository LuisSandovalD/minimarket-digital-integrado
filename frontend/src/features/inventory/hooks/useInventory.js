// ========================================
// hooks/useInventory.js
// ========================================

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addStockService,
  damagedStockService,
  getInventoriesService,
  removeStockService,
} from "../services/inventory.service";

// ========================================
// HOOK
// ========================================

export function useInventory(params = {}) {
  const queryClient = useQueryClient();

  // ========================================
  // GET INVENTORIES
  // ========================================

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["inventories", params],

    queryFn: () => getInventoriesService(params),

    staleTime: 1000 * 30,

    keepPreviousData: true,
  });

  // ========================================
  // STOCK ACTION
  // ========================================

  const stockMutation = useMutation({
    mutationFn: async ({ inventoryId, type, body }) => {
      switch (type) {
        case "ADD":
          return addStockService(inventoryId, body);

        case "REMOVE":
          return removeStockService(inventoryId, body);

        case "DAMAGED":
          return damagedStockService(inventoryId, body);

        default:
          throw new Error("Tipo de movimiento inválido.");
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inventories"],
      });

      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });

  // ========================================
  // EXECUTE
  // ========================================

  const executeStockAction = async (inventoryId, type, body) => {
    try {
      await stockMutation.mutateAsync({
        inventoryId,
        type,
        body,
      });

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  };

  // ========================================
  // RETURN
  // ========================================

  return {
    inventories: data?.data ?? [],

    pagination: data?.pagination ?? {},

    loading: isLoading,

    fetching: isFetching,

    actionLoading: stockMutation.isPending,

    loadInventories: refetch,

    executeStockAction,
  };
}
