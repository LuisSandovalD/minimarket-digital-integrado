// ========================================
// services/auth/register.service.js
// ========================================

const bcrypt = require("bcryptjs");

const userRepository = require("../repositories/user.repository");
const companyRepository = require("../repositories/company.repository");
const { registerTenant } = require("../repositories/register.repository");

const { sendEmail } = require("../../../config/email.config");


/* ======================================
 * PLANTILLA: ENVIAR CORREO DE BIENVENIDA
 * ==================================== */
const sendWelcomeEmail = async ({ email, name, companyName }) => {
    return await sendEmail({
        to: email,
        subject: "¡Bienvenido a ERP POS System! - Registro Exitoso",
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
                <h2 style="color: #2563eb;">¡Bienvenido a la plataforma, ${name}!</h2>
                <p>Nos complace informarte que tu empresa <strong>${companyName}</strong> ha sido registrada exitosamente en nuestro ecosistema SaaS.</p>
                <p>Tu cuenta de Administrador ya se encuentra activa bajo el periodo de prueba Freemium / Trial de 30 días.</p>
                <p>Ya puedes iniciar sesión para comenzar a gestionar tus sucursales y puntos de venta.</p>
                <br>
                <hr style="border: 0; border-top: 1px solid #e2e8f0;">
                <small style="color: #64748b;">Este es un mensaje generado automáticamente, por favor no respondas directamente a él.</small>
            </div>
        `,
    });
};

/**
 * REGISTRO DE UN NUEVO TENANT (EMPRESA, SUCURSAL, USUARIO ADMINISTRADOR Y SUSCRIPCIÓN SaaS)
 * Flujo Freemium / Trial de 30 días sin requerir tarjeta al inicio.
 */
const register = async ({ body }) => {

    const {
        name,
        email,
        password,
        role,
        phone,
        subscriptionTier,
        company,
        branch
    } = body;

    // ======================================
    // 1. Validar unicidad del usuario por Correo
    // ======================================
    const cleanedEmail = email.trim().toLowerCase();
    const existingUserByEmail = await userRepository.findUserByEmail(cleanedEmail);

    if (existingUserByEmail) {
        throw new Error(
            "El correo electrónico ya se encuentra registrado"
        );
    }

    // ======================================
    // 2. Validar unicidad de la empresa mediante el RUC (Solo si viene informado)
    // ======================================
    if (company?.ruc && company.ruc.trim() !== "") {
        const cleanedRuc = company.ruc.trim();
        const existingCompany = await companyRepository.findCompanyByRuc(cleanedRuc);

        if (existingCompany) {
            throw new Error(
                "El RUC ingresado ya se encuentra registrado en el sistema"
            );
        }
    }

    // ======================================
    // 3. Hashear la contraseña de forma segura
    // ======================================
    const hashedPassword = await bcrypt.hash(password, 10);

    // ======================================
    // 4. Determinar y normalizar el Tier del SaaS (FREE, BASIC, PREMIUM)
    // ======================================
    const tier = subscriptionTier ? subscriptionTier.toUpperCase() : "FREE";

    // ======================================
    // 5. Ejecutar la transacción Multi-Tenant incluyendo la suscripción inicial
    // ======================================
    const result = await registerTenant({
        user: {
            name: name.trim(),
            email: cleanedEmail,
            password: hashedPassword,
            role: role || "ADMIN",
            phone: phone ? phone.trim() : null
        },
        company: {
            name: company.name.trim(),
            email: company.email ? company.email.trim().toLowerCase() : null,
            phone: company.phone ? company.phone.trim() : null,
            address: company.address ? company.address.trim() : null,
            ruc: company.ruc ? company.ruc.trim() : null
        },
        branch: {
            name: branch?.name ? branch.name.trim() : "Sucursal Principal",
            code: branch?.code ? branch.code.trim().toUpperCase() : "MAIN",
            address: branch?.address ? branch.address.trim() : (company.address ? company.address.trim() : "Dirección Fiscal"),
            phone: branch?.phone ? branch.phone.trim() : null,
            email: branch?.email ? branch.email.trim().toLowerCase() : null,
            city: branch?.city ? branch.city.trim() : null,
            state: branch?.state ? branch.state.trim() : null,
            country: branch?.country ? branch.country.trim() : null
        },
        subscriptionTier: tier
    });

    // ======================================
    // 5.5 ENVÍO AUTOMÁTICO DE CORREO DE BIENVENIDA
    // ======================================
    try {
        // Llamamos a la función local definida arriba utilizando los datos que retornó la base de datos
        await sendWelcomeEmail({
            email: result.user.email,
            name: result.user.name,
            companyName: result.company.name
        });
    } catch (emailError) {
        // Bloque aislado: Evita que un fallo en Brevo cancele una base de datos exitosa
        console.error("⚠️ Error asíncrono enviando correo de bienvenida:", emailError.message || emailError);
    }

    // ======================================
    // 6. Retorno estructurado con las nuevas entidades del SaaS incluidas
    // ======================================
    return {
        success: true,
        message: "Empresa y suscripción inicial creadas exitosamente",
        company: result.company,
        branch: result.branch,
        user: result.user,
        subscription: result.subscription
    };
};

module.exports = {
    register
};