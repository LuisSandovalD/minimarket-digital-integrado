// ========================================
// prisma/seeds/supplier.seed.js
// ========================================

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function supplierSeed() {
    console.log("🚀 Iniciando carga masiva de Proveedores según estructura PostgreSQL real...");

    // 1. Listas base de datos locales para combinaciones dinámicas
    const businessTypes = ["Distribuidora", "Importaciones", "Corporación", "Comercializadora", "Mayorista", "Logística", "Representaciones", "Consorcio"];
    const categories = ["Alimentos", "Abarrotes", "Bebidas", "Limpieza", "Higiene", "Lácteos", "Plásticos", "Librería"];
    const contactNames = ["Carlos", "María", "José", "Ana", "Luis", "Rosa", "Miguel", "Carmen", "Pedro", "Daniela", "Jorge", "Patricia", "Fernando", "Lucía"];
    const contactLastNames = ["Mendoza", "López", "Torres", "Salazar", "Ramírez", "Castillo", "Vargas", "Gutiérrez", "Paredes", "Navarro", "Herrera"];

    // Distritos específicos de la Provincia de Cañete
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

    const suppliersData = [];

    // Arreglo secuencial para mapear las 20 empresas existentes (IDs del 1 al 20)
    const companyIds = Array.from({ length: 20 }, (_, i) => i + 1);

    companyIds.forEach((companyId) => {
        // Define dinámicamente entre 10 y 15 proveedores por cada empresa
        const totalSuppliers = Math.floor(Math.random() * 6) + 10;

        for (let i = 0; i < totalSuppliers; i++) {
            const type = businessTypes[(i + companyId) % businessTypes.length];
            const category = categories[(i * 3) % categories.length];
            const location = locations[(i + companyId) % locations.length];
            
            const contactName = contactNames[(i + 2) % contactNames.length];
            const contactLastName = contactLastNames[(i * 2) % contactLastNames.length];

            // Nombre único combinando variables para respetar el índice UNIQUE (name, companyId)
            const companyName = `${type} ${category} Cañete N°${i + 1}`;
            const contactPerson = `${contactName} ${contactLastName}`;

            // Generación de RUC de 11 dígitos
            const rucNumber = String(20000000000 + (companyId * 450000) + (i * 1234)).substring(0, 11);

            // Correo electrónico único
            const email = `${type.toLowerCase()}.${category.toLowerCase()}${i}@empresa${companyId}.pe`;

            // Teléfono móvil de 9 dígitos
            const phone = String(900000000 + (companyId * 1500000) + (i * 789)).substring(0, 9);

            suppliersData.push({
                name: companyName,
                ruc: rucNumber,
                email: email,
                phone: phone,
                address: `${location.address} N° ${50 + (i * 6)}, ${location.city}`,
                contactPerson: contactPerson,
                website: i % 3 === 0 ? `https://www.prov${type.toLowerCase()}${i}.pe` : null,
                notes: `Proveedor logístico especializado en la categoría de ${category.toLowerCase()}.`,
                currentDebt: 0.00, // Obligatorio (NUMERIC 10,2)
                isActive: true,    // Obligatorio por defecto (BOOLEAN)
                companyId: companyId, // Obligatorio (INTEGER)
                deletedAt: null       // Por defecto activo sin borrado lógico
            });
        }
    });

    // 2. Ejecución masiva limpia e inmune a errores de esquema
    await prisma.supplier.createMany({
        data: suppliersData,
        skipDuplicates: true
    });

    console.log(`\n====================================`);
    console.log(`✅ SEED COMPLETADO SIN ERRORES`);
    console.log(`📊 Total inyectado de forma segura: ${suppliersData.length} proveedores distribuidos en las 20 empresas.`);
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