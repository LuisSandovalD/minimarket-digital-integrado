import {

  useQuery,
  useMutation,
  useQueryClient,

} from "@tanstack/react-query";

import productService
  from "../services/product.service";

// ========================================
// HOOK
// ========================================

export default function useProducts() {

  const queryClient =
    useQueryClient();

  // ========================================
  // INVALIDATE CACHE
  // ========================================

  const invalidateCache =
    async () => {

      await queryClient
        .invalidateQueries({

          queryKey: [
            "products",
          ],

        });

      await queryClient
        .invalidateQueries({

          queryKey: [
            "notifications",
          ],

        });

    };

  // ========================================
  // GET PRODUCTS
  // ========================================

  const {

    data: products = [],

    isLoading: loading,

    error,

    refetch: fetchProducts,

  } = useQuery({

    queryKey: [
      "products",
    ],

    queryFn: async () => {

      const response =
        await productService
          .getProducts();

      return Array.isArray(
        response?.data
      )
        ? response.data
        : [];

    },

    refetchOnWindowFocus:
      false,

  });

  // ========================================
  // CREATE
  // ========================================

  const createMutation =
    useMutation({

      mutationFn:
        async (data) => {

          return await productService
            .createProduct(data);

        },

      onSuccess:
        async () => {

          await invalidateCache();

        },

      onError:
        (error) => {

          console.error(
            "CREATE PRODUCT ERROR:",
            error
          );

        },

    });

  // ========================================
  // UPDATE
  // ========================================

  const updateMutation =
    useMutation({

      mutationFn:
        async ({
          id,
          data,
        }) => {

          return await productService
            .updateProduct(
              id,
              data
            );

        },

      onSuccess:
        async () => {

          await invalidateCache();

        },

      onError:
        (error) => {

          console.error(
            "UPDATE PRODUCT ERROR:",
            error
          );

        },

    });

  // ========================================
  // DELETE
  // ========================================

  const deleteMutation =
    useMutation({

      mutationFn:
        async (id) => {

          return await productService
            .deleteProduct(id);

        },

      onSuccess:
        async () => {

          await invalidateCache();

        },

      onError:
        (error) => {

          console.error(
            "DELETE PRODUCT ERROR:",
            error
          );

        },

    });

  // ========================================
  // METHODS
  // ========================================

  const createProduct =
    async (data) => {

      return await createMutation
        .mutateAsync(data);

    };

  const updateProduct =
    async (
      id,
      data
    ) => {

      return await updateMutation
        .mutateAsync({

          id,
          data,

        });

    };

  const deleteProduct =
    async (id) => {

      return await deleteMutation
        .mutateAsync(id);

    };

  // ========================================
  // RETURN
  // ========================================

  return {

    // DATA
    products,

    loading,

    error,

    // METHODS
    fetchProducts,

    createProduct,
    updateProduct,
    deleteProduct,

    // STATES
    creating:
      createMutation.isPending,

    updating:
      updateMutation.isPending,

    deleting:
      deleteMutation.isPending,

  };

}