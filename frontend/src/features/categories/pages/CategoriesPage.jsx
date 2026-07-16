// ========================================
// features/categories/pages/CategoriesPage.jsx
// ========================================

import { useState } from "react";
import useCategories from "../../categories/hooks/useCategories";

import CategoriesLoading from "../../categories/components/CategoriesLoading";
import CategoriesTable from "../../categories/components/CategoriesTable";
import CategoryDeleteModal from "../../categories/components/CategoryDeleteModal";
import CategoryEmpty from "../../categories/components/CategoryEmpty";
import CategoryFilters from "../../categories/components/CategoryFilters";
import CategoryFormModal from "../../categories/components/CategoryFormModal";
import CategoryHeader from "../../categories/components/CategoryHeader";

export default function CategoriesPage() {
  // ========================================
  // STATES
  // ========================================
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ========================================
  // DATA (Hook con filtros y paginación)
  // ========================================
  const { categories, loading, page, totalPages, search, clearFilters, nextPage, prevPage, reload } = useCategories();

  // ========================================
  // HANDLERS
  // ========================================
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCategory(null);
  };

  const handleCreate = () => {
    setSelectedCategory(null);
    setOpenModal(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setOpenModal(true);
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setOpenDeleteModal(true);
  };

  // ========================================
  // LOADING
  // ========================================
  if (loading) {
    return <CategoriesLoading />;
  }

  // ========================================
  // RENDER
  // ========================================
  return (
    <div className="space-y-6">
      {/* ========================================
       * HEADER
       * ====================================== */}
      <CategoryHeader categories={categories} onCreate={handleCreate} />

      {/* ========================================
       * FILTROS (Buscador y Estado)
       * ====================================== */}
      <CategoryFilters onSearch={search} onClear={clearFilters} loading={loading} />

      {/* ========================================
       * TABLE / EMPTY (Mapeo exacto de props)
       * ====================================== */}
      {categories.length === 0 ? (
        <CategoryEmpty />
      ) : (
        <CategoriesTable
          categories={categories}
          page={page}
          totalPages={totalPages}
          onPrev={prevPage} // <-- Corregido para emparejar con el onPrev interno de CategoriesTable
          onNext={nextPage} // <-- Corregido para emparejar con el onNext interno de CategoriesTable
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      {/* ========================================
       * MODAL FORMULARIO (Crear / Editar)
       * ====================================== */}
      <CategoryFormModal
        open={openModal}
        onClose={handleCloseModal}
        onSuccess={() => {
          handleCloseModal();
          reload();
        }}
        category={selectedCategory}
        categories={categories}
      />

      {/* ========================================
       * MODAL DE ELIMINACIÓN
       * ====================================== */}
      <CategoryDeleteModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        reload={reload}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}
