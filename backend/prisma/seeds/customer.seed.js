// ========================================
// prisma/seeds/customer.seed.js
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

async function customerSeed() {
    console.log("🚀 Iniciando carga masiva de Clientes optimizada para las 4 empresas...");

    // 1. Listas base de nombres y apellidos peruanos para combinaciones dinámicas
    const names = ["Carlos", "María", "José", "Ana", "Luis", "Rosa", "Miguel", "Carmen", "Pedro", "Daniela", "Jorge", "Patricia", "Fernando", "Lucía", "Sonia", "Julio", "Elena", "Héctor", "Verónica", "Alejandro", "Diana", "Renzo", "Gabriela", "Walter"];
    const lastNames = ["Mendoza", "López", "Torres", "Salazar", "Ramírez", "Castillo", "Vargas", "Gutiérrez", "Paredes", "Navarro", "Herrera", "Salinas", "Gómez", "Villanueva", "Palomino", "Flores", "Benítez", "Tello", "Ortiz", "Meza", "Farfán", "Pasquel", "Miranda", "Quispe"];

    // 2. Mapa de ubicación real y exclusivo para las 4 empresas principales
    const companyLocations = {
        "minimarket-don-lucho": { city: "San Juan de Lurigancho", streets: ["Av. Los Próceres", "Av. Fernando Wiesse", "Jr. Las Lomas", "Av. Próceres de la Independencia"] },
        "corp-tecnologica-vega": { city: "San Borja", streets: ["Jr. Las Flores", "Av. San Luis", "Av. Aviación", "Jr. Las Magnolias"] },
        "inversiones-medicas-san-jose": { city: "Jesús María", streets: ["Av. Salaverry", "Av. Brasil", "Jr. Whymper", "Av. Gral. Garzón"] },
        "distribuidora-alimentos-sur": { city: "Arequipa", streets: ["Av. Alfonso Ugarte", "Av. Ejército", "Calle Mercaderes", "Av. Goyeneche"] }
    };

    // 3. Traer las empresas reales de la base de datos
    const companies = await prisma.company.findMany();
    if (companies.length === 0) {
        throw new Error("❌ No existen empresas en la base de datos. Ejecuta admin.seed primero.");
    }

    const customersData = [];

    for (const company of companies) {
        const location = companyLocations[company.slug];

        // Manejo seguro por si hay un slug inesperado en la BD
        if (!location) {
            console.log(`⚠️ Saltando: No se definió ubicación para el slug: ${company.slug}`);
            continue;
        }

        // Rango de entre 20 y 30 clientes exclusivos por cada una de las 4 empresas
        const totalCustomers = Math.floor(Math.random() * 11) + 20;

        for (let i = 0; i < totalCustomers; i++) {
            // Combinaciones usando residuos para evitar nombres duplicados exactos
            const firstName = names[(i + company.id) % names.length];
            const secondName = names[(i * 3) % names.length];
            const lastName = lastNames[i % lastNames.length];
            const secondLastName = lastNames[(i + company.id) % lastNames.length];
            const street = location.streets[i % location.streets.length];

            const fullName = `${firstName} ${secondName} ${lastName} ${secondLastName}`;

            // Generación de DNI de 8 dígitos único por bloque correlativo
            const docNumber = String(70000000 + (company.id * 30000) + (i * 157)).substring(0, 8);

            // Correo electrónico único
            const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@empresa${company.id}.pe`;

            // Teléfono móvil de 9 dígitos iniciado en 9
            const phone = String(900000000 + (company.id * 1100000) + (i * 543)).substring(0, 9);

            // Límites de crédito realistas en Soles (PEN)
            const creditLimit = parseFloat(([300, 400, 500, 600, 800, 1000, 1500, 2000])[i % 8]);

            const historicalDate = randomHistoricalDate();

            customersData.push({
                name: fullName,
                documentType: "DNI",
                documentNumber: docNumber,
                email: email,
                phone: phone,
                city: location.city,
                address: `${street} N° ${100 + (i * 4)}`,
                notes: i % 6 === 0 ? "Cliente frecuente de la zona" : null,
                creditLimit: creditLimit,
                currentDebt: 0.0,
                isActive: i % 25 !== 0, // 96% de la cartera activa
                companyId: company.id,
                createdAt: historicalDate,
                updatedAt: historicalDate
            });
        }
    }

    // 4. Inserción masiva limpia con skipDuplicates activo
    await prisma.customer.createMany({
        data: customersData,
        skipDuplicates: true
    });

    console.log(`\n====================================`);
    console.log(`✅ SEED DE CLIENTES COMPLETADO`);
    console.log(`📍 Regionalización aplicada de forma correcta según el distrito/ciudad de cada tenant.`);
    console.log(`📊 Total inyectado con éxito: ${customersData.length} clientes distribuidos en las ${companies.length} empresas.`);
    console.log(`====================================\n`);
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
    customerSeed
};