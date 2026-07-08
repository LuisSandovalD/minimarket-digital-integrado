// ========================================
// prisma/seeds/category.seed.js
// ========================================

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function categorySeed() {
    console.log("🌱 Iniciando siembra jerárquica masiva de Categorías optimizada para las 4 empresas...");

    // 1. Obtener todas las empresas registradas
    const companies = await prisma.company.findMany();

    if (!companies || companies.length === 0) {
        throw new Error("❌ Error: No existe ninguna empresa en la base de datos. Ejecuta admin.seed primero.");
    }

    console.log(`🏢 Se encontraron ${companies.length} empresas. Procesando big data estructural...`);

    let totalCategories = 0;
    let totalSubCategories = 0;

    for (const company of companies) {
        const companyKey = (company.slug || "").toLowerCase();
        let sectorSchema = [];

        // =========================================================================
        // MAPEO DETALLADO EXCLUSIVO PARA LAS 4 COMPAÑÍAS DEL PROYECTO
        // =========================================================================

        if (companyKey === "minimarket-don-lucho") {
            // 🛒 1. MINIMARKET / SUPERMERCADO
            sectorSchema = [
                { parent: { name: "Abarrotes y Despensa", description: "Insumos secos y provisiones básicas" }, subs: ["Arroz y Legumbres", "Azúcar y Endulzantes", "Fideos y Pastas", "Aceites Comestibles", "Harinas y Polvos", "Sal y Especias"] },
                { parent: { name: "Bebidas y Líquidos", description: "Líquidos refrescantes con o sin gas" }, subs: ["Gaseosas", "Aguas Puras", "Jugos y Néctares", "Bebidas Energizantes", "Isotónicos", "Tés Líquidos"] },
                { parent: { name: "Lácteos y Huevos", description: "Leches y derivados pasteurizados" }, subs: ["Leche Líquida", "Yogures", "Mantequillas", "Quesos Frescos", "Quesos Madurados", "Huevos de Gallina"] },
                { parent: { name: "Limpieza del Hogar", description: "Desinfección y aseo de interiores" }, subs: ["Detergentes Ropa", "Lavavajillas", "Limpia pisos", "Cloro y Desinfectantes", "Suavizantes", "Esponjas y Paños"] },
                { parent: { name: "Snacks y Golosinas", description: "Piqueos rápidos y dulces" }, subs: ["Papas Fritas", "Piqueos Salados", "Galletas Dulces", "Galletas Saladas", "Chocolates", "Caramelos y Gomas"] },
                { parent: { name: "Cuidado Personal Básicos", description: "Higiene personal diaria" }, subs: ["Jabones Barras", "Shampoo", "Crema Dental", "Desodorantes", "Papel Higiénico", "Toallitas Húmedas"] }
            ];
        } else if (companyKey === "corp-tecnologica-vega") {
            // 💻 2. TECNOLOGÍA / COMPUTACIÓN
            sectorSchema = [
                { parent: { name: "Componentes de Hardware", description: "Partes internas para ensamble de PC" }, subs: ["Procesadores", "Tarjetas de Video", "Memorias RAM", "Placas Madre", "Discos Sólidos SSD", "Fuentes de Poder"] },
                { parent: { name: "Periféricos e Input", description: "Accesorios externos de interacción" }, subs: ["Teclados Mecánicos", "Mouses Gamers", "Auriculares con Micro", "Monitores Gamer", "Cámaras Web", "Mousepads Extendidos"] },
                { parent: { name: "Laptops y Ordenadores", description: "Equipos de cómputo completos" }, subs: ["Laptops Oficina", "Laptops Gaming", "Computadoras Desktop", "All in One", "Mini PCs", "Tablets"] },
                { parent: { name: "Redes y Conectividad", description: "Equipos de transmisión de datos" }, subs: ["Routers Wi-Fi", "Switches Red", "Cables de Red Cat6", "Adaptadores Bluetooth", "Repetidores Señal", "Tarjetas de Red PCIe"] },
                { parent: { name: "Impresión y Suministros", description: "Equipos de impresión e insumos" }, subs: ["Impresoras Inyección", "Impresoras Láser", "Cartuchos de Tinta", "Tóners Originales", "Papel Fotográfico", "Repuestos Cabezal"] },
                { parent: { name: "Almacenamiento Externo", description: "Dispositivos de respaldo portátiles" }, subs: ["Discos Duros Externos", "Memorias USB", "Tarjetas MicroSD", "Cofres Enclosure", "Almacenamiento NAS", "Sólidos Portátiles"] }
            ];
        } else if (companyKey === "inversiones-medicas-san-jose") {
            // 💊 3. FARMACIA / SALUD MEDICA
            sectorSchema = [
                { parent: { name: "Medicamentos de Venta Libre", description: "Fármacos OTC" }, subs: ["Analgésicos", "Antiinflamatorios", "Antigripales", "Salud Estomacal", "Antihistamínicos", "Antitusígenos"] },
                { parent: { name: "Medicamentos Especializados", description: "Fármacos bajo prescripción médica" }, subs: ["Antibióticos", "Antihipertensivos", "Antidiabéticos", "Corticoides", "Anticoagulantes", "Inmunológicos"] },
                { parent: { name: "Cuidado de la Piel (Dermocosmética)", description: "Tratamientos dermatológicos" }, subs: ["Fotoprotección", "Hidratantes Faciales", "Limpiadores", "Anti-edad", "Cuidado Corporal", "Tratamiento Acné"] },
                { parent: { name: "Mamá y Bebé", description: "Nutrición e higiene infantil" }, subs: ["Pañales Etapas", "Fórmulas Infantiles", "Toallitas Bebé", "Biberones y Chupones", "Cremas Escaldaduras", "Shampoo Bebé"] },
                { parent: { name: "Vitaminas y Suplementos", description: "Nutrición complementaria" }, subs: ["Multivitamínicos", "Vitamina C", "Calcio y Magnesio", "Suplementos Adultos", "Colágeno Hidrolizado", "Omega 3"] },
                { parent: { name: "Dispositivos Médicos y Botiquín", description: "Instrumentos de medición y primeros auxilios" }, subs: ["Tensiómetros", "Glucómetros", "Termómetros", "Gasas y Vendas", "Alcohol Quirúrgico", "Mascarillas"] }
            ];
        } else if (companyKey === "distribuidora-alimentos-sur") {
            // 🌾 4. ALIMENTOS AL POR MAYOR / LOGÍSTICA ALIMENTARIA
            sectorSchema = [
                { parent: { name: "Granos y Menestras", description: "Semillas secas y legumbres al por mayor" }, subs: ["Arroz por Saco", "Frijol Canario", "Lentejas Extra", "Garbanzo Seleccionado", "Maíz Popcorn", "Habas Secas"] },
                { parent: { name: "Conservas y Enlatados", description: "Alimentos procesados de larga duración" }, subs: ["Atún en Trozos", "Filete de Caballa", "Duraznos en Almíbar", "Maíz Dulce Lata", "Leche Evaporada Pack", "Salsas de Tomate"] },
                { parent: { name: "Aceites e Insumos Industriales", description: "Materias grasas para cocinas y comercios" }, subs: ["Aceite Vegetal Bidón", "Aceite de Soya", "Manteca Vegetal", "Harina Industrial Saco", "Azúcar Rubia Saco", "Sal Industrial"] },
                { parent: { name: "Lácteos y Derivados Mayorista", description: "Distribución masiva de derivados lácteos" }, subs: ["Queso Edam Bloque", "Mantequilla con Sal Balde", "Crema de Leche Gastronómica", "Leche Condensada Caja", "Yogurt Galón", "Suero de Leche"] }
            ];
        }

        // Si el slug de la empresa actual no coincide con ninguno de los esperados
        if (sectorSchema.length === 0) {
            console.log(`⚠️ Saltando: No se definió esquema categórico para el slug: ${company.slug}`);
            continue;
        }

        // 2. Inyección secuencial por empresa para respetar relaciones jerárquicas Parent -> Child
        for (const item of sectorSchema) {
            // Crear la categoría padre
            const parentCategory = await prisma.category.create({
                data: {
                    name: item.parent.name,
                    description: item.parent.description,
                    companyId: company.id,
                    parentId: null // Categoría de primer nivel
                }
            });
            totalCategories++;

            // Mapear y preparar las subcategorías hijas asociadas al Parent ID creado
            const subCategoriesData = item.subs.map((subName) => ({
                name: subName,
                description: `Subcategoría específica correspondiente a ${subName}.`,
                companyId: company.id,
                parentId: parentCategory.id // Relación jerárquica estricta
            }));

            // Inserción masiva de subcategorías
            await prisma.category.createMany({
                data: subCategoriesData,
                skipDuplicates: true
            });
            totalSubCategories += subCategoriesData.length;
        }
    }

    console.log(`\n====================================`);
    console.log(`✅ SEED DE CATEGORÍAS COMPLETADO`);
    console.log(`📊 Categorías Base (Padres) creadas: ${totalCategories}`);
    console.log(`📊 Subcategorías (Hijas) inyectadas: ${totalSubCategories}`);
    console.log(`📦 Total entidades relacionales estructuradas: ${totalCategories + totalSubCategories}`);
    console.log(`====================================\n`);
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
    categorySeed
};