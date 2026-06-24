// ========================================
// prisma/seeds/unit.seed.js
// ========================================

const prisma = require("../client");

async function unitSeed() {
    // 1. Obtener la empresa real creada en la Fase 1 (Evita el error de companyId: 1)
    const company = await prisma.company.findFirst();

    if (!company) {
        throw new Error("❌ Error: No existe ninguna empresa. Ejecuta admin.seed primero.");
    }

    console.log("🌱 Iniciando la siembra de Unidades de Medida...");

    // =========================================================================
    // 💡 NOTA REGLA DE ENUMS: Si tu base de datos tiene un Enum muy estricto en el schema,
    // habitualmente soporta tipos estándar como UNIT, VOLUME, WEIGHT o enums específicos.
    // Esta lista ha sido mapeada de forma genérica y segura.
    // =========================================================================
    await prisma.unit.createMany({
        data: [
            {
                name: "Litro",
                abbreviation: "L",
                type: "LITER", // Si tu enum espera tipos generales, cámbialo a "VOLUME"
                conversionFactor: 1.0,
                companyId: company.id
            },
            {
                name: "Medio Litro",
                abbreviation: "0.5L",
                type: "LITER", // Sincronizado al tipo base LITER o VOLUME
                conversionFactor: 0.5,
                companyId: company.id
            },
            {
                name: "Mililitro",
                abbreviation: "ml",
                type: "LITER",
                conversionFactor: 0.001,
                companyId: company.id
            },
            {
                name: "Kilogramo",
                abbreviation: "kg",
                type: "KILOGRAM", // Si tu enum espera tipos generales, cámbialo a "WEIGHT"
                conversionFactor: 1.0,
                companyId: company.id
            },
            {
                name: "Gramo",
                abbreviation: "g",
                type: "KILOGRAM",
                conversionFactor: 0.001,
                companyId: company.id
            },
            {
                name: "Unidad",
                abbreviation: "und",
                type: "UNIT",
                conversionFactor: 1.0,
                companyId: company.id
            },
            {
                name: "Caja",
                abbreviation: "cj",
                type: "UNIT",
                conversionFactor: 1.0,
                companyId: company.id
            },
            {
                name: "Paquete",
                abbreviation: "paq",
                type: "UNIT",
                conversionFactor: 1.0,
                companyId: company.id
            },
            {
                name: "Docena",
                abbreviation: "doc",
                type: "UNIT",
                conversionFactor: 12.0,
                companyId: company.id
            },
            {
                name: "Six-Pack",
                abbreviation: "6pack",
                type: "UNIT",
                conversionFactor: 6.0,
                companyId: company.id
            },
            {
                name: "Saco de 50 Kilos",
                abbreviation: "sac-50",
                type: "KILOGRAM",
                conversionFactor: 50.0,
                companyId: company.id
            },
            {
                name: "Saco de 25 Kilos",
                abbreviation: "sac-25",
                type: "KILOGRAM",
                conversionFactor: 25.0,
                companyId: company.id
            },
            {
                name: "Metro",
                abbreviation: "m",
                type: "UNIT", // Cambiar a "LENGTH" si tu enum lo admite
                conversionFactor: 1.0,
                companyId: company.id
            }
        ],
        skipDuplicates: true
    });

    console.log("   └─ ✅ Unidades de medida sembradas y vinculadas correctamente.");
}

module.exports = {
    unitSeed
};