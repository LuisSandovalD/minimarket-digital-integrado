// ========================================
// features/product/hooks/useProducts.js
// ========================================

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import productService from "../services/product.service";

export default function useProducts(initialFilters = {}) {
  const queryClient = useQueryClient();

  // Estado interno adaptado para recibir de forma directa los filtros estructurados
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: undefined,
    categoryId: undefined,
    isActive: undefined, // Cambiado de 'status' a 'isActive' para coincidir con el backend/filtros
    sortBy: "createdAt",
    sortOrder: "desc",
    ...initialFilters,
  });

  // ========================================
  // INVALIDATE CACHE
  // ========================================
  const invalidateCache = async () => {
    await queryClient.invalidateQueries({ queryKey: ["products"] });
    await queryClient.invalidateQueries({ queryKey: ["notifications"] });
  };

  // ========================================
  // GET PRODUCTS (TANSTACK QUERY)
  // ========================================
  const {
    data: queryResult = { data: [], pagination: {} },
    isLoading: loading,
    error,
    refetch: fetchProducts,
  } = useQuery({
    queryKey: ["products", filters], // Reacciona de forma automática cada vez que se ejecuta setFilters
    queryFn: async () => {
      const response = await productService.getProducts(filters);

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
    placeholderData: (previousData) => previousData, // Evita parpadeos incómodos en la interfaz (UI)
  });

  const products = queryResult.data;
  const pagination = queryResult.pagination;

  // ========================================
  // MUTATIONS (CREATE, UPDATE, DELETE)
  // ========================================
  const createMutation = useMutation({
    mutationFn: productService.createProduct,
    onSuccess: invalidateCache,
    onError: (err) => console.error("CREATE PRODUCT ERROR:", err),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => productService.updateProduct(id, data),
    onSuccess: invalidateCache,
    onError: (err) => console.error("UPDATE PRODUCT ERROR:", err),
  });

  const deleteMutation = useMutation({
    mutationFn: productService.deleteProduct,
    onSuccess: invalidateCache,
    onError: (err) => console.error("DELETE PRODUCT ERROR:", err),
  });

  // ========================================
  // METODOS ASYNCRONOS
  // ========================================
  const createProduct = async (data) => createMutation.mutateAsync(data);
  const updateProduct = async (id, data) =>
    updateMutation.mutateAsync({ id, data });
  const deleteProduct = async (id) => deleteMutation.mutateAsync(id);

  return {
    // DATA & PAGINATION
    products,
    pagination,
    loading,
    error,

    // FILTERS STATE & INJECTORS
    filters,
    setFilters,

    // METHODS
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,

    // LOADING STATES
    creating: createMutation.isPending,
    updating: updateMutation.isPending,
    deleting: deleteMutation.isPending,
  };
}
