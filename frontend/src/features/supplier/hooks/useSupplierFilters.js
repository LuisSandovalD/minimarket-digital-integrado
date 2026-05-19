// ========================================
// features/supplier/hooks/useSupplierFilters.js
// ========================================

import {
  useMemo,
  useState,
} from "react";

export default function useSupplierFilters(
  suppliers = []
) {

  const [
    search,
    setSearch,
  ] = useState("");

  const filteredSuppliers =
    useMemo(() => {

      return suppliers.filter(
        (supplier) => {

          const text =
            search.toLowerCase();

          return (

            supplier.name
              ?.toLowerCase()
              .includes(text)

            ||

            supplier.ruc
              ?.toLowerCase()
              .includes(text)

            ||

            supplier.email
              ?.toLowerCase()
              .includes(text)

            ||

            supplier.phone
              ?.toLowerCase()
              .includes(text)

            ||

            supplier.contactPerson
              ?.toLowerCase()
              .includes(text)

          );

        }
      );

    }, [

      suppliers,
      search,

    ]);

  return {

    search,
    setSearch,

    filteredSuppliers,

  };

}