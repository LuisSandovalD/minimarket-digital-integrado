// ========================================
// features/product/pages/ProductsPage.jsx
// ========================================

import { useEffect, useState } from "react";

import ProductDeleteModal from "../components/ProductDeleteModal";
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
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);

  const [editing, setEditing] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

        const [categoriesData, unitsData] = await Promise.all([getCategories(), getUnits()]);

        console.log("CATEGORIES:", categoriesData);
        console.log("UNITS:", unitsData);

        setCategories(Array.isArray(categoriesData) ? categoriesData : categoriesData?.data || []);

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
  // FILTERS
  // ========================================
  const handleSearch = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1,
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
  // PAGINATION
  // ========================================
  const handlePrevPage = () => {
    if (pagination.hasPrevPage) {
      setFilters((prev) => ({
        ...prev,
        page: prev.page - 1,
      }));
    }
  };

  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      setFilters((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  };

  // ========================================
  // CRUD
  // ========================================
  const handleCreate = () => {
    setEditing(null);
    resetForm();
    setOpenModal(true);
  };
  const handleEdit = (product) => {
    console.log("PRODUCT EDIT:", product);

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
      setEditing(null);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;

    try {
      await deleteProduct(selectedProduct.id);

      setOpenDeleteModal(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    resetForm();
    setEditing(null);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-6">
      <ProductHeader
        total={stats.totalProducts}
        lowStock={stats.lowStockProducts}
        onCreate={handleCreate}
        onNotifications={() => setOpenNotifications(true)}
      />

      <ProductFilters onSearch={handleSearch} onClear={handleClear} categories={categories} loading={productsLoading} />

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

      <ProductDeleteModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        selectedProduct={selectedProduct}
      />

      {error && (
        <div className="fixed bottom-4 right-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-700 dark:text-red-400 z-50 animate-fade-in">
          {error}
        </div>
      )}
    </div>
  );
}
