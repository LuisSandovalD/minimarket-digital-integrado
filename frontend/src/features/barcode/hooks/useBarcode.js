// ========================================
// features/barcodes/hooks/useBarcode.jsx
// ========================================

import { useCallback, useEffect, useState } from "react";

import productService from "@/features/product/services/product.service";

import { filterProducts } from "../utils/filter-products";

import { exportBarcodesPDF } from "../utils/export-barcodes-pdf";

export default function useBarcode() {
  // ========================================
  // STATES
  // ========================================

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedProducts, setSelectedProducts] = useState([]);

  // ========================================
  // LOAD PRODUCTS
  // ========================================

  const loadProducts = useCallback(async () => {
    try {
      const response = await productService.getProducts();

      setProducts(response.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProducts();
  }, [loadProducts]);

  // ========================================
  // FILTERED PRODUCTS
  // ========================================

  const filteredProducts = filterProducts(products, search);

  // ========================================
  // TOGGLE PRODUCT
  // ========================================

  const toggleProduct = (product) => {
    const exists = selectedProducts.find((item) => item.id === product.id);

    if (exists) {
      setSelectedProducts((prev) =>
        prev.filter((item) => item.id !== product.id),
      );

      return;
    }

    setSelectedProducts((prev) => [...prev, product]);
  };

  // ========================================
  // SELECT ALL
  // ========================================

  const handleSelectAll = () => {
    const allSelected = filteredProducts.every((product) =>
      selectedProducts.some((item) => item.id === product.id),
    );

    if (allSelected) {
      setSelectedProducts((prev) =>
        prev.filter(
          (selected) =>
            !filteredProducts.some((product) => product.id === selected.id),
        ),
      );

      return;
    }

    const newProducts = filteredProducts.filter(
      (product) => !selectedProducts.some((item) => item.id === product.id),
    );

    setSelectedProducts((prev) => [...prev, ...newProducts]);
  };

  // ========================================
  // EXPORT PDF
  // ========================================

  const handleExportPDF = async () => {
    await exportBarcodesPDF(selectedProducts);
  };

  // ========================================
  // PRINT
  // ========================================

  const handlePrint = () => {
    window.print();
  };

  // ========================================
  // EXPORTS
  // ========================================

  return {
    products: filteredProducts,

    loading,

    search,

    setSearch,

    selectedProducts,

    toggleProduct,

    handleSelectAll,

    handleExportPDF,

    handlePrint,
  };
}
