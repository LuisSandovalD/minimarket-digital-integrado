const repository = require("../repositories/branch.repository");

exports.getBranches = async (companyId, query = {}) => {
    const { search, city, country, isActive, page = 1, limit = 10 } = query;

    const parsedPage = Math.max(parseInt(page, 10) || 1, 1);
    const parsedLimit = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);

    let activeFilter;
    if (isActive !== undefined) {
        if (isActive === "true" || isActive === true) {
            activeFilter = true;
        } else if (isActive === "false" || isActive === false) {
            activeFilter = false;
        }
    }

    return repository.findAll(companyId, {
        search,
        city,
        country,
        isActive: activeFilter,
        page: parsedPage,
        limit: parsedLimit,
    });
};

exports.getBranchById = async (id, companyId) => {
    if (Number.isNaN(id)) {
        throw new Error("ID inválido");
    }

    const branch = await repository.findById(id, companyId);

    if (!branch) {
        throw new Error("Sucursal no encontrada");
    }

    return branch;
};