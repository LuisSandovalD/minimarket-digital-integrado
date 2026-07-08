// ========================================
// prisma/seeds/supplier.seed.js
// ========================================

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Genera una fecha aleatoria entre el 1 de enero de 2021 y el 8 de julio de 2026
function randomHistoricalDate() {
    const start = new Date("2021-01-01T00:00:00Z").getTime();
    const end = new Date("2026-07-08T23:59:59Z").getTime();
    const randomTime = start + Math.random() * (end - start);
    return new Date(randomTime);
}

async function supplierSeed() {
    console.log("🚀 Iniciando carga masiva de Proveedores optimizada para las 4 empresas...");

    // 1. Listas base de nombres de contacto para combinaciones dinámicas
    const businessTypes = ["Distribuidora", "Importaciones", "Corporación", "Comercializadora", "Mayorista", "Logística", "Representaciones", "Consorcio"];
    const contactNames = ["Carlos", "María", "José", "Ana", "Luis", "Rosa", "Miguel", "Carmen", "Pedro", "Daniela", "Jorge", "Patricia", "Fernando", "Lucía"];
    const contactLastNames = ["Mendoza", "López", "Torres", "Salazar", "Ramírez", "Castillo", "Vargas", "Gutiérrez", "Paredes", "Navarro", "Herrera"];

    // 2. Mapa de ubicación real exclusivo para las 4 empresas principales
    const companyLocations = {
        "minimarket-don-lucho": { city: "San Juan de Lurigancho", streets: ["Av. Los Próceres", "Av. Fernando Wiesse", "Jr. Las Lomas"] },
        "corp-tecnologica-vega": { city: "San Borja", streets: ["Jr. Las Flores", "Av. San Luis", "Av. Aviación"] },
        "inversiones-medicas-san-jose": { city: "Jesús María", streets: ["Av. Salaverry", "Av. Brasil", "Jr. Whymper"] },
        "distribuidora-alimentos-sur": { city: "Arequipa", streets: ["Av. Alfonso Ugarte", "Av. Ejército", "Calle Mercaderes"] }
    };

    // 3. Categorías de proveedores relacionadas al rubro de las 4 empresas
    const supplierCategories = {
        "minimarket-don-lucho": ["Abarrotes", "Bebidas", "Lácteos", "Limpieza"],
        "corp-tecnologica-vega": ["Tecnología", "Electrónica", "Componentes de Cómputo", "Accesorios Gaming"],
        "inversiones-medicas-san-jose": ["Insumos Médicos", "Farmacéutico", "Bioseguridad", "Equipos Médicos"],
        "distribuidora-alimentos-sur": ["Alimentos al por Mayor", "Granos y Menestras", "Conservas", "Abarrotes"]
    };

    // 4. Traer las empresas de la base de datos
    const companies = await prisma.company.findMany();
    if (companies.length === 0) {
        throw new Error("❌ No existen empresas en la base de datos. Ejecuta admin.seed primero.");
    }

    const suppliersData = [];

    for (const company of companies) {
        const location = companyLocations[company.slug];
        const categories = supplierCategories[company.slug];

        // Manejo seguro por si hay alguna empresa extra que no coincida con el slug esperado
        if (!location || !categories) {
            console.log(`⚠️ Saltando: No se definió rubro/ubicación estricta para el slug: ${company.slug}`);
            continue;
        }

        // Genera entre 10 y 15 proveedores por cada una de las 4 empresas
        const totalSuppliers = Math.floor(Math.random() * 6) + 10;

        for (let i = 0; i < totalSuppliers; i++) {
            const type = businessTypes[(i + company.id) % businessTypes.length];
            const category = categories[i % categories.length];
            const street = location.streets[(i + company.id) % location.streets.length];

            const contactName = contactNames[(i + 2) % contactNames.length];
            const contactLastName = contactLastNames[(i * 2) % contactLastNames.length];

            // Nombre único combinando variables para respetar la restricción UNIQUE (name, companyId)
            const companyName = `${type} ${category} ${location.city} N°${i + 1}`;
            const contactPerson = `${contactName} ${contactLastName}`;

            // Generación de RUC de 11 dígitos válido simulado
            const rucNumber = String(20000000000 + (company.id * 450000) + (i * 1234)).substring(0, 11);

            // Correo electrónico único
            const email = `${type.toLowerCase()}.${category.toLowerCase().replace(/\s+/g, "")}${i}@empresa${company.id}.pe`;

            // Teléfono móvil de 9 dígitos
            const phone = String(900000000 + (company.id * 1500000) + (i * 789)).substring(0, 9);

            const historicalDate = randomHistoricalDate();

            suppliersData.push({
                name: companyName,
                ruc: rucNumber,
                email: email,
                phone: phone,
                address: `${street} N° ${50 + (i * 6)}, ${location.city}`,
                contactPerson: contactPerson,
                website: i % 3 === 0 ? `https://www.prov${type.toLowerCase()}${i}.pe` : null,
                notes: `Proveedor especializado en la categoría de ${category.toLowerCase()}.`,
                currentDebt: 0.00,       // Requerido NUMERIC
                isActive: true,          // Requerido BOOLEAN
                companyId: company.id,   // Relación foreign key
                deletedAt: null,
                createdAt: historicalDate,
                updatedAt: historicalDate
            });
        }
    }

    // 5. Inserción masiva ultra rápida con skipDuplicates activo
    await prisma.supplier.createMany({
        data: suppliersData,
        skipDuplicates: true
    });

    console.log(`\n====================================`);
    console.log(`✅ SEED DE PROVEEDORES COMPLETADO`);
    console.log(`📊 Total inyectado con éxito: ${suppliersData.length} proveedores distribuidos en las ${companies.length} empresas.`);
    console.log(`====================================\n`);
}

if (require.main === module) {
    supplierSeed()
        .catch((e) => {
            console.error("❌ Error en el proceso de seed de proveedores:", e);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}

module.exports = {
    supplierSeed
};