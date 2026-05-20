// ========================================
// features/product/pages/ProductsPage.jsx
// ========================================

import { useState, useEffect } from "react";

import ProductHeader from "../components/ProductHeader";

import ProductsTable from "../components/ProductsTable";

import ProductFormModal from "../components/ProductFormModal";

import ProductFilters from "../components/ProductFilters";

import useProducts from "../hooks/useProducts";

import useProductForm from "../hooks/useProductForm";

import useProductFilters from "../hooks/useProductFilters";

import useProductStats from "../hooks/useProductStats";

import { getCategories } from "@/features/categories/services/category.service";

import { getUnits } from "@/features/units/services/unit.service";

export default function ProductsPage() {
  const {
    products,
    createProduct,
    updateProduct,
    deleteProduct,
    loading: productsLoading,
  } = useProducts();

  const { form, handleChange, setFormValues, resetForm } = useProductForm();

  const { search, setSearch, filteredProducts } = useProductFilters(products);

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
        setError(err.message || "Error al cargar datos");
        setCategories([]);
        setUnits([]);
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, []);

  // ========================================
  // HANDLERS
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
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (product) => {
    const confirmDelete = confirm(
      `¿Eliminar "${product.name}"? Esta acción no se puede deshacer.`,
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(product.id);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    resetForm();
    setEditing(null);
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="space-y-6">
      {/* ========================================
       * HEADER
       * ====================================== */}
      <ProductHeader
        total={stats.totalProducts}
        lowStock={stats.lowStockProducts}
        onCreate={handleCreate}
        onNotifications={() => setOpenNotifications(true)}
      />

      {/* ========================================
       * FILTERS
       * ====================================== */}
      <ProductFilters search={search} setSearch={setSearch} />

      {/* ========================================
       * TABLE
       * ====================================== */}
      <ProductsTable
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={productsLoading}
      />

      {/* ========================================
       * MODAL - PRODUCT FORM
       * ====================================== */}
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

      {/* ========================================
       * ERROR ALERT
       * ====================================== */}
      {error && (
        <div
          className="
            fixed
            bottom-4
            right-4

            rounded-lg
            border
            border-red-200
            dark:border-red-800

            bg-red-50
            dark:bg-red-900/20

            px-4
            py-3

            text-sm
            text-red-700
            dark:text-red-400
          "
        >
          {error}
        </div>
      )}
    </div>
  );
}
