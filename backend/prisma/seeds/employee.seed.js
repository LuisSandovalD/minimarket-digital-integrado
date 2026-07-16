// ============================================================================
// prisma/seeds/employee.seed.js
// Carga de usuarios con rol EMPLOYEE para las sucursales de Minimarket Don Lucho
// ============================================================================

const prisma = require("../client");
const bcrypt = require("bcryptjs");

async function employeeSeed() {
  console.log("🚀 Iniciando siembra de EMPLEADOS (vendedores/cajeros) para Minimarket Don Lucho...");

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
    throw new Error("❌ Error: No se encontraron sucursales registradas.");
  }

  // 3. Preparar contraseña por defecto
  const defaultPassword = process.env.SEED_PASSWORD || "admin123";
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  // 4. Lista de empleados a distribuir por sucursal
  const employeesBlueprint = [
    // Sede: San Luis (SL-HQ)
    { branchCode: "MINIM-SL-HQ", name: "Juan Carlos Huamán", email: "j.huaman.sl@donlucho.pe", phone: "981234567" },
    { branchCode: "MINIM-SL-HQ", name: "Rosa María Quispe", email: "r.quispe.sl@donlucho.pe", phone: "982345678" },

    // Sede: La Quebrada (LQ-BR)
    { branchCode: "MINIM-LQ-BR", name: "Miguel Ángel Condori", email: "m.condori.lq@donlucho.pe", phone: "983456789" },
    { branchCode: "MINIM-LQ-BR", name: "Diana Carolina Flores", email: "d.flores.lq@donlucho.pe", phone: "984567890" },

    // Sede: San Benito (SB-BR)
    { branchCode: "MINIM-SB-BR", name: "Pedro Alonzo Tello", email: "p.tello.sb@donlucho.pe", phone: "985678901" },
    { branchCode: "MINIM-SB-BR", name: "Gisela Milagros Ortiz", email: "g.ortiz.sb@donlucho.pe", phone: "986789012" },

    // Sede: Imperial (IMP-BR)
    { branchCode: "MINIM-IMP-BR", name: "Renzo Gabriel Farfán", email: "r.farfan.imp@donlucho.pe", phone: "987890123" },
    { branchCode: "MINIM-IMP-BR", name: "Lucía Fernanda Salinas", email: "l.salinas.imp@donlucho.pe", phone: "988901234" },
  ];

  let createdCount = 0;

  // 5. Inserción
  for (const blueprint of employeesBlueprint) {
    const branch = branches.find((b) => b.code === blueprint.branchCode);

    if (!branch) {
      console.log(`⚠️ No se encontró la sucursal con código ${blueprint.branchCode}. Omitiendo a ${blueprint.name}.`);
      continue;
    }

    // Verificar duplicado
    const existingUser = await prisma.user.findUnique({
      where: {
        email_companyId: {
          email: blueprint.email,
          companyId: company.id,
        },
      },
    });

    if (existingUser) {
      continue;
    }

    await prisma.user.create({
      data: {
        name: blueprint.name,
        email: blueprint.email,
        password: hashedPassword,
        role: "EMPLOYEE", // Rol base de empleado
        phone: blueprint.phone,
        isActive: true,
        companyId: company.id,
        branchId: branch.id,
      },
    });

    createdCount++;
    console.log(`👷 Empleado registrado en [${branch.name}]: ${blueprint.name}`);
  }

  console.log(`\n✅ SEED DE EMPLEADOS COMPLETADO. Registrados: ${createdCount} nuevos empleados.\n`);
}

module.exports = { employeeSeed };
