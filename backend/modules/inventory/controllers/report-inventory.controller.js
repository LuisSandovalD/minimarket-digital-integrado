// =========================================================================
// controllers/inventory-report.controller.js
// =========================================================================

const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");
const companyService = require("../../company/services/company.service");
const inventoryService = require("../services/inventory.service");
const { fetchImageBuffer } = require("../../reports/report-helpers");

/**
 * Normaliza y calcula de manera segura los datos provenientes del inventario
 */
function transformInventory(data) {
    return (data || []).map((item) => {
        const stock = Number(item.stock || 0);
        const reservado = Number(item.reserved || item.reservado || 0);
        const danado = Number(item.damaged || item.damagedStock || item.dañado || 0);

        // Disponible = Stock Total - Reservado - Dañado
        const disponible = Number(item.available !== undefined ? item.available : (stock - reservado - danado));

        // Determinación del Estado en base al disponible
        let estado = "DISPONIBLE";
        if (disponible <= 0) {
            estado = "SIN STOCK";
        } else if (item.minStock && disponible <= item.minStock) {
            estado = "STOCK BAJO";
        }

        return {
            productName: item.product?.name || item.productName || item.name || "-",
            branchName: item.branch?.name || item.branchName || item.sucursal || "Sede Central",
            stock,
            reservado,
            danado,
            disponible,
            estado
        };
    });
}

module.exports = {
    // ========================================
    // INVENTORY REPORT - DOWNLOAD PDF
    // ========================================
    downloadInventoryPDFController: async (req, res, next) => {
        try {
            const { companyId } = req.query;
            const rawData = await inventoryService.getAll(Number(companyId));
            const inventory = transformInventory(rawData);

            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename="inventory-${companyId || "report"}.pdf"`);

            // Cambiado a LANDSCAPE para distribuir correctamente las 7 columnas
            const doc = new PDFDocument({ size: "A4", margin: 35, layout: "landscape" });
            doc.pipe(res);

            // Cabecera Institucional de la Empresa
            const company = companyId ? await companyService.getById(Number(companyId)) : null;
            let img = null;
            if (company?.logo) img = await fetchImageBuffer(company.logo);
            if (img?.buffer) {
                try { doc.image(img.buffer, 35, 35, { width: 50 }); } catch (_) { }
            }

            const headerX = img?.buffer ? 95 : 35;
            if (company) {
                doc.fontSize(12).font("Helvetica-Bold").fillColor("#1f2937").text(company.name || "", headerX, 35);
                doc.fontSize(9).font("Helvetica").fillColor("#4b5563").text(`RUC: ${company.ruc || ""}`, headerX, 49);
            }

            doc.fontSize(16).font("Helvetica-Bold").fillColor("#0f172a").text("Reporte de Control de Inventario", { align: "center" });
            doc.moveDown(1.5);

            // Estructura de anchos de columnas (Total ~772px disponibles en A4 Horizontal)
            const colWidths = {
                product: 212,
                branch: 130,
                stock: 65,
                reserved: 70,
                damaged: 65,
                available: 75,
                status: 85
            };
            const tableWidth = Object.values(colWidths).reduce((a, b) => a + b, 0);
            const startX = 35;

            const drawTableHeader = (yPos) => {
                doc.rect(startX, yPos, tableWidth, 22).fill('#0f172a'); // Fondo Slate Dark
                doc.fillColor('#ffffff').fontSize(8).font('Helvetica-Bold');

                let currentX = startX;
                doc.text('PRODUCTO', currentX + 5, yPos + 7, { width: colWidths.product - 10 }); currentX += colWidths.product;
                doc.text('SUCURSAL / ALMACÉN', currentX + 5, yPos + 7, { width: colWidths.branch - 10 }); currentX += colWidths.branch;
                doc.text('STOCK TOT.', currentX + 5, yPos + 7, { width: colWidths.stock - 10, align: 'right' }); currentX += colWidths.stock;
                doc.text('RESERVADO', currentX + 5, yPos + 7, { width: colWidths.reserved - 10, align: 'right' }); currentX += colWidths.reserved;
                doc.text('DAÑADO', currentX + 5, yPos + 7, { width: colWidths.damaged - 10, align: 'right' }); currentX += colWidths.damaged;
                doc.text('DISPONIBLE', currentX + 5, yPos + 7, { width: colWidths.available - 10, align: 'right' }); currentX += colWidths.available;
                doc.text('ESTADO', currentX + 5, yPos + 7, { width: colWidths.status - 10, align: 'center' });

                return yPos + 22;
            };

            let y = drawTableHeader(doc.y);
            let rowIndex = 0;

            for (const row of inventory) {
                // Cálculo de altura dinámica por si el nombre del producto es excesivamente largo
                const hProd = doc.heightOfString(row.productName, { width: colWidths.product - 10 });
                const rowHeight = Math.max(hProd, 16) + 8;

                // Control de salto de página
                if (y + rowHeight > doc.page.height - doc.page.margins.bottom - 20) {
                    doc.addPage();
                    y = drawTableHeader(doc.page.margins.top);
                    rowIndex = 0;
                }

                // Fila Alternada Gris Claro
                if (rowIndex % 2 === 0) {
                    doc.rect(startX, y, tableWidth, rowHeight).fill('#f9fafb');
                }

                doc.fillColor('#1f2937').fontSize(8.5).font('Helvetica');
                let cX = startX;

                // Render de Celdas
                doc.font('Helvetica-Bold').text(row.productName, cX + 5, y + 5, { width: colWidths.product - 10 }); doc.font('Helvetica'); cX += colWidths.product;
                doc.text(row.branchName, cX + 5, y + 5, { width: colWidths.branch - 10 }); cX += colWidths.branch;
                doc.text(String(row.stock), cX + 5, y + 5, { width: colWidths.stock - 10, align: 'right' }); cX += colWidths.stock;
                doc.text(String(row.reservado), cX + 5, y + 5, { width: colWidths.reserved - 10, align: 'right' }); cX += colWidths.reserved;

                // Coloración de advertencia si hay stock dañado
                if (row.danado > 0) doc.fillColor('#dc2626');
                doc.text(String(row.danado), cX + 5, y + 5, { width: colWidths.damaged - 10, align: 'right' }); doc.fillColor('#1f2937'); cX += colWidths.damaged;

                doc.font('Helvetica-Bold').text(String(row.disponible), cX + 5, y + 5, { width: colWidths.available - 10, align: 'right' }); doc.font('Helvetica'); cX += colWidths.available;

                // Color dinámico para la columna de Estado
                let statusColor = '#16a34a'; // Verde
                if (row.estado === "SIN STOCK") statusColor = '#dc2626'; // Rojo
                if (row.estado === "STOCK BAJO") statusColor = '#ca8a04'; // Ámbar

                doc.fillColor(statusColor).font('Helvetica-Bold').text(row.estado, cX + 5, y + 5, { width: colWidths.status - 10, align: 'center' });

                // Separador de fila
                doc.moveTo(startX, y + rowHeight).lineTo(startX + tableWidth, y + rowHeight).strokeColor('#e5e7eb').lineWidth(0.5).stroke();

                y += rowHeight;
                rowIndex++;
            }

            doc.end();
        } catch (error) { next(error); }
    },

    // ========================================
    // INVENTORY REPORT - DOWNLOAD EXCEL
    // ========================================
    downloadInventoryExcelController: async (req, res, next) => {
        try {
            const { companyId } = req.query;
            const rawData = await inventoryService.getAll(Number(companyId));
            const inventory = transformInventory(rawData);

            const workbook = new ExcelJS.Workbook();
            const sheet = workbook.addWorksheet('Inventario General');

            const company = companyId ? await companyService.getById(Number(companyId)) : null;
            let img = null;
            if (company && company.logo) img = await fetchImageBuffer(company.logo);

            let currentExcelRow = 1;
            if (company) {
                sheet.mergeCells(`A${currentExcelRow}:G${currentExcelRow}`);
                sheet.getCell(`A${currentExcelRow}`).value = company.name || '';
                sheet.getCell(`A${currentExcelRow}`).font = { bold: true, size: 14, color: { argb: "FF1F2937" } };
                currentExcelRow++;

                sheet.mergeCells(`A${currentExcelRow}:G${currentExcelRow}`);
                sheet.getCell(`A${currentExcelRow}`).value = `RUC: ${company.ruc || ''}`;
                sheet.getCell(`A${currentExcelRow}`).font = { size: 10, color: { argb: "FF4B5563" } };
                currentExcelRow += 2;
            } else {
                currentExcelRow = 3;
            }

            if (img?.buffer) {
                try {
                    const imgId = workbook.addImage({ buffer: img.buffer, extension: img.extension || 'png' });
                    sheet.addImage(imgId, { tl: { col: 0, row: 0 }, ext: { width: 100, height: 45 } });
                } catch (_) { }
            }

            const tableHeaderRow = currentExcelRow;

            // Configuración estricta de las 7 columnas solicitadas
            sheet.columns = [
                { key: 'productName', width: 35 },
                { key: 'branchName', width: 22 },
                { key: 'stock', width: 14 },
                { key: 'reservado', width: 14 },
                { key: 'danado', width: 14 },
                { key: 'disponible', width: 15 },
                { key: 'estado', width: 16 }
            ];

            const headers = ['Producto', 'Sucursal', 'Stock', 'Reservado', 'Dañado', 'Disponible', 'Estado'];
            const headerRowObj = sheet.getRow(tableHeaderRow);

            headers.forEach((h, i) => {
                const cell = headerRowObj.getCell(i + 1);
                cell.value = h;
                cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 10 };
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } }; // Slate Dark Header
                cell.alignment = { vertical: 'middle', horizontal: (i >= 2 && i <= 5) ? 'right' : 'center' };
            });
            headerRowObj.height = 24;
            currentExcelRow++;

            // Insertar datos del Inventario
            inventory.forEach((r, idx) => {
                const row = sheet.addRow({
                    productName: r.productName,
                    branchName: r.branchName,
                    stock: r.stock,
                    reservado: r.reservado,
                    danado: r.danado,
                    disponible: r.disponible,
                    estado: r.estado
                });

                const isEven = idx % 2 === 0;
                row.eachCell({ includeEmpty: true }, (cell, colIndex) => {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: isEven ? 'FFFFFFFF' : 'FFF9FAFB' } };
                    cell.alignment = {
                        vertical: 'middle',
                        wrapText: true,
                        horizontal: (colIndex >= 3 && colIndex <= 6) ? 'right' : 'left'
                    };

                    if (colIndex === 7) {
                        cell.alignment = { horizontal: 'center' };
                        // Colorear texto del estado de forma condicional
                        if (r.estado === 'SIN STOCK') cell.font = { bold: true, color: { argb: 'FFDC2626' } };
                        else if (r.estado === 'STOCK BAJO') cell.font = { bold: true, color: { argb: 'FFCA8A04' } };
                        else cell.font = { bold: true, color: { argb: 'FF16A34A' } };
                    } else {
                        cell.font = { size: 10, color: { argb: 'FF1F2937' } };
                        if (colIndex === 1 || colIndex === 6) cell.font = { bold: true, size: 10, color: { argb: 'FF0F172A' } };
                    }

                    cell.border = { bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } } };
                });
                row.height = 20;
            });

            // Forzar congelamiento de paneles en la cabecera
            sheet.views = [{ state: 'frozen', ySplit: tableHeaderRow }];

            const buffer = await workbook.xlsx.writeBuffer();
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', `attachment; filename="inventory-${companyId || 'report'}.xlsx"`);
            return res.send(buffer);

        } catch (error) { next(error); }
    },
};