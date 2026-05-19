// ========================================
// hooks/useInventory.js
// ========================================

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {

  getInventoriesService,

  addStockService,

  removeStockService,

  damagedStockService,

} from "../services/inventory.service";

// ========================================
// HOOK
// ========================================

export function useInventory() {

  // ========================================
  // QUERY CLIENT
  // ========================================

  const queryClient =
    useQueryClient();

  // ========================================
  // GET INVENTORIES
  // ========================================

  const {

    data,

    isLoading,

    refetch,

  } = useQuery({

    queryKey: [
      "inventories",
    ],

    queryFn:
      getInventoriesService,

    staleTime:
      1000 * 30,

    refetchOnWindowFocus:
      true,

    refetchInterval:
      1000 * 10,

  });

  // ========================================
  // STOCK ACTION MUTATION
  // ========================================

  const stockMutation =
    useMutation({

      mutationFn:
        async ({
          inventoryId,
          type,
          body,
        }) => {

          // ADD

          if (type === "ADD") {

            return await addStockService(
              inventoryId,
              body
            );

          }

          // REMOVE

          if (type === "REMOVE") {

            return await removeStockService(
              inventoryId,
              body
            );

          }

          // DAMAGED

          if (type === "DAMAGED") {

            return await damagedStockService(
              inventoryId,
              body
            );

          }

        },

      // ========================================
      // AUTO REFRESH
      // ========================================

      onSuccess: () => {

        queryClient.invalidateQueries({

          queryKey: [
            "inventories",
          ],

        });

        queryClient.invalidateQueries({

          queryKey: [
            "notifications",
          ],

        });

      },

    });

  // ========================================
  // EXECUTE STOCK ACTION
  // ========================================

  const executeStockAction =
    async (
      inventoryId,
      type,
      body
    ) => {

      try {

        await stockMutation.mutateAsync({

          inventoryId,

          type,

          body,

        });

        return true;

      } catch (error) {

        console.error(
          "Stock action error:",
          error
        );

        return false;

      }

    };

  // ========================================
  // RETURN
  // ========================================

  return {

    inventories:
      data?.data || [],

    loading:
      isLoading,

    actionLoading:
      stockMutation.isPending,

    loadInventories:
      refetch,

    executeStockAction,

  };

}