// ============================================================================
// prisma/seeds/admin.seed.js
// Carga de empresa raíz, suscripción y administrador global (Don Lucho)
// ============================================================================

const prisma = require("../client");
const bcrypt = require("bcryptjs");

async function adminSeed() {
  const password = await bcrypt.hash(
    process.env.SEED_PASSWORD || "admin123",
    10,
  );

  console.log("🚀 Iniciando carga masiva del ecosistema para Minimarket Don Lucho...");

  const companiesToSeed = [
    {
      company: {
        name: "Minimarket Don Lucho SAC",
        slug: "minimarket-don-lucho",
        ruc: "20612345678",
        taxId: "20612345678",
        email: "luissandovalcarbonel@gmail.com",
        phone: "934049272",
        address: "Av. Mariscal Benavides 450, San Vicente de Cañete",
        website: "https://donlucho.pe",
        legalRepresentative: "Luis Enrique Sandoval Carbonel",
        subscriptionTier: "PREMIUM",
      },
      admin: {
        name: "Luis Enrique Sandoval Carbonel",
        email: "luissandovalcarbonel@gmail.com",
        phone: "934049272",
      },
      // Sucursales distribuidas estratégicamente en San Luis, La Quebrada, San Benito e Imperial
      customBranches: [
        {
          name: "Minimarket Don Lucho - San Luis",
          city: "San Luis",
          state: "Lima",
          code: "SL-HQ",
          address: "Av. 28 de Julio 120",
        },
        {
          name: "Minimarket Don Lucho - La Quebrada",
          city: "San Luis",
          state: "Lima",
          code: "LQ-BR",
          address: "C.P. La Quebrada S/N (Zona Centro)",
        },
        {
          name: "Minimarket Don Lucho - San Benito",
          city: "Imperial",
          state: "Lima",
          code: "SB-BR",
          address: "Jr. San Benito Mza. F Lote 12",
        },
        {
          name: "Minimarket Don Lucho - Imperial",
          city: "Imperial",
          state: "Lima",
          code: "IMP-BR",
          address: "Av. Ramos Larrea 320",
        },
      ],
    },
  ];

  for (const item of companiesToSeed) {
    console.log(`\n🏢 Creando ecosistema autónomo para: ${item.company.name}...`);

    // 1. Crear Empresa
    const company = await prisma.company.create({
      data: item.company,
    });

    // 2. Crear Suscripción Mensual Activa
    const now = new Date();
    const periodEnd = new Date(now);
    periodEnd.setMonth(periodEnd.getMonth() + 1);

    await prisma.subscription.create({
      data: {
        companyId: company.id,
        status: "ACTIVE",
        startDate: now,
        currentPeriodStart: now,
        currentPeriodEnd: periodEnd,
        stripeSubscriptionId: `sub_mock_${company.slug}_001`,
        stripePriceId: `price_${company.subscriptionTier.toLowerCase()}_mensual`,
      },
    });

    // 3. Crear Historial de Facturación
    const lastMonth = new Date(now);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const amount = 99.90; // Don Lucho es PREMIUM

    await prisma.billingHistory.createMany({
      data: [
        {
          companyId: company.id,
          amount: amount,
          currency: "PEN",
          status: "COMPLETED",
          receiptUrl: `https://dashboard.stripe.com/receipts/mock-${company.id}-1`,
          stripeInvoiceId: `in_mock_${company.slug}_001`,
          createdAt: lastMonth,
        },
        {
          companyId: company.id,
          amount: amount,
          currency: "PEN",
          status: "COMPLETED",
          receiptUrl: `https://dashboard.stripe.com/receipts/mock-${company.id}-2`,
          stripeInvoiceId: `in_mock_${company.slug}_002`,
          createdAt: now,
        },
      ],
    });

    // 4. Crear Configuración base
    await prisma.configuration.create({
      data: { companyId: company.id },
    });

    // 5. Manejo de Sucursales en Cañete (San Luis, La Quebrada, San Benito, Imperial)
    let mainBranch;
    const sucursalesData = [];

    for (let i = 0; i < item.customBranches.length; i++) {
      const cBranch = item.customBranches[i];
      const branchPayload = {
        name: cBranch.name,
        code: `${company.slug.substring(0, 5).toUpperCase()}-${cBranch.code}`,
        address: cBranch.address,
        city: cBranch.city,
        state: cBranch.state,
        country: "Perú",
        phone: company.phone,
        email: `sucursal.${cBranch.code.toLowerCase()}@donlucho.pe`,
        companyId: company.id,
      };

      if (i === 0) {
        mainBranch = await prisma.branch.create({ data: branchPayload });
      } else {
        sucursalesData.push(branchPayload);
      }
    }

    // Insertar sucursales secundarias
    if (sucursalesData.length > 0) {
      await prisma.branch.createMany({
        data: sucursalesData,
        skipDuplicates: true,
      });
    }

    // 6. Crear Usuario Administrador Único enlazado a la Sede Central (San Luis)
    const admin = await prisma.user.create({
      data: {
        name: item.admin.name,
        email: item.admin.email,
        password,
        role: "ADMIN",
        phone: item.admin.phone,
        companyId: company.id,
        branchId: mainBranch.id,
      },
    });

    console.log(`✅ Registro exitoso para ${company.name}`);
    console.log(`   🔑 ADMIN: ${admin.email}`);
  }

  console.log("\n====================================");
  console.log("⭐ PROCESO COMPLETADO: EMPRESA DON LUCHO INSTALADA");
  console.log("🔑 PASSWORD COMÚN DE ACCESO:", process.env.SEED_PASSWORD || "admin123");
  console.log("====================================\n");
}

module.exports = { adminSeed };
