// ========================================
// features/product/components/ProductFilters.jsx
// ========================================

import { SearchInput } from "@/components/forms/";

export default function ProductFilters({ search, setSearch }) {
  return (
    <div
      className="
        flex
        flex-col
        gap-4

        lg:flex-row
      "
    >
      <SearchInput
        placeholder="
          Buscar producto...
        "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
