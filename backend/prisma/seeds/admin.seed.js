// ============================================================================
// prisma/seeds/admin.seed.js
// Carga masiva de empresas raíz, suscripciones y administradores globales
// ============================================================================

const prisma = require("../client");
const bcrypt = require("bcryptjs");

async function adminSeed() {
  const password = await bcrypt.hash(
    process.env.SEED_PASSWORD || "admin123",
    10,
  );

  console.log("🚀 Iniciando carga masiva de empresas y sus administradores...");

  const companiesToSeed = [
    {
      company: {
        name: "Minimarket Don Lucho SAC",
        slug: "minimarket-don-lucho", // <- ESTE slug debe existir en customer y supplier seeds
        ruc: "20612345678",
        taxId: "20612345678",
        email: "contacto@donlucho.pe",
        phone: "014567890",
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
      // Sucursales modernas distribuidas estratégicamente en la provincia de Cañete
      customBranches: [
        { name: "Minimarket Don Lucho - Sede Central", city: "San Vicente de Cañete", state: "Lima", code: "HQ-SVC", address: "Av. Mariscal Benavides 450" },
        { name: "Minimarket Don Lucho - Express Imperial", city: "Imperial", state: "Lima", code: "EXP-IMP", address: "Av. Ramos Larrea 320" },
        { name: "Minimarket Don Lucho - Urban Mala", city: "Mala", state: "Lima", code: "URB-MAL", address: "Av. Marchand 560" },
        { name: "Minimarket Don Lucho - Market & Deli Asia", city: "Asia", state: "Lima", code: "MD-ASA", address: "Panamericana Sur Km 97.5 (Boulevard)" },
      ],
    },
    {
      company: {
        name: "Corporación Tecnológica Vega E.I.R.L.",
        slug: "corp-tecnologica-vega",
        ruc: "20798765432",
        taxId: "20798765432",
        email: "gerencia@tecnologicavega.com",
        phone: "017894561",
        address: "Jr. Las Flores 456, San Borja",
        website: "https://tecnologicavega.com",
        legalRepresentative: "Jimmy Sandoval Vega",
        subscriptionTier: "PREMIUM",
      },
      admin: {
        name: "Jimmy Sandoval Vega",
        email: "jimmysandoval@gmail.com",
        phone: "987999879",
      },
    },
    {
      company: {
        name: "Inversiones Médicas San José",
        slug: "inversiones-medicas-san-jose",
        ruc: "20555666777",
        taxId: "20555666777",
        email: "administracion@sanjosemed.pe",
        phone: "013216549",
        address: "Av. Salaverry 789, Jesús María",
        website: "https://sanjosemed.pe",
        legalRepresentative: "María Fernanda López",
        subscriptionTier: "PREMIUM",
      },
      admin: {
        name: "María Fernanda López",
        email: "maria.lopez@sanjosemed.pe",
        phone: "945678123",
      },
    },
    {
      company: {
        name: "Distribuidora Alimentos del Sur",
        slug: "distribuidora-alimentos-sur",
        ruc: "20444333222",
        taxId: "20444333222",
        email: "ventas@alimentosdelsur.pe",
        phone: "054223344",
        address: "Av. Alfonso Ugarte 512, Arequipa",
        website: "https://alimentosdelsur.pe",
        legalRepresentative: "Pedro Ramírez Soto",
        subscriptionTier: "BASIC",
      },
      admin: {
        name: "Pedro Ramírez Soto",
        email: "pedro.ramirez@alimentosdelsur.pe",
        phone: "912345678",
      },
    },
  ];

  // Pool de regiones para el resto de empresas automáticas
  const regionesPeru = [
    { city: "Lima", state: "Lima", code: "LIM", address: "Av. Javier Prado Este 1550, San Isidro" },
    { city: "Huancayo", state: "Junín", code: "HYO", address: "Av. Real 1045" },
    { city: "Arequipa", state: "Arequipa", code: "AQP", address: "Calle Mercaderes 402" },
    { city: "Trujillo", state: "La Libertad", code: "TRU", address: "Av. Larco 789" },
    { city: "Chiclayo", state: "Lambayeque", code: "CIX", address: "Av. Balta 345" },
    { city: "Piura", state: "Piura", code: "PIU", address: "Av. Grau 1420" },
    { city: "Cusco", state: "Cusco", code: "CUZ", address: "Av. El Sol 612" },
  ];

  let companyIndex = 0;

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
    const amount = company.subscriptionTier === "PREMIUM" ? 99.90 : 49.90;

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

    // 5. Manejo de Sucursales
    let mainBranch;
    const sucursalesData = [];

    if (item.customBranches && item.customBranches.length > 0) {
      // Caso 1: Estructura geolocalizada en Cañete para Minimarket Don Lucho
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
    } else {
      // Caso 2: Resto de empresas (Generador dinámico corporativo)
      mainBranch = await prisma.branch.create({
        data: {
          name: "Sede Central Corporativa",
          code: `${company.slug.substring(0, 5).toUpperCase()}-HQ`,
          address: company.address,
          city: "Lima",
          state: "Lima",
          country: "Perú",
          phone: company.phone,
          email: company.email,
          companyId: company.id,
        },
      });

      const numSucursalesAdicionales = (companyIndex % 2 === 0) ? 3 : 2;
      for (let i = 0; i < numSucursalesAdicionales; i++) {
        const regionIndex = (companyIndex + i) % regionesPeru.length;
        const region = regionesPeru[regionIndex];

        sucursalesData.push({
          name: `Centro de Distribución ${region.city}`,
          code: `${company.slug.substring(0, 5).toUpperCase()}-${region.code}-${i + 1}`,
          address: region.address,
          city: region.city,
          state: region.state,
          country: "Perú",
          phone: company.phone,
          email: `contacto.${region.city.toLowerCase()}@${company.slug}.com`,
          companyId: company.id,
        });
      }
    }

    // Insertar sucursales secundarias
    if (sucursalesData.length > 0) {
      await prisma.branch.createMany({
        data: sucursalesData,
        skipDuplicates: true,
      });
    }

    // 6. Crear ÚNICO Usuario Administrador enlazado a la Sede Central y la Empresa
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
    companyIndex++;
  }

  console.log("\n====================================");
  console.log("⭐ PROCESO COMPLETADO: EMPRESAS E INVITADOS INSERTADOS");
  console.log("🔑 PASSWORD COMÚN DE ACCESO:", process.env.SEED_PASSWORD || "admin123");
  console.log("====================================\n");
}

module.exports = { adminSeed };
