const supplierRepository = require("../repositories/supplier.repository");

exports.getSupplierById = async (id, companyId) => {
    const supplier = await supplierRepository.findById(id, companyId);

    if (!supplier) {
        throw new Error("Supplier not found");
    }

    return supplier;
};

exports.getSuppliers = async (companyId, filters = {}) => {
    const page = Math.max(1, Number(filters.page) || 1);
    const limit = Math.max(1, Number(filters.limit) || 10);

    const search = filters.search?.trim() || "";

    let isActive = undefined;

    if (filters.isActive === "true") {
        isActive = true;
    } else if (filters.isActive === "false") {
        isActive = false;
    }

    const [suppliers, total] = await Promise.all([
        supplierRepository.getAll(companyId, {
            search,
            isActive,
            page,
            limit,
        }),

        supplierRepository.count(companyId, {
            search,
            isActive,
        }),
    ]);

    return {
        data: suppliers,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit) || 1,
        },
    };
};

exports.searchSuppliers = async (companyId, search) => {
    return supplierRepository.searchSuppliers(companyId, search);
};