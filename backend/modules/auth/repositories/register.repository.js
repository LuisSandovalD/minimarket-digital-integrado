// ========================================
// repositories/register.repository.js
// ========================================

const prisma = require("../../../prisma/client");

const userRepository = require("./user.repository");
const companyRepository = require("./company.repository");
const branchRepository = require("./branch.repository");
const auditRepository = require("./audit.repository");

const { generateSlug } = require("../utils/slug.util");

const registerTenant = async ({ user, company, branch, subscriptionTier }) => {

    // 👉 El SLUG de la EMPRESA sí se genera automáticamente para la URL de la compañía
    const companySlug = generateSlug(company.name);

    // Configuración de fechas para el control del periodo de acceso (30 días por defecto)
    const durationDays = 30;
    const currentPeriodEnd = new Date();
    currentPeriodEnd.setDate(currentPeriodEnd.getDate() + durationDays);

    // Normalizar el estado inicial según el tier del SaaS
    const initialTier = subscriptionTier || "FREE";
    const initialStatus = initialTier === "FREE" ? "ACTIVE" : "TRIALING";

    return prisma.$transaction(async (tx) => {

        // =========================
        // 1. CREATE COMPANY
        // =========================
        const createdCompany =
            await companyRepository.createCompany(
                {
                    name: company.name,
                    email: company.email,
                    phone: company.phone,
                    address: company.address,
                    ruc: company.ruc,
                    slug: companySlug,
                    subscriptionTier: initialTier,
                },
                tx
            );

        // ===============================================
        // 1.5. CREATE INITIAL SUBSCRIPTION (SaaS)
        // ===============================================
        // Se inicializa el registro del Tenant en la tabla Subscription para evitar nulos en el sistema
        const createdSubscription = await tx.subscription.create({
            data: {
                companyId: createdCompany.id,
                status: initialStatus,
                startDate: new Date(),
                currentPeriodStart: new Date(),
                currentPeriodEnd: currentPeriodEnd,
                trialEndsAt: initialTier !== "FREE" ? currentPeriodEnd : null,
            }
        });

        // =========================
        // 2. CREATE BRANCH
        // =========================
        const createdBranch =
            await branchRepository.createBranch(
                {
                    companyId: createdCompany.id,
                    name: branch.name,
                    code: branch.code,
                    address: branch.address,
                    phone: branch.phone,
                    email: branch.email,
                    city: branch.city,
                    state: branch.state,
                    country: branch.country,
                },
                tx
            );

        // =========================
        // 3. CREATE USER (Sin el campo slug)
        // =========================
        const createdUser =
            await userRepository.createUser(
                {
                    email: user.email,
                    password: user.password,
                    name: user.name,
                    role: user.role || "ADMIN",
                    phone: user.phone,

                    companyId: createdCompany.id,
                    branchId: createdBranch.id,
                },
                tx
            );

        // =========================
        // 4. AUDIT LOG
        // =========================
        await auditRepository.createAuditLog(
            {
                userId: createdUser.id,
                companyId: createdCompany.id,
                action: "CREATE",
                entityType: "COMPANY",
                entityId: createdCompany.id,
                description: `Registro inicial de empresa bajo el subscriptionTier ${initialTier} con suscripción inicial en estado ${initialStatus}.`,
            },
            tx
        );

        // Retornamos todas las entidades creadas incluyendo la suscripción estructurada
        return {
            company: createdCompany,
            branch: createdBranch,
            user: createdUser,
            subscription: createdSubscription,
        };
    }, {
        // 🌟 Inyección preventiva para evitar caídas de Neon por latencia regional
        maxWait: 5000,  // Espera máxima por conexión en el pool
        timeout: 25000  // Eleva el límite transaccional a 25 segundos
    });
};

module.exports = {
    registerTenant,
};