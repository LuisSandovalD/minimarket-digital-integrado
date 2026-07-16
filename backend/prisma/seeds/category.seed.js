// ============================================================================
// prisma/seeds/category.seed.js
// Carga de categorías y subcategorías exclusivas para Minimarket Don Lucho
// ============================================================================

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function categorySeed() {
  console.log("🌱 Iniciando siembra jerárquica de Categorías para Minimarket Don Lucho...");

  // 1. Obtener la empresa única mediante su slug
  const company = await prisma.company.findFirst({
    where: { slug: "minimarket-don-lucho" },
  });

  if (!company) {
    throw new Error("❌ Error: No se encontró la empresa 'Minimarket Don Lucho' en la base de datos. Ejecuta admin.seed primero.");
  }

  console.log(`🏢 Empresa encontrada: ${company.name}. Procesando estructura de categorías...`);

  let totalCategories = 0;
  let totalSubCategories = 0;

  // 2. Esquema categórico exclusivo de Minimarket / Supermercado
  const sectorSchema = [
    {
      parent: { name: "Abarrotes y Despensa", description: "Insumos secos y provisiones básicas" },
      subs: ["Arroz y Legumbres", "Azúcar y Endulzantes", "Fideos y Pastas", "Aceites Comestibles", "Harinas y Polvos", "Sal y Especias"],
    },
    {
      parent: { name: "Bebidas y Líquidos", description: "Líquidos refrescantes con o sin gas" },
      subs: ["Gaseosas", "Aguas Puras", "Jugos y Néctares", "Bebidas Energizantes", "Isotónicos", "Tés Líquidos"],
    },
    {
      parent: { name: "Lácteos y Huevos", description: "Leches y derivados pasteurizados" },
      subs: ["Leche Líquida", "Yogures", "Mantequillas", "Quesos Frescos", "Quesos Madurados", "Huevos de Gallina"],
    },
    {
      parent: { name: "Limpieza del Hogar", description: "Desinfección y aseo de interiores" },
      subs: ["Detergentes Ropa", "Lavavajillas", "Limpia pisos", "Cloro y Desinfectantes", "Suavizantes", "Esponjas y Paños"],
    },
    {
      parent: { name: "Snacks y Golosinas", description: "Piqueos rápidos y dulces" },
      subs: ["Papas Fritas", "Piqueos Salados", "Galletas Dulces", "Galletas Saladas", "Chocolates", "Caramelos y Gomas"],
    },
    {
      parent: { name: "Cuidado Personal Básicos", description: "Higiene personal diaria" },
      subs: ["Jabones Barras", "Shampoo", "Crema Dental", "Desodorantes", "Papel Higiénico", "Toallitas Húmedas"],
    },
  ];

  // 3. Inyección secuencial para mantener la integridad jerárquica Parent -> Child
  for (const item of sectorSchema) {
    // Crear la categoría padre
    const parentCategory = await prisma.category.create({
      data: {
        name: item.parent.name,
        description: item.parent.description,
        companyId: company.id,
        parentId: null, // Categoría raíz
      },
    });
    totalCategories++;

    // Mapear y preparar las subcategorías hijas asociadas al ID del padre creado
    const subCategoriesData = item.subs.map((subName) => ({
      name: subName,
      description: `Subcategoría específica correspondiente a ${subName}.`,
      companyId: company.id,
      parentId: parentCategory.id, // Relación jerárquica estricta
    }));

    // Inserción masiva de subcategorías
    await prisma.category.createMany({
      data: subCategoriesData,
      skipDuplicates: true,
    });
    totalSubCategories += subCategoriesData.length;
  }

  console.log("\n====================================");
  console.log("✅ SEED DE CATEGORÍAS COMPLETADO");
  console.log(`📊 Categorías Base (Padres) creadas: ${totalCategories}`);
  console.log(`📊 Subcategorías (Hijas) inyectadas: ${totalSubCategories}`);
  console.log(`📦 Total entidades relacionales estructuradas: ${totalCategories + totalSubCategories}`);
  console.log("====================================\n");
}

if (require.main === module) {
  categorySeed()
    .catch((e) => {
      console.error("❌ Error detectado en el proceso de siembra de categorías:", e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

module.exports = {
  categorySeed,
};
