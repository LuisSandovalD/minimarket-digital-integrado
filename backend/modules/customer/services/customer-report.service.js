const companyService = require("../../company/services/company.service");
const customerService = require("./customer.service");

const {
    generateCustomersPDF,
} = require("../utils/customer-pdf.generator");

const {
    generateCustomersExcel,
} = require("../utils/customer-excel.generator");

// ========================================
// OBTENER DATOS PARA REPORTES
// ========================================
const getReportData = async (companyId) => {
    const id = companyId ? Number(companyId) : null;

    const [customerResult, company] = await Promise.all([
        customerService.getAll(id, {
            page: 1,
            limit: 100000,
        }),
        id ? companyService.getById(id) : null,
    ]);

    // Adaptarse a distintas estructuras posibles
    let customers = [];

    if (Array.isArray(customerResult)) {
        customers = customerResult;
    } else if (Array.isArray(customerResult?.data)) {
        customers = customerResult.data;
    } else if (Array.isArray(customerResult?.customers)) {
        customers = customerResult.customers;
    } else if (Array.isArray(customerResult?.items)) {
        customers = customerResult.items;
    }

    console.log("=================================");
    console.log("CUSTOMER REPORT");
    console.log("TOTAL CLIENTES:", customers.length);
    console.log("=================================");

    return {
        customers,
        company,
    };
};

module.exports = {
    getCustomersPDFReport: async (companyId) => {
        const { customers, company } =
            await getReportData(companyId);

        return generateCustomersPDF(
            customers,
            company
        );
    },

    getCustomersExcelReport: async (companyId) => {
        const { customers, company } =
            await getReportData(companyId);

        return generateCustomersExcel(
            customers,
            company
        );
    },
};