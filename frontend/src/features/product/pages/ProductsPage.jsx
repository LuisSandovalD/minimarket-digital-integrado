// ========================================
// features/product/pages/ProductsPage.jsx
// ========================================

import { useEffect, useState } from "react";
import ProductFilters from "../components/ProductFilters";
import ProductFormModal from "../components/ProductFormModal";
import ProductHeader from "../components/ProductHeader";
import ProductsTable from "../components/ProductsTable";

import useProductForm from "../hooks/useProductForm";
import useProducts from "../hooks/useProducts";
import useProductStats from "../hooks/useProductStats";

import { getCategories } from "@/features/categories/services/category.service";
import { getUnits } from "@/features/units/services/unit.service";

export default function ProductsPage() {
  // Extraemos toda la lógica del servidor, paginación y filtros desde el hook unificado
  const {
    products,
    pagination,
    filters,
    setFilters,
    createProduct,
    updateProduct,
    deleteProduct,
    loading: productsLoading,
  } = useProducts();

  const { form, handleChange, setFormValues, resetForm } = useProductForm();
  const stats = useProductStats(products);

  const [openModal, setOpenModal] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [editing, setEditing] = useState(null);

  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState(null);

  // ========================================
  // LOAD CATEGORIES AND UNITS
  // ========================================
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingData(true);
        setError(null);

        const [categoriesData, unitsData] = await Promise.all([
          getCategories(),
          getUnits(),
        ]);

        setCategories(
          Array.isArray(categoriesData)
            ? categoriesData
            : categoriesData?.data || [],
        );

        setUnits(Array.isArray(unitsData) ? unitsData : unitsData?.data || []);
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err.message || "Error al cargar datos maestro");
        setCategories([]);
        setUnits([]);
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, []);

  // ========================================
  // HANDLERS (SEARCH & FILTERS)
  // ========================================
  const handleSearch = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1, // Resetea siempre a la primera página al realizar una nueva búsqueda
    }));
  };

  const handleClear = () => {
    setFilters({
      page: 1,
      limit: 10,
      search: undefined,
      categoryId: undefined,
      isActive: undefined,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  };

  // ========================================
  // HANDLERS (PAGINATION)
  // ========================================
  const handlePrevPage = () => {
    if (pagination.hasPrevPage) {
      setFilters((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  // ========================================
  // HANDLERS (CRUD)
  // ========================================
  const handleCreate = () => {
    setEditing(null);
    resetForm();
    setOpenModal(true);
  };

  const handleEdit = (product) => {
    setEditing(product);
    setFormValues(product);
    setOpenModal(true);
  };

  const handleSubmit = async () => {
    try {
      if (editing) {
        await updateProduct(editing.id, form);
      } else {
        await createProduct(form);
      }
      setOpenModal(false);
      resetForm();
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleDelete = async (product) => {
    const confirmDelete = confirm(
      `¿Eliminar "${product.name}"? Esta acción no se puede deshacer.`,
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(product.id);
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    resetForm();
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <ProductHeader
        total={stats.totalProducts}
        lowStock={stats.lowStockProducts}
        onCreate={handleCreate}
        onNotifications={() => setOpenNotifications(true)}
      />

      {/* FILTERS */}
      <ProductFilters
        onSearch={handleSearch}
        onClear={handleClear}
        categories={categories}
        loading={productsLoading}
      />

      {/* TABLE */}
      <ProductsTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={productsLoading}
        page={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />

      {/* MODAL - PRODUCT FORM */}
      <ProductFormModal
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        form={form}
        onChange={handleChange}
        categories={categories}
        units={units}
        loading={loadingData}
        isEdit={Boolean(editing)}
      />

      {/* ERROR ALERT */}
      {error && (
        <div className="fixed bottom-4 right-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-700 dark:text-red-400 z-50 animate-fade-in">
          {error}
        </div>
      )}
    </div>
  );
}
