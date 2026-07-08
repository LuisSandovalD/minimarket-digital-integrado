import { useCallback, useEffect, useMemo, useState } from "react";

import productService from "@/features/product/services/product.service";

import { exportBarcodesPDF } from "../utils/export-barcodes-pdf";
import { filterProducts } from "../utils/filter-products";

const ITEMS_PER_PAGE = 12;

export default function useBarcode() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedProducts, setSelectedProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

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
    loadProducts();
  }, [loadProducts]);

  const filteredProducts = useMemo(
    () => filterProducts(products, search),
    [products, search],
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE),
  );

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

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

  const handleExportPDF = async () => {
    await exportBarcodesPDF(selectedProducts);
  };

  const handlePrint = () => {
    window.print();
  };

  return {
    products: paginatedProducts,

    totalProducts: filteredProducts.length,

    currentPage,

    totalPages,

    setCurrentPage,

    loading,

    search,

    setSearch: handleSearch,

    selectedProducts,

    toggleProduct,

    handleSelectAll,

    handleExportPDF,

    handlePrint,
  };
}
