// features/customers/utils/customerFilters.js

export function filterCustomers(customers, search) {
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
}
