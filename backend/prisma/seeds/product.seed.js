// ============================================================================
// prisma/seeds/product.seed.js
// Catálogo de productos optimizado y masivo exclusivo para Minimarket Don Lucho
// ============================================================================

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function productSeed() {
  console.log("🚀 Iniciando carga masiva y realista de productos para Minimarket Don Lucho...");

  // 1. Obtener la empresa única
  const company = await prisma.company.findFirst({
    where: { slug: "minimarket-don-lucho" },
  });

  if (!company) {
    throw new Error("❌ Error: No se encontró la empresa 'Minimarket Don Lucho'. Ejecuta admin.seed primero.");
  }

  // 2. Traer las unidades requeridas de Don Lucho para mapear correctamente
  const units = await prisma.unit.findMany({
    where: { companyId: company.id },
  });

  if (units.length === 0) {
    throw new Error("❌ Error: No existen unidades registradas para esta empresa. Ejecuta unit.seed primero.");
  }

  // Helper para buscar unidades por abreviación de forma segura con fallback a 'und'
  const getUnitId = (abbreviation) => {
    const matched = units.find(u => u.abbreviation === abbreviation);
    return matched ? matched.id : units.find(u => u.abbreviation === "und")?.id || units[0].id;
  };

  // 3. Traer las categorías registradas para Don Lucho
  const categories = await prisma.category.findMany({
    where: { companyId: company.id },
  });

  if (categories.length === 0) {
    throw new Error("❌ Error: No existen categorías registradas para esta empresa. Ejecuta category.seed primero.");
  }

  // Helper para buscar categoría (por nombre exacto de categoría padre o subcategoría)
  const getCategoryId = (categoryName) => {
    const matched = categories.find(c => c.name.toLowerCase() === categoryName.toLowerCase());
    return matched ? matched.id : categories[0].id;
  };

  // 4. Catálogo masivo y estructurado de productos (45+ artículos de alta rotación)
  const productBlueprints = [
    // --- ABARROTES Y DESPENSA ---
    { name: "Arroz Extra Costeño 1 kg", category: "Abarrotes y Despensa", unit: "kg", cost: 3.80, max: 200, min: 20, sku: "ABA-01", bar: "7750101" },
    { name: "Aceite Vegetal Primor Premium 1L", category: "Abarrotes y Despensa", unit: "1L", cost: 7.20, max: 120, min: 15, sku: "ABA-02", bar: "7750102" },
    { name: "Fideos Espagueti Don Vittorio 450g", category: "Abarrotes y Despensa", unit: "und", cost: 2.10, max: 150, min: 25, sku: "ABA-03", bar: "7750103" },
    { name: "Azúcar Rubia Cartavio 1 kg", category: "Abarrotes y Despensa", unit: "kg", cost: 3.40, max: 250, min: 30, sku: "ABA-04", bar: "7750104" },
    { name: "Atún en Trozos de Caballa Real 170g", category: "Abarrotes y Despensa", unit: "lt", cost: 4.50, max: 100, min: 15, sku: "ABA-05", bar: "7750105" },
    { name: "Saco de Arroz Costeño (50 kg)", category: "Abarrotes y Despensa", unit: "sac-50", cost: 165.00, max: 20, min: 3, sku: "ABA-06", bar: "7750106" },
    { name: "Sal de Mesa Yodada Emsal 1 kg", category: "Abarrotes y Despensa", unit: "und", cost: 1.10, max: 100, min: 10, sku: "ABA-07", bar: "7750107" },
    { name: "Café Instantáneo Kirma Clásico 190g", category: "Abarrotes y Despensa", unit: "und", cost: 11.50, max: 60, min: 8, sku: "ABA-08", bar: "7750108" },
    { name: "Saco de Azúcar Rubia Dalsa (25 kg)", category: "Abarrotes y Despensa", unit: "sac-25", cost: 78.00, max: 15, min: 2, sku: "ABA-09", bar: "7750109" },
    { name: "Lenteja Verde Seleccionada Paisana 500g", category: "Abarrotes y Despensa", unit: "und", cost: 3.20, max: 80, min: 12, sku: "ABA-10", bar: "7750110" },
    { name: "Avena en Hojuelas 3 Ositos 135g", category: "Abarrotes y Despensa", unit: "und", cost: 1.50, max: 120, min: 15, sku: "ABA-11", bar: "7750111" },
    { name: "Mayonesa Alacena Receta Casera 190g", category: "Abarrotes y Despensa", unit: "und", cost: 4.80, max: 90, min: 10, sku: "ABA-12", bar: "7750112" },

    // --- BEBIDAS Y LÍQUIDOS ---
    { name: "Gaseosa Inca Kola Botella 1.5L", category: "Bebidas y Líquidos", unit: "und", cost: 4.20, max: 180, min: 24, sku: "BEB-01", bar: "7750201" },
    { name: "Gaseosa Coca-Cola Original Botella 3L", category: "Bebidas y Líquidos", unit: "und", cost: 7.50, max: 120, min: 18, sku: "BEB-02", bar: "7750202" },
    { name: "Agua Mineral San Luis Sin Gas 2.5L", category: "Bebidas y Líquidos", unit: "und", cost: 1.80, max: 150, min: 20, sku: "BEB-03", bar: "7750203" },
    { name: "Pack Gaseosa Coca-Cola Lata 355ml", category: "Bebidas y Líquidos", unit: "6pack", cost: 12.50, max: 40, min: 6, sku: "BEB-04", bar: "7750204" },
    { name: "Jugo de Durazno Frugos del Valle 1L", category: "Bebidas y Líquidos", unit: "1L", cost: 3.10, max: 80, min: 12, sku: "BEB-05", bar: "7750205" },
    { name: "Bebida Energizante Volt Azul Botella 300ml", category: "Bebidas y Líquidos", unit: "und", cost: 1.60, max: 150, min: 15, sku: "BEB-06", bar: "7750206" },
    { name: "Bebida Isatónica Sporade Mandarina 500ml", category: "Bebidas y Líquidos", unit: "und", cost: 1.85, max: 100, min: 12, sku: "BEB-07", bar: "7750207" },
    { name: "Té Filtrante McColin's Manzanilla x100 und", category: "Bebidas y Líquidos", unit: "und", cost: 6.20, max: 50, min: 8, sku: "BEB-08", bar: "7750208" },

    // --- LÁCTEOS Y HUEVOS ---
    { name: "Leche Evaporada Gloria Azul Lata 395g", category: "Lácteos y Huevos", unit: "und", cost: 3.20, max: 300, min: 48, sku: "LAC-01", bar: "7750301" },
    { name: "Yogurt de Fresa Gloria Botella 1 kg", category: "Lácteos y Huevos", unit: "und", cost: 5.10, max: 90, min: 15, sku: "LAC-02", bar: "7750302" },
    { name: "Mantequilla con Sal Laive Pote 200g", category: "Lácteos y Huevos", unit: "und", cost: 3.90, max: 70, min: 10, sku: "LAC-03", bar: "7750303" },
    { name: "Media Docena de Huevos Rosados", category: "Lácteos y Huevos", unit: "m-doc", cost: 2.80, max: 100, min: 15, sku: "LAC-04", bar: "7750304" },
    { name: "Queso Fresco Lationizado Laive 400g", category: "Lácteos y Huevos", unit: "und", cost: 7.80, max: 50, min: 8, sku: "LAC-05", bar: "7750305" },
    { name: "Six-Pack Leche Evaporada Gloria Azul", category: "Lácteos y Huevos", unit: "6pack", cost: 18.20, max: 40, min: 5, sku: "LAC-06", bar: "7750306" },
    { name: "Yogurt Griego de Arándanos Laive 120g", category: "Lácteos y Huevos", unit: "und", cost: 2.10, max: 60, min: 10, sku: "LAC-07", bar: "7750307" },

    // --- LIMPIEZA DEL HOGAR ---
    { name: "Detergente Polvo Bolívar Flores de Limón 2.6kg", category: "Limpieza del Hogar", unit: "und", cost: 18.50, max: 60, min: 8, sku: "LIM-01", bar: "7750401" },
    { name: "Lavavajillas Líquido Ayudín Limón 500ml", category: "Limpieza del Hogar", unit: "und", cost: 4.10, max: 100, min: 12, sku: "LIM-02", bar: "7750402" },
    { name: "Limpia Todo Poett Bebé Botella 1.8L", category: "Limpieza del Hogar", unit: "und", cost: 5.90, max: 80, min: 10, sku: "LIM-03", bar: "7750403" },
    { name: "Cloro Tradicional Clorox Botella 1L", category: "Limpieza del Hogar", unit: "1L", cost: 2.80, max: 120, min: 15, sku: "LIM-04", bar: "7750404" },
    { name: "Suavizante Textil Downy Brisa de Verano 800ml", category: "Limpieza del Hogar", unit: "und", cost: 8.90, max: 50, min: 6, sku: "LIM-05", bar: "7750405" },
    { name: "Esponja de Cocina Scotch-Brite Multiuso", category: "Limpieza del Hogar", unit: "und", cost: 1.50, max: 150, min: 20, sku: "LIM-06", bar: "7750406" },

    // --- SNACKS Y GOLOSINAS ---
    { name: "Papas Fritas Lay's Clásicas Familiares 150g", category: "Snacks y Golosinas", unit: "und", cost: 4.50, max: 100, min: 12, sku: "SNA-01", bar: "7750501" },
    { name: "Galletas de Soda San Jorge Pack Familiar", category: "Snacks y Golosinas", unit: "paq-fam", cost: 3.20, max: 150, min: 20, sku: "SNA-02", bar: "7750502" },
    { name: "Chocolate Sublime Extremo Barra 50g", category: "Snacks y Golosinas", unit: "und", cost: 1.50, max: 200, min: 30, sku: "SNA-03", bar: "7750503" },
    { name: "Tortillas Doritos Queso Atrevido 150g", category: "Snacks y Golosinas", unit: "und", cost: 4.50, max: 100, min: 12, sku: "SNA-04", bar: "7750504" },
    { name: "Galletas Dulces Casino Menta Pack x6", category: "Snacks y Golosinas", unit: "3pack", cost: 2.80, max: 120, min: 15, sku: "SNA-05", bar: "7750505" },
    { name: "Caramelos de Limón Peruano Ambrosoli Bolsa x100", category: "Snacks y Golosinas", unit: "bls", cost: 5.50, max: 40, min: 5, sku: "SNA-06", bar: "7750506" },
    { name: "Piqueo Snack Snax Mix Familiar 180g", category: "Snacks y Golosinas", unit: "und", cost: 5.80, max: 80, min: 10, sku: "SNA-07", bar: "7750507" },

    // --- CUIDADO PERSONAL BÁSICOS ---
    { name: "Jabón de Tocador Avena Nekko Barra 120g", category: "Cuidado Personal Básicos", unit: "und", cost: 1.90, max: 150, min: 20, sku: "CUI-01", bar: "7750601" },
    { name: "Shampoo Head & Shoulders Limpieza Renovadora 375ml", category: "Cuidado Personal Básicos", unit: "und", cost: 12.80, max: 60, min: 10, sku: "CUI-02", bar: "7750602" },
    { name: "Crema Dental Colgate Triple Acción 75ml", category: "Cuidado Personal Básicos", unit: "und", cost: 3.10, max: 120, min: 15, sku: "CUI-03", bar: "7750603" },
    { name: "Papel Higiénico Suave Doble Hoja Pack de 4 rollos", category: "Cuidado Personal Básicos", unit: "und", cost: 4.20, max: 150, min: 20, sku: "CUI-04", bar: "7750604" },
    { name: "Desodorante Rexona Clinical Crema Hombre 48g", category: "Cuidado Personal Básicos", unit: "und", cost: 13.50, max: 40, min: 5, sku: "CUI-05", bar: "7750605" },
    { name: "Toallitas Húmedas Huggies Triple Protección x48", category: "Cuidado Personal Básicos", unit: "und", cost: 4.90, max: 80, min: 12, sku: "CUI-06", bar: "7750606" },
    { name: "Shampoo Johnson's Baby Regular 200ml", category: "Cuidado Personal Básicos", unit: "und", cost: 8.50, max: 50, min: 8, sku: "CUI-07", bar: "7750607" },
  ];

  const productsData = [];

  // 5. Procesar los cálculos matemáticos/financieros de los productos de manera consistente
  for (const item of productBlueprints) {
    const costPrice = parseFloat(item.cost.toFixed(2));
    const purchasePrice = costPrice;

    // Cálculo de precio de venta estándar (Margen bruto objetivo del 35% sobre el precio de venta)
    // Precio de Venta = Costo / (1 - Margen) => Costo / 0.65
    const salePrice = parseFloat((costPrice / 0.65).toFixed(2));
    const profitAmount = parseFloat((salePrice - costPrice).toFixed(2));
    const profitMargin = parseFloat(((profitAmount / salePrice) * 100).toFixed(2));

    productsData.push({
      name: item.name,
      sku: `LUCHO-${item.sku}`,
      barcode: `${item.bar}${Math.floor(10 + Math.random() * 90)}`,
      purchasePrice: purchasePrice,
      salePrice: salePrice,
      costPrice: costPrice,
      profitAmount: profitAmount,
      profitMargin: profitMargin,
      minStock: item.min,
      maxStock: item.max,
      companyId: company.id,
      categoryId: getCategoryId(item.category),
      unitId: getUnitId(item.unit),
    });
  }

  // 6. Inserción masiva limpia libre de duplicados
  const result = await prisma.product.createMany({
    data: productsData,
    skipDuplicates: true,
  });

  console.log("\n====================================");
  console.log("✅ SEED DE PRODUCTOS COMPLETADO");
  console.log(`📊 Productos registrados exitosamente: ${result.count}`);
  console.log("====================================\n");
}

if (require.main === module) {
  productSeed()
    .catch((e) => {
      console.error("❌ Error detectado en el proceso de seed de productos:", e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

module.exports = {
  productSeed,
};
