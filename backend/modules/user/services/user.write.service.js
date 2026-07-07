const bcrypt = require("bcryptjs");
const repository = require("../repositories/user.repository");

const createUser = async (body, companyId) => {
    if (!body.password) {
        throw new Error("La contraseña es requerida");
    }

    return repository.create({
        name: body.name,
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
        phone: body.phone || "",
        avatar: body.avatar || "",
        role: body.role || "EMPLOYEE",
        branchId: body.branchId || null,
        managerId: body.managerId || null,
        isActive: body.isActive ?? true,
        companyId,
    });
};

const updateUser = async (id, companyId, body) => {
    if (body.managerId && Number(body.managerId) === Number(id)) {
        throw new Error("Un usuario no puede ser su propio manager");
    }

    const data = {};

    if (body.name !== undefined) data.name = body.name;
    if (body.email !== undefined) data.email = body.email;
    if (body.phone !== undefined) data.phone = body.phone;
    if (body.avatar !== undefined) data.avatar = body.avatar;
    if (body.role !== undefined) data.role = body.role;
    if (body.branchId !== undefined) data.branchId = body.branchId || null;
    if (body.managerId !== undefined) data.managerId = body.managerId || null;
    if (body.isActive !== undefined) data.isActive = body.isActive;

    if (body.password) {
        data.password = await bcrypt.hash(body.password, 10);
    }

    return repository.update(id, companyId, data);
};

const deleteUser = async (id, companyId) => {
    return repository.softDelete(id, companyId);
};

const restoreUser = async (id, companyId) => {
    return repository.restore(id, companyId);
};

const toggleUserStatus = async (id, companyId) => {
    return repository.toggleStatus(id, companyId);
};

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    restoreUser,
    toggleUserStatus,
};