// ============================================================================
// features/users/pages/UsersPage.jsx
// CORREGIDO: Solucionado error de orden de Hooks (Rules of Hooks)
// ============================================================================

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
  // 1. 🛡️ OBTENER SESIÓN DE USUARIO
  const user = getUser();

  // 2. 🛡️ DEFINICIÓN DE PERMISOS POR ROLES
  const isAdmin = user?.role === "ADMIN";
  const isManager = user?.role === "MANAGER";
  const canManage = isAdmin || isManager;

  // 3. 🌟 TODOS LOS HOOKS SE LLAMAN PRIMERO (Sin interrupción)
  const {
    branches,
    users,
    allUsersRaw,
    pagination,
    loading,
    loadingBranches,
    openModal,
    selectedUser,
    userForAction,
    openStatusAlert,
    openDeleteAlert,
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

  // 4. ⏳ RETORNOS CONDICIONALES DESPUÉS DE LOS HOOKS
  if (loading && (!users || users.length === 0)) {
    return <UsersLoading />;
  }

  // 5. 🖥️ RENDERIZADO PRINCIPAL
  return (
    <div className="space-y-6">
      {/* 🛡️ Permitir crear si es Admin o Gerente */}
      <UsersHeader onCreate={canManage ? handleCreate : undefined} />

      <UserFilters
        onSearch={handleSearch}
        onClear={handleClear}
        branches={branches}
        loading={loading || loadingBranches}
      />

      {Array.isArray(users) && users.length > 0 ? (
        <UsersTable
          users={users}
          onEdit={handleEdit}
          onToggleStatusTrigger={canManage ? handleToggleStatusTrigger : undefined}
          onDeleteTrigger={isAdmin ? handleDeleteTrigger : undefined}
          loading={loading}
          page={pagination?.currentPage || 1}
          totalPages={pagination?.totalPages || 1}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      ) : (
        <UsersTableEmpty onCreate={canManage ? handleCreate : undefined} />
      )}

      {/* ==========================================
          MODALES DE ACCIÓN CON ACCESOS SEGMENTADOS
         ========================================== */}

      {canManage && (
        <UserModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSuccess={handleSuccess}
          user={selectedUser}
          branches={branches}
          allUsers={allUsersRaw || users || []}
        />
      )}

      {canManage && (
        <UserStatusModal
          open={openStatusAlert}
          onClose={() => setOpenStatusAlert(false)}
          user={userForAction}
          onToggleStatus={toggleUserStatus}
        />
      )}

      {isAdmin && (
        <UserDeleteModal
          open={openDeleteAlert}
          onClose={() => setOpenDeleteAlert(false)}
          user={userForAction}
          onDelete={(id) => deleteMutation.mutateAsync(id)}
        />
      )}
    </div>
  );
}
