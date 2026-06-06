// ========================================
// features/employees/hooks/useEmployees.js
// ========================================

import { useEffect, useState } from "react";

import employeeService from "../services/employee.service";

export function useEmployees() {
  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(true);

  async function fetchEmployees() {
    try {
      setLoading(true);

      const response = await employeeService.getAll();

      setEmployees(response?.data?.data || []);
    } catch (error) {
      console.error(error);

      setEmployees([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchEmployees();
  }, []);

  return {
    employees,
    loading,
    fetchEmployees,
  };
}
