// ========================================
// prisma/seeds/category.seed.js
// ========================================

const prisma = require("../client");

async function categorySeed() {
    const company = await prisma.company.findFirst();

    if (!company) {
        throw new Error("❌ Error: No existe ninguna empresa registrada en el sistema.");
    }

    console.log("🌱 Iniciando la siembra de Categorías y Subcategorías...");

    // ========================================
    // 1. CATEGORÍAS PADRE (Estructura Individual)
    // ========================================

    const bebidas = await prisma.category.create({
        data: {
            name: "Bebidas",
            description: "Productos líquidos y refrescantes con o sin gas",
            companyId: company.id
        }
    });

    const abarrotes = await prisma.category.create({
        data: {
            name: "Abarrotes",
            description: "Productos básicos de cocina y provisiones",
            companyId: company.id
        }
    });

    const lacteos = await prisma.category.create({
        data: {
            name: "Lácteos",
            description: "Leches y productos derivados de la leche",
            companyId: company.id
        }
    });

    const limpieza = await prisma.category.create({
        data: {
            name: "Limpieza del Hogar",
            description: "Artículos de desinfección, lavado y aseo del hogar",
            companyId: company.id
        }
    });

    const cuidadoPersonal = await prisma.category.create({
        data: {
            name: "Cuidado Personal",
            description: "Higiene personal, cuidado corporal y capilar",
            companyId: company.id
        }
    });

    const snacksGolosinas = await prisma.category.create({
        data: {
            name: "Snacks y Golosinas",
            description: "Papas, galletas, chocolates y piqueos rápidos",
            companyId: company.id
        }
    });

    const desayuno = await prisma.category.create({
        data: {
            name: "Desayuno",
            description: "Complementos, cafés, avenas e infusiones para la mañana",
            companyId: company.id
        }
    });

    const conservasSalsas = await prisma.category.create({
        data: {
            name: "Conservas y Salsas",
            description: "Alimentos enlatados, aderezos y salsas preparadas",
            companyId: company.id
        }
    });

    console.log("   └─ ✅ [8] Categorías principales inyectadas con éxito.");

    // ========================================
    // 2. SUBCATEGORÍAS (Inserción Masiva Optimizada)
    // ========================================

    const subCategoriesResult = await prisma.category.createMany({
        data: [
            // Subcategorías de Bebidas
            { name: "Gaseosas", companyId: company.id, parentId: bebidas.id },
            { name: "Agua", companyId: company.id, parentId: bebidas.id },
            { name: "Jugos", companyId: company.id, parentId: bebidas.id },
            { name: "Bebidas Energizantes", companyId: company.id, parentId: bebidas.id },

            // Subcategorías de Abarrotes
            { name: "Arroz", companyId: company.id, parentId: abarrotes.id },
            { name: "Azúcar", companyId: company.id, parentId: abarrotes.id },
            { name: "Fideos", companyId: company.id, parentId: abarrotes.id },
            { name: "Aceites", companyId: company.id, parentId: abarrotes.id },
            { name: "Menestras", companyId: company.id, parentId: abarrotes.id },
            { name: "Harinas y Polvos", companyId: company.id, parentId: abarrotes.id },

            // Subcategorías de Lácteos
            { name: "Leches", companyId: company.id, parentId: lacteos.id },
            { name: "Yogurt", companyId: company.id, parentId: lacteos.id },
            { name: "Mantequillas y Margarinas", companyId: company.id, parentId: lacteos.id },
            { name: "Quesos", companyId: company.id, parentId: lacteos.id },

            // Subcategorías de Limpieza del Hogar
            { name: "Detergentes", companyId: company.id, parentId: limpieza.id },
            { name: "Lavavajillas", companyId: company.id, parentId: limpieza.id },
            { name: "Desinfectantes y Cloro", companyId: company.id, parentId: limpieza.id },
            { name: "Suavizantes", companyId: company.id, parentId: limpieza.id },
            { name: "Utensilios de Limpieza", companyId: company.id, parentId: limpieza.id },

            // Subcategorías de Cuidado Personal
            { name: "Cuidado Capilar", companyId: company.id, parentId: cuidadoPersonal.id },
            { name: "Cuidado Oral", companyId: company.id, parentId: cuidadoPersonal.id },
            { name: "Jabones y Geles", companyId: company.id, parentId: cuidadoPersonal.id },
            { name: "Desodorantes", companyId: company.id, parentId: cuidadoPersonal.id },
            { name: "Papel Higiénico y Toallitas", companyId: company.id, parentId: cuidadoPersonal.id },

            // Subcategorías de Snacks y Golosinas
            { name: "Papas y Piqueos", companyId: company.id, parentId: snacksGolosinas.id },
            { name: "Galletas Dulces", companyId: company.id, parentId: snacksGolosinas.id },
            { name: "Galletas Saladas", companyId: company.id, parentId: snacksGolosinas.id },
            { name: "Chocolates y Dulces", companyId: company.id, parentId: snacksGolosinas.id },

            // Subcategorías de Desayuno
            { name: "Café e Infusiones", companyId: company.id, parentId: desayuno.id },
            { name: "Cereales y Avenas", companyId: company.id, parentId: desayuno.id },
            { name: "Mermeladas y Cremas", companyId: company.id, parentId: desayuno.id },
            { name: "Modificadores de Leche", companyId: company.id, parentId: desayuno.id },

            // Subcategorías de Conservas y Salsas
            { name: "Conservas de Pescado", companyId: company.id, parentId: conservasSalsas.id },
            { name: "Salsas y Aderezos", companyId: company.id, parentId: conservasSalsas.id },
            { name: "Conservas de Vegetales", companyId: company.id, parentId: conservasSalsas.id }
        ],
        skipDuplicates: true
    });

    console.log(`   └─ ✅ [${subCategoriesResult.count}] Subcategorías enlazadas con éxito.`);
    console.log("🏁 Proceso de mapeo de categorías finalizado de manera limpia.\n");
}

module.exports = {
    categorySeed
};