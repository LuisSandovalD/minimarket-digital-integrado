// ============================================================================
// prisma/seeds/unit.seed.js
// Carga de catálogo de unidades de consumo exclusiva para Don Lucho
// ============================================================================

const prisma = require("../client");

async function unitSeed() {
  console.log("🌱 Iniciando la siembra de unidades para Minimarket Don Lucho...");

  // 1. Obtener la empresa única registrada mediante su slug
  const company = await prisma.company.findFirst({
    where: { slug: "minimarket-don-lucho" },
  });

  if (!company) {
    throw new Error("❌ Error: No se encontró la empresa 'Minimarket Don Lucho' en la base de datos. Ejecuta admin.seed primero.");
  }

  console.log(`🏢 Empresa encontrada: ${company.name}. Procesando catálogo de unidades de consumo...`);

  // 2. Banco de unidades estandarizado estrictamente bajo el enum UnitType para Minimarkets
  const minimarketUnits = [
    { name: "Unidad Estándar", abbreviation: "und", type: "UNIT", conversionFactor: 1.0 },
    { name: "Caja Pequeña", abbreviation: "cj-pq", type: "BOX", conversionFactor: 1.0 },
    { name: "Caja Master", abbreviation: "cj-mst", type: "BOX", conversionFactor: 1.0 },
    { name: "Paquete Familiar", abbreviation: "paq-fam", type: "PACK", conversionFactor: 1.0 },
    { name: "Six-Pack Sodas", abbreviation: "6pack", type: "PACK", conversionFactor: 6.0 },
    { name: "Tri-Pack", abbreviation: "3pack", type: "PACK", conversionFactor: 3.0 },
    { name: "Bolsa de Productos", abbreviation: "bls", type: "UNIT", conversionFactor: 1.0 },
    { name: "Docena de Huevos", abbreviation: "doc", type: "DOZEN", conversionFactor: 1.0 },
    { name: "Media Docena", abbreviation: "m-doc", type: "DOZEN", conversionFactor: 0.5 },
    { name: "Litro Completo", abbreviation: "1L", type: "LITER", conversionFactor: 1.0 },
    { name: "Medio Litro Lácteo", abbreviation: "0.5L", type: "HALF_LITER", conversionFactor: 1.0 },
    { name: "Cuarto de Litro Néctar", abbreviation: "0.25L", type: "QUARTER_LITER", conversionFactor: 1.0 },
    { name: "Mililitro Líquido", abbreviation: "ml", type: "MILLILITER", conversionFactor: 1.0 },
    { name: "Kilogramo Granel", abbreviation: "kg", type: "KILOGRAM", conversionFactor: 1.0 },
    { name: "Gramo Especia", abbreviation: "g", type: "GRAM", conversionFactor: 1.0 },
    { name: "Saco de Arroz (50 kg)", abbreviation: "sac-50", type: "KILOGRAM", conversionFactor: 50.0 },
    { name: "Saco de Azúcar (25 kg)", abbreviation: "sac-25", type: "KILOGRAM", conversionFactor: 25.0 },
    { name: "Bandeja Embutidos", abbreviation: "bdj", type: "UNIT", conversionFactor: 1.0 },
    { name: "Rollo Papel Higiénico", abbreviation: "rlo", type: "UNIT", conversionFactor: 1.0 },
    { name: "Display Dulces", abbreviation: "disp", type: "PACK", conversionFactor: 1.0 },
    { name: "Frasco Conserva", abbreviation: "frs", type: "UNIT", conversionFactor: 1.0 },
    { name: "Lata Conserva", abbreviation: "lt", type: "UNIT", conversionFactor: 1.0 },
  ];

  // 3. Estructurar el payload inyectando el id de Don Lucho
  const payload = minimarketUnits.map(unit => ({
    ...unit,
    companyId: company.id,
  }));

  // 4. Inserción masiva optimizada (utilizando skipDuplicates para evitar errores si se ejecuta de nuevo)
  const result = await prisma.unit.createMany({
    data: payload,
    skipDuplicates: true,
  });

  console.log("\n====================================");
  console.log(`⭐ SEED DE UNIDADES COMPLETADO: Se cargaron ${result.count} registros de manera segura.`);
  console.log("====================================\n");
}

// Para mantener consistencia con los llamados de tus otros scripts indexados
module.exports = { unitSeed };
