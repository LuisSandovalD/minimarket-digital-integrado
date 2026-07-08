const ExcelJS = require("exceljs");

exports.generateTopProductsExcel = async ({ report, company, imgBuf }) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Top Products");
    let headerIdx = 1;

    if (company) {
        sheet.mergeCells(`B${headerIdx}:C${headerIdx}`);
        sheet.getCell(`B${headerIdx}`).value = company.name || "";
        sheet.getCell(`B${headerIdx}`).font = { bold: true, size: 14 };
        headerIdx++;
        sheet.mergeCells(`B${headerIdx}:C${headerIdx}`);
        sheet.getCell(`B${headerIdx}`).value = `RUC: ${company.ruc || ""}`;
        headerIdx += 2;
    } else {
        headerIdx = 4;
    }

    if (imgBuf?.buffer) {
        try {
            const ext = imgBuf.extension || 'png';
            const imgId = workbook.addImage({ buffer: imgBuf.buffer, extension: ext });
            sheet.addImage(imgId, { tl: { col: 0, row: 0 }, ext: { width: 55, height: 55 } });
        } catch (_) { }
    }

    const colsConfig2 = [
        { label: "Producto", width: 50 }, { label: "Cantidad", width: 18 }, { label: "Total", width: 20 }
    ];

    colsConfig2.forEach((col, index) => {
        const cell = sheet.getCell(headerIdx, index + 1);
        cell.value = col.label;
        sheet.getColumn(index + 1).width = col.width;
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
        cell.alignment = { vertical: 'middle', horizontal: index === 0 ? 'left' : 'right' };
    });

    let currentExcelRow2 = headerIdx + 1;

    (report || []).forEach((r) => {
        const rowData = [r.productName || r.name || "", Number(r.quantity || r.count || 0), Number(r.total || r.amount || 0)];
        sheet.insertRow(currentExcelRow2, rowData);

        sheet.getCell(`A${currentExcelRow2}`).font = { color: { argb: 'FF1F2937' } };
        sheet.getCell(`B${currentExcelRow2}`).alignment = { horizontal: 'right' };

        const totalCell = sheet.getCell(`C${currentExcelRow2}`);
        totalCell.numFmt = '[$S/. ]#,##0.00';
        totalCell.font = { bold: true };

        for (let i = 1; i <= 3; i++) {
            sheet.getCell(currentExcelRow2, i).border = { bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } } };
        }
        currentExcelRow2++;
    });

    const dataStart2 = headerIdx + 1;
    const dataEndRow2 = currentExcelRow2 - 1;

    sheet.getCell(`A${currentExcelRow2}`).value = 'Totales';
    sheet.getCell(`A${currentExcelRow2}`).font = { bold: true };
    sheet.getCell(`B${currentExcelRow2}`).value = { formula: `SUM(B${dataStart2}:B${dataEndRow2})` };
    sheet.getCell(`B${currentExcelRow2}`).font = { bold: true };
    sheet.getCell(`C${currentExcelRow2}`).value = { formula: `SUM(C${dataStart2}:C${dataEndRow2})` };
    sheet.getCell(`C${currentExcelRow2}`).numFmt = '[$S/. ]#,##0.00';
    sheet.getCell(`C${currentExcelRow2}`).font = { bold: true };

    for (let i = 1; i <= 3; i++) {
        sheet.getCell(currentExcelRow2, i).border = {
            top: { style: 'thin', color: { argb: 'FF9CA3AF' } },
            bottom: { style: 'double', color: { argb: 'FF1F2937' } }
        };
    }

    sheet.views = [{ state: 'frozen', ySplit: headerIdx }];
    return workbook.xlsx.writeBuffer();
};