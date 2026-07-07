// ========================================
// pages/BranchesPage.jsx
// ========================================

import { useState } from "react";

import BranchCard from "../components/BranchCard";
import BranchEmpty from "../components/BranchEmpty";
import BranchFilters from "../components/BranchFilters";
import BranchHeader from "../components/BranchHeader";
import BranchLoading from "../components/BranchLoading";
import BranchModal from "../components/BranchModal";
import useBranches from "../hooks/useBranches";

export default function BranchesPage() {
  /* ========================================
   * FILTERS & PAGINATION
   * ====================================== */
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [limit] = useState(6);

  /* ========================================
   * DATA
   * ====================================== */
  const { branches, loading, error, addBranch, updateBranchLocal } =
    useBranches({
      ...filters,
      page,
      limit,
    });

  /* ========================================
   * MODAL
   * ====================================== */
  const [openModal, setOpenModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const handleCreate = () => {
    setSelectedBranch(null);
    setOpenModal(true);
  };

  const handleEdit = (branch) => {
    setSelectedBranch(branch);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);

    setTimeout(() => {
      setSelectedBranch(null);
    }, 150);
  };

  /* ========================================
   * FILTERS
   * ====================================== */

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleClear = () => {
    setFilters({});
    setPage(1);
  };

  /* ========================================
   * LOADING
   * ====================================== */

  if (loading) {
    return <BranchLoading />;
  }

  /* ========================================
   * ERROR
   * ====================================== */

  if (error) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-600 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-400">
          {error}
        </div>
      </div>
    );
  }

  /* ========================================
   * RENDER
   * ====================================== */

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <BranchHeader onCreate={handleCreate} />

      {/* FILTROS */}
      <BranchFilters
        onSearch={handleSearch}
        onClear={handleClear}
        loading={loading}
      />

      {/* LISTADO */}
      {branches.length === 0 ? (
        <BranchEmpty />
      ) : (
        <div className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {branches.map((branch) => (
              <BranchCard key={branch.id} branch={branch} onEdit={handleEdit} />
            ))}
          </div>

          {/* PAGINACIÓN */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800/60">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Página{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {page}
              </span>
            </span>

            <div className="flex gap-2">
              <button
                disabled={page === 1 || loading}
                onClick={() => setPage((prev) => prev - 1)}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900"
              >
                Anterior
              </button>

              <button
                disabled={branches.length < limit || loading}
                onClick={() => setPage((prev) => prev + 1)}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL */}
      <BranchModal
        key={selectedBranch?.id || "create"}
        open={openModal}
        onClose={handleCloseModal}
        branch={selectedBranch}
        onSuccess={(branch, isEdit) => {
          if (isEdit) {
            updateBranchLocal(branch);
          } else {
            addBranch(branch);
          }
        }}
      />
    </div>
  );
}
