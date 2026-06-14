// =========================================================================
// controllers/customer-report.controller.js
// =========================================================================

const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");
const companyService = require("../../company/services/company.service");
const getCustomersService = require("../services/get-customers.service");

module.exports = {
    // ========================================
    // CUSTOMER REPORT - DOWNLOAD PDF
    // ========================================
    downloadCustomersPDFController: async (req, res, next) => {
        try {
            const { companyId } = req.query;

            const customers = await getCustomersService(Number(companyId));
            const company = companyId ? await companyService.getById(Number(companyId)) : null;

            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename="customers-${companyId || "report"}.pdf"`);

            // Usamos formato Portrait estándar (A4 Vertical) ya que 6 columnas se adaptan perfectamente
            const doc = new PDFDocument({ size: "A4", margin: 40 });
            doc.pipe(res);

            // Cabecera Institucional
            if (company) {
                doc.fontSize(12).font("Helvetica-Bold").fillColor("#1f2937").text(company.name || "", 40, 40);
                doc.fontSize(9).font("Helvetica").fillColor("#4b5563").text(`RUC: ${company.ruc || ""}`, 40, 54);
            }

            doc.fontSize(16).font("Helvetica-Bold").fillColor("#0f172a").text("Reporte Maestro de Clientes", { align: "center" });
            doc.moveDown(1.5);

            // Anchos de columna calculados para un ancho útil de 515px (A4: 595 - 80 de márgenes)
            const colWidths = {
                customer: 135,
                document: 85,
                contact: 125,
                credit: 60,
                debt: 60,
                status: 50
            };
            const tableWidth = Object.values(colWidths).reduce((a, b) => a + b, 0);
            const startX = 40;

            const drawTableHeader = (yPos) => {
                doc.rect(startX, yPos, tableWidth, 22).fill('#0f172a'); // Fondo Slate Dark
                doc.fillColor('#ffffff').fontSize(8).font('Helvetica-Bold');

                let currentX = startX;
                doc.text('CLIENTE', currentX + 5, yPos + 7, { width: colWidths.customer - 10 }); currentX += colWidths.customer;
                doc.text('DOCUMENTO', currentX + 5, yPos + 7, { width: colWidths.document - 10 }); currentX += colWidths.document;
                doc.text('CONTACTO', currentX + 5, yPos + 7, { width: colWidths.contact - 10 }); currentX += colWidths.contact;
                doc.text('CRÉDITO', currentX + 5, yPos + 7, { width: colWidths.credit - 10, align: 'right' }); currentX += colWidths.credit;
                doc.text('DEUDA', currentX + 5, yPos + 7, { width: colWidths.debt - 10, align: 'right' }); currentX += colWidths.debt;
                doc.text('ESTADO', currentX + 5, yPos + 7, { width: colWidths.status - 10, align: 'center' });

                return yPos + 22;
            };

            let y = drawTableHeader(doc.y);
            let rowIndex = 0;

            for (const customer of (customers || [])) {
                const documento = `${customer.documentType || ""} ${customer.documentNumber || ""}`.trim() || "-";
                const contacto = `${customer.phone || ""}\n${customer.email || ""}`.trim() || "-";
                const credito = Number(customer.creditLimit || 0);
                const deuda = Number(customer.currentDebt || 0);
                const estado = customer.isActive ? "ACTIVO" : "INACTIVO";

                // Calcular la altura dinámica basada en los textos multilínea (Cliente o Contacto)
                const hCust = doc.heightOfString(customer.name || "", { width: colWidths.customer - 10 });
                const hCont = doc.heightOfString(contacto, { width: colWidths.contact - 10 });
                const rowHeight = Math.max(hCust, hCont, 18) + 10;

                // Control de desbordamiento de página
                if (y + rowHeight > doc.page.height - doc.page.margins.bottom - 20) {
                    doc.addPage();
                    y = drawTableHeader(doc.page.margins.top);
                    rowIndex = 0;
                }

                // Estilo de fila intercalada
                if (rowIndex % 2 === 0) {
                    doc.rect(startX, y, tableWidth, rowHeight).fill('#f9fafb');
                }

                doc.fillColor('#1f2937').fontSize(8).font('Helvetica');
                let cX = startX;

                // Renderizar datos en las columnas correspondientes
                doc.font('Helvetica-Bold').text(customer.name || "", cX + 5, y + 6, { width: colWidths.customer - 10 }); doc.font('Helvetica'); cX += colWidths.customer;
                doc.text(documento, cX + 5, y + 6, { width: colWidths.document - 10 }); cX += colWidths.document;
                doc.text(contacto, cX + 5, y + 6, { width: colWidths.contact - 10 }); cX += colWidths.contact;

                doc.text(`S/ ${credito.toFixed(2)}`, cX + 5, y + 6, { width: colWidths.credit - 10, align: 'right' }); cX += colWidths.credit;

                // Si tiene deuda acumulada, cambiamos sutilmente el color a una alerta visual
                if (deuda > 0) doc.fillColor('#b91c1c').font('Helvetica-Bold');
                doc.text(`S/ ${deuda.toFixed(2)}`, cX + 5, y + 6, { width: colWidths.debt - 10, align: 'right' });
                doc.fillColor('#1f2937').font('Helvetica');
                cX += colWidths.debt;

                // Color según estado del cliente
                const statusColor = customer.isActive ? '#16a34a' : '#4b5563';
                doc.fillColor(statusColor).font('Helvetica-Bold').text(estado, cX + 5, y + 6, { width: colWidths.status - 10, align: 'center' });

                // Línea divisoria inferior
                doc.moveTo(startX, y + rowHeight).lineTo(startX + tableWidth, y + rowHeight).strokeColor('#e5e7eb').lineWidth(0.5).stroke();

                y += rowHeight;
                rowIndex++;
            }

            doc.end();
        } catch (error) { next(error); }
    },

    // ========================================
    // CUSTOMER REPORT - DOWNLOAD EXCEL
    // ========================================
    downloadCustomersExcelController: async (req, res, next) => {
        try {
            const { companyId } = req.query;

            const customers = await getCustomersService(Number(companyId));
            const company = companyId ? await companyService.getById(Number(companyId)) : null;

            const workbook = new ExcelJS.Workbook();
            const sheet = workbook.addWorksheet("Clientes");

            // Metadatos de Cabecera en la Hoja
            let currentExcelRow = 1;
            if (company) {
                sheet.mergeCells(`A${currentExcelRow}:F${currentExcelRow}`);
                sheet.getCell(`A${currentExcelRow}`).value = company.name || '';
                sheet.getCell(`A${currentExcelRow}`).font = { bold: true, size: 14, color: { argb: "FF1F2937" } };
                currentExcelRow++;

                sheet.mergeCells(`A${currentExcelRow}:F${currentExcelRow}`);
                sheet.getCell(`A${currentExcelRow}`).value = `RUC: ${company.ruc || ''}`;
                sheet.getCell(`A${currentExcelRow}`).font = { size: 10, color: { argb: "FF4B5563" } };
                currentExcelRow += 2; // Dejar espacio en blanco estructural antes de la tabla
            } else {
                currentExcelRow = 2;
            }

            const tableHeaderRow = currentExcelRow;

            // Mapeo riguroso de las 6 columnas solicitadas
            sheet.columns = [
                { key: 'name', width: 35 },
                { key: 'document', width: 20 },
                { key: 'contact', width: 40 },
                { key: 'creditLimit', width: 16 },
                { key: 'currentDebt', width: 16 },
                { key: 'status', width: 14 }
            ];

            const headers = ['Cliente', 'Documento', 'Contacto', 'Crédito', 'Deuda', 'Estado'];
            const headerRowObj = sheet.getRow(tableHeaderRow);

            headers.forEach((title, index) => {
                const cell = headerRowObj.getCell(index + 1);
                cell.value = title;
                cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 10 };
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } }; // Slate Dark Header
                cell.alignment = {
                    vertical: 'middle',
                    horizontal: (index === 3 || index === 4) ? 'right' : (index === 5) ? 'center' : 'left'
                };
            });
            headerRowObj.height = 24;
            currentExcelRow++;

            // Inyección de filas de datos
            (customers || []).forEach((customer, index) => {
                const row = sheet.addRow({
                    name: customer.name || "",
                    document: `${customer.documentType || ""} ${customer.documentNumber || ""}`.trim() || "-",
                    contact: `${customer.phone || ""} - ${customer.email || ""}`.trim() || "-",
                    creditLimit: Number(customer.creditLimit || 0),
                    currentDebt: Number(customer.currentDebt || 0),
                    status: customer.isActive ? "ACTIVO" : "INACTIVO"
                });

                const isEven = index % 2 === 0;

                row.eachCell({ includeEmpty: true }, (cell, colIndex) => {
                    // Diseño estético alternado
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: isEven ? 'FFFFFFFF' : 'FFF9FAFB' } };
                    cell.border = { bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } } };

                    cell.alignment = {
                        vertical: 'middle',
                        wrapText: true,
                        horizontal: (colIndex === 4 || colIndex === 5) ? 'right' : (colIndex === 6) ? 'center' : 'left'
                    };

                    // Formateo y tipografía por columna
                    if (colIndex === 4 || colIndex === 5) {
                        cell.font = { size: 10, color: { argb: 'FF1F2937' } };
                        cell.numFormat = '"S/"#,##0.00'; // Formato de moneda local (Soles)
                        if (colIndex === 5 && cell.value > 0) {
                            cell.font = { bold: true, color: { argb: 'FFB91C1C' }, size: 10 }; // Resaltar deudores en rojo
                        }
                    } else if (colIndex === 6) {
                        cell.font = {
                            bold: true,
                            size: 10,
                            color: { argb: customer.isActive ? 'FF16A34A' : 'FF4B5563' }
                        };
                    } else {
                        cell.font = { size: 10, color: { argb: 'FF1F2937' } };
                        if (colIndex === 1) cell.font = { bold: true, size: 10, color: { argb: 'FF0F172A' } };
                    }
                });

                row.height = 22;
            });

            // Paneles bloqueados bajo los encabezados
            sheet.views = [{ state: 'frozen', ySplit: tableHeaderRow }];

            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", `attachment; filename="customers-${companyId || "report"}.xlsx"`);

            const buffer = await workbook.xlsx.writeBuffer();
            return res.send(buffer);

        } catch (error) { next(error); }
    }
};