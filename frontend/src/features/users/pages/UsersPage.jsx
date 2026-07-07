// ========================================
// features/users/pages/UsersPage.jsx
// ========================================

import { useEffect, useState } from "react";
import UserFilters from "../components/UserFilters";
import UsersHeader from "../components/UsersHeader";
import UsersLoading from "../components/UsersLoading";
import UsersModal from "../components/UsersModal";
import UsersTable from "../components/UsersTable";
import UsersTableEmpty from "../components/UsersTableEmpty";

import { getBranches } from "@/features/branches/services/branch.service"; // Ajusta la ruta según tu proyecto
import useUsers from "../hooks/useUsers";
import { deleteUser } from "../services/users.service";

export default function UsersPage() {
  // ========================================
  // USERS HOOK (TanStack Query integrado)
  // ========================================
  const {
    users,
    pagination,
    filters,
    setFilters,
    loading,
    expandedUsers,
    toggleExpand,
    toggleUserStatus,
    fetchUsers,
  } = useUsers();

  // ========================================
  // STATE
  // ========================================
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [branches, setBranches] = useState([]);
  const [loadingBranches, setLoadingBranches] = useState(false);

  // ========================================
  // LOAD MASTER DATA (BRANCHES)
  // ========================================
  useEffect(() => {
    const loadBranches = async () => {
      try {
        setLoadingBranches(true);
        const response = await getBranches();
        setBranches(Array.isArray(response) ? response : response?.data || []);
      } catch (error) {
        console.error("Error al cargar las sucursales:", error);
      } finally {
        setLoadingBranches(false);
      }
    };
    loadBranches();
  }, []);

  // ========================================
  // HANDLERS (SEARCH & FILTERS)
  // ========================================
  const handleSearch = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1, // Obligatorio regresar a la página 1 en cada nueva consulta
    }));
  };

  const handleClear = () => {
    setFilters({
      page: 1,
      limit: 10,
      search: undefined,
      branchId: undefined,
      isActive: undefined,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  };

  // ========================================
  // HANDLERS (PAGINATION)
  // ========================================
  const handlePrevPage = () => {
    if (pagination.hasPrevPage) {
      setFilters((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  // ========================================
  // CRUD HANDLERS
  // ========================================
  const handleCreate = () => {
    setSelectedUser(null);
    setOpenModal(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      return;
    }

    try {
      await deleteUser(userId);
      fetchUsers(); // Actualiza automáticamente la lista desde la caché del servidor
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      alert("No se pudo eliminar el usuario del sistema.");
    }
  };

  const handleSuccess = () => {
    fetchUsers(); // Invalida y refresca los datos con el servidor de forma segura
    setOpenModal(false);
  };

  // ========================================
  // LOADING STATE
  // ========================================
  if (loading && users.length === 0) {
    return <UsersLoading />;
  }

  // ========================================
  // RENDER
  // ========================================
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <UsersHeader onCreate={handleCreate} />

      {/* FILTERS CONTROLLER */}
      <UserFilters
        onSearch={handleSearch}
        onClear={handleClear}
        branches={branches}
        loading={loading || loadingBranches}
      />

      {/* TABLE CON PAGINACIÓN INCORPORADA */}
      {users.length > 0 ? (
        <UsersTable
          users={users}
          expandedUsers={expandedUsers}
          onToggleExpand={toggleExpand}
          onEdit={handleEdit}
          onToggleStatus={toggleUserStatus}
          onDelete={handleDeleteUser}
          loading={loading}
          page={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      ) : (
        <UsersTableEmpty onCreate={handleCreate} />
      )}

      {/* MODAL CONTAINER */}
      <UsersModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={handleSuccess}
        user={selectedUser}
      />
    </div>
  );
}
