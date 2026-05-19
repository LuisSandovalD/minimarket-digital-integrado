// ========================================
// features/product/hooks/useProductFilters.js
// ========================================

import {
  useMemo,
  useState,
} from "react";

export default function useProductFilters(
  products = []
) {

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    category,
    setCategory,
  ] = useState("");

  const [
    featured,
    setFeatured,
  ] = useState(false);

  const filteredProducts =
    useMemo(() => {

      return products.filter(
        (product) => {

          const matchesSearch =
            product.name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesCategory =
            !category ||
            product.category
              ?.name ===
              category;

          const matchesFeatured =
            !featured ||
            product.isFeatured;

          return (
            matchesSearch &&
            matchesCategory &&
            matchesFeatured
          );

        }
      );

    }, [

      products,
      search,
      category,
      featured,

    ]);

  return {

    search,
    setSearch,

    category,
    setCategory,

    featured,
    setFeatured,

    filteredProducts,

  };

}