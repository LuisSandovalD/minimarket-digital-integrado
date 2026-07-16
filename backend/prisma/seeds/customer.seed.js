// ============================================================================
// prisma/seeds/customer.seed.js
// OPTIMIZADO: Exclusivo para "Minimarket Don Lucho"
// ============================================================================

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Genera una fecha aleatoria entre el 1 de enero de 2021 y el 8 de julio de 2026
function randomHistoricalDate() {
  const start = new Date("2021-01-01T00:00:00Z").getTime();
  const end = new Date("2026-07-08T23:59:59Z").getTime();
  const randomTime = start + Math.random() * (end - start);
  return new Date(randomTime);
}

async function customerSeed() {
  console.log("🚀 Iniciando carga masiva de Clientes exclusiva para Minimarket Don Lucho...");

  // 1. Buscar la empresa en la base de datos por su slug único
  const company = await prisma.company.findFirst({
    where: { slug: "minimarket-don-lucho" },
  });

  if (!company) {
    throw new Error(
      "❌ No se encontró la empresa con slug 'minimarket-don-lucho' en la base de datos. Ejecuta tu admin/company seed primero.",
    );
  }

  // 2. Datos de nombres, apellidos y calles reales de San Juan de Lurigancho (SJL)
  const names = ["Carlos", "María", "José", "Ana", "Luis", "Rosa", "Miguel", "Carmen", "Pedro", "Daniela", "Jorge", "Patricia", "Fernando", "Lucía", "Sonia", "Julio", "Elena", "Héctor", "Verónica", "Alejandro", "Diana", "Renzo", "Gabriela", "Walter"];
  const lastNames = ["Mendoza", "López", "Torres", "Salazar", "Ramírez", "Castillo", "Vargas", "Gutiérrez", "Paredes", "Navarro", "Herrera", "Salinas", "Gómez", "Villanueva", "Palomino", "Flores", "Benítez", "Tello", "Ortiz", "Meza", "Farfán", "Pasquel", "Miranda", "Quispe"];

  const sjlStreets = [
    "Av. Los Próceres",
    "Av. Fernando Wiesse",
    "Jr. Las Lomas",
    "Av. Próceres de la Independencia",
    "Av. Flores de Primavera",
    "Av. Canto Grande",
  ];

  const customersData = [];

  // Al ser la única empresa, podemos ampliar un poco más la base de clientes iniciales (ej. entre 45 y 60)
  const totalCustomers = Math.floor(Math.random() * 16) + 45;

  for (let i = 0; i < totalCustomers; i++) {
    // Combinaciones usando residuos para asegurar variedad sin duplicar nombres completos exactos
    const firstName = names[i % names.length];
    const secondName = names[(i * 3) % names.length];
    const lastName = lastNames[i % lastNames.length];
    const secondLastName = lastNames[(i + 7) % lastNames.length];
    const street = sjlStreets[i % sjlStreets.length];

    const fullName = `${firstName} ${secondName} ${lastName} ${secondLastName}`;

    // Generación de DNI de 8 dígitos único y correlativo
    const docNumber = String(72000000 + (i * 189)).substring(0, 8);

    // Correo electrónico único
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@donlucho.pe`;

    // Teléfono móvil de 9 dígitos que empieza con 9
    const phone = String(987000000 + (i * 641)).substring(0, 9);

    // Límites de crédito realistas para un minimarket de barrio (en Soles - PEN)
    const creditLimit = parseFloat(([100, 150, 200, 300, 400, 500, 800])[i % 7]);

    const historicalDate = randomHistoricalDate();

    customersData.push({
      name: fullName,
      documentType: "DNI",
      documentNumber: docNumber,
      email: email,
      phone: phone,
      city: "San Juan de Lurigancho",
      address: `${street} N° ${100 + (i * 6)}`,
      notes: i % 5 === 0 ? "Vecino recurrente - Pago puntual" : null,
      creditLimit: creditLimit,
      currentDebt: 0.0,
      isActive: i % 30 !== 0, // ~97% de la cartera activa
      companyId: company.id,
      createdAt: historicalDate,
      updatedAt: historicalDate,
    });
  }

  // 3. Inserción masiva limpia con skipDuplicates activo
  await prisma.customer.createMany({
    data: customersData,
    skipDuplicates: true,
  });

  console.log("\n====================================");
  console.log("✅ SEED DE CLIENTES COMPLETADO");
  console.log("📍 Ubicaciones localizadas en: San Juan de Lurigancho");
  console.log(`📊 Total de clientes inyectados para Don Lucho: ${customersData.length}`);
  console.log("====================================\n");
}

if (require.main === module) {
  customerSeed()
    .catch((e) => {
      console.error("❌ Error detectado en el proceso de seed de clientes:", e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

module.exports = {
  customerSeed,
};
