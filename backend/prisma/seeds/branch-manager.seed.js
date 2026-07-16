// ============================================================================
// prisma/seeds/branch-manager.seed.js
// Carga de usuarios con rol MANAGER para cada sucursal de Minimarket Don Lucho
// ============================================================================

const prisma = require("../client");
const bcrypt = require("bcryptjs");

async function branchManagerSeed() {
    console.log("🚀 Iniciando siembra de un MANAGER por cada sucursal de Minimarket Don Lucho...");

    // 1. Buscar la empresa
    const company = await prisma.company.findFirst({
        where: { slug: "minimarket-don-lucho" },
    });

    if (!company) {
        throw new Error("❌ Error: No se encontró la empresa 'Minimarket Don Lucho'. Ejecuta admin.seed primero.");
    }

    // 2. Traer todas las sucursales asignadas a la empresa
    const branches = await prisma.branch.findMany({
        where: { companyId: company.id },
    });

    if (branches.length === 0) {
        throw new Error("❌ Error: No se encontraron sucursales registradas. Ejecuta admin.seed primero.");
    }

    // 3. Preparar credencial por defecto de manera segura
    const defaultPassword = process.env.SEED_PASSWORD || "admin123";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // 4. Mapear datos estructurados de Managers asociados a las ciudades y sedes reales
    const branchManagersBlueprint = [
        {
            codeSuffix: "SL-HQ", // San Luis (Sede Principal)
            name: "Luis Alberto Mendoza",
            email: "l.mendoza.sl@donlucho.pe",
            phone: "987654321",
        },
        {
            codeSuffix: "LQ-BR", // La Quebrada
            name: "Beatriz Rosa Flores",
            email: "b.flores.lq@donlucho.pe",
            phone: "912345678",
        },
        {
            codeSuffix: "SB-BR", // San Benito
            name: "Carlos Eduardo Salazar",
            email: "c.salazar.sb@donlucho.pe",
            phone: "923456789",
        },
        {
            codeSuffix: "IMP-BR", // Imperial
            name: "Patricia Elena Torres",
            email: "p.torres.imp@donlucho.pe",
            phone: "934567890",
        },
    ];

    let createdCount = 0;

    // 5. Iterar, buscar la sucursal exacta por su código e insertar el Manager
    for (const blueprint of branchManagersBlueprint) {
        const targetCode = `MINIM-${blueprint.codeSuffix}`; // Formato exacto generado por admin.seed

        const branch = branches.find((b) => b.code === targetCode);

        if (!branch) {
            console.log(`⚠️ Advertencia: No se encontró la sucursal con código ${targetCode}. Se omitirá este mánager.`);
            continue;
        }

        // [CORREGIDO] Verificar duplicado usando la clave compuesta única del esquema multi-tenant
        const existingUser = await prisma.user.findUnique({
            where: {
                email_companyId: {
                    email: blueprint.email,
                    companyId: company.id,
                },
            },
        });

        if (existingUser) {
            console.log(`⚠️ El manager con correo ${blueprint.email} ya existe en esta empresa.`);
            continue;
        }

        // Crear el Manager enlazado a su sucursal correspondiente
        await prisma.user.create({
            data: {
                name: blueprint.name,
                email: blueprint.email,
                password: hashedPassword,
                role: "MANAGER",
                phone: blueprint.phone,
                isActive: true,
                companyId: company.id,
                branchId: branch.id, // Enlace crucial multi-sucursal
            },
        });

        createdCount++;
        console.log(`👤 Manager asignado a [${branch.name}]: ${blueprint.name} (${blueprint.email})`);
    }

    console.log("\n====================================");
    console.log("✅ SEED DE BRANCH MANAGERS COMPLETADO");
    console.log(`📊 Nuevos managers creados: ${createdCount} / ${branchManagersBlueprint.length}`);
    console.log("🔑 Password común de acceso:", defaultPassword);
    console.log("====================================\n");
}

if (require.main === module) {
    branchManagerSeed()
        .catch((e) => {
            console.error("❌ Error detectado en el proceso de seed de branch managers:", e);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}

module.exports = { branchManagerSeed };
