// ========================================
// hooks/useBranches.js
// ========================================

import { useCallback, useEffect, useState } from "react";
import { getBranches } from "../services/branch.service";

export default function useBranches(params = {}) {
  const [branches, setBranches] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { search, city, country, isActive, page = 1, limit = 10 } = params;

  const fetchBranches = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // 🌟 Sanitizamos el filtro 'isActive' por si viene como String desde la barra de filtros
      let normalizedActive = isActive;
      if (isActive === "true" || isActive === true) normalizedActive = true;
      if (isActive === "false" || isActive === false) normalizedActive = false;

      const data = await getBranches({
        search,
        city,
        country,
        isActive: normalizedActive,
        page,
        limit,
      });

      setBranches(data?.branches || []);
      setTotalPages(data?.totalPages || 1);
    } catch (err) {
      setError(err.message || "Error al obtener sucursales.");
    } finally {
      setLoading(false);
    }
  }, [search, city, country, isActive, page, limit]);

  const addBranch = (newBranch) => {
    if (!newBranch) return;
    setBranches((prev) => [newBranch, ...prev].filter(Boolean));
  };

  const updateBranchLocal = (updatedBranch) => {
    if (!updatedBranch?.id) return;
    setBranches((prev) =>
      prev
        .filter(Boolean)
        .map((branch) =>
          branch?.id === updatedBranch.id ? updatedBranch : branch,
        ),
    );
  };

  const removeBranchLocal = (branchId) => {
    if (!branchId) return;
    setBranches((prev) => prev.filter((branch) => branch?.id !== branchId));
  };

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  return {
    branches,
    totalPages,
    loading,
    error,
    fetchBranches,
    addBranch,
    updateBranchLocal,
    removeBranchLocal,
  };
}
