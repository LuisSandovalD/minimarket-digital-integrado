// ========================================
// features/movements/pages/MovementsPage.jsx
// ========================================

import useMovements
  from "../hooks/useMovements";

import MovementsHeader
  from "../components/MovementsHeader";

import MovementSearch
  from "../components/MovementSearch";

import MovementsTable
  from "../components/MovementsTable";

import LoadingMovements
  from "../components/LoadingMovements";

// ========================================
// PAGE
// ========================================

export default function MovementsPage() {

  // ========================================
  // HOOK
  // ========================================

  const {

    movements,

    loading,

    search,

    setSearch,

    refetch,

  } = useMovements();

  // ========================================
  // LOADING
  // ========================================

  if (loading) {

    return (
      <LoadingMovements />
    );

  }

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="
      p-6
      space-y-6
    ">

      {/* ======================================== */}
      {/* HEADER */}
      {/* ======================================== */}

      <MovementsHeader

        movements={movements}

        onRefresh={
          refetch
        }

      />

      {/* ======================================== */}
      {/* SEARCH */}
      {/* ======================================== */}

      <MovementSearch

        value={search}

        onChange={
          setSearch
        }

      />

      {/* ======================================== */}
      {/* TABLE */}
      {/* ======================================== */}

      <MovementsTable

        movements={movements}

        loading={loading}

      />

    </div>
  );

}