// ============================================================================
// features/users/pages/UsersPage.jsx
// CORREGIDO: Permisos para dar acceso a MANAGER y limitar acciones críticas
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
  const user = getUser();

  // 🛡️ Definición de permisos por Roles
  const isAdmin = user?.role === "ADMIN";
  const isManager = user?.role === "MANAGER";

  // Ambos pueden gestionar (Crear, Editar, Activar/Desactivar)
  const canManage = isAdmin || isManager;

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
          expandedUsers={expandedUsers}
          onToggleExpand={toggleExpand}
          onEdit={handleEdit}
          // 🛡️ Ambos pueden cambiar estado, pero solo Admin puede eliminar físicamente
          onToggleStatusTrigger={canManage ? handleToggleStatusTrigger : undefined}
          onDeleteTrigger={isAdmin ? handleDeleteTrigger : undefined}
          loading={loading}
          page={pagination?.currentPage || 1}
          totalPages={pagination?.totalPages || 1}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      ) : (
        // 🛡️ Mostrar botón de creación vacío según permisos
        <UsersTableEmpty onCreate={canManage ? handleCreate : undefined} />
      )}

      {/* ==========================================
          MODALES DE ACCIÓN CON ACCESOS SEGMENTADOS
         ========================================== */}

      {/* El Modal de Creación/Edición se monta para Admins y Gerentes */}
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

      {/* El cambio de estado (Inactivar/Activar) se monta para ambos */}
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
