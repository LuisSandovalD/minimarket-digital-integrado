// ========================================
// services/user.service.js
// ========================================

const bcrypt = require("bcryptjs");
const repository = require("../repositories/user.repository");

// IMPORTAMOS EL CLIENTE BASE DE CORREO
const { sendEmail } = require("../../../config/email.config");

/* ======================================
 * CREAR USUARIO (Con notificación de accesos)
 * ==================================== */
const createUser = async (body, companyId) => {
    if (!body.password) {
        throw new Error("La contraseña es requerida");
    }

    // 1. Guardamos el registro en la base de datos con la contraseña encriptada
    const newUser = await repository.create({
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

    // 2. ENVÍO ASÍNCRONO DEL CORREO DE BIENVENIDA (FUERA DE LA BASE DE DATOS)
    if (newUser && newUser.email) {
        sendEmail({
            to: newUser.email,
            subject: "¡Bienvenido a la plataforma! - Tus credenciales de acceso",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #cbd5e1; border-radius: 8px;">
                    <h2 style="color: #2563eb;">¡Hola, ${newUser.name}!</h2>
                    <p>Un administrador te ha registrado en el sistema **ERP POS System** de tu empresa.</p>
                    
                    <p>A partir de este momento puedes acceder a la plataforma utilizando las siguientes credenciales temporales:</p>
                    
                    <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #2563eb;">
                        <p style="margin: 4px 0;"><strong>Enlace de acceso:</strong> <a href="http://localhost:5173/" style="color: #2563eb; text-decoration: none;">Ir al Panel de Control</a></p>
                        <p style="margin: 4px 0;"><strong>Usuario / Email:</strong> ${newUser.email}</p>
                        <p style="margin: 4px 0;"><strong>Contraseña provisoria:</strong> <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">${body.password}</code></p>
                        <p style="margin: 4px 0;"><strong>Rol asignado:</strong> ${newUser.role}</p>
                    </div>

                    <p style="font-size: 14px; color: #ef4444; font-weight: bold;">⚠️ Por seguridad, recuerda cambiar esta contraseña en tu perfil apenas inicies sesión por primera vez.</p>
                    
                    <br>
                    <hr style="border: 0; border-top: 1px solid #e2e8f0;">
                    <small style="color: #94a3b8;">Sistema de Gestión Corporativa - ERP POS System</small>
                </div>
            `
        }).catch(err => {
            console.error("⚠️ Error enviando correo de bienvenida con credenciales:", err.message);
        });
    }

    return newUser;
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