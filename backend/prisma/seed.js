// ============================================================================
// PRISMA MAIN SEEDER CONTROL
// Mantiene el orden estricto de inyecciones relacionales
// ============================================================================

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// IMPORTACIÓN DE MÓDULOS DE SEMILLAS (FASE 1 A 3)
const { adminSeed } = require("./seeds/admin.seed");
const { unitSeed } = require("./seeds/unit.seed");
const { categorySeed } = require("./seeds/category.seed");
const { productSeed } = require("./seeds/product.seed");
const { customerSeed } = require("./seeds/customer.seed");
const { purchaseJsonPayloadSeed } = require("./seeds/purchase.seed");

// IMPORTACIÓN DE SEMILLAS DE VENTAS POR AÑOS (FASE 4)
const { saleJsonPayloadSeed2021 } = require("./seeds/sale.seed.2021");
const { saleJsonPayloadSeed2022 } = require("./seeds/sale.seed.2022");
const { saleJsonPayloadSeed2023 } = require("./seeds/sale.seed.2023");
const { saleJsonPayloadSeed2024 } = require("./seeds/sale.seed.2024");
const { saleJsonPayloadSeed2025 } = require("./seeds/sale.seed.2025");
const { saleJsonPayloadSeed2026 } = require("./seeds/sale.seed.2026");
const { supplierSeed } = require("./seeds/supplier.seed"); // OBLIGATORIO

/**
 * Ejecutor genérico de módulos de semillas con manejo de logs dinámicos
 */
async function executeSeed(seedModule, name) {
  const seedFunction =
    typeof seedModule === "function"
      ? seedModule
      : Object.values(seedModule)[0];

  if (typeof seedFunction !== "function") {
    throw new Error(`❌ Estructura de seed inválida o función no encontrada en: ${name}`);
  }

  console.log(`\n🚀 [INICIO] Ejecutando: ${name}...`);
  const startTime = Date.now();

  await seedFunction();

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`✅ [ÉXITO] ${name} completado en ${duration}s`);
}

/**
 * Función Principal de Control de Datos Basales e Históricos
 */
async function main() {
  try {
    console.log("====================================================================");
    console.log("             ⚙️ INICIANDO PROCESO DE SEEDING ESTRUCTURAL           ");
    console.log("====================================================================");




    // ── FASE 4: TRANSACCIONAL HISTÓRICO MULTIANUAL ────────────────────────────────
    // Inyección secuencial cronológica para mantener la coherencia del inventario
    await executeSeed(saleJsonPayloadSeed2021, "9. Historic Sales Ledger Year 2021");
    await executeSeed(saleJsonPayloadSeed2022, "10. Historic Sales Ledger Year 2022");
    await executeSeed(saleJsonPayloadSeed2023, "11. Historic Sales Ledger Year 2023");
    await executeSeed(saleJsonPayloadSeed2024, "12. Historic Sales Ledger Year 2024");
    await executeSeed(saleJsonPayloadSeed2025, "13. Current Sales Ledger Year 2025");
    await executeSeed(saleJsonPayloadSeed2026, "14. Future/Projection Sales Ledger Year 2026");

    console.log("\n====================================================================");
    console.log("🎉 ¡BASE DE DATOS INYECTADA Y RECONCILIADA SATISFACTORIAMENTE!");
    console.log("====================================================================");

  } catch (error) {
    console.error("\n❌ CRITICAL ERROR DURANTE EL SEEDING:");
    console.error(error);
    process.exit(1);
  } finally {
    // Evita fugas de memoria cerrando el pool de conexiones
    await prisma.$disconnect();
  }
}

main();