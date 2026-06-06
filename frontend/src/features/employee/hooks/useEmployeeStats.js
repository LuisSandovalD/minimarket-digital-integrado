import { useMemo } from "react";

export function useEmployeeStats(employees = []) {
  return useMemo(() => {
    const totalEmployees = employees.length;

    const activeEmployees = employees.filter(
      (employee) => employee.isActive,
    ).length;

    const inactiveEmployees = totalEmployees - activeEmployees;

    return {
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
    };
  }, [employees]);
}
