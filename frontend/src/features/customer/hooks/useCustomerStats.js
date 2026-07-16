import { useMemo } from "react";

export function useCustomerStats(customers = []) {
  return useMemo(() => {
    const totalCustomers = customers.length;

    const activeCustomers = customers.filter((customer) => customer.isActive).length;

    const inactiveCustomers = totalCustomers - activeCustomers;

    return {
      totalCustomers,
      activeCustomers,
      inactiveCustomers,
    };
  }, [customers]);
}
