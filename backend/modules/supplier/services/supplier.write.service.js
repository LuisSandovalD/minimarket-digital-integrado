const supplierRepository = require("../repositories/supplier.repository");

exports.createSupplier = async (data) => {
    const existingSupplier = await supplierRepository.findByName(
        data.name,
        data.companyId
    );

    if (existingSupplier) {
        throw new Error("Supplier already exists");
    }

    if (data.ruc) {
        const existingRuc = await supplierRepository.findByRuc(
            data.ruc,
            data.companyId
        );

        if (existingRuc) {
            throw new Error("RUC already registered");
        }
    }

    return supplierRepository.create({
        name: data.name,
        ruc: data.ruc || null,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address || null,
        contactPerson: data.contactPerson || null,
        website: data.website || null,
        notes: data.notes || null,
        currentDebt: data.currentDebt || 0,
        companyId: Number(data.companyId),
    });
}

exports.updateSupplier = async (id, companyId, data) => {
    const supplier = await supplierRepository.findById(id, companyId);

    if (!supplier) {
        throw new Error("Supplier not found");
    }

    if (data.name && data.name !== supplier.name) {
        const existingSupplier = await supplierRepository.findByName(
            data.name,
            companyId
        );

        if (existingSupplier) {
            throw new Error("Supplier name already exists");
        }
    }

    if (data.ruc && data.ruc !== supplier.ruc) {
        const existingRuc = await supplierRepository.findByRuc(
            data.ruc,
            companyId
        );

        if (existingRuc) {
            throw new Error("RUC already registered");
        }
    }

    await supplierRepository.update(id, companyId, {
        ...(data.name && { name: data.name }),
        ...(data.ruc && { ruc: data.ruc }),
        ...(data.email && { email: data.email }),
        ...(data.phone && { phone: data.phone }),
        ...(data.address && { address: data.address }),
        ...(data.contactPerson && {
            contactPerson: data.contactPerson,
        }),
        ...(data.website && { website: data.website }),
        ...(data.notes && { notes: data.notes }),
        ...(typeof data.isActive === "boolean" && {
            isActive: data.isActive,
        }),
    });

    return supplierRepository.findById(id, companyId);
}
