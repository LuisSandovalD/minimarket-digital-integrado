// ========================================
// hooks/useBranches.js
// ========================================

import { useCallback, useEffect, useState } from "react";
import { getBranches } from "../services/branch.service";

export default function useBranches(params = {}) {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { search, city, country, isActive, page = 1, limit = 10 } = params;

  /* ========================================
   * FETCH BRANCHES
   * ====================================== */
  const fetchBranches = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getBranches({
        search,
        city,
        country,
        isActive,
        page,
        limit,
      });

      setBranches(data);
    } catch (err) {
      setError(err.message || "Error al obtener sucursales.");
    } finally {
      setLoading(false);
    }
  }, [search, city, country, isActive, page, limit]);

  /* ========================================
   * ADD BRANCH
   * ====================================== */
  const addBranch = (newBranch) => {
    setBranches((prev) => [newBranch, ...prev]);
  };

  /* ========================================
   * UPDATE BRANCH
   * ====================================== */
  const updateBranchLocal = (updatedBranch) => {
    setBranches((prev) =>
      prev.map((branch) =>
        branch.id === updatedBranch.id ? updatedBranch : branch,
      ),
    );
  };

  /* ========================================
   * AUTO FETCH
   * ====================================== */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBranches();
  }, [fetchBranches]);

  return {
    branches,
    loading,
    error,
    fetchBranches,
    addBranch,
    updateBranchLocal,
  };
}
