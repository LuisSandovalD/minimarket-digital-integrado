import {
  useState,
} from "react";

import useCategories
from "../../categories/hooks/useCategories";

import CategoriesTable
from "../../categories/components/CategoriesTable";

import CategoryEmpty
from "../../categories/components/CategoryEmpty";

import CategoryHeader
from "../../categories/components/CategoryHeader";

import CategoryFormModal
from "../../categories/components/CategoryFormModal";

export default function CategoriesPage() {

  // ========================================
  // STATES
  // ========================================

  const [
    openModal,
    setOpenModal,
  ] = useState(false);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState(null);

  // ========================================
  // DATA
  // ========================================

  const {

    categories,

    loading,

    refetch,

  } = useCategories();

  // ========================================
  // HANDLERS
  // ========================================

  const handleCloseModal =
    () => {

      setOpenModal(false);

      setSelectedCategory(
        null
      );

    };

  const handleCreate =
    () => {

      setSelectedCategory(
        null
      );

      setOpenModal(true);

    };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {

    return (

      <div
        className="
          flex
          items-center
          justify-center
          py-20
        "
      >
        Cargando...
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

      <CategoryHeader

        categories={categories}

        onCreate={
          handleCreate
        }

      />

      {/* ========================================
       * TABLE / EMPTY
       * ====================================== */}

      {categories.length === 0 ? (

        <CategoryEmpty />

      ) : (

        <CategoriesTable
          categories={
            categories
          }
        />

      )}

      {/* ========================================
       * MODAL
       * ====================================== */}

      <CategoryFormModal

        open={openModal}

        onClose={
          handleCloseModal
        }

        onSuccess={() => {

          handleCloseModal();

          refetch();

        }}

        category={
          selectedCategory
        }

        categories={
          categories
        }

      />

    </div>

  );

}