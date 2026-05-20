// ========================================
// pages/CompaniesPage.jsx
// ========================================

import {
  useState,
} from "react";

import useCompany
  from "../../company/hooks/useCompany";

import CompanyList
  from "../../company/components/CompanyList";

import CompanyHeader
  from "../../company/components/CompanyHeader";

import CompanyEditModal
  from "../../company/components/CompanyEditModal";

export default function CompaniesPage() {

  const {

    company,

    loading,

    error,

    fetchCompany,

  } = useCompany();

  const [

    openEditModal,

    setOpenEditModal,

  ] = useState(false);

  const [

    selectedCompanyId,

    setSelectedCompanyId,

  ] = useState(null);

  /* ========================================
   * OPEN CREATE MODAL
   * ====================================== */

  const handleOpenCreate =
    () => {

      setSelectedCompanyId(null);

      setOpenEditModal(true);

    };

  /* ========================================
   * OPEN EDIT MODAL
   * ====================================== */

  const handleOpenEdit =
    (id) => {

      setSelectedCompanyId(id);

      setOpenEditModal(true);

    };

  /* ========================================
   * CLOSE MODAL
   * ====================================== */

  const handleCloseModal =
    () => {

      setOpenEditModal(false);

      setTimeout(() => {

        setSelectedCompanyId(null);

      }, 200);

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
          Cargando empresa...
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

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <CompanyHeader
        onCreate={handleOpenCreate}
      />

      {/* COMPANY */}

      <CompanyList
        company={company}
        onEdit={handleOpenEdit}
      />

      {/* MODAL */}

      <CompanyEditModal
        key={
          selectedCompanyId || "create"
        }
        open={openEditModal}
        onClose={handleCloseModal}
        onSuccess={fetchCompany}
        companyId={selectedCompanyId}
      />

    </div>
  );

}