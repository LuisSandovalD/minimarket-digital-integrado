// ========================================
// repositories/register.repository.js
// ========================================

const prisma = require("../../../prisma/client");

const userRepository = require("./user.repository");
const companyRepository = require("./company.repository");
const branchRepository = require("./branch.repository");
const auditRepository = require("./audit.repository");

const { generateSlug } = require("../utils/slug.util");

const registerTenant = async ({ user, company, branch }) => {

    // 👉 SLUG SIEMPRE AUTOMÁTICO (NO DEPENDE DEL FRONT)
    const slug = generateSlug(company.name);

    return prisma.$transaction(async (tx) => {

        // =========================
        // CREATE COMPANY
        // =========================
        const createdCompany =
            await companyRepository.createCompany(
                {
                    name: company.name,
                    email: company.email,
                    phone: company.phone,
                    address: company.address,
                    ruc: company.ruc,
                    slug, // 🔥 siempre generado aquí
                },
                tx
            );

        // =========================
        // CREATE BRANCH
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
        // CREATE USER
        // =========================
        const createdUser =
            await userRepository.createUser(
                {
                    email: user.email,
                    password: user.password,
                    name: user.name,
                    role: user.role || "SUPER_ADMIN",
                    phone: user.phone,

                    companyId: createdCompany.id,
                    branchId: createdBranch.id,
                },
                tx
            );

        // =========================
        // AUDIT LOG
        // =========================
        await auditRepository.createAuditLog(
            {
                userId: createdUser.id,
                companyId: createdCompany.id,
                action: "CREATE",
                entityType: "COMPANY",
                entityId: createdCompany.id,
                description: "Registro inicial de empresa",
            },
            tx
        );

        return {
            company: createdCompany,
            branch: createdBranch,
            user: createdUser,
        };
    });
};

module.exports = {
    registerTenant,
};