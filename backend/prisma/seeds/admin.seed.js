// ========================================
// prisma/seeds/admin.seed.js
// ========================================

const prisma = require("../client");
const bcrypt = require("bcryptjs");

async function adminSeed() {
  // Encriptar contraseña maestra una sola vez para optimizar rendimiento
  const password = await bcrypt.hash("admin123", 10);

  // ========================================
  // 1. EMPRESA
  // ========================================
  const company = await prisma.company.create({
    data: {
      name: "Minimarket Don Luchito SAC",
      slug: "minimarket-don-luchito-sac",
      ruc: "20612345678",
      taxId: "20612345678",
      email: "contacto@donluchito.pe",
      phone: "014567890",
      address: "Av. Los Próceres 123, SJL",
      website: "https://donluchito.pe",
      legalRepresentative: "Luis Enrique Sandoval Carbonel"
    }
  });
  console.log("✅ Empresa 'Minimarket Don Luchito SAC' creada");

  // ========================================
  // 2. SUCURSAL
  // ========================================
  const branch = await prisma.branch.create({
    data: {
      name: "Sucursal Principal",
      code: "PRINCIPAL",
      address: "Av. Los Próceres 123",
      city: "Lima",
      state: "Lima",
      country: "Perú",
      phone: "014567890",
      email: "sucursal@donluchito.pe",
      companyId: company.id
    }
  });
  console.log("✅ Sucursal Principal enlazada y creada");

  // ========================================
  // 3. ADMINISTRADOR PRINCIPAL
  // ========================================
  const admin = await prisma.user.create({
    data: {
      name: "Luis Enrique Sandoval Carbonel",
      email: "admin@donluchito.pe",
      password,
      role: "ADMIN",
      phone: "934049272",
      companyId: company.id,
      branchId: branch.id
    }
  });
  console.log("✅ Usuario Administrador creado");

  // ========================================
  // 4. GERENTE / MANAGER
  // ========================================
  const manager = await prisma.user.create({
    data: {
      name: "Jimmy Sandoval Vega",
      email: "manager@donluchito.pe",
      password,
      role: "MANAGER",
      phone: "987999879",
      companyId: company.id,
      branchId: branch.id
    }
  });
  console.log("✅ Usuario Manager creado");

  // ========================================
  // 5. PERSONAL OPERATIVO (BATCH DE USUARIOS)
  // ========================================
  await prisma.user.createMany({
    data: [
      {
        name: "María Fernanda López",
        email: "maria@donluchito.pe",
        password,
        role: "SUPERVISOR",
        phone: "945678123",
        companyId: company.id,
        branchId: branch.id
      },
      {
        name: "José Antonio Torres",
        email: "jose@donluchito.pe",
        password,
        role: "EMPLOYEE",
        phone: "923456789",
        companyId: company.id,
        branchId: branch.id
      },
      {
        name: "Pedro Ramírez Soto",
        email: "pedro@donluchito.pe",
        password,
        role: "EMPLOYEE",
        phone: "912345678",
        companyId: company.id,
        branchId: branch.id
      },
      {
        name: "Ana Patricia Salazar",
        email: "ana@donluchito.pe",
        password,
        role: "EMPLOYEE",
        phone: "956123478",
        companyId: company.id,
        branchId: branch.id
      },
      {
        name: "Ricardo Gómez Paredes",
        email: "ricardo@donluchito.pe",
        password,
        role: "VIEWER",
        phone: "944556677",
        companyId: company.id,
        branchId: branch.id
      },
      {
        name: "Lucía Mendoza Castro",
        email: "lucia@donluchito.pe",
        password,
        role: "SUPPORT",
        phone: "933445566",
        companyId: company.id,
        branchId: branch.id
      }
    ],
    skipDuplicates: true
  });

  console.log("✅ Personal operativo e invitados inyectados");
  console.log("\n===============================================");
  console.log("🔐 CREDENCIALES DE ACCESO:");
  console.log(`🔗 URL: ${company.website}`);
  console.log(`📧 Admin Email: ${admin.email}`);
  console.log(`📧 Manager Email: ${manager.email}`);
  console.log("🔑 Contraseña Común: admin123");
  console.log("===============================================\n");
}

module.exports = {
  adminSeed
};