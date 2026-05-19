// ========================================
// features/product/store/product.store.js
// ========================================

import { create }
  from "zustand";

const useProductStore = create(
  (set) => ({

    products: [],

    selectedProduct: null,

    loading: false,

    filters: {

      search: "",
      category: "",
      status: "ALL",

    },

    setProducts: (
      products
    ) => set({
      products
    }),

    setSelectedProduct: (
      product
    ) => set({
      selectedProduct: product
    }),

    setLoading: (
      loading
    ) => set({
      loading
    }),

    setFilters: (
      filters
    ) => set(
      (state) => ({
        filters: {
          ...state.filters,
          ...filters,
        },
      })
    ),

    resetStore: () =>
      set({

        products: [],

        selectedProduct: null,

        loading: false,

        filters: {

          search: "",
          category: "",
          status: "ALL",

        },

      }),

  })
);

export default useProductStore;