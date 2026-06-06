import { useMemo, useState } from "react";

export function useCustomerFilters(customers = []) {
  const [search, setSearch] = useState("");

  const filteredCustomers = useMemo(() => {
    const term = search.toLowerCase();

    return customers.filter((customer) => {
      const text = `
        ${customer.name || ""}
        ${customer.email || ""}
        ${customer.phone || ""}
        ${customer.documentNumber || ""}
      `.toLowerCase();

      return text.includes(term);
    });
  }, [customers, search]);

  return {
    search,
    setSearch,
    filteredCustomers,
  };
}
