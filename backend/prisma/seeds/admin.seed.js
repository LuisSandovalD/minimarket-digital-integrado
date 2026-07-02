// ========================================
// prisma/seeds/admin.seed.js
// ========================================

const prisma = require("../client");
const bcrypt = require("bcryptjs");

async function adminSeed() {
  const password = await bcrypt.hash(
    process.env.SEED_PASSWORD || "admin123",
    10
  );

  console.log("🚀 Iniciando carga de datos principales...");

  // ========================================
  // EMPRESA
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
      legalRepresentative: "Luis Enrique Sandoval Carbonel",
      subscriptionTier: "PREMIUM"
    }
  });

  console.log("✅ Empresa creada");

  // ========================================
  // SUSCRIPCIÓN (NUEVO — control de acceso al SaaS)
  // ========================================

  const now = new Date();
  const periodStart = now;
  const periodEnd = new Date(now);
  periodEnd.setMonth(periodEnd.getMonth() + 1); // ciclo mensual

  const subscription = await prisma.subscription.create({
    data: {
      companyId: company.id,
      status: "ACTIVE",
      startDate: now,
      currentPeriodStart: periodStart,
      currentPeriodEnd: periodEnd,
      // En producción esto lo llena el webhook de Stripe al crear la suscripción real
      stripeSubscriptionId: "sub_mock_donluchito001",
      stripePriceId: "price_premium_mensual"
    }
  });

  console.log("✅ Suscripción creada (PREMIUM, vence:", periodEnd.toLocaleDateString(), ")");

  // ========================================
  // HISTORIAL DE FACTURACIÓN (NUEVO — recibos del SaaS)
  // ========================================

  const lastMonth = new Date(now);
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  await prisma.billingHistory.createMany({
    data: [
      {
        companyId: company.id,
        amount: 49.90,
        currency: "PEN",
        status: "COMPLETED",
        receiptUrl: "https://dashboard.stripe.com/receipts/mock-001",
        stripeInvoiceId: "in_mock_donluchito001",
        createdAt: lastMonth
      },
      {
        companyId: company.id,
        amount: 49.90,
        currency: "PEN",
        status: "COMPLETED",
        receiptUrl: "https://dashboard.stripe.com/receipts/mock-002",
        stripeInvoiceId: "in_mock_donluchito002",
        createdAt: now
      }
    ]
  });

  console.log("✅ Historial de facturación creado (2 recibos)");

  // ========================================
  // CONFIGURACIÓN
  // ========================================

  await prisma.configuration.create({
    data: {
      companyId: company.id
    }
  });

  console.log("✅ Configuración creada");

  // ========================================
  // SUCURSAL
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

  console.log("✅ Sucursal creada");

  // ========================================
  // ADMIN
  // ========================================

  const admin = await prisma.user.create({
    data: {
      name: "Luis Enrique Sandoval Carbonel",
      email: "luissandovalcarbonel@gmail.com",
      password,
      role: "ADMIN",
      phone: "934049272",
      companyId: company.id,
      branchId: branch.id
    }
  });

  console.log("✅ Usuario ADMIN creado");

  // ========================================
  // MANAGER
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

  console.log("✅ Usuario MANAGER creado");

  // ========================================
  // SUPERVISOR
  // ========================================

  await prisma.user.create({
    data: {
      name: "María Fernanda López",
      email: "maria@donluchito.pe",
      password,
      role: "SUPERVISOR",
      phone: "945678123",
      managerId: manager.id,
      companyId: company.id,
      branchId: branch.id
    }
  });

  // ========================================
  // EMPLEADOS
  // ========================================

  await prisma.user.createMany({
    data: [
      {
        name: "José Antonio Torres",
        email: "jose@donluchito.pe",
        password,
        role: "EMPLOYEE",
        phone: "923456789",
        managerId: manager.id,
        companyId: company.id,
        branchId: branch.id
      },
      {
        name: "Pedro Ramírez Soto",
        email: "pedro@donluchito.pe",
        password,
        role: "EMPLOYEE",
        phone: "912345678",
        managerId: manager.id,
        companyId: company.id,
        branchId: branch.id
      },
      {
        name: "Ana Patricia Salazar",
        email: "ana@donluchito.pe",
        password,
        role: "EMPLOYEE",
        phone: "956123478",
        managerId: manager.id,
        companyId: company.id,
        branchId: branch.id
      },
      {
        name: "Ricardo Gómez Paredes",
        email: "ricardo@donluchito.pe",
        password,
        role: "VIEWER",
        phone: "944556677",
        managerId: manager.id,
        companyId: company.id,
        branchId: branch.id
      },
      {
        name: "Lucía Mendoza Castro",
        email: "lucia@donluchito.pe",
        password,
        role: "SUPPORT",
        phone: "933445566",
        managerId: manager.id,
        companyId: company.id,
        branchId: branch.id
      }
    ]
  });

  console.log("✅ Personal operativo creado");

  console.log("\n====================================");
  console.log("🏢 EMPRESA:", company.name);
  console.log("⭐ PLAN:", company.subscriptionTier);
  console.log("💳 SUSCRIPCIÓN:", subscription.status, "- vence:", subscription.currentPeriodEnd.toLocaleDateString());
  console.log("📧 ADMIN:", admin.email);
  console.log("📧 MANAGER:", manager.email);
  console.log("🔑 PASSWORD:", process.env.SEED_PASSWORD || "admin123");
  console.log("====================================\n");
}

module.exports = {
  adminSeed
};