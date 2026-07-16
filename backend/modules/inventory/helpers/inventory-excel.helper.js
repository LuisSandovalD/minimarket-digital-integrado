const ExcelJS = require("exceljs");

exports.generateInventoryExcel = async ({ inventory, company, img }) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Inventario General");
  let currentExcelRow = 1;

  if (company) {
    sheet.mergeCells(`A${currentExcelRow}:G${currentExcelRow}`);
    sheet.getCell(`A${currentExcelRow}`).value = company.name || "";
    sheet.getCell(`A${currentExcelRow}`).font = { bold: true, size: 14, color: { argb: "FF1F2937" } };
    currentExcelRow++;

    sheet.mergeCells(`A${currentExcelRow}:G${currentExcelRow}`);
    sheet.getCell(`A${currentExcelRow}`).value = `RUC: ${company.ruc || ""}`;
    sheet.getCell(`A${currentExcelRow}`).font = { size: 10, color: { argb: "FF4B5563" } };
    currentExcelRow += 2;
  } else {
    currentExcelRow = 3;
  }

  if (img?.buffer) {
    try {
      const imgId = workbook.addImage({ buffer: img.buffer, extension: img.extension || "png" });
      sheet.addImage(imgId, { tl: { col: 0, row: 0 }, ext: { width: 100, height: 45 } });
    } catch (_) { }
  }

  const tableHeaderRow = currentExcelRow;
  sheet.columns = [
    { key: "productName", width: 35 }, { key: "branchName", width: 22 }, { key: "stock", width: 14 },
    { key: "reservado", width: 14 }, { key: "danado", width: 14 }, { key: "disponible", width: 15 }, { key: "estado", width: 16 },
  ];

  const headers = ["Producto", "Sucursal", "Stock", "Reservado", "Dañado", "Disponible", "Estado"];
  const headerRowObj = sheet.getRow(tableHeaderRow);

  headers.forEach((h, i) => {
    const cell = headerRowObj.getCell(i + 1);
    cell.value = h;
    cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 10 };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF0F172A" } };
    cell.alignment = { vertical: "middle", horizontal: (i >= 2 && i <= 5) ? "right" : "center" };
  });
  headerRowObj.height = 24;

  inventory.forEach((r, idx) => {
    const row = sheet.addRow({
      productName: r.productName, branchName: r.branchName, stock: r.stock,
      reservado: r.reservado, danado: r.danado, disponible: r.disponible, estado: r.estado,
    });
    const isEven = idx % 2 === 0;

    row.eachCell({ includeEmpty: true }, (cell, colIndex) => {
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: isEven ? "FFFFFFFF" : "FFF9FAFB" } };
      cell.alignment = { vertical: "middle", wrapText: true, horizontal: (colIndex >= 3 && colIndex <= 6) ? "right" : "left" };

      if (colIndex === 7) {
        cell.alignment = { horizontal: "center" };
        if (r.estado === "SIN STOCK") cell.font = { bold: true, color: { argb: "FFDC2626" } };
        else if (r.estado === "STOCK BAJO") cell.font = { bold: true, color: { argb: "FFCA8A04" } };
        else cell.font = { bold: true, color: { argb: "FF16A34A" } };
      } else {
        cell.font = { size: 10, color: { argb: "FF1F2937" } };
        if (colIndex === 1 || colIndex === 6) cell.font = { bold: true, size: 10, color: { argb: "FF0F172A" } };
      }
      cell.border = { bottom: { style: "thin", color: { argb: "FFE5E7EB" } } };
    });
    row.height = 20;
  });

  sheet.views = [{ state: "frozen", ySplit: tableHeaderRow }];
  return workbook.xlsx.writeBuffer();
};
