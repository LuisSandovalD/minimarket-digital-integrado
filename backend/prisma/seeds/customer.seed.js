// ========================================
// prisma/seeds/customer.seed.js
// ========================================

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function customerSeed() {
    console.log("🚀 Iniciando carga masiva de Clientes regionalizados para las 20 empresas...");

    // 1. Listas base de datos locales (Cañete, Lima, Perú) para combinaciones dinámicas
    const names = ["Carlos", "María", "José", "Ana", "Luis", "Rosa", "Miguel", "Carmen", "Pedro", "Daniela", "Jorge", "Patricia", "Fernando", "Lucía", "Sonia", "Julio", "Elena", "Héctor", "Verónica", "Alejandro", "Diana", "Renzo", "Gabriela", "Walter"];
    const lastNames = ["Mendoza", "López", "Torres", "Salazar", "Ramírez", "Castillo", "Vargas", "Gutiérrez", "Paredes", "Navarro", "Herrera", "Salinas", "Gómez", "Villanueva", "Palomino", "Flores", "Benítez", "Tello", "Ortiz", "Meza", "Farfán", "Pasquel", "Miranda", "Quispe"];

    // Distritos específicos solicitados de la Provincia de Cañete
    const locations = [
        { city: "San Vicente de Cañete", address: "Av. Mariscal Benavides" },
        { city: "Imperial", address: "Av. Ramos" },
        { city: "San Luis", address: "Av. Dos de Mayo" },
        { city: "Quilmaná", address: "Av. Lima" },
        { city: "Nuevo Imperial", address: "Av. Augusto B. Leguía" },
        { city: "Lunahuaná", address: "Malecón Araoz" },
        { city: "Mala", address: "Jr. Real" },
        { city: "Cerro Azul", address: "Av. Jorge Chávez" }
    ];

    const customersData = [];

    // Generación del arreglo secuencial para mapear las 20 empresas existentes (IDs del 1 al 20)
    const companyIds = Array.from({ length: 20 }, (_, i) => i + 1);

    companyIds.forEach((companyId) => {
        // Define dinámicamente un rango aleatorio de entre 20 y 30 clientes exclusivos por cada empresa
        const totalCustomers = Math.floor(Math.random() * 11) + 20;

        for (let i = 0; i < totalCustomers; i++) {
            // Combinaciones lineales usando residuos algebraicos para evitar colisiones de nombres o datos repetidos
            const firstName = names[(i + companyId) % names.length];
            const secondName = names[(i * 3) % names.length];
            const lastName = lastNames[i % lastNames.length];
            const secondLastName = lastNames[(i + companyId) % lastNames.length];
            const location = locations[(i + companyId) % locations.length];

            const fullName = `${firstName} ${secondName} ${lastName} ${secondLastName}`;

            // Generación de DNI peruano limpio de 8 dígitos único por bloque correlativo
            const docNumber = String(70000000 + (companyId * 30000) + (i * 157)).substring(0, 8);

            // Correo electrónico personalizado por empresa
            const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@empresa${companyId}.pe`;

            // Teléfono móvil peruano de 9 dígitos iniciado en 9
            const phone = String(900000000 + (companyId * 1100000) + (i * 543)).substring(0, 9);

            // Variantes lineales de límites de crédito en Soles peruanos (PEN)
            const creditLimit = parseFloat(([300, 400, 500, 600, 800, 1000, 1500, 2000])[i % 8]);

            customersData.push({
                name: fullName,
                documentType: "DNI",
                documentNumber: docNumber,
                email: email,
                phone: phone,
                city: location.city, // Distrito de Cañete
                address: `${location.address} N° ${100 + (i * 4)}`,
                notes: i % 6 === 0 ? "Cliente frecuente de la provincia" : null,
                creditLimit: creditLimit,
                currentDebt: 0.0,
                isActive: i % 25 !== 0, // Mantiene un 96% de la cartera activa
                companyId: companyId   // Relación foránea directa (IDs del 1 al 20)
            });
        }
    });

    // 2. Ejecución masiva lineal limpia optimizada para base de datos
    await prisma.customer.createMany({
        data: customersData,
        skipDuplicates: true
    });

    console.log(`\n====================================`);
    console.log(`✅ SEED COMPLETADO: Se registraron con éxito los clientes.`);
    console.log(`📍 Región focalizada: Cañete, Lima, Perú.`);
    console.log(`📊 Total inyectado: ${customersData.length} clientes distribuidos en las 20 empresas.`);
    console.log(`====================================\n`);
}

// Bloque de ejecución segura e independiente por si deseas correrlo directo en terminal: node prisma/seeds/customer.seed.js
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