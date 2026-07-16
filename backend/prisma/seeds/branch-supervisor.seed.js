// ============================================================================
// prisma/seeds/branch-supervisor.seed.js
// Carga de usuarios con rol SUPERVISOR asociados a sus respectivos Managers
// ============================================================================

const prisma = require("../client");
const bcrypt = require("bcryptjs");

async function branchSupervisorSeed() {
    console.log("🚀 Iniciando siembra de un SUPERVISOR para cada Manager de Minimarket Don Lucho...");

    // 1. Buscar la empresa
    const company = await prisma.company.findFirst({
        where: { slug: "minimarket-don-lucho" },
    });

    if (!company) {
        throw new Error("❌ Error: No se encontró la empresa 'Minimarket Don Lucho'. Ejecuta admin.seed primero.");
    }

    // 2. Traer todos los Managers de esta empresa (para obtener su sucursal e ID)
    const managers = await prisma.user.findMany({
        where: {
            companyId: company.id,
            role: "MANAGER",
        },
        include: {
            branch: true, // Traemos la info de su sucursal asignada
        },
    });

    if (managers.length === 0) {
        throw new Error("❌ Error: No se encontraron Managers registrados. Ejecuta branch-manager.seed primero.");
    }

    // 3. Preparar credencial por defecto de manera segura
    const defaultPassword = process.env.SEED_PASSWORD || "admin123";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // 4. Mapear datos estructurados de Supervisores correspondientes a cada Manager
    // Usamos el email del manager como clave de mapeo para saber a quién asignarle qué supervisor
    const supervisorsBlueprint = [
        {
            managerEmail: "l.mendoza.sl@donlucho.pe",
            name: "Andrés Ignacio Quispe",
            email: "a.quispe.sl@donlucho.pe",
            phone: "945678123",
        },
        {
            managerEmail: "b.flores.lq@donlucho.pe",
            name: "Clara Vanessa Paredes",
            email: "c.paredes.lq@donlucho.pe",
            phone: "956789234",
        },
        {
            managerEmail: "c.salazar.sb@donlucho.pe",
            name: "Diego Alonso Farfán",
            email: "d.farfan.sb@donlucho.pe",
            phone: "967890345",
        },
        {
            managerEmail: "p.torres.imp@donlucho.pe",
            name: "Esther Sofía Meza",
            email: "e.meza.imp@donlucho.pe",
            phone: "978901456",
        },
    ];

    let createdCount = 0;

    // 5. Iterar e insertar cada supervisor enlazándolo a su Manager y Sucursal
    for (const blueprint of supervisorsBlueprint) {
        // Buscar al manager correspondiente en la lista que trajimos de la BD
        const manager = managers.find((m) => m.email === blueprint.managerEmail);

        if (!manager) {
            console.log(`⚠️ Advertencia: No se encontró en la BD al manager ${blueprint.managerEmail}. Se omitirá su supervisor.`);
            continue;
        }

        // Verificar si el supervisor ya existe usando la clave compuesta única multi-tenant
        const existingUser = await prisma.user.findUnique({
            where: {
                email_companyId: {
                    email: blueprint.email,
                    companyId: company.id,
                },
            },
        });

        if (existingUser) {
            console.log(`⚠️ El supervisor con correo ${blueprint.email} ya existe en esta empresa.`);
            continue;
        }

        // Crear el Supervisor enlazado a sucursal y a su respectivo manager (managerId)
        await prisma.user.create({
            data: {
                name: blueprint.name,
                email: blueprint.email,
                password: hashedPassword,
                role: "SUPERVISOR", // Rol jerárquico intermedio
                phone: blueprint.phone,
                isActive: true,
                companyId: company.id,
                branchId: manager.branchId, // Hereda la sucursal del manager
                managerId: manager.id,      // Jerarquía: Supervisor reporta a -> Manager
            },
        });

        createdCount++;
        console.log(`👮 Supervisor asignado a [Sede: ${manager.branch?.name || "Sede"}]: ${blueprint.name} (Reporta a: ${manager.name})`);
    }

    console.log("\n====================================");
    console.log("✅ SEED DE SUPERVISORES COMPLETADO");
    console.log(`📊 Nuevos supervisores creados: ${createdCount} / ${supervisorsBlueprint.length}`);
    console.log("🔑 Password común de acceso:", defaultPassword);
    console.log("====================================\n");
}

if (require.main === module) {
    branchSupervisorSeed()
        .catch((e) => {
            console.error("❌ Error detectado en el proceso de seed de supervisores:", e);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}

module.exports = { branchSupervisorSeed };
