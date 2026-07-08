// ============================================================================
// PRISMA MAIN SEEDER CONTROL
// Mantiene el orden estricto de inyecciones relacionales
// ============================================================================

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ============================================================================
// FASE 1 - DATOS MAESTROS
// ============================================================================
const { adminSeed } = require("./seeds/admin.seed");
const { commentsSeed } = require("./seeds/comments.seed");

const { unitSeed } = require("./seeds/unit.seed");
const { categorySeed } = require("./seeds/category.seed");
const { productSeed } = require("./seeds/product.seed");
const { customerSeed } = require("./seeds/customer.seed");
const { supplierSeed } = require("./seeds/supplier.seed");

// ============================================================================
// FASE 2 - TRANSACCIONES BASE
// ============================================================================
const { purchaseJsonPayloadSeed } = require("./seeds/purchase.seed");

// ============================================================================
// FASE 3 - HISTÓRICO DE VENTAS
// ============================================================================
const { saleJsonPayloadSeed2021 } = require("./seeds/sale.seed.2021");
const { saleJsonPayloadSeed2022 } = require("./seeds/sale.seed.2022");
const { saleJsonPayloadSeed2023 } = require("./seeds/sale.seed.2023");
const { saleJsonPayloadSeed2024 } = require("./seeds/sale.seed.2024");
const { saleJsonPayloadSeed2025 } = require("./seeds/sale.seed.2025");
const { saleJsonPayloadSeed2026 } = require("./seeds/sale.seed.2026");

/**
 * Ejecuta cualquier módulo seed con logs homogéneos
 */
async function executeSeed(seedModule, name) {
  const seedFunction =
    typeof seedModule === "function"
      ? seedModule
      : Object.values(seedModule)[0];

  if (typeof seedFunction !== "function") {
    throw new Error(
      `❌ Estructura de seed inválida o función no encontrada en: ${name}`
    );
  }

  console.log(`\n🚀 [INICIO] ${name}`);

  const startTime = Date.now();

  await seedFunction();

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log(`✅ [ÉXITO] ${name} completado en ${duration}s`);
}

/**
 * MAIN
 */
async function main() {
  try {
    console.log("\n====================================================================");
    console.log("⚙️ INICIANDO PROCESO DE SEEDING ESTRUCTURAL");
    console.log("====================================================================");

    // ======================================================================
    // FASE 1 - ESTRUCTURA BASE
    // ======================================================================


    // await executeSeed(adminSeed, "1. Administrator Users");
    // await executeSeed(commentsSeed, "2. Comments for Administrators");
    // await executeSeed(unitSeed, "2. Measurement Units");
    // await executeSeed(categorySeed, "3. Product Categories");

    // await executeSeed(productSeed, "4. Product Catalog");
    // await executeSeed(customerSeed, "5. Customers");
    // await executeSeed(supplierSeed, "6. Suppliers");

    // ======================================================================
    // FASE 2 - INVENTARIO INICIAL
    // ======================================================================

    // await executeSeed(
    //   purchaseJsonPayloadSeed,
    //   "7. Historical Purchases & Initial Stock"
    // );



    // await executeSeed(
    //   saleJsonPayloadSeed2021,
    //   "8. Historic Sales Ledger Year 2021"
    // );

    // await executeSeed(
    //   saleJsonPayloadSeed2022,
    //   "9. Historic Sales Ledger Year 2022"
    // );

    // await executeSeed(
    //   saleJsonPayloadSeed2023,
    //   "10. Historic Sales Ledger Year 2023"
    // );

    // await executeSeed(
    //   saleJsonPayloadSeed2024,
    //   "11. Historic Sales Ledger Year 2024"
    // );

    // await executeSeed(
    //   saleJsonPayloadSeed2025,
    //   "12. Historic Sales Ledger Year 2025"
    // );

    await executeSeed(
      saleJsonPayloadSeed2026,
      "13. Historic Sales Ledger Year 2026"
    );

    console.log("\n====================================================================");
    console.log("🎉 BASE DE DATOS INYECTADA CORRECTAMENTE");
    console.log("====================================================================");
  } catch (error) {
    console.error("\n❌ ERROR CRÍTICO DURANTE EL SEEDING");
    console.error(error);

    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();