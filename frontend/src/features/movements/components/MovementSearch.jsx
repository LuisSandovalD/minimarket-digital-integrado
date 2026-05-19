// ========================================
// features/movements/components/MovementSearch.jsx
// ========================================

import SearchInput
  from "@/components/inputs/SearchInput";

export default function MovementSearch({

  value,

  onChange,

}) {

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
          Buscar producto, SKU,
          sucursal o tipo...
        "

        value={value}

        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
      />

    </div>

  );

}