const companyService = require("../../company/services/company.service");
// Apuntamos al index.js de la carpeta de servicios de clientes
const customerService = require("./customer.service");
const { generateCustomersPDF } = require("../utils/customer-pdf.generator");
const { generateCustomersExcel } = require("../utils/customer-excel.generator");

/**
 * Obtiene los datos necesarios para construir el reporte
 */
const getReportData = async (companyId) => {
    const id = companyId ? Number(companyId) : null;

    // Usamos customerService.getAll que viene de tu capa de lectura organizada
    const [customers, company] = await Promise.all([
        customerService.getAll(id),
        id ? companyService.getById(id) : null
    ]);

    return { customers, company };
};

module.exports = {
    getCustomersPDFReport: async (companyId) => {
        const { customers, company } = await getReportData(companyId);
        return await generateCustomersPDF(customers, company);
    },

    getCustomersExcelReport: async (companyId) => {
        const { customers, company } = await getReportData(companyId);
        return await generateCustomersExcel(customers, company);
    }
};