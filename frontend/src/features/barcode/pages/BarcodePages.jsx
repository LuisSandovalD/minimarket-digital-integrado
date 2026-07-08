import { useMemo, useState } from "react";

import BarcodeGrid from "../components/BarcodeGrid";
import BarcodeHeader from "../components/BarcodeHeader";
import BarcodeLoading from "../components/BarcodeLoading";
import BarcodeFilters from "../components/BarcodeFilters";

import { TFooter } from "@/components/data-display";

import useBarcode from "../hooks/useBarcode";

const ITEMS_PER_PAGE = 12;

export default function BarcodePages() {
  const {
    products,
    loading,
    search,
    setSearch,
    selectedProducts,
    toggleProduct,
    handleSelectAll,
    handleExportPDF,
    handlePrint,
  } = useBarcode();

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE));

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return products.slice(start, end);
  }, [products, currentPage]);

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  if (loading) {
    return <BarcodeLoading />;
  }

  return (
    <div className="space-y-6 p-6">
      <BarcodeHeader
        products={products}
        selectedProducts={selectedProducts}
        onSelectAll={handleSelectAll}
        onExportPDF={handleExportPDF}
        onPrint={handlePrint}
      />

      <BarcodeFilters value={search} onChange={handleSearchChange} />

      <BarcodeGrid
        products={paginatedProducts}
        selectedProducts={selectedProducts}
        onToggle={toggleProduct}
      />

      {products.length > ITEMS_PER_PAGE && (
        <TFooter
          page={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
