// ========================================
// features/barcodes/pages/BarcodePages.jsx
// ========================================

import BarcodeHeader from "../components/BarcodeHeader";

import BarcodeGrid from "../components/BarcodeGrid";

import BarcodeSearch from "../components/BarcodeSearch";

import useBarcode from "../hooks/useBarcode";

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

  if (loading) {
    return <div className="p-6">Cargando...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <BarcodeHeader
        products={products}
        selectedProducts={selectedProducts}
        onSelectAll={handleSelectAll}
        onExportPDF={handleExportPDF}
        onPrint={handlePrint}
      />

      <BarcodeSearch value={search} onChange={setSearch} />

      <BarcodeGrid
        products={products}
        selectedProducts={selectedProducts}
        onToggle={toggleProduct}
      />
    </div>
  );
}
