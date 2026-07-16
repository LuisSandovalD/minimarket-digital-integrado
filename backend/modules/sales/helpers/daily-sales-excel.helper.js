const ExcelJS = require("exceljs");

exports.generateDailySalesExcel = async ({ report, company, img }) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Daily Sales Layout");
  let headerStartRow = 1;

  if (company) {
    sheet.mergeCells(`B${headerStartRow}:F${headerStartRow}`);
    sheet.getCell(`B${headerStartRow}`).value = company.name || "";
    sheet.getCell(`B${headerStartRow}`).font = { bold: true, size: 14, color: { argb: "FF1F2937" } };
    headerStartRow++;

    sheet.mergeCells(`B${headerStartRow}:F${headerStartRow}`);
    sheet.getCell(`B${headerStartRow}`).value = `RUC: ${company.ruc || ""}`;
    sheet.getCell(`B${headerStartRow}`).font = { size: 10, color: { argb: "FF4B5563" } };
    headerStartRow += 2;
  } else {
    headerStartRow = 4;
  }

  if (img?.buffer) {
    try {
      const ext = img.extension || "png";
      const imgId = workbook.addImage({ buffer: img.buffer, extension: ext });
      sheet.addImage(imgId, { tl: { col: 0, row: 0 }, ext: { width: 55, height: 55 } });
    } catch (_) {
      /* Silenciar error si la imagen no se puede cargar o procesar en el Excel */
    }
  }

  const tableHeaderRow = headerStartRow;
  const colsConfig = [
    { label: "VENTA", width: 22 }, { label: "CLIENTE", width: 26 }, { label: "SUBTOTAL", width: 16 },
    { label: "DESCUENTO", width: 16 }, { label: "TOTAL", width: 16 }, { label: "PRODUCTOS", width: 18 },
  ];

  colsConfig.forEach((col, index) => {
    const cell = sheet.getCell(tableHeaderRow, index + 1);
    cell.value = col.label;
    sheet.getColumn(index + 1).width = col.width;
    cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 10 };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF0F172A" } };
    cell.alignment = {
      vertical: "middle",
      horizontal: ["SUBTOTAL", "DESCUENTO", "TOTAL"].includes(col.label) ? "right" : (col.label === "PRODUCTOS" ? "center" : "left"),
    };
  });

  let currentExcelRow = tableHeaderRow + 1;

  (report || []).forEach((r) => {
    const rowData = [
      r.code || r.id || r.description || "",
      r.customerName || r.client || r.label || "Cliente General",
      Number(r.subtotal || 0), Number(r.discount || 0), Number(r.total || r.amount || 0),
      `${r.productsCount || r.quantity || 1} Productos`,
    ];

    sheet.insertRow(currentExcelRow, rowData);

    sheet.getCell(`A${currentExcelRow}`).font = { bold: true, color: { argb: "FF2563EB" } };
    sheet.getCell(`B${currentExcelRow}`).font = { color: { argb: "FF1F2937" } };

    ["C", "D", "E"].forEach((col) => {
      const cell = sheet.getCell(`${col}${currentExcelRow}`);
      cell.numFmt = "[$S/. ]#,##0.00";
      if (col === "C") cell.font = { color: { argb: "FF2563EB" } };
      if (col === "D") cell.font = { color: { argb: "FF4B5563" } };
      if (col === "E") cell.font = { bold: true, color: { argb: "FF000000" } };
    });

    sheet.getCell(`F${currentExcelRow}`).alignment = { horizontal: "center" };

    for (let colIdx = 1; colIdx <= 6; colIdx++) {
      sheet.getCell(currentExcelRow, colIdx).border = { bottom: { style: "thin", color: { argb: "FFE5E7EB" } } };
    }
    currentExcelRow++;
  });

  sheet.getCell(`A${currentExcelRow}`).value = "TOTAL GENERAL";
  sheet.getCell(`A${currentExcelRow}`).font = { bold: true, size: 11 };

  const dataStartRow = tableHeaderRow + 1;
  const dataEndRow = currentExcelRow - 1;

  ["C", "D", "E"].forEach((col) => {
    const cell = sheet.getCell(`${col}${currentExcelRow}`);
    cell.value = { formula: `SUM(${col}${dataStartRow}:${col}${dataEndRow})` };
    cell.numFmt = "[$S/. ]#,##0.00";
    cell.font = { bold: true, color: col === "E" ? { argb: "FF000000" } : undefined };
  });

  for (let colIdx = 1; colIdx <= 6; colIdx++) {
    sheet.getCell(currentExcelRow, colIdx).border = {
      top: { style: "thin", color: { argb: "FF9CA3AF" } },
      bottom: { style: "double", color: { argb: "FF1F2937" } },
    };
  }

  sheet.views = [{ state: "frozen", ySplit: tableHeaderRow }];
  return workbook.xlsx.writeBuffer();
};
