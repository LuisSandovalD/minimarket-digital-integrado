const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");
const companyService = require("../../company/services/company.service");
const supplierService = require("../services/supplier.service");

module.exports = {
    downloadSuppliersPDFController: async (req, res, next) => {
        try {
            const { companyId } = req.query;
            const result = await supplierService.getSuppliers(Number(companyId), {});
            const suppliers = result && result.data ? result.data : [];

            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename="suppliers-${companyId || 'report'}.pdf"`);
            const doc = new PDFDocument({ size: "A4", margin: 40 });
            doc.pipe(res);

            const company = companyId ? await companyService.getById(Number(companyId)) : null;
            if (company) {
                doc.fontSize(16).text(company.name || "", { align: "center" });
                doc.fontSize(10).text(`RUC: ${company.ruc || ""}`, { align: "center" });
            }

            doc.moveDown(1);
            doc.fontSize(14).text("Listado de Proveedores", { align: "left" });
            doc.moveDown(0.5);

            doc.fontSize(10).font('Helvetica-Bold');
            doc.text('Nombre', 40, doc.y, { continued: true, width: 200 });
            doc.text('Teléfono', 260, doc.y, { continued: true, width: 120 });
            doc.text('Email', 380, doc.y, { width: 160 });
            doc.moveDown(0.5);
            doc.font('Helvetica').fontSize(10);

            for (const c of Array.isArray(suppliers) ? suppliers : []) {
                doc.text(c.name || '', 40, doc.y, { continued: true, width: 200 });
                doc.text(c.phone || '', 260, doc.y, { continued: true, width: 120 });
                doc.text(c.email || '', 380, doc.y, { width: 160 });
                doc.moveDown(0.5);
            }

            doc.end();
        } catch (error) { next(error); }
    },

    downloadSuppliersExcelController: async (req, res, next) => {
        try {
            const { companyId } = req.query;
            const result = await supplierService.getSuppliers(Number(companyId), {});
            const suppliers = result && result.data ? result.data : [];

            const workbook = new ExcelJS.Workbook();
            const sheet = workbook.addWorksheet('Suppliers');

            const company = companyId ? await companyService.getById(Number(companyId)) : null;
            if (company) {
                sheet.addRow([company.name || '']);
                sheet.addRow([`RUC: ${company.ruc || ''}`]);
                sheet.addRow([]);
            }

            sheet.addRow(['Nombre', 'Teléfono', 'Email']);
            (Array.isArray(suppliers) ? suppliers : []).forEach((c) => {
                sheet.addRow([c.name || '', c.phone || '', c.email || '']);
            });

            const buffer = await workbook.xlsx.writeBuffer();
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', `attachment; filename="suppliers-${companyId || 'report'}.xlsx"`);
            return res.send(buffer);
        } catch (error) { next(error); }
    },
};
