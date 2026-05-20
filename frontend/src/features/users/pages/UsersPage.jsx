// ========================================
// pages/UsersPage.jsx
// ========================================

import {
  useMemo,
  useState,
} from "react";

import UsersHeader
  from "../components/UsersHeader";

import UsersTable
  from "../components/UsersTable";

import UsersModal
  from "../components/UsersModal";

import UsersTableEmpty
  from "../components/UsersTableEmpty";

import useUsers
  from "../hooks/useUsers";

// ========================================
// COMPONENT
// ========================================

export default function UsersPage() {

  // ========================================
  // USERS
  // ========================================

  const {

    users,

    loading,

    toggleUserStatus,

    fetchUsers,

  } = useUsers();

  // ========================================
  // MODAL
  // ========================================

  const [
    openModal,
    setOpenModal,
  ] = useState(false);

  const [
    selectedUser,
    setSelectedUser,
  ] = useState(null);

  // ========================================
  // SEARCH
  // ========================================

  const [
    search,
    setSearch,
  ] = useState("");

  // ========================================
  // FILTERED USERS
  // ========================================

  const filteredUsers =
    useMemo(() => {

      if (!search)
        return users;

      return users.filter((user) => {

        const text =
          `
            ${user.name}
            ${user.email}
            ${user.role}
            ${user.slug}
          `
            .toLowerCase();

        return text.includes(
          search.toLowerCase()
        );

      });

    }, [users, search]);

  // ========================================
  // CREATE
  // ========================================

  const handleCreate = () => {

    setSelectedUser(null);

    setOpenModal(true);

  };

  // ========================================
  // EDIT
  // ========================================

  const handleEdit = (user) => {

    setSelectedUser(user);

    setOpenModal(true);

  };

  // ========================================
  // SUCCESS
  // ========================================

  const handleSuccess =
    async () => {

      await fetchUsers();

      setOpenModal(false);

    };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {

    return (

      <div
        className="
          flex
          min-h-[400px]
          items-center
          justify-center
        "
      >

        <div
          className="
            h-10
            w-10
            animate-spin
            rounded-full
            border-2
            border-slate-300
            border-t-slate-900

            dark:border-slate-700
            dark:border-t-slate-100
          "
        />

      </div>

    );

  }

  // ========================================
  // RENDER
  // ========================================

  return (

    <div className="space-y-6">

      {/* ========================================
       * HEADER
       * ====================================== */}

      <UsersHeader
        onCreate={handleCreate}
      />

      {/* ========================================
       * SEARCH
       * ====================================== */}

      <div
        className="
          flex
          flex-col
          gap-4

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        <div className="max-w-md w-full">

          <input
            type="text"
            placeholder="
              Buscar usuarios...
            "
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              h-12
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-4
              text-sm
              outline-none
              transition-all

              focus:border-slate-400
              focus:ring-4
              focus:ring-slate-200/50

              dark:border-slate-800
              dark:bg-slate-950
              dark:text-slate-100
              dark:focus:border-slate-600
              dark:focus:ring-slate-800/50
            "
          />

        </div>

      </div>

      {/* ========================================
       * TABLE
       * ====================================== */}

      {
        filteredUsers.length > 0
          ? (

            <UsersTable
              users={
                filteredUsers
              }
              onEdit={
                handleEdit
              }
              onToggleStatus={
                toggleUserStatus
              }
            />

          ) : (

            <UsersTableEmpty
              onCreate={
                handleCreate
              }
            />

          )
      }

      {/* ========================================
       * MODAL
       * ====================================== */}

      <UsersModal
        open={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        onSuccess={handleSuccess}
        user={selectedUser}
      />

    </div>

  );

}