// ========================================
// hooks/useBranches.js
// ========================================

import {
  useEffect,
  useState,
} from "react";

import {
  getBranches,
} from "../services/branch.service";

export default function useBranches() {

  const [branches, setBranches] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* ========================================
   * FETCH BRANCHES
   * ====================================== */

  const fetchBranches =
    async () => {

      try {

        setLoading(true);

        const data =
          await getBranches();

        setBranches(data);

      } catch (error) {

        setError(
          error.message
        );

      } finally {

        setLoading(false);

      }

    };

  /* ========================================
   * ADD BRANCH
   * ====================================== */

  const addBranch = (
    newBranch
  ) => {

    setBranches((prev) => [

      newBranch,

      ...prev,

    ]);

  };

  /* ========================================
   * UPDATE BRANCH
   * ====================================== */

  const updateBranchLocal = (
    updatedBranch
  ) => {

    setBranches((prev) =>

      prev.map((branch) =>

        branch.id ===
        updatedBranch.id

          ? updatedBranch
          : branch

      )

    );

  };

  /* ========================================
   * INITIAL LOAD
   * ====================================== */

  useEffect(() => {

    fetchBranches();

  }, []);

  return {

    branches,

    loading,

    error,

    fetchBranches,

    addBranch,

    updateBranchLocal,

  };

}