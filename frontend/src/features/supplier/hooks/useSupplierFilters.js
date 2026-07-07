// ========================================
// features/supplier/hooks/useSupplierFilters.js
// ========================================

import { useState } from "react";

export default function useSupplierFilters() {
  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState(undefined);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const resetFilters = () => {
    setSearch("");
    setIsActive(undefined);
    setPage(1);
    setLimit(10);
  };

  return {
    search,
    setSearch,

    isActive,
    setIsActive,

    page,
    setPage,

    limit,
    setLimit,

    resetFilters,
  };
}
