// ============================================================================
// prisma/seeds/employee-profile.seed.js
// Vinculación y creación de perfiles en la tabla EmployeeProfile
// ============================================================================

const prisma = require("../client");

async function employeeProfileSeed() {
    console.log("🚀 Iniciando siembra de perfiles detallados (EmployeeProfile) para Don Lucho...");

    // 1. Obtener la empresa única
    const company = await prisma.company.findFirst({
        where: { slug: "minimarket-don-lucho" },
    });

    if (!company) {
        throw new Error("❌ Error: No se encontró la empresa 'Minimarket Don Lucho'.");
    }

    // 2. Traer todos los usuarios que son "EMPLOYEE" en esta empresa
    const employees = await prisma.user.findMany({
        where: {
            role: "EMPLOYEE",
            companyId: company.id,
        },
    });

    if (employees.length === 0) {
        console.log("⚠️ No se encontraron empleados cargados. Corre primero 'employeeSeed'. Omitiendo perfiles.");
        return;
    }

    // 3. Mapeo de puestos operativos realistas para distribuir entre el personal
    const rolesAndAreas = [
        { position: "Cajero(a) de Tienda", department: "Frente de Cajas", shift: "Mañana" },
        { position: "Auxiliar de Almacén", department: "Logística y Recepción", shift: "Mañana" },
        { position: "Reponedor de Góndolas", department: "Piso de Ventas", shift: "Tarde" },
        { position: "Encargado de Alimentos Frescos", department: "Perecederos y Verdulería", shift: "Mañana" },
        { position: "Asistente de Servicio al Cliente", department: "Atención al Cliente", shift: "Tarde" },
        { position: "Cajero(a) de Tienda", department: "Frente de Cajas", shift: "Tarde" },
        { position: "Reponedor de Góndolas", department: "Piso de Ventas", shift: "Mañana" },
        { position: "Auxiliar de Almacén", department: "Logística y Recepción", shift: "Tarde" },
    ];

    let createdProfilesCount = 0;

    // 4. Recorrer cada empleado y asignarle su perfil correspondiente
    for (let i = 0; i < employees.length; i++) {
        const employee = employees[i];

        // Verificar si este usuario ya tiene un perfil asignado para no duplicar llaves únicas
        const existingProfile = await prisma.employeeProfile.findUnique({
            where: { userId: employee.id },
        });

        if (existingProfile) {
            // Si ya existe, saltamos al siguiente
            continue;
        }

        // Seleccionar un puesto del array de forma cíclica
        const jobAssignment = rolesAndAreas[i % rolesAndAreas.length];

        // Crear el registro relacional en la tabla EmployeeProfile
        await prisma.employeeProfile.create({
            data: {
                userId: employee.id, // Relación obligatoria con User (FK)
                position: jobAssignment.position,
                department: jobAssignment.department,
                shift: jobAssignment.shift,
            },
        });

        createdProfilesCount++;
        console.log(`📋 Perfil creado para [${employee.name}]: ${jobAssignment.position} (${jobAssignment.department}) - Turno: ${jobAssignment.shift}`);
    }

    console.log(`\n✅ SEED DE PERFILES COMPLETADO. Perfiles enlazados: ${createdProfilesCount}.\n`);
}

module.exports = { employeeProfileSeed };
