// ========================================
// prisma/seeds/supplier.seed.js
// ========================================

const prisma = require("../client");

async function supplierSeed() {
    const company = await prisma.company.findFirst();

    if (!company) {
        throw new Error("❌ Error: No existe ninguna empresa. Ejecuta admin.seed primero.");
    }

    console.log("🌱 Iniciando la siembra de Proveedores Corporativos...");

    // Opcional: Descomenta la siguiente línea si deseas limpiar la tabla antes de resembrar e iniciar desde el ID 1
    // await prisma.supplier.deleteMany({ where: { companyId: company.id } });

    const result = await prisma.supplier.createMany({
        data: [
            {
                name: "Alicorp S.A.A.",
                ruc: "20100055237",
                email: "ventas@alicorp.com.pe",
                phone: "017080000",
                address: "Av. Argentina 4793, Callao",
                contactPerson: "Carlos Mendoza",
                website: "https://www.alicorp.com.pe",
                notes: "Proveedor de alimentos y abarrotes",
                currentDebt: 0,
                companyId: company.id
            },
            {
                name: "Gloria S.A.",
                ruc: "20100190797",
                email: "ventas@gloria.com.pe",
                phone: "013480000",
                address: "Av. República de Panamá 2461, Lima",
                contactPerson: "María López",
                website: "https://www.gloria.com.pe",
                notes: "Lácteos y derivados",
                currentDebt: 0,
                companyId: company.id
            },
            {
                name: "Backus y Johnston",
                ruc: "20100113610",
                email: "distribucion@backus.pe",
                phone: "013110300",
                address: "Av. Nicolás Ayllón 3986, Ate",
                contactPerson: "José Torres",
                website: "https://www.backus.pe",
                notes: "Bebidas y agua embotellada",
                currentDebt: 0,
                companyId: company.id
            },
            {
                name: "Nestlé Perú",
                ruc: "20263368992",
                email: "ventas@nestle.com.pe",
                phone: "016126000",
                address: "Av. Los Castillos 249, Ate",
                contactPerson: "Ana Salazar",
                website: "https://www.nestle.com.pe",
                notes: "Alimentos y golosinas",
                currentDebt: 0,
                companyId: company.id
            },
            {
                name: "Arca Continental Lindley",
                ruc: "20101024645",
                email: "ventas@arcacontal.com",
                phone: "013177700",
                address: "Av. Nicolás Ayllón 1520, Lima",
                contactPerson: "Fernando Ruiz",
                website: "https://www.arcacontal.com",
                notes: "Gaseosas y bebidas",
                currentDebt: 0,
                companyId: company.id
            },
            {
                name: "Molitalia S.A.",
                ruc: "20100035121",
                email: "ventas@molitalia.com.pe",
                phone: "013173000",
                address: "Av. Venezuela 2850, Lima",
                contactPerson: "Patricia Herrera",
                website: "https://www.molitalia.com.pe",
                notes: "Pastas, harinas y galletas",
                currentDebt: 0,
                companyId: company.id
            },
            {
                name: "Laive S.A.",
                ruc: "20100245831",
                email: "ventas@laive.com.pe",
                phone: "013198800",
                address: "Av. La Molina 378, Lima",
                contactPerson: "Ricardo Gómez",
                website: "https://www.laive.com.pe",
                notes: "Lácteos",
                currentDebt: 0,
                companyId: company.id
            },
            {
                name: "San Fernando S.A.",
                ruc: "20100154308",
                email: "ventas@sanfernando.com.pe",
                phone: "017151500",
                address: "Av. República de Panamá 4295, Surquillo",
                contactPerson: "Lucía Mendoza",
                website: "https://www.sanfernando.pe",
                notes: "Carnes y embutidos",
                currentDebt: 0,
                companyId: company.id
            },
            {
                name: "Distribuidora Mayorista Lima",
                ruc: "20605555111",
                email: "ventas@dml.pe",
                phone: "014321234",
                address: "Mercado Mayorista de Santa Anita",
                contactPerson: "Jorge Navarro",
                website: null,
                notes: "Proveedor local de abarrotes",
                currentDebt: 0,
                companyId: company.id
            },
            {
                name: "Importaciones El Sol SAC",
                ruc: "20607888991",
                email: "contacto@elsol.com.pe",
                phone: "015551212",
                address: "Av. Argentina 2150, Lima",
                contactPerson: "Pedro Gutiérrez",
                website: "https://www.elsol.com.pe",
                notes: "Artículos de limpieza y hogar",
                currentDebt: 0,
                companyId: company.id
            },
            {
                name: "Kimberly-Clark Perú S.R.L.",
                ruc: "20301044231",
                email: "corporativo@kcc.com",
                phone: "015181000",
                address: "Av. Del Ejército 250, Miraflores",
                contactPerson: "Héctor Valdivia",
                website: "https://www.kimberly-clark.com",
                notes: "Higiene personal, pañales y papel higiénico (Suave, Huggies, Kotex)",
                currentDebt: 0,
                companyId: company.id
            },
            {
                name: "Procter & Gamble del Perú S.R.L.",
                ruc: "20100171229",
                email: "atencion.pg@pg.com",
                phone: "014115000",
                address: "Av. Rep. de Panamá 4090, Surquillo",
                contactPerson: "Diana Cáceres",
                website: "https://www.pg.com",
                notes: "Cuidado capilar, oral y limpieza (Head & Shoulders, Oral-B, Ariel)",
                currentDebt: 0,
                companyId: company.id
            },
            {
                name: "Unilever Andina Perú S.A.",
                ruc: "20431323791",
                email: "pedidos@unilever.com",
                phone: "016104200",
                address: "Paseo de la República 3147, San Isidro",
                contactPerson: "Gabriel Candela",
                website: "https://www.unilever.com.pe",
                notes: "Cuidado personal y alimentos (Sedal, Dove, Rexona, Mccolins)",
                currentDebt: 0,
                companyId: company.id
            },
            {
                name: "Ajinomoto del Perú S.A.",
                ruc: "20100085314",
                email: "servicio.cliente@ajinomoto.com.pe",
                phone: "015182400",
                address: "Av. República de Panamá 3055, San Isidro",
                contactPerson: "Renzo Nakamoto",
                website: "https://www.ajinomoto.com.pe",
                notes: "Sazonadores, sopas instantáneas y salsas",
                currentDebt: 0,
                companyId: company.id
            },
            {
                name: "Mondelez Perú S.A.",
                ruc: "20100160294",
                email: "ventas.peru@mdlz.com",
                phone: "017105200",
                address: "Av. Venezuela 2415, Lima",
                contactPerson: "Clara Benavides",
                website: "https://www.mondelezinternational.com",
                notes: "Galletas, chocolates y gomas de mascar (Field, Oreo, Ritz, Trident)",
                currentDebt: 0,
                companyId: company.id
            },
            {
                name: "Compañía Nacional de Chocolates de Perú S.A.",
                ruc: "20508535191",
                email: "distribucion@chocolates.com.pe",
                phone: "016143500",
                address: "Av. Manuel Olguín 211, Santiago de Surco",
                contactPerson: "Manuel Espinoza",
                website: "https://www.chocolates.com.pe",
                notes: "Chocolates, golosinas y galletas (Winter's, Chin Chin)",
                currentDebt: 0,
                companyId: company.id
            },
            {
                name: "Protisa (Productos Tissue del Perú S.A.)",
                ruc: "20261358931",
                email: "ventas@softys.com",
                phone: "016183200",
                address: "Av. Autopista Ramiro Prialé Km 8.5, Huachipa",
                contactPerson: "Karla Villanueva",
                website: "https://www.softys.com",
                notes: "Productos higiénicos de papel (Elite, Nova, Babysec)",
                currentDebt: 0,
                companyId: company.id
            },
            {
                name: "Sapolio (Intradevco Industrial S.A.)",
                ruc: "20100122953",
                email: "servicioclientes@intradevco.com",
                phone: "014601100",
                address: "Av. Producción Nacional 100, Chorrillos",
                contactPerson: "Arturo Roca",
                website: "https://www.sapolio.com.pe",
                notes: "Línea completa de limpieza del hogar e insecticidas",
                currentDebt: 0,
                companyId: company.id
            },
            {
                name: "Rey Plast (Plásticos Rey S.A.C.)",
                ruc: "20101135471",
                email: "contacto@reyplast.com.pe",
                phone: "016139100",
                address: "Av. Los Toros 450, Ate",
                contactPerson: "Sonia Falconí",
                website: "https://www.reyplast.com.pe",
                notes: "Contenedores plásticos, organizadores y menaje para tienda",
                currentDebt: 0,
                companyId: company.id
            },
            {
                name: "Faber-Castell Peruana S.A.",
                ruc: "20100063256",
                email: "atencionalcliente@faber-castell.com.pe",
                phone: "016142400",
                address: "Av. La Molina 432, Ate",
                contactPerson: "Javier Orbegozo",
                website: "https://www.faber-castell.com.pe",
                notes: "Artículos de papelería, útiles de oficina y encendedores/bolígrafos",
                currentDebt: 0,
                companyId: company.id
            }
        ],
        skipDuplicates: true
    });

    console.log(`   └─ ✅ [${result.count}] Proveedores procesados correctamente.`);
}

module.exports = {
    supplierSeed
};