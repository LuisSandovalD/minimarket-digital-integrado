// ========================================
// pages/BranchesPage.jsx
// ========================================

import { useState } from "react";
import BranchCard from "../components/BranchCard";
import BranchDeleteModal from "../components/BranchDeleteModal";
import BranchEmpty from "../components/BranchEmpty";
import BranchFilters from "../components/BranchFilters";
import BranchHeader from "../components/BranchHeader";
import BranchLoading from "../components/BranchLoading";
import BranchModal from "../components/BranchModal";
import useBranches from "../hooks/useBranches";

// 🌟 Importamos el servicio de sesión del frontend para proteger la acción
import { getUser } from "@/features/auth/services/session.service";

export default function BranchesPage() {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [limit] = useState(6);

  const {
    branches = [],
    totalPages = 1,
    loading,
    error,
    fetchBranches,
  } = useBranches({
    ...filters,
    page,
    limit,
  });

  // Estados independientes para el flujo de Creación/Edición y el de Eliminación
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const handleCreate = () => {
    setSelectedBranch(null);
    setOpenModal(true);
  };

  const handleEdit = (branch) => {
    setSelectedBranch(branch);
    setOpenModal(true);
  };

  // Disparador que levanta el modal de confirmación desde la tarjeta
  const handleDeleteTrigger = (branch) => {
    setSelectedBranch(branch);
    setOpenDeleteModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setTimeout(() => {
      setSelectedBranch(null);
    }, 150);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setTimeout(() => {
      setSelectedBranch(null);
    }, 150);
  };

  // 👈 Función que ejecuta el borrado real con doble capa de protección
  const handleDeleteConfirm = async (branchId) => {
    // 🌟 SEGURO EXTRA: Si un usuario intenta forzar la ejecución, bloqueamos la acción inmediatamente
    const user = getUser();
    if (user?.role !== "admin") {
      console.error("Operación denegada: No tienes permisos de administrador.");
      return;
    }

    try {
      // Aquí irá tu llamada real, por ejemplo:
      // await api.delete(`/branch/${branchId}`);
      console.log("Eliminando sucursal con ID:", branchId);

      // Tras un borrado exitoso, refrescamos el listado y cerramos el modal
      await fetchBranches();
      handleCloseDeleteModal();
    } catch (err) {
      console.error("Error al eliminar la sucursal:", err);
    }
  };

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleClear = () => {
    setFilters({});
    setPage(1);
  };

  if (loading) {
    return <BranchLoading />;
  }

  if (error) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-600 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-400">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <BranchHeader onCreate={handleCreate} />

      <BranchFilters onSearch={handleSearch} onClear={handleClear} loading={loading} />

      {branches.length === 0 ? (
        <BranchEmpty />
      ) : (
        <div className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {branches.map((branch) => (
              <BranchCard key={branch.id} branch={branch} onEdit={handleEdit} onDeleteTrigger={handleDeleteTrigger} />
            ))}
          </div>

          {/* PAGINACIÓN */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800/60">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Página <span className="font-semibold text-slate-700 dark:text-slate-200">{page}</span> de{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-200">{totalPages}</span>
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
                disabled={page >= totalPages || loading}
                onClick={() => setPage((prev) => prev + 1)} // 🌟 Corregido: Removido el onClick duplicado que restaba páginas
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE EDICIÓN / CREACIÓN */}
      <BranchModal
        key={selectedBranch?.id ? `edit-${selectedBranch.id}` : "create"}
        open={openModal}
        onClose={handleCloseModal}
        branch={selectedBranch}
        onSuccess={() => {
          fetchBranches();
        }}
      />

      {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN */}
      <BranchDeleteModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        branch={selectedBranch}
        onDelete={handleDeleteConfirm}
      />
    </div>
  );
}
