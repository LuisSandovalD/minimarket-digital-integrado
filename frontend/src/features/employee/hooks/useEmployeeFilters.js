// ========================================
// features/employees/hooks/useEmployeeFilters.js
// ========================================

import { useMemo, useState } from "react";

export function useEmployeeFilters(employees = []) {
  const [search, setSearch] = useState("");

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const text = `
        ${employee.name || ""}
        ${employee.email || ""}
        ${employee.phone || ""}
        ${employee.employeeProfile?.position || ""}
        ${employee.employeeProfile?.department || ""}
      `.toLowerCase();

      return text.includes(search.toLowerCase());
    });
  }, [employees, search]);

  return {
    search,
    setSearch,
    filteredEmployees,
  };
}
