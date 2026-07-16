const ExcelJS = require("exceljs");

/**
 * Genera un buffer de Excel basado en los datos de clientes y empresa.
 * @param {Array} customers
 * @param {Object|null} company
 * @returns {Promise<Buffer>}
 */
const generateCustomersExcel = async (customers, company) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Clientes");

  let currentExcelRow = 1;
  if (company) {
    sheet.mergeCells(`A${currentExcelRow}:F${currentExcelRow}`);
    sheet.getCell(`A${currentExcelRow}`).value = company.name || "";
    sheet.getCell(`A${currentExcelRow}`).font = { bold: true, size: 14, color: { argb: "FF1F2937" } };
    currentExcelRow++;

    sheet.mergeCells(`A${currentExcelRow}:F${currentExcelRow}`);
    sheet.getCell(`A${currentExcelRow}`).value = `RUC: ${company.ruc || ""}`;
    sheet.getCell(`A${currentExcelRow}`).font = { size: 10, color: { argb: "FF4B5563" } };
    currentExcelRow += 2;
  } else {
    currentExcelRow = 2;
  }

  const tableHeaderRow = currentExcelRow;

  sheet.columns = [
    { key: "name", width: 35 },
    { key: "document", width: 20 },
    { key: "contact", width: 40 },
    { key: "creditLimit", width: 16 },
    { key: "currentDebt", width: 16 },
    { key: "status", width: 14 },
  ];

  const headers = ["Cliente", "Documento", "Contacto", "Crédito", "Deuda", "Estado"];
  const headerRowObj = sheet.getRow(tableHeaderRow);

  headers.forEach((title, index) => {
    const cell = headerRowObj.getCell(index + 1);
    cell.value = title;
    cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 10 };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF0F172A" } };
    cell.alignment = {
      vertical: "middle",
      horizontal: (index === 3 || index === 4) ? "right" : (index === 5) ? "center" : "left",
    };
  });
  headerRowObj.height = 24;

  // NOTA: Se eliminó "currentExcelRow++;" de aquí porque "addRow" maneja las filas automáticamente.

  (customers || []).forEach((customer, index) => {
    const row = sheet.addRow({
      name: customer.name || "",
      document: `${customer.documentType || ""} ${customer.documentNumber || ""}`.trim() || "-",
      contact: `${customer.phone || ""} - ${customer.email || ""}`.trim() || "-",
      creditLimit: Number(customer.creditLimit || 0),
      currentDebt: Number(customer.currentDebt || 0),
      status: customer.isActive ? "ACTIVO" : "INACTIVO",
    });

    const isEven = index % 2 === 0;

    row.eachCell({ includeEmpty: true }, (cell, colIndex) => {
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: isEven ? "FFFFFFFF" : "FFF9FAFB" } };
      cell.border = { bottom: { style: "thin", color: { argb: "FFE5E7EB" } } };
      cell.alignment = {
        vertical: "middle",
        wrapText: true,
        horizontal: (colIndex === 4 || colIndex === 5) ? "right" : (colIndex === 6) ? "center" : "left",
      };

      if (colIndex === 4 || colIndex === 5) {
        cell.font = { size: 10, color: { argb: "FF1F2937" } };
        cell.numFormat = "\"S/\"#,##0.00";
        if (colIndex === 5 && cell.value > 0) {
          cell.font = { bold: true, color: { argb: "FFB91C1C" }, size: 10 };
        }
      } else if (colIndex === 6) {
        cell.font = {
          bold: true,
          size: 10,
          color: { argb: customer.isActive ? "FF16A34A" : "FF4B5563" },
        };
      } else {
        cell.font = { size: 10, color: { argb: "FF1F2937" } };
        if (colIndex === 1) cell.font = { bold: true, size: 10, color: { argb: "FF0F172A" } };
      }
    });

    row.height = 22;
  });

  sheet.views = [{ state: "frozen", ySplit: tableHeaderRow }];

  return await workbook.xlsx.writeBuffer();
};

module.exports = { generateCustomersExcel };
