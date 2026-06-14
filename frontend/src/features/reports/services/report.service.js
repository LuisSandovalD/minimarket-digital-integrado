import api from "@/api/axios";

export const getDailyPurchasesReport = async (companyId, startDate, endDate) => {
    const res = await api.get("/purchase/reports/daily", {
        params: { companyId, startDate, endDate },
    });
    return res.data.data;
};

export const getInventoryReport = async (companyId, startDate, endDate) => {
    const res = await api.get("/inventory/reports/inventory", {
        params: { companyId, startDate, endDate },
    });
    return res.data.data;
};

export const getCustomersReport = async (companyId, startDate, endDate) => {
    const res = await api.get("/customer/reports/customers", {
        params: { companyId, startDate, endDate },
    });
    return res.data.data;
};

export const getSuppliersReport = async (companyId, startDate, endDate) => {
    const res = await api.get("/supplier/reports/suppliers", {
        params: { companyId, startDate, endDate },
    });
    return res.data.data;
};

export const getPaymentsReport = async (companyId, startDate, endDate) => {
    const res = await api.get("/payments/reports/payments", {
        params: { companyId, startDate, endDate },
    });
    return res.data.data;
};

export const getActivityReport = async (companyId, startDate, endDate) => {
    const res = await api.get("/dashboard/reports/activity", {
        params: { companyId, startDate, endDate },
    });
    return res.data.data;
};
