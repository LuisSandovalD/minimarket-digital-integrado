// ========================================
// features/users/pages/UsersPage.jsx
// ========================================

import UserFilters from "../components/UserFilters";
import UsersHeader from "../components/UsersHeader";
import UsersLoading from "../components/UsersLoading";
import UserModal from "../components/UsersModal";
import UsersTable from "../components/UsersTable";
import UsersTableEmpty from "../components/UsersTableEmpty";

import UserDeleteModal from "../components/UserDeleteModal";
import UserStatusModal from "../components/UserStatusModal";

// 🌟 Importamos la lógica extraída de la página
import { useUsersPageData } from "../hooks/useUsersPageData";

export default function UsersPage() {
  const {
    branches,
    users,
    allUsersRaw,
    pagination,
    expandedUsers,
    loading,
    loadingBranches,
    openModal,
    selectedUser,
    userForAction,
    openStatusAlert,
    openDeleteAlert,
    toggleExpand,
    toggleUserStatus,
    setOpenModal,
    setOpenStatusAlert,
    setOpenDeleteAlert,
    deleteMutation,
    handleSearch,
    handleClear,
    handlePrevPage,
    handleNextPage,
    handleCreate,
    handleEdit,
    handleToggleStatusTrigger,
    handleDeleteTrigger,
    handleSuccess,
  } = useUsersPageData();

  // ========================================
  // LOADING STATE (UI Guard)
  // ========================================
  if (loading && (!users || users.length === 0)) {
    return <UsersLoading />;
  }

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

      {/* TABLE CONTROLLER */}
      {Array.isArray(users) && users.length > 0 ? (
        <UsersTable
          users={users}
          expandedUsers={expandedUsers}
          onToggleExpand={toggleExpand}
          onEdit={handleEdit}
          onToggleStatusTrigger={handleToggleStatusTrigger}
          onDeleteTrigger={handleDeleteTrigger}
          loading={loading}
          page={pagination?.currentPage || 1}
          totalPages={pagination?.totalPages || 1}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      ) : (
        <UsersTableEmpty onCreate={handleCreate} />
      )}

      {/* FORMULARIO MODAL */}
      <UserModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={handleSuccess}
        user={selectedUser}
        branches={branches}
        allUsers={allUsersRaw || users || []}
      />

      {/* INTERRUPTOR DE ACCESOS (STATUS) */}
      <UserStatusModal
        open={openStatusAlert}
        onClose={() => setOpenStatusAlert(false)}
        user={userForAction}
        onToggleStatus={toggleUserStatus}
      />

      {/* ELIMINACIÓN PERMANENTE */}
      <UserDeleteModal
        open={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        user={userForAction}
        onDelete={(id) => deleteMutation.mutateAsync(id)}
      />
    </div>
  );
}
