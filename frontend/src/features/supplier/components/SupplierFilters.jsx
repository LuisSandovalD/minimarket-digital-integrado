// ========================================
// features/supplier/components/SupplierFilters.jsx
// ========================================

import { SearchInput } from "@/components/forms/";

export default function SupplierFilters({ search, setSearch }) {
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
          Buscar proveedor...
        "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
