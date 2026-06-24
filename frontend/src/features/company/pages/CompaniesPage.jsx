// ============================================================================
// pages/CompaniesPage.jsx
// MODERNO Y ESTANDARIZADO: Panel de administración y gestión de empresas
// ============================================================================

import { useEffect, useState } from "react";
import CompanyEditModal from "../../company/components/CompanyEditModal";
import CompanyHeader from "../../company/components/CompanyHeader";
import CompanyList from "../../company/components/CompanyList";
import useCompany from "../../company/hooks/useCompany";
import CompanyLoading from "../components/CompanyLoading";

export default function CompaniesPage() {
  const {
    companies = [], // Corregido a plural: mapea la colección de empresas de tu listado
    loading,
    error,
    fetchCompanies, // Nombre normalizado de la acción de refresco
  } = useCompany();

  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  // ========================================
  // LIFECYCLE: Carga inicial obligatoria
  // ========================================
  useEffect(() => {
    if (typeof fetchCompanies === "function") {
      fetchCompanies();
    }
  }, [fetchCompanies]);

  // ========================================
  // OPERATIONS MODAL ACTIONS
  // ========================================
  const handleOpenCreate = () => {
    setSelectedCompanyId(null);
    setOpenEditModal(true);
  };

  const handleOpenEdit = (id) => {
    setSelectedCompanyId(id);
    setOpenEditModal(true);
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
    setSelectedCompanyId(null); // Limpieza inmediata y segura
  };

  // ========================================
  // LOADING STATE RENDER
  // ========================================
  if (loading) {
    return <CompanyLoading />;
  }

  // ========================================
  // ERROR STATE RENDER
  // ========================================
  if (error) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-600 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-400 max-w-md text-center shadow-sm">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER PRINCIPAL */}
      <CompanyHeader onCreate={handleOpenCreate} />

      {/* LISTADO DE EMPRESAS */}
      <CompanyList companies={companies} onEdit={handleOpenEdit} />

      {/* MODAL CONTROLADO POR KEY DINÁMICA */}
      {openEditModal && (
        <CompanyEditModal
          key={selectedCompanyId || "create-company"}
          open={openEditModal}
          onClose={handleCloseModal}
          onSuccess={fetchCompanies}
          companyId={selectedCompanyId}
        />
      )}
    </div>
  );
}
