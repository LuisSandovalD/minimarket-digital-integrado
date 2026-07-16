// ============================================================================
// prisma/seeds/product.seed.js
// Catálogo masivo de productos optimizado por empresa y tenant
// ============================================================================

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function productSeed() {
  console.log("🚀 Iniciando carga masiva de productos optimizada exclusivamente para las 4 empresas...");

  // 1. Validar Unidad Base
  const unit = await prisma.unit.findFirst({
    where: { type: "UNIT" },
  });

  if (!unit) {
    throw new Error("❌ No existe la unidad UNIT. Ejecuta unit.seed primero.");
  }

  // 2. Traer las 4 empresas de la base de datos
  const companies = await prisma.company.findMany();
  if (companies.length === 0) {
    throw new Error("❌ No existen empresas. Ejecuta admin.seed primero.");
  }

  // 3. Plantillas de datos exclusivas alineadas a los nombres y categorías reales del category.seed.js
  const blueprints = {
    // CORRECCIÓN CLAVE: El slug debe ser exactamente "minimarket-don-lucho"
    "minimarket-don-lucho": {
      category: "Abarrotes y Despensa", prefix: "MIN",
      items: ["Arroz Extra", "Aceite Vegetal", "Leche Evaporada", "Fideos Espagueti", "Azúcar Rubia", "Atún en Trozos", "Lentejas Bebé", "Café Soluble", "Galletas de Soda", "Gaseosa Cola", "Detergente Polvo", "Jabón de Tocador", "Yogurt Fresa", "Mermelada Piña", "Pan de Molde", "Mayonesa Alacena", "Avena en Hojuelas", "Té Filtrante", "Sal Yodada", "Chocolate Tableta"],
      brands: ["Costeño", "Primor", "Gloria", "Don Vittorio", "Cartavio", "Real", "Paisana", "Kirma", "San Jorge", "Inca Kola", "Bolívar", "Nekko", "Laive", "Fanny", "Bimbo", "Alicorp", "3 Ositos", "McColin's", "Emsal", "Sublime"],
      baseCost: 4.00,
    },
    "corp-tecnologica-vega": {
      category: "Componentes de Hardware", prefix: "TEC",
      items: ["Mouse Óptico", "Teclado Mecánico", "Monitor Gamer", "Auriculares Bluetooth", "Disco Sólido SSD", "Memoria RAM DDR4", "Cable HDMI 4K", "Cargador Carga Rápida", "Hub USB-C", "Soporte Laptop", "Powerbank 10k", "Cámara Web HD", "Adaptador Bluetooth", "Pendrive 64GB", "Tarjeta MicroSD", "Pasta Térmica", "Cooler CPU", "Grip de Mouse", "Filtro de Pantalla", "Organizador Cables"],
      brands: ["Logitech", "Redragon", "Asus", "Sony", "Kingston", "Corsair", "Ugreen", "Anker", "Baseus", "Halion", "Xiaomi", "Microsoft", "TP-Link", "SanDisk", "Samsung", "Artic", "CoolerMaster", "Razer", "3M", "Belkin"],
      baseCost: 90.00,
    },
    "inversiones-medicas-san-jose": {
      category: "Medicamentos de Venta Libre", prefix: "MED",
      items: ["Tensiómetro Digital", "Termómetro Infrarrojo", "Oxímetro de Pulso", "Glucómetro Kit", "Estetoscopio", "Mascarillas KN95 x10", "Alcohol en Gel 1L", "Algodón Hidrófilo", "Gasa Estéril Pack", "Jeringas 5ml x20", "Guantes Nitrilo Caja", "Venda Elástica", "Esparadrapo Hipoalergénico", "Termómetro Digital", "Tiras Reactivas x50", "Lancetas Estériles", "Silla de Ruedas Standard", "Muletas de Aluminio", "Protector Facial", "Nebulizador Portátil"],
      brands: ["Omron", "Beurer", "ChoiceMMed", "Accu-Chek", "Littmann", "3M", "Alkofarma", "Inca", "Galeno", "Becton", "Top Glove", "Crepe", "Nexcare", "Citizen", "Guide", "Lancet", "Ortho", "AluMed", "Safe", "Philips"],
      baseCost: 45.00,
    },
    "distribuidora-alimentos-sur": {
      category: "Granos y Menestras", prefix: "SUR",
      items: ["Saco Azúcar 50kg", "Saco Arroz 50kg", "Caja Aceite 12x1L", "Caja Leche 48 und", "Saco Harina 25kg", "Caja Atún 48 und", "Fardo Fideos 20 und", "Saco Menestras 25kg", "Caja Galletas Fardo", "Fardo Sal 20kg", "Caja Manteca Integral", "Saco Alimento Aves", "Fardo Conservas", "Caja Chocolates", "Saco Café Grano", "Fardo Papel Higiénico", "Caja Jabones Mayor", "Fardo Detergente", "Caja Conservas Durazno", "Saco Maíz Popcorn"],
      brands: ["Paramonga", "Costeño", "Primor", "Gloria", "Nicolini", "Fanny", "Lavaggi", "Sepsa", "Sayon", "Emsal", "Danlac", "Purina", "A-1", "Winter's", "Altomayo", "Elite", "Aval", "Opal", "Arequipa", "Importado"],
      baseCost: 80.00,
    },
  };

  // 4. Iterar sobre las empresas mapeando de forma segura e inequívoca
  for (const company of companies) {
    const blueprint = blueprints[company.slug];

    if (!blueprint) {
      console.log(`⚠️ Saltando: No se definió catálogo para el slug: ${company.slug}`);
      continue;
    }

    // Buscamos la categoría real previamente insertada para esta empresa específica
    let category = await prisma.category.findFirst({
      where: {
        name: blueprint.category,
        companyId: company.id,
      },
    });

    // Mecanismo de contingencia estricto por si la categoría no existe, evitando campos undefined
    if (!category) {
      category = await prisma.category.create({
        data: {
          name: blueprint.category,
          description: `Categoría por defecto para ${blueprint.category}.`,
          companyId: company.id,
          parentId: null,
        },
      });
    }

    const productsData = [];
    for (let i = 0; i < 20; i++) {
      const productName = `${blueprint.items[i]} ${blueprint.brands[i]}`;
      const skuNumber = String(i + 1).padStart(2, "0");

      // Gestión precisa de precios alineada con el tipo de dato NUMERIC(10, 2)
      const costPrice = parseFloat((blueprint.baseCost + (i * 1.5)).toFixed(2));
      const purchasePrice = costPrice;
      const salePrice = parseFloat((costPrice * 1.35).toFixed(2));

      const profitAmount = parseFloat((salePrice - costPrice).toFixed(2));
      const profitMargin = parseFloat(((profitAmount / salePrice) * 100).toFixed(2));

      const finalMaxStock = (i % 2 === 0) ? (60 + i * 5) : (30 + i * 2);
      const barcode = `775${blueprint.prefix}${skuNumber}${Math.floor(100 + Math.random() * 900)}`;

      productsData.push({
        name: productName,
        sku: `${blueprint.prefix}-${skuNumber}`,
        barcode: barcode,
        purchasePrice: purchasePrice,
        salePrice: salePrice,
        costPrice: costPrice,
        profitAmount: profitAmount,
        profitMargin: profitMargin,
        minStock: i + 2,
        maxStock: finalMaxStock,
        companyId: company.id,
        categoryId: category.id,
        unitId: unit.id,
      });
    }

    // Inserción masiva limpia por bloque multi-tenant
    await prisma.product.createMany({
      data: productsData,
      skipDuplicates: true,
    });

    console.log(`🛒 20 productos asignados correctamente a: ${company.name} [Categoría: ${category.name}]`);
  }

  console.log("\n====================================");
  console.log("⭐ SEED DE PRODUCTOS COMPLETADO CON ÉXITO");
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
