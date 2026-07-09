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

import { useUsersPageData } from "../hooks/useUsersPageData";
// 🌟 Importamos el servicio de sesión para validar
import { getUser } from "@/features/auth/services/session.service";

export default function UsersPage() {
  const user = getUser();
  const isAdmin = user?.role === "ADMIN";

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

  if (loading && (!users || users.length === 0)) {
    return <UsersLoading />;
  }

  return (
    <div className="space-y-6">
      {/* 🛡️ Solo el Admin puede crear nuevos usuarios */}
      <UsersHeader onCreate={isAdmin ? handleCreate : undefined} />

      <UserFilters
        onSearch={handleSearch}
        onClear={handleClear}
        branches={branches}
        loading={loading || loadingBranches}
      />

      {Array.isArray(users) && users.length > 0 ? (
        <UsersTable
          users={users}
          expandedUsers={expandedUsers}
          onToggleExpand={toggleExpand}
          onEdit={handleEdit}
          // 🛡️ Pasamos triggers solo si es admin
          onToggleStatusTrigger={
            isAdmin ? handleToggleStatusTrigger : undefined
          }
          onDeleteTrigger={isAdmin ? handleDeleteTrigger : undefined}
          loading={loading}
          page={pagination?.currentPage || 1}
          totalPages={pagination?.totalPages || 1}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      ) : (
        <UsersTableEmpty onCreate={isAdmin ? handleCreate : undefined} />
      )}

      {/* MODALES PROTEGIDOS POR SEGURIDAD */}
      {isAdmin && (
        <>
          <UserModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            onSuccess={handleSuccess}
            user={selectedUser}
            branches={branches}
            allUsers={allUsersRaw || users || []}
          />

          <UserStatusModal
            open={openStatusAlert}
            onClose={() => setOpenStatusAlert(false)}
            user={userForAction}
            onToggleStatus={toggleUserStatus}
          />

          <UserDeleteModal
            open={openDeleteAlert}
            onClose={() => setOpenDeleteAlert(false)}
            user={userForAction}
            onDelete={(id) => deleteMutation.mutateAsync(id)}
          />
        </>
      )}
    </div>
  );
}
