// ============================================================================
// prisma/seeds/link-employees.seed.js
// Vinculación jerárquica: Conecta cada EMPLOYEE con el SUPERVISOR de su sucursal
// ============================================================================

const prisma = require("../client");

async function linkEmployeesToSupervisors() {
    console.log("🔗 Iniciando vinculación jerárquica de Empleados con sus Supervisores...");

    // 1. Buscar la empresa Don Lucho
    const company = await prisma.company.findFirst({
        where: { slug: "minimarket-don-lucho" },
    });

    if (!company) {
        throw new Error("❌ Error: No se encontró la empresa 'Minimarket Don Lucho'.");
    }

    // 2. Traer todos los supervisores de la empresa
    const supervisors = await prisma.user.findMany({
        where: {
            role: "SUPERVISOR",
            companyId: company.id,
        },
    });

    if (supervisors.length === 0) {
        console.log("⚠️ No se encontraron supervisores registrados. No se puede realizar la vinculación.");
        return;
    }

    // 3. Traer todos los empleados que aún no tienen un manager asignado (managerId: null)
    const employees = await prisma.user.findMany({
        where: {
            role: "EMPLOYEE",
            companyId: company.id,
            managerId: null,
        },
    });

    if (employees.length === 0) {
        console.log("✅ Todos los empleados ya tienen un supervisor asignado.");
        return;
    }

    let linkedCount = 0;

    // 4. Emparejar empleados con el supervisor de su misma sucursal (branchId)
    for (const employee of employees) {
        // Buscamos un supervisor que trabaje en su misma sucursal
        const supervisor = supervisors.find((s) => s.branchId === employee.branchId);

        if (!supervisor) {
            console.log(
                `⚠️ Empleado [${employee.name}] (Sucursal ID: ${employee.branchId}) no tiene un Supervisor asignado en su sede. Omitiendo.`,
            );
            continue;
        }

        // Actualizamos el registro del empleado apuntando su managerId al id del supervisor
        await prisma.user.update({
            where: { id: employee.id },
            data: {
                managerId: supervisor.id,
            },
        });

        linkedCount++;
        console.log(`🔗 [${employee.name}] ahora reporta a Supervisor: [${supervisor.name}] en sucursal ID: ${employee.branchId}`);
    }

    console.log(`\n✅ VINCULACIÓN COMPLETADA. Se asignó supervisor a ${linkedCount} empleados.\n`);
}

module.exports = { linkEmployeesToSupervisors };
