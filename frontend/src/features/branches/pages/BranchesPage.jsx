// ========================================
// pages/BranchesPage.jsx
// ========================================

import {
  useState,
} from "react";

import useBranches
  from "../hooks/useBranches";

import BranchCard
  from "../components/BranchCard";

import BranchHeader
  from "../components/BranchHeader";

import BranchEmpty
  from "../components/BranchEmpty";

import BranchModal
  from "../components/BranchModal";

export default function BranchesPage() {

  const {

    branches,

    loading,

    error,

    addBranch,

    updateBranchLocal,

  } = useBranches();

  /* ========================================
   * MODAL STATE
   * ====================================== */

  const [openModal, setOpenModal] =
    useState(false);

  const [selectedBranch, setSelectedBranch] =
    useState(null);

  /* ========================================
   * CREATE
   * ====================================== */

  const handleCreate = () => {

    setSelectedBranch(null);

    setOpenModal(true);

  };

  /* ========================================
   * EDIT
   * ====================================== */

  const handleEdit = (branch) => {

    setSelectedBranch(branch);

    setOpenModal(true);

  };

  /* ========================================
   * CLOSE
   * ====================================== */

  const handleCloseModal = () => {

    setOpenModal(false);

    setTimeout(() => {

      setSelectedBranch(null);

    }, 150);

  };

  /* ========================================
   * LOADING
   * ====================================== */

  if (loading) {

    return (

      <div
        className="
          flex
          min-h-[300px]
          items-center
          justify-center
        "
      >

        <p
          className="
            text-sm
            text-slate-500
            dark:text-slate-400
          "
        >
          Cargando sucursales...
        </p>

      </div>

    );

  }

  /* ========================================
   * ERROR
   * ====================================== */

  if (error) {

    return (

      <div
        className="
          flex
          min-h-[300px]
          items-center
          justify-center
        "
      >

        <div
          className="
            rounded-2xl
            border
            border-rose-200

            bg-rose-50

            px-5
            py-4

            text-sm
            text-rose-600

            dark:border-rose-900
            dark:bg-rose-950/40
            dark:text-rose-400
          "
        >
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

      <BranchHeader
        onCreate={handleCreate}
      />

      {/* EMPTY */}

      {branches.length === 0 ? (

        <BranchEmpty />

      ) : (

        <div
          className="
            grid
            gap-5

            sm:grid-cols-2
            xl:grid-cols-3
          "
        >

          {branches.map((branch) => (

            <BranchCard
              key={branch.id}

              branch={branch}

              onEdit={handleEdit}
            />

          ))}

        </div>

      )}

      {/* MODAL */}

      <BranchModal
        key={
          selectedBranch?.id ||
          "create"
        }

        open={openModal}

        onClose={
          handleCloseModal
        }

        onSuccess={(
          branch,
          isEdit
        ) => {

          if (isEdit) {

            updateBranchLocal(
              branch
            );

          } else {

            addBranch(
              branch
            );

          }

        }}

        branch={selectedBranch}
      />

    </div>

  );

}