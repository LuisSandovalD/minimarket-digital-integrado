const companyService = require("../../company/services/company.service");
const inventoryService = require("../services/inventory.service");
const { fetchImageBuffer } = require("../../reports/report-helpers");
const { generateInventoryPDF } = require("../helpers/inventory-pdf.helper");
const { generateInventoryExcel } = require("../helpers/inventory-excel.helper");

function transformInventory(data) {
  return (data || []).map((item) => {
    const stock = Number(item.stock || 0);
    const reservado = Number(item.reserved || item.reservado || 0);
    const danado = Number(item.damaged || item.damagedStock || item.dañado || 0);
    const disponible = Number(item.available !== undefined ? item.available : (stock - reservado - danado));

    let estado = "DISPONIBLE";
    if (disponible <= 0) estado = "SIN STOCK";
    else if (item.minStock && disponible <= item.minStock) estado = "STOCK BAJO";

    return {
      productName: item.product?.name || item.productName || item.name || "-",
      branchName: item.branch?.name || item.branchName || item.sucursal || "Sede Central",
      stock, reservado, danado, disponible, estado,
    };
  });
}

async function getCompanyReportData(companyId) {
  const company = companyId ? await companyService.getById(Number(companyId)) : null;
  let img = null;
  if (company?.logo) img = await fetchImageBuffer(company.logo);
  return { company, img };
}

module.exports = {
  downloadInventoryPDFController: async (req, res, next) => {
    try {
      const { companyId } = req.query;

      // 🛠️ CORRECCIÓNaquí: Extraemos { data } del objeto devuelto por el service
      const { data } = await inventoryService.getAll({ companyId: Number(companyId) });
      const inventory = transformInventory(data);
      const { company, img } = await getCompanyReportData(companyId);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="inventory-${companyId || "report"}.pdf"`);

      const doc = generateInventoryPDF({ inventory, company, img });
      doc.pipe(res);
    } catch (error) { next(error); }
  },

  downloadInventoryExcelController: async (req, res, next) => {
    try {
      const { companyId } = req.query;

      // 🛠️ CORRECCIÓN aquí también para el Excel
      const { data } = await inventoryService.getAll({ companyId: Number(companyId) });
      const inventory = transformInventory(data);
      const { company, img } = await getCompanyReportData(companyId);

      const buffer = await generateInventoryExcel({ inventory, company, img });

      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", `attachment; filename="inventory-${companyId || "report"}.xlsx"`);
      return res.send(buffer);
    } catch (error) { next(error); }
  },
};
