const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");

const companyService = require("../../company/services/company.service");
const supplierService = require("../services/supplier.service");

exports.downloadSuppliersPDF = async (req, res, next) => {
    try {
        const companyId = req.user.companyId;

        const { data: suppliers = [] } = await supplierService.getSuppliers(
            companyId,
            {}
        );

        const company = await companyService.getById(companyId);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="suppliers-${companyId}.pdf"`
        );

        const doc = new PDFDocument({
            size: "A4",
            margin: 40,
        });

        doc.pipe(res);

        if (company) {
            doc.fontSize(16).text(company.name || "", {
                align: "center",
            });

            doc.fontSize(10).text(`RUC: ${company.ruc || ""}`, {
                align: "center",
            });

            doc.moveDown();
        }

        doc.fontSize(14).text("Listado de Proveedores");
        doc.moveDown();

        doc.font("Helvetica-Bold").fontSize(10);

        doc.text("Nombre", 40, doc.y, {
            continued: true,
            width: 200,
        });

        doc.text("Teléfono", 260, doc.y, {
            continued: true,
            width: 120,
        });

        doc.text("Email", 380, doc.y, {
            width: 160,
        });

        doc.moveDown(0.5);

        doc.font("Helvetica").fontSize(10);

        for (const supplier of suppliers) {
            doc.text(supplier.name || "", 40, doc.y, {
                continued: true,
                width: 200,
            });

            doc.text(supplier.phone || "", 260, doc.y, {
                continued: true,
                width: 120,
            });

            doc.text(supplier.email || "", 380, doc.y, {
                width: 160,
            });

            doc.moveDown(0.5);
        }

        doc.end();
    } catch (error) {
        next(error);
    }
}

exports.downloadSuppliersExcel = async (req, res, next) => {
    try {
        const companyId = req.user.companyId;

        const { data: suppliers = [] } = await supplierService.getSuppliers(
            companyId,
            {}
        );

        const company = await companyService.getById(companyId);

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Suppliers");

        if (company) {
            sheet.addRow([company.name || ""]);
            sheet.addRow([`RUC: ${company.ruc || ""}`]);
            sheet.addRow([]);
        }

        sheet.addRow(["Nombre", "Teléfono", "Email"]);

        for (const supplier of suppliers) {
            sheet.addRow([
                supplier.name || "",
                supplier.phone || "",
                supplier.email || "",
            ]);
        }

        const buffer = await workbook.xlsx.writeBuffer();

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="suppliers-${companyId}.xlsx"`
        );

        return res.send(buffer);
    } catch (error) {
        next(error);
    }
}
