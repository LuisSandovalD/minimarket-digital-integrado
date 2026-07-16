// ========================================
// prisma/seeds/employee-profile.seed.js
// ========================================

const prisma = require("../client");

async function employeeProfileSeed() {
  // 1. OBTENER ÚNICAMENTE LOS USUARIOS CON ROL DE EMPLEADO
  const employees = await prisma.user.findMany({
    where: {
      role: "EMPLOYEE",
    },
  });

  if (!employees.length) {
    console.log("⚠️ No se encontraron usuarios con el rol 'EMPLOYEE'. Omitiendo sembrado de perfiles.");
    return;
  }

  // Listas de datos para distribuir variedad entre los empleados comunes
  const employeePositions = [
    "Asistente de Ventas",
    "Cajero(a)",
    "Encargado de Almacén",
    "Reponedor de Mercadería",
    "Asistente de Logística",
    "Atención al Cliente",
  ];

  const employeeDepartments = [
    "Ventas",
    "Caja y Finanzas",
    "Almacén e Inventario",
    "Operaciones",
    "Logística",
    "Atención al Cliente",
  ];

  const shifts = ["Mañana", "Tarde", "Noche"];
  const profiles = [];

  // 2. GENERAR PERFILES EXCLUSIVAMENTE PARA EMPLEADOS
  for (let i = 0; i < employees.length; i++) {
    const employee = employees[i];

    // Distribución cíclica y balanceada usando el residuo (%) del índice
    const position = employeePositions[i % employeePositions.length];
    const department = employeeDepartments[i % employeeDepartments.length];
    const shift = shifts[i % shifts.length];

    profiles.push({
      userId: employee.id,
      position,
      department,
      shift,
    });
  }

  // 3. INYECTAR EN LA BASE DE DATOS
  await prisma.employeeProfile.createMany({
    data: profiles,
    skipDuplicates: true,
  });

  console.log(`✅ Perfiles de empleados creados con éxito. Total: [${profiles.length}] registrados.`);
}

module.exports = {
  employeeProfileSeed,
};
