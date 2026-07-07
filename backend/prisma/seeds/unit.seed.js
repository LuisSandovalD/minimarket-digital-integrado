// ========================================
// prisma/seeds/unit.seed.js
// ========================================

const prisma = require("../client");

async function unitSeed() {
    console.log("🌱 Iniciando la siembra multi-tenant adaptada al enum UnitType...");

    // 1. Obtener todas las empresas registradas en el sistema
    const companies = await prisma.company.findMany();

    if (!companies || companies.length === 0) {
        throw new Error("❌ Error: No existe ninguna empresa en la base de datos. Ejecuta admin.seed primero.");
    }

    console.log(`🏢 Se encontraron ${companies.length} empresas. Procesando asignación por sector comercial...`);

    let totalInserted = 0;

    for (const company of companies) {
        // Normalizamos el identificador usando slug o en su defecto el nombre adaptado lowerCase
        const companyKey = (company.slug || company.name || "").toLowerCase();
        let unitData = [];

        // Mapeo dinámico y realista según el sector comercial usando STRICTLY tu enum UnitType
        if (companyKey.includes("minimarket") || companyKey.includes("bodega")) {
            // ==========================================
            // 🛒 SECTOR 1: MINIMARKET / SUPERMERCADO
            // ==========================================
            unitData = [
                { name: "Unidad Estándar", abbreviation: "und", type: "UNIT", conversionFactor: 1.0 },
                { name: "Caja Pequeña", abbreviation: "cj-pq", type: "BOX", conversionFactor: 1.0 },
                { name: "Caja Master", abbreviation: "cj-mst", type: "BOX", conversionFactor: 1.0 },
                { name: "Paquete Familiar", abbreviation: "paq-fam", type: "PACK", conversionFactor: 1.0 },
                { name: "Six-Pack Sodas", abbreviation: "6pack", type: "PACK", conversionFactor: 6.0 },
                { name: "Tri-Pack", abbreviation: "3pack", type: "PACK", conversionFactor: 3.0 },
                { name: "Bolsa de Productos", abbreviation: "bls", type: "UNIT", conversionFactor: 1.0 },
                { name: "Docena de Huevos", abbreviation: "doc", type: "DOZEN", conversionFactor: 1.0 },
                { name: "Media Docena", abbreviation: "m-doc", type: "DOZEN", conversionFactor: 0.5 },
                { name: "Litro Completo", abbreviation: "1L", type: "LITER", conversionFactor: 1.0 },
                { name: "Medio Litro Lácteo", abbreviation: "0.5L", type: "HALF_LITER", conversionFactor: 1.0 },
                { name: "Cuarto de Litro Néctar", abbreviation: "0.25L", type: "QUARTER_LITER", conversionFactor: 1.0 },
                { name: "Mililitro Líquido", abbreviation: "ml", type: "MILLILITER", conversionFactor: 1.0 },
                { name: "Kilogramo Granel", abbreviation: "kg", type: "KILOGRAM", conversionFactor: 1.0 },
                { name: "Gramo Especia", abbreviation: "g", type: "GRAM", conversionFactor: 1.0 },
                { name: "Saco de Arroz (50 kg)", abbreviation: "sac-50", type: "KILOGRAM", conversionFactor: 50.0 },
                { name: "Saco de Azúcar (25 kg)", abbreviation: "sac-25", type: "KILOGRAM", conversionFactor: 25.0 },
                { name: "Bandeja Embutidos", abbreviation: "bdj", type: "UNIT", conversionFactor: 1.0 },
                { name: "Rollo Papel Higiénico", abbreviation: "rlo", type: "UNIT", conversionFactor: 1.0 },
                { name: "Display Dulces", abbreviation: "disp", type: "PACK", conversionFactor: 1.0 },
                { name: "Frasco Conserva", abbreviation: "frs", type: "UNIT", conversionFactor: 1.0 },
                { name: "Lata Conserva", abbreviation: "lt", type: "UNIT", conversionFactor: 1.0 }
            ];
        } else if (companyKey.includes("pharmacy") || companyKey.includes("farmacia") || companyKey.includes("botica")) {
            // ==========================================
            // 💊 SECTOR 2: FARMACIA / BOTICA
            // ==========================================
            unitData = [
                { name: "Tableta Suelta", abbreviation: "tab", type: "UNIT", conversionFactor: 1.0 },
                { name: "Cápsula Médica", abbreviation: "cap", type: "UNIT", conversionFactor: 1.0 },
                { name: "Blister x10", abbreviation: "bli-10", type: "UNIT", conversionFactor: 10.0 },
                { name: "Caja de Medicamentos", abbreviation: "cj", type: "BOX", conversionFactor: 1.0 },
                { name: "Paquete de Gasas", abbreviation: "paq", type: "PACK", conversionFactor: 1.0 },
                { name: "Frasco Jarabe", abbreviation: "frs", type: "UNIT", conversionFactor: 1.0 },
                { name: "Ampolla Inyectable", abbreviation: "amp", type: "UNIT", conversionFactor: 1.0 },
                { name: "Mililitro Solución", abbreviation: "ml", type: "MILLILITER", conversionFactor: 1.0 },
                { name: "Litro Alcohol", abbreviation: "1L", type: "LITER", conversionFactor: 1.0 },
                { name: "Medio Litro Antiséptico", abbreviation: "0.5L", type: "HALF_LITER", conversionFactor: 1.0 },
                { name: "Cuarto Litro Agua Destilada", abbreviation: "0.25L", type: "QUARTER_LITER", conversionFactor: 1.0 },
                { name: "Gramo Principio Activo", abbreviation: "g", type: "GRAM", conversionFactor: 1.0 },
                { name: "Kilogramo Crema Base", abbreviation: "kg", type: "KILOGRAM", conversionFactor: 1.0 },
                { name: "Sachet Polvo", abbreviation: "sch", type: "UNIT", conversionFactor: 1.0 },
                { name: "Tubo Pomada", abbreviation: "tb", type: "UNIT", conversionFactor: 1.0 },
                { name: "Gotero Oftálmico", abbreviation: "got", type: "UNIT", conversionFactor: 1.0 },
                { name: "Spray Nasal", abbreviation: "spr", type: "UNIT", conversionFactor: 1.0 },
                { name: "Pote Suplemento", abbreviation: "pte", type: "BOX", conversionFactor: 1.0 },
                { name: "Vial Clínico", abbreviation: "vial", type: "UNIT", conversionFactor: 1.0 },
                { name: "Par Guantes Quirúrgicos", abbreviation: "par", type: "UNIT", conversionFactor: 2.0 },
                { name: "Docena Mascarillas", abbreviation: "doc-masc", type: "DOZEN", conversionFactor: 1.0 }
            ];
        } else if (companyKey.includes("restaurant") || companyKey.includes("restaurante") || companyKey.includes("gastronomia")) {
            // ==========================================
            // 🍽️ SECTOR 3: RESTAURANTE / ALIMENTOS
            // ==========================================
            unitData = [
                { name: "Plato / Fondo", abbreviation: "plto", type: "UNIT", conversionFactor: 1.0 },
                { name: "Porción Acompañamiento", abbreviation: "porc", type: "UNIT", conversionFactor: 1.0 },
                { name: "Vaso de Bebida", abbreviation: "vso", type: "UNIT", conversionFactor: 1.0 },
                { name: "Taza de Café", abbreviation: "tz", type: "UNIT", conversionFactor: 1.0 },
                { name: "Caja Delivery", abbreviation: "cj-del", type: "BOX", conversionFactor: 1.0 },
                { name: "Paquete de Cubiertos", abbreviation: "paq-cub", type: "PACK", conversionFactor: 1.0 },
                { name: "Docena de Bocaditos", abbreviation: "doc-boc", type: "DOZEN", conversionFactor: 1.0 },
                { name: "Litro de Caldo", abbreviation: "1L", type: "LITER", conversionFactor: 1.0 },
                { name: "Medio Litro Refresco", abbreviation: "0.5L", type: "HALF_LITER", conversionFactor: 1.0 },
                { name: "Cuarto Litro Entrada", abbreviation: "0.25L", type: "QUARTER_LITER", conversionFactor: 1.0 },
                { name: "Mililitro Insumo", abbreviation: "ml", type: "MILLILITER", conversionFactor: 1.0 },
                { name: "Kilogramo Proteína", abbreviation: "kg", type: "KILOGRAM", conversionFactor: 1.0 },
                { name: "Gramo Especia Receta", abbreviation: "g", type: "GRAM", conversionFactor: 1.0 },
                { name: "Bandeja Buffet", abbreviation: "bdj", type: "UNIT", conversionFactor: 1.0 },
                { name: "Balde de Salsas", abbreviation: "bld", type: "UNIT", conversionFactor: 1.0 },
                { name: "Jarra Bebida", abbreviation: "jrr", type: "UNIT", conversionFactor: 1.0 },
                { name: "Rebanada Torta", abbreviation: "reb", type: "UNIT", conversionFactor: 1.0 },
                { name: "Bowl Ensalada", abbreviation: "bw", type: "UNIT", conversionFactor: 1.0 },
                { name: "Botella Vino", abbreviation: "btl", type: "UNIT", conversionFactor: 1.0 },
                { name: "Pinta Cerveza", abbreviation: "pnt", type: "UNIT", conversionFactor: 1.0 },
                { name: "Caja de Insumos", abbreviation: "cj-ins", type: "BOX", conversionFactor: 1.0 }
            ];
        } else if (companyKey.includes("veterinary") || companyKey.includes("veterinaria") || companyKey.includes("petshop")) {
            // ==========================================
            // 🐾 SECTOR 4: VETERINARIA / PET SHOP
            // ==========================================
            unitData = [
                { name: "Consulta General", abbreviation: "cts", type: "UNIT", conversionFactor: 1.0 },
                { name: "Tableta Desparasitante", abbreviation: "tab", type: "UNIT", conversionFactor: 1.0 },
                { name: "Caja Medicamento Vet", abbreviation: "cj", type: "BOX", conversionFactor: 1.0 },
                { name: "Paquete de Pañales Mascota", abbreviation: "paq", type: "PACK", conversionFactor: 1.0 },
                { name: "Docena de Juguetes Masticables", abbreviation: "doc-jug", type: "DOZEN", conversionFactor: 1.0 },
                { name: "Pipeta Antipulgas", abbreviation: "pip", type: "UNIT", conversionFactor: 1.0 },
                { name: "Ampolla Inyectable Vet", abbreviation: "amp", type: "UNIT", conversionFactor: 1.0 },
                { name: "Mililitro Fármaco Vet", abbreviation: "ml", type: "MILLILITER", conversionFactor: 1.0 },
                { name: "Litro Shampoo Medicado", abbreviation: "1L", type: "LITER", conversionFactor: 1.0 },
                { name: "Medio Litro Loción Otica", abbreviation: "0.5L", type: "HALF_LITER", conversionFactor: 1.0 },
                { name: "Cuarto Litro Suero Rehidratante", abbreviation: "0.25L", type: "QUARTER_LITER", conversionFactor: 1.0 },
                { name: "Gramo Fármaco Polvo", abbreviation: "g", type: "GRAM", conversionFactor: 1.0 },
                { name: "Kilogramo Alimento Granel", abbreviation: "kg", type: "KILOGRAM", conversionFactor: 1.0 },
                { name: "Saco Alimento Pro (15 kg)", abbreviation: "sac-15", type: "KILOGRAM", conversionFactor: 15.0 },
                { name: "Saco Alimento Premium (22 kg)", abbreviation: "sac-22", type: "KILOGRAM", conversionFactor: 22.0 },
                { name: "Lata Comida Húmeda", abbreviation: "lt", type: "UNIT", conversionFactor: 1.0 },
                { name: "Sachet Bocaditos", abbreviation: "sch", type: "UNIT", conversionFactor: 1.0 },
                { name: "Sesión de Grooming / Baño", abbreviation: "ses-gro", type: "UNIT", conversionFactor: 1.0 },
                { name: "Collar Antiparasitario", abbreviation: "clr", type: "UNIT", conversionFactor: 1.0 },
                { name: "Tubo Pomada Vet", abbreviation: "tb", type: "UNIT", conversionFactor: 1.0 },
                { name: "Frasco Vitaminas", abbreviation: "frs", type: "UNIT", conversionFactor: 1.0 }
            ];
        } else if (companyKey.includes("technology") || companyKey.includes("tecnologia") || companyKey.includes("computo")) {
            // ==========================================
            // 💻 SECTOR 5: TECNOLOGÍA / COMPUTACIÓN
            // ==========================================
            unitData = [
                { name: "Unidad Hardware", abbreviation: "und", type: "UNIT", conversionFactor: 1.0 },
                { name: "Caja Componente", abbreviation: "cj", type: "BOX", conversionFactor: 1.0 },
                { name: "Paquete de Accesorios", abbreviation: "paq", type: "PACK", conversionFactor: 1.0 },
                { name: "Kit de Herramientas", abbreviation: "kit", type: "PACK", conversionFactor: 1.0 },
                { name: "Docena Conectores RJ45", abbreviation: "doc-rj45", type: "DOZEN", conversionFactor: 1.0 },
                { name: "Metro Cable de Red Cat6", abbreviation: "m-cat6", type: "METER", conversionFactor: 1.0 },
                { name: "Metro Fibra Óptica Duplex", abbreviation: "m-fo", type: "METER", conversionFactor: 1.0 },
                { name: "Licencia Software Anual", abbreviation: "lic-anual", type: "UNIT", conversionFactor: 1.0 },
                { name: "Licencia Canal / Servidor", abbreviation: "lic-srv", type: "UNIT", conversionFactor: 1.0 },
                { name: "Dispositivo Periférico", abbreviation: "dev", type: "UNIT", conversionFactor: 1.0 },
                { name: "Cartucho de Tinta", abbreviation: "cart", type: "UNIT", conversionFactor: 1.0 },
                { name: "Tóner Impresora", abbreviation: "toner", type: "UNIT", conversionFactor: 1.0 },
                { name: "Blister Pilas AA", abbreviation: "bli-aa", type: "PACK", conversionFactor: 1.0 },
                { name: "Módulo Memoria RAM", abbreviation: "mod", type: "UNIT", conversionFactor: 1.0 },
                { name: "Suscripción Cloud Mensual", abbreviation: "sub-cloud", type: "UNIT", conversionFactor: 1.0 },
                { name: "Hora Servicio Soporte Técnico", abbreviation: "hrs", type: "UNIT", conversionFactor: 1.0 },
                { name: "Display Canaletas", abbreviation: "disp", type: "BOX", conversionFactor: 1.0 },
                { name: "Litro Limpiador de Contactos", abbreviation: "1L", type: "LITER", conversionFactor: 1.0 },
                { name: "Mililitro Pasta Térmica", abbreviation: "ml", type: "MILLILITER", conversionFactor: 1.0 },
                { name: "Gramo Filamento Impresión 3D", abbreviation: "g", type: "GRAM", conversionFactor: 1.0 },
                { name: "Bobina Filamento (1 kg)", abbreviation: "bob-1kg", type: "KILOGRAM", conversionFactor: 1.0 }
            ];
        } else if (companyKey.includes("bookstore") || companyKey.includes("libreria") || companyKey.includes("papeleria")) {
            // ==========================================
            // 📚 SECTOR 6: LIBRERÍA / PAPELERÍA
            // ==========================================
            unitData = [
                { name: "Unidad Artículo", abbreviation: "und", type: "UNIT", conversionFactor: 1.0 },
                { name: "Paquete Útiles", abbreviation: "paq", type: "PACK", conversionFactor: 1.0 },
                { name: "Caja de Lapiceros", abbreviation: "cj", type: "BOX", conversionFactor: 1.0 },
                { name: "Docena de Lápices", abbreviation: "doc", type: "DOZEN", conversionFactor: 1.0 },
                { name: "Resma Papel A4 (500 hojas)", abbreviation: "rsm", type: "PACK", conversionFactor: 500.0 },
                { name: "Cuaderno Universitario", abbreviation: "cdno", type: "UNIT", conversionFactor: 1.0 },
                { name: "Blister Plumones", abbreviation: "bli", type: "PACK", conversionFactor: 1.0 },
                { name: "Set Geométrico", abbreviation: "set", type: "PACK", conversionFactor: 1.0 },
                { name: "Pliego Papel Kraft", abbreviation: "plg", type: "UNIT", conversionFactor: 1.0 },
                { name: "Metro Vinifán Forro", abbreviation: "m", type: "METER", conversionFactor: 1.0 },
                { name: "Metro Cinta Embalaje", abbreviation: "m-cnt", type: "METER", conversionFactor: 1.0 },
                { name: "Rollo Cinta Adhesiva", abbreviation: "rlo", type: "UNIT", conversionFactor: 1.0 },
                { name: "Display Gomas de Pegar", abbreviation: "disp", type: "BOX", conversionFactor: 1.0 },
                { name: "Millar de Hojas Sueltas", abbreviation: "mll", type: "PACK", conversionFactor: 1000.0 },
                { name: "Ciento de Sobres", abbreviation: "cnt", type: "PACK", conversionFactor: 100.0 },
                { name: "Tubo Pintura Óleo", abbreviation: "tb", type: "UNIT", conversionFactor: 1.0 },
                { name: "Frasco Témpera Grande", abbreviation: "frs", type: "UNIT", conversionFactor: 1.0 },
                { name: "Barra de Silicona", abbreviation: "brr", type: "UNIT", conversionFactor: 1.0 },
                { name: "Pote Masa Moldeable", abbreviation: "pte", type: "UNIT", conversionFactor: 1.0 },
                { name: "Mililitro Tinta Recarga", abbreviation: "ml", type: "MILLILITER", conversionFactor: 1.0 },
                { name: "Medio Litro Pegamento Líquido", abbreviation: "0.5L", type: "HALF_LITER", conversionFactor: 1.0 }
            ];
        } else if (companyKey.includes("gym") || companyKey.includes("gimnasio") || companyKey.includes("fitness")) {
            // ==========================================
            // 🏋️‍♂️ SECTOR 7: GIMNASIO / FITNESS
            // ==========================================
            unitData = [
                { name: "Membresía Mensual", abbreviation: "mes", type: "UNIT", conversionFactor: 1.0 },
                { name: "Membresía Trimestral", abbreviation: "trim", type: "UNIT", conversionFactor: 3.0 },
                { name: "Membresía Semestral", abbreviation: "sem", type: "UNIT", conversionFactor: 6.0 },
                { name: "Membresía Anual", abbreviation: "anual", type: "UNIT", conversionFactor: 12.0 },
                { name: "Pase Libre Diario", abbreviation: "dia", type: "UNIT", conversionFactor: 1.0 },
                { name: "Sesión de Personal Training", abbreviation: "ses-pt", type: "UNIT", conversionFactor: 1.0 },
                { name: "Evaluación Nutricional", abbreviation: "eval", type: "UNIT", conversionFactor: 1.0 },
                { name: "Botella Agua Deportiva", abbreviation: "btl", type: "UNIT", conversionFactor: 1.0 },
                { name: "Litro Bebida Isotónica", abbreviation: "1L", type: "LITER", conversionFactor: 1.0 },
                { name: "Medio Litro Quemador Líquido", abbreviation: "0.5L", type: "HALF_LITER", conversionFactor: 1.0 },
                { name: "Cuarto Litro Proteína Lista", abbreviation: "0.25L", type: "QUARTER_LITER", conversionFactor: 1.0 },
                { name: "Mililitro Suplemento Gotas", abbreviation: "ml", type: "MILLILITER", conversionFactor: 1.0 },
                { name: "Kilogramo Proteína Pura", abbreviation: "kg", type: "KILOGRAM", conversionFactor: 1.0 },
                { name: "Gramo Aminoácidos Creatina", abbreviation: "g", type: "GRAM", conversionFactor: 1.0 },
                { name: "Pote Suplemento Grande", abbreviation: "pte", type: "BOX", conversionFactor: 1.0 },
                { name: "Sachet Energizante Single", abbreviation: "sch", type: "UNIT", conversionFactor: 1.0 },
                { name: "Barra Energética Snack", abbreviation: "brr", type: "UNIT", conversionFactor: 1.0 },
                { name: "Paquete Toallas Desechables", abbreviation: "paq-toalla", type: "PACK", conversionFactor: 1.0 },
                { name: "Caja de Barras Proteicas", abbreviation: "cj-barras", type: "BOX", conversionFactor: 1.0 },
                { name: "Docena de Bebidas Energéticas", abbreviation: "doc-bev", type: "DOZEN", conversionFactor: 1.0 },
                { name: "Shaker / Vaso Mezclador", abbreviation: "shk", type: "UNIT", conversionFactor: 1.0 }
            ];
        } else if (companyKey.includes("jewelry") || companyKey.includes("joyeria") || companyKey.includes("relojeria")) {
            // ==========================================
            // 💎 SECTOR 8: JOYERÍA / ACCESORIOS
            // ==========================================
            unitData = [
                { name: "Gramo de Oro 18K", abbreviation: "g-oro", type: "GRAM", conversionFactor: 1.0 },
                { name: "Gramo de Plata 925", abbreviation: "g-plata", type: "GRAM", conversionFactor: 1.0 },
                { name: "Unidad Joya / Pieza", abbreviation: "und", type: "UNIT", conversionFactor: 1.0 },
                { name: "Par de Aretes / Pendientes", abbreviation: "par", type: "UNIT", conversionFactor: 2.0 },
                { name: "Estuche Premium Joya", abbreviation: "est", type: "BOX", conversionFactor: 1.0 },
                { name: "Caja De Envío", abbreviation: "cj", type: "BOX", conversionFactor: 1.0 },
                { name: "Paquete Paños de Pulido", abbreviation: "paq", type: "PACK", conversionFactor: 1.0 },
                { name: "Docena de Cajas Exhibidoras", abbreviation: "doc-cj", type: "DOZEN", conversionFactor: 1.0 },
                { name: "Metro Cadena en Rollo", abbreviation: "m-cdn", type: "METER", conversionFactor: 1.0 },
                { name: "Set Completo Alianzas", abbreviation: "set", type: "PACK", conversionFactor: 1.0 },
                { name: "Anillo Compromiso", abbreviation: "anl", type: "UNIT", conversionFactor: 1.0 },
                { name: "Dije Oro / Plata", abbreviation: "dj", type: "UNIT", conversionFactor: 1.0 },
                { name: "Pulsera Ajustable", abbreviation: "pls", type: "UNIT", conversionFactor: 1.0 },
                { name: "Servicio de Grabado Láser", abbreviation: "srv-grab", type: "UNIT", conversionFactor: 1.0 },
                { name: "Servicio Limpieza Química", abbreviation: "srv-limp", type: "UNIT", conversionFactor: 1.0 },
                { name: "Mililitro Líquido Limpiador", abbreviation: "ml", type: "MILLILITER", conversionFactor: 1.0 },
                { name: "Cuarto Litro Baño de Oro", abbreviation: "0.25L", type: "QUARTER_LITER", conversionFactor: 1.0 },
                { name: "Medio Litro Abrillantador", abbreviation: "0.5L", type: "HALF_LITER", conversionFactor: 1.0 },
                { name: "Litro Solución Ultrasónica", abbreviation: "1L", type: "LITER", conversionFactor: 1.0 },
                { name: "Kilogramo Granza de Plata", abbreviation: "kg", type: "KILOGRAM", conversionFactor: 1.0 },
                { name: "Eslabón Suelto Repuesto", abbreviation: "esl", type: "UNIT", conversionFactor: 1.0 }
            ];
        } else if (companyKey.includes("construction") || companyKey.includes("constructora") || companyKey.includes("obras")) {
            // ==========================================
            // 🏗️ SECTOR 9: CONSTRUCCIÓN / OBRAS
            // ==========================================
            unitData = [
                { name: "Kilogramo Clavos / Fierro", abbreviation: "kg", type: "KILOGRAM", conversionFactor: 1.0 },
                { name: "Saco Cemento (42.5 kg)", abbreviation: "sac-cem", type: "KILOGRAM", conversionFactor: 42.5 },
                { name: "Saco Cal (25 kg)", abbreviation: "sac-cal", type: "KILOGRAM", conversionFactor: 25.0 },
                { name: "Gramo Aditivo Polvo", abbreviation: "g", type: "GRAM", conversionFactor: 1.0 },
                { name: "Metro Lineal Fierro Corrugado", abbreviation: "m-lineal", type: "METER", conversionFactor: 1.0 },
                { name: "Metro Cable Eléctrico", abbreviation: "m-cable", type: "METER", conversionFactor: 1.0 },
                { name: "Metro Cuadrado Drywall", abbreviation: "m2", type: "SQUARE_METER", conversionFactor: 1.0 },
                { name: "Metro Cuadrado Cerámico", abbreviation: "m2-cer", type: "SQUARE_METER", conversionFactor: 1.0 },
                { name: "Metro Cuadrado Geomembrana", abbreviation: "m2-geo", type: "SQUARE_METER", conversionFactor: 1.0 },
                { name: "Unidad Ladrillo / Bloque", abbreviation: "und", type: "UNIT", conversionFactor: 1.0 },
                { name: "Caja Porcelanato", abbreviation: "cj-por", type: "BOX", conversionFactor: 1.0 },
                { name: "Paquete Termofusión", abbreviation: "paq", type: "PACK", conversionFactor: 1.0 },
                { name: "Docena Herramientas Mano", abbreviation: "doc-herr", type: "DOZEN", conversionFactor: 1.0 },
                { name: "Litro Resina Epóxica", abbreviation: "1L", type: "LITER", conversionFactor: 1.0 },
                { name: "Medio Litro Sellador Líquido", abbreviation: "0.5L", type: "HALF_LITER", conversionFactor: 1.0 },
                { name: "Cuarto Litro Tinte Frasco", abbreviation: "0.25L", type: "QUARTER_LITER", conversionFactor: 1.0 },
                { name: "Mililitro Pegamento PVC", abbreviation: "ml", type: "MILLILITER", conversionFactor: 1.0 },
                { name: "Balde Pintura (5 Galones)", abbreviation: "bld-5gal", type: "BOX", conversionFactor: 1.0 },
                { name: "Varilla Estructural", abbreviation: "vrl", type: "UNIT", conversionFactor: 1.0 },
                { name: "Plancha Acero Zintro", abbreviation: "pln", type: "UNIT", conversionFactor: 1.0 },
                { name: "Rollo Alambre Galvanizado", abbreviation: "rlo-alm", type: "UNIT", conversionFactor: 1.0 }
            ];
        } else if (companyKey.includes("logistics") || companyKey.includes("logistica") || companyKey.includes("transporte")) {
            // ==========================================
            // 📦 SECTOR 10: LOGÍSTICA / TRANSPORTE
            // ==========================================
            unitData = [
                { name: "Pallet Mercadería", abbreviation: "plt", type: "UNIT", conversionFactor: 1.0 },
                { name: "Caja de Embalaje Mediana", abbreviation: "cj-med", type: "BOX", conversionFactor: 1.0 },
                { name: "Caja Master Corrugada", abbreviation: "cj-mst", type: "BOX", conversionFactor: 1.0 },
                { name: "Paquete de Envíos Courier", abbreviation: "paq", type: "PACK", conversionFactor: 1.0 },
                { name: "Pack Film Almacén x3", abbreviation: "pack3-film", type: "PACK", conversionFactor: 3.0 },
                { name: "Docena Precintos Seguridad", abbreviation: "doc-pct", type: "DOZEN", conversionFactor: 1.0 },
                { name: "Kilogramo Carga Aérea", abbreviation: "kg", type: "KILOGRAM", conversionFactor: 1.0 },
                { name: "Gramo Paquetería Precisión", abbreviation: "g", type: "GRAM", conversionFactor: 1.0 },
                { name: "Metro Cinta Stretch", abbreviation: "m", type: "METER", conversionFactor: 1.0 },
                { name: "Metro Cuadrado Área Almacén", abbreviation: "m2-alm", type: "SQUARE_METER", conversionFactor: 1.0 },
                { name: "Contenedor Consolidado", abbreviation: "cont", type: "UNIT", conversionFactor: 1.0 },
                { name: "Guía de Remisión Tramitada", abbreviation: "guia", type: "UNIT", conversionFactor: 1.0 },
                { name: "Flete / Servicio Ruta", abbreviation: "vje", type: "UNIT", conversionFactor: 1.0 },
                { name: "Litro Combustible Diésel", abbreviation: "1L", type: "LITER", conversionFactor: 1.0 },
                { name: "Medio Litro Aceite Motor", abbreviation: "0.5L", type: "HALF_LITER", conversionFactor: 1.0 },
                { name: "Cuarto Litro Líquido Frenos", abbreviation: "0.25L", type: "QUARTER_LITER", conversionFactor: 1.0 },
                { name: "Mililitro Aditivo Inyector", abbreviation: "ml", type: "MILLILITER", conversionFactor: 1.0 },
                { name: "Bolsa Burbuja Seguridad", abbreviation: "bls", type: "UNIT", conversionFactor: 1.0 },
                { name: "Fardo Suministros Courier", abbreviation: "frd", type: "UNIT", conversionFactor: 1.0 },
                { name: "Hora de Almacenaje Bodega", abbreviation: "hr-alm", type: "UNIT", conversionFactor: 1.0 },
                { name: "Precinto Metálico Bloqueo", abbreviation: "pct-met", type: "UNIT", conversionFactor: 1.0 }
            ];
        } else if (companyKey.includes("hardware") || companyKey.includes("ferreteria")) {
            // ==========================================
            // 🔧 SECTOR 11: FERRETERÍA
            // ==========================================
            unitData = [
                { name: "Metro Manguera Presión", abbreviation: "m-mang", type: "METER", conversionFactor: 1.0 },
                { name: "Metro Cadena Eslabón", abbreviation: "m-cdn", type: "METER", conversionFactor: 1.0 },
                { name: "Metro Cuadrado Malla Sombra", abbreviation: "m2", type: "SQUARE_METER", conversionFactor: 1.0 },
                { name: "Unidad Herramienta / Accesorio", abbreviation: "und", type: "UNIT", conversionFactor: 1.0 },
                { name: "Caja de Tornillos x100", abbreviation: "cj-tor", type: "BOX", conversionFactor: 1.0 },
                { name: "Paquete de Arandelas", abbreviation: "paq", type: "PACK", conversionFactor: 1.0 },
                { name: "Docena de Brocas Acero", abbreviation: "doc-brc", type: "DOZEN", conversionFactor: 1.0 },
                { name: "Kilogramo Clavo Calamina", abbreviation: "kg", type: "KILOGRAM", conversionFactor: 1.0 },
                { name: "Saco Yeso Cerámico (25 kg)", abbreviation: "sac-yeso", type: "KILOGRAM", conversionFactor: 25.0 },
                { name: "Gramo Soldadura Varilla", abbreviation: "g", type: "GRAM", conversionFactor: 1.0 },
                { name: "Litro Solvente Thinner", abbreviation: "1L", type: "LITER", conversionFactor: 1.0 },
                { name: "Medio Litro Pintura Esmalte", abbreviation: "0.5L", type: "HALF_LITER", conversionFactor: 1.0 },
                { name: "Cuarto Litro Ácido Muriático", abbreviation: "0.25L", type: "QUARTER_LITER", conversionFactor: 1.0 },
                { name: "Mililitro Pegamento Instantáneo", abbreviation: "ml", type: "MILLILITER", conversionFactor: 1.0 },
                { name: "Par Guantes de Nitrilo", abbreviation: "par-gnt", type: "UNIT", conversionFactor: 2.0 },
                { name: "Juego Llaves Alen", abbreviation: "set-alen", type: "PACK", conversionFactor: 1.0 },
                { name: "Balde Impermeabilizante", abbreviation: "bld", type: "BOX", conversionFactor: 1.0 },
                { name: "Plancha Zinc Techado", abbreviation: "pln-zn", type: "UNIT", conversionFactor: 1.0 },
                { name: "Bobina Cable Eléctrico (100m)", abbreviation: "bob-cbl", type: "UNIT", conversionFactor: 1.0 },
                { name: "Spray Pintura Aerosol", abbreviation: "spr", type: "UNIT", conversionFactor: 1.0 },
                { name: "Display Abrazaderas", abbreviation: "disp-abr", type: "BOX", conversionFactor: 1.0 }
            ];
        } else if (companyKey.includes("clothing") || companyKey.includes("textil") || companyKey.includes("moda") || companyKey.includes("boutique")) {
            // ==========================================
            // 👕 SECTOR 12: TEXTIL / BOUTIQUE / MODA
            // ==========================================
            unitData = [
                { name: "Prenda de Vestir / Unidad", abbreviation: "und", type: "UNIT", conversionFactor: 1.0 },
                { name: "Caja de Accesorios Moda", abbreviation: "cj", type: "BOX", conversionFactor: 1.0 },
                { name: "Paquete de Calcetines x3", abbreviation: "paq-calc", type: "PACK", conversionFactor: 1.0 },
                { name: "Docena de Polos Básicos", abbreviation: "doc-polos", type: "DOZEN", conversionFactor: 1.0 },
                { name: "Metro Tela Denim", abbreviation: "m-denim", type: "METER", conversionFactor: 1.0 },
                { name: "Metro Encaje Elástico", abbreviation: "m-encaje", type: "METER", conversionFactor: 1.0 },
                { name: "Metro Cuadrado Forro Textil", abbreviation: "m2", type: "SQUARE_METER", conversionFactor: 1.0 },
                { name: "Par de Calzado / Zapatos", abbreviation: "par", type: "UNIT", conversionFactor: 2.0 },
                { name: "Set Conjunto Sastrería", abbreviation: "set", type: "PACK", conversionFactor: 1.0 },
                { name: "Rollo de Tela Hilado", abbreviation: "rlo", type: "UNIT", conversionFactor: 1.0 },
                { name: "Cono Hilo Costura Industrial", abbreviation: "cono", type: "UNIT", conversionFactor: 1.0 },
                { name: "Kilogramo Lana Ovillo", abbreviation: "kg", type: "KILOGRAM", conversionFactor: 1.0 },
                { name: "Gramo Pedrería Fina", abbreviation: "g", type: "GRAM", conversionFactor: 1.0 },
                { name: "Blister Botones Premium", abbreviation: "bli-bot", type: "PACK", conversionFactor: 1.0 },
                { name: "Display Etiquetas Talla", abbreviation: "disp", type: "BOX", conversionFactor: 1.0 },
                { name: "Bolsa Empaque Boutique", abbreviation: "bls", type: "UNIT", conversionFactor: 1.0 },
                { name: "Fardo Ropa Almacén", abbreviation: "frd", type: "UNIT", conversionFactor: 1.0 },
                { name: "Tira Cierres Cremallera", abbreviation: "tira", type: "UNIT", conversionFactor: 1.0 },
                { name: "Millar Hangtags Cartón", abbreviation: "mll", type: "PACK", conversionFactor: 1000.0 },
                { name: "Litro Tintura Textil", abbreviation: "1L", type: "LITER", conversionFactor: 1.0 },
                { name: "Mililitro Suavizante Industrial", abbreviation: "ml", type: "MILLILITER", conversionFactor: 1.0 }
            ];
        } else if (companyKey.includes("automotive") || companyKey.includes("automotriz") || companyKey.includes("taller")) {
            // ==========================================
            // 🚗 SECTOR 13: AUTOMOTRIZ / TALLER
            // ==========================================
            unitData = [
                { name: "Unidad Repuesto Mecánico", abbreviation: "und", type: "UNIT", conversionFactor: 1.0 },
                { name: "Caja de Pastillas Frenos", abbreviation: "cj-freno", type: "BOX", conversionFactor: 1.0 },
                { name: "Paquete de Fusibles Eléctricos", abbreviation: "paq-fus", type: "PACK", conversionFactor: 1.0 },
                { name: "Docena Bujías Encendido", abbreviation: "doc-bujia", type: "DOZEN", conversionFactor: 1.0 },
                { name: "Metro Manguera Radiador", abbreviation: "m", type: "METER", conversionFactor: 1.0 },
                { name: "Par de Amortiguadores", abbreviation: "par-amort", type: "UNIT", conversionFactor: 2.0 },
                { name: "Juego Empaquetaduras Motor", abbreviation: "jgo-emp", type: "PACK", conversionFactor: 1.0 },
                { name: "Litro Líquido Refrigerante", abbreviation: "1L", type: "LITER", conversionFactor: 1.0 },
                { name: "Medio Litro Aceite Transmisión", abbreviation: "0.5L", type: "HALF_LITER", conversionFactor: 1.0 },
                { name: "Cuarto Litro Aditivo Combustible", abbreviation: "0.25L", type: "QUARTER_LITER", conversionFactor: 1.0 },
                { name: "Mililitro Grasa Silicona", abbreviation: "ml", type: "MILLILITER", conversionFactor: 1.0 },
                { name: "Kilogramo Grasa Chasis", abbreviation: "kg", type: "KILOGRAM", conversionFactor: 1.0 },
                { name: "Gramo Pasta de Pulir Válvulas", abbreviation: "g", type: "GRAM", conversionFactor: 1.0 },
                { name: "Spray Aerosol Limpia Carburador", abbreviation: "spr", type: "UNIT", conversionFactor: 1.0 },
                { name: "Tubo Sellador de Silicona Alta Temp", abbreviation: "tb-sil", type: "UNIT", conversionFactor: 1.0 },
                { name: "Bolsa Estopa de Limpieza", abbreviation: "bls-estopa", type: "UNIT", conversionFactor: 1.0 },
                { name: "Cilindro Lubricante Hidráulico (55 Gal)", abbreviation: "cil-lub", type: "BOX", conversionFactor: 1.0 },
                { name: "Kit Distribución / Fajas", abbreviation: "kit", type: "PACK", conversionFactor: 1.0 },
                { name: "Blister Focos Halógenos", abbreviation: "bli-foco", type: "PACK", conversionFactor: 1.0 },
                { name: "Hora Mano Obra Mecánica", abbreviation: "hrs", type: "UNIT", conversionFactor: 1.0 },
                { name: "Balde Refrigerante Concentrado", abbreviation: "bld", type: "BOX", conversionFactor: 1.0 }
            ];
        } else if (companyKey.includes("bakery") || companyKey.includes("pasteleria") || companyKey.includes("panaderia")) {
            // ==========================================
            // 🍰 SECTOR 14: PANADERÍA / PASTELERÍA
            // ==========================================
            unitData = [
                { name: "Unidad Pan / Bizcocho", abbreviation: "und", type: "UNIT", conversionFactor: 1.0 },
                { name: "Caja de Tortas Especial", abbreviation: "cj-torta", type: "BOX", conversionFactor: 1.0 },
                { name: "Paquete de Piantinas Base", abbreviation: "paq", type: "PACK", conversionFactor: 1.0 },
                { name: "Docena de Facturas / Fact", abbreviation: "doc", type: "DOZEN", conversionFactor: 1.0 },
                { name: "Media Docena Pasteles", abbreviation: "m-doc", type: "DOZEN", conversionFactor: 0.5 },
                { name: "Porción de Torta Tajada", abbreviation: "porc", type: "UNIT", conversionFactor: 1.0 },
                { name: "Molde Entero Queque", abbreviation: "mld", type: "UNIT", conversionFactor: 1.0 },
                { name: "Kilogramo Harina Industrial", abbreviation: "kg", type: "KILOGRAM", conversionFactor: 1.0 },
                { name: "Saco Harina Trigo (50 kg)", abbreviation: "sac-50kg", type: "KILOGRAM", conversionFactor: 50.0 },
                { name: "Gramo Levadura Seca", abbreviation: "g", type: "GRAM", conversionFactor: 1.0 },
                { name: "Litro Crema de Leche", abbreviation: "1L", type: "LITER", conversionFactor: 1.0 },
                { name: "Medio Litro Esencia Vainilla", abbreviation: "0.5L", type: "HALF_LITER", conversionFactor: 1.0 },
                { name: "Cuarto Litro Jarabe Tres Leches", abbreviation: "0.25L", type: "QUARTER_LITER", conversionFactor: 1.0 },
                { name: "Mililitro Colorante Repostería", abbreviation: "ml", type: "MILLILITER", conversionFactor: 1.0 },
                { name: "Bandeja Bocaditos Dulces", abbreviation: "bdj", type: "UNIT", conversionFactor: 1.0 },
                { name: "Bolsa Despacho Kraft", abbreviation: "bls", type: "UNIT", conversionFactor: 1.0 },
                { name: "Ciento Pirotines N6", abbreviation: "cnt-pir", type: "PACK", conversionFactor: 100.0 },
                { name: "Balde Dulce de Leche (10 kg)", abbreviation: "bld-manjar", type: "KILOGRAM", conversionFactor: 10.0 },
                { name: "Display Cajas Galletas", abbreviation: "disp", type: "BOX", conversionFactor: 1.0 },
                { name: "Plancha Bizcochuelo Base", abbreviation: "pln", type: "UNIT", conversionFactor: 1.0 },
                { name: "Sachet Polvo de Hornear", abbreviation: "sch", type: "UNIT", conversionFactor: 1.0 }
            ];
        } else if (companyKey.includes("optics") || companyKey.includes("optica") || companyKey.includes("visual")) {
            // ==========================================
            // 👓 SECTOR 15: ÓPTICA
            // ==========================================
            unitData = [
                { name: "Montura Oftálmica / Unidad", abbreviation: "und", type: "UNIT", conversionFactor: 1.0 },
                { name: "Par Cristales Mono-focales", abbreviation: "par-cristal", type: "UNIT", conversionFactor: 2.0 },
                { name: "Caja Lentes Contacto Mensual", abbreviation: "cj-lc", type: "BOX", conversionFactor: 1.0 },
                { name: "Paquete Paños Microfibra", abbreviation: "paq-pno", type: "PACK", conversionFactor: 1.0 },
                { name: "Docena Sujetadores Lente", abbreviation: "doc-suj", type: "DOZEN", conversionFactor: 1.0 },
                { name: "Estuche Rígido Lentes", abbreviation: "est", type: "BOX", conversionFactor: 1.0 },
                { name: "Frasco Solución Multipropósito", abbreviation: "frs", type: "UNIT", conversionFactor: 1.0 },
                { name: "Mililitro Gotas Humectantes", abbreviation: "ml", type: "MILLILITER", conversionFactor: 1.0 },
                { name: "Litro Alcohol Isopropílico Óptico", abbreviation: "1L", type: "LITER", conversionFactor: 1.0 },
                { name: "Medio Litro Jabón Ultrasonido", abbreviation: "0.5L", type: "HALF_LITER", conversionFactor: 1.0 },
                { name: "Cuarto Litro Antifog Liquido", abbreviation: "0.25L", type: "QUARTER_LITER", conversionFactor: 1.0 },
                { name: "Gramo Repuesto Plaquetas Aluminio", abbreviation: "g", type: "GRAM", conversionFactor: 1.0 },
                { name: "Kilogramo Pasta Pulido Lunas", abbreviation: "kg", type: "KILOGRAM", conversionFactor: 1.0 },
                { name: "Blister Pilas Audífono Medicado", abbreviation: "bli-pila", type: "PACK", conversionFactor: 1.0 },
                { name: "Kit Destornilladores Ópticos", abbreviation: "kit", type: "PACK", conversionFactor: 1.0 },
                { name: "Pieza Repuesto Terminales Patilla", abbreviation: "pz-rep", type: "UNIT", conversionFactor: 1.0 },
                { name: "Bolsa Empaque Óptica Regalo", abbreviation: "bls", type: "UNIT", conversionFactor: 1.0 },
                { name: "Display Cordones Cadena", abbreviation: "disp", type: "BOX", conversionFactor: 1.0 },
                { name: "Examen Optométrico Clínico", abbreviation: "exm-opt", type: "UNIT", conversionFactor: 1.0 },
                { name: "Tornillo Óptico Precisión", abbreviation: "tor-opt", type: "UNIT", conversionFactor: 1.0 },
                { name: "Almohadilla Silicona Repuesto", abbreviation: "pad-sil", type: "UNIT", conversionFactor: 1.0 }
            ];
        } else if (companyKey.includes("liquor") || companyKey.includes("licoreria") || companyKey.includes("bar")) {
            // ==========================================
            // 🍾 SECTOR 16: LICORERÍA
            // ==========================================
            unitData = [
                { name: "Botella Licor Destilado", abbreviation: "btl", type: "UNIT", conversionFactor: 1.0 },
                { name: "Caja Cerveza x12", abbreviation: "cj12", type: "BOX", conversionFactor: 12.0 },
                { name: "Caja Cerveza x24", abbreviation: "cj24", type: "BOX", conversionFactor: 24.0 },
                { name: "Paquete Six-Pack Latas", abbreviation: "6pack", type: "PACK", conversionFactor: 6.0 },
                { name: "Paquete Four-Pack Botellas", abbreviation: "4pack", type: "PACK", conversionFactor: 4.0 },
                { name: "Docena Botellas Champaña", abbreviation: "doc-champ", type: "DOZEN", conversionFactor: 1.0 },
                { name: "Lata Cerveza / Sumiller", abbreviation: "lt", type: "UNIT", conversionFactor: 1.0 },
                { name: "Litro Licor Base", abbreviation: "1L", type: "LITER", conversionFactor: 1.0 },
                { name: "Medio Litro Coctel Listo", abbreviation: "0.5L", type: "HALF_LITER", conversionFactor: 1.0 },
                { name: "Cuarto Litro Pisco Petaca", abbreviation: "0.25L", type: "QUARTER_LITER", conversionFactor: 1.0 },
                { name: "Mililitro Amargo Angostura", abbreviation: "ml", type: "MILLILITER", conversionFactor: 1.0 },
                { name: "Kilogramo Hielo Almacén", abbreviation: "kg", type: "KILOGRAM", conversionFactor: 1.0 },
                { name: "Bolsa Rolito Hielo (5 kg)", abbreviation: "bls-5kg", type: "KILOGRAM", conversionFactor: 5.0 },
                { name: "Barril Cerveza Artesanal (30L)", abbreviation: "keg-30L", type: "UNIT", conversionFactor: 1.0 },
                { name: "Copa Coctelería Trago", abbreviation: "copa", type: "UNIT", conversionFactor: 1.0 },
                { name: "Vaso Shot Degustación", abbreviation: "shot", type: "UNIT", conversionFactor: 1.0 },
                { name: "Growler Vidrio Cerveza", abbreviation: "grw", type: "UNIT", conversionFactor: 1.0 },
                { name: "Display Complementos / Snacks", abbreviation: "disp", type: "BOX", conversionFactor: 1.0 },
                { name: "Sachet Limón Deshidratado", abbreviation: "sch-limon", type: "UNIT", conversionFactor: 1.0 },
                { name: "Fardo Gaseosas Mezcladoras", abbreviation: "frd", type: "PACK", conversionFactor: 1.0 },
                { name: "Botellita Miniatura Colección", abbreviation: "mini", type: "UNIT", conversionFactor: 1.0 }
            ];
        } else if (companyKey.includes("agriculture") || companyKey.includes("agro") || companyKey.includes("veterinario-agricola")) {
            // ==========================================
            // 🌾 SECTOR 17: AGRÍCOLA / AGROPECUARIO
            // ==========================================
            unitData = [
                { name: "Kilogramo Semillas Certificadas", abbreviation: "kg", type: "KILOGRAM", conversionFactor: 1.0 },
                { name: "Saco Fertilizante Urea (50 kg)", abbreviation: "sac-50", type: "KILOGRAM", conversionFactor: 50.0 },
                { name: "Saco Abono Orgánico (25 kg)", abbreviation: "sac-25", type: "KILOGRAM", conversionFactor: 25.0 },
                { name: "Gramo Agroquímico Polvo", abbreviation: "g", type: "GRAM", conversionFactor: 1.0 },
                { name: "Litro Pesticida Líquido", abbreviation: "1L", type: "LITER", conversionFactor: 1.0 },
                { name: "Medio Litro Herbicida Concentrado", abbreviation: "0.5L", type: "HALF_LITER", conversionFactor: 1.0 },
                { name: "Cuarto Litro Foliar Nutriente", abbreviation: "0.25L", type: "QUARTER_LITER", conversionFactor: 1.0 },
                { name: "Mililitro Hormona Crecimiento", abbreviation: "ml", type: "MILLILITER", conversionFactor: 1.0 },
                { name: "Caja Herramientas Riego", abbreviation: "cj", type: "BOX", conversionFactor: 1.0 },
                { name: "Paquete Aspersores Plásticos", abbreviation: "paq-asp", type: "PACK", conversionFactor: 1.0 },
                { name: "Docena Conectores Goteo", abbreviation: "doc-con", type: "DOZEN", conversionFactor: 1.0 },
                { name: "Metro Manguera Polietileno Riego", abbreviation: "m", type: "METER", conversionFactor: 1.0 },
                { name: "Metro Cuadrado Malla Raschel", abbreviation: "m2", type: "SQUARE_METER", conversionFactor: 1.0 },
                { name: "Unidad Herramienta Agrícola", abbreviation: "und", type: "UNIT", conversionFactor: 1.0 },
                { name: "Bidón Agroquímico (20L)", abbreviation: "bdn-20L", type: "UNIT", conversionFactor: 1.0 },
                { name: "Cilindro Plástico Fungicida (200L)", abbreviation: "cil-200L", type: "UNIT", conversionFactor: 1.0 },
                { name: "Frasco Hormonas Enraizamiento", abbreviation: "frs", type: "UNIT", conversionFactor: 1.0 },
                { name: "Sachet Insecticida Polvo", abbreviation: "sch", type: "UNIT", conversionFactor: 1.0 },
                { name: "Balde Pasta Cicatrizante Podas", abbreviation: "bld", type: "BOX", conversionFactor: 1.0 },
                { name: "Jaba Cosecha Plástica", abbreviation: "jaba", type: "UNIT", conversionFactor: 1.0 },
                { name: "Rollo Cinta de Injertar", abbreviation: "rlo-inj", type: "UNIT", conversionFactor: 1.0 }
            ];
        } else if (companyKey.includes("beauty") || companyKey.includes("salon") || companyKey.includes("estetica") || companyKey.includes("cosmeticos")) {
            // ==========================================
            // 💅 SECTOR 18: SALÓN DE BELLEZA / ESTÉTICA
            // ==========================================
            unitData = [
                { name: "Servicio Tratamiento Capilar", abbreviation: "srv-cap", type: "UNIT", conversionFactor: 1.0 },
                { name: "Sesión Manicura Completa", abbreviation: "ses-mani", type: "UNIT", conversionFactor: 1.0 },
                { name: "Unidad Cosmético Producto", abbreviation: "und", type: "UNIT", conversionFactor: 1.0 },
                { name: "Caja de Tintes Cabello", abbreviation: "cj-tinte", type: "BOX", conversionFactor: 1.0 },
                { name: "Paquete Capas Desechables", abbreviation: "paq-capa", type: "PACK", conversionFactor: 1.0 },
                { name: "Docena Esmaltes Uñas", abbreviation: "doc-esm", type: "DOZEN", conversionFactor: 1.0 },
                { name: "Litro Peróxido Activador", abbreviation: "1L", type: "LITER", conversionFactor: 1.0 },
                { name: "Medio Litro Champú Neutral", abbreviation: "0.5L", type: "HALF_LITER", conversionFactor: 1.0 },
                { name: "Cuarto Litro Queratina Alaciado", abbreviation: "0.25L", type: "QUARTER_LITER", conversionFactor: 1.0 },
                { name: "Mililitro Serum Reparador Aceite", abbreviation: "ml", type: "MILLILITER", conversionFactor: 1.0 },
                { name: "Gramo Polvo Decolorante", abbreviation: "g", type: "GRAM", conversionFactor: 1.0 },
                { name: "Kilogramo Cera Depilatoria", abbreviation: "kg", type: "KILOGRAM", conversionFactor: 1.0 },
                { name: "Frasco Base Maquillaje", abbreviation: "frs", type: "UNIT", conversionFactor: 1.0 },
                { name: "Tubo Labial Mate", abbreviation: "tb", type: "UNIT", conversionFactor: 1.0 },
                { name: "Pote Mascarilla Hidratante", abbreviation: "pte", type: "BOX", conversionFactor: 1.0 },
                { name: "Sachet Muestra Perfume", abbreviation: "sch", type: "UNIT", conversionFactor: 1.0 },
                { name: "Ampolla Crecimiento Capilar", abbreviation: "amp", type: "UNIT", conversionFactor: 1.0 },
                { name: "Blister Agujas Microblading", abbreviation: "bli-aguj", type: "PACK", conversionFactor: 1.0 },
                { name: "Par Pestañas Postizas Mink", abbreviation: "par-pest", type: "UNIT", conversionFactor: 2.0 },
                { name: "Kit Maquillaje Profesional", abbreviation: "kit", type: "PACK", conversionFactor: 1.0 },
                { name: "Spray Fijador Peinado", abbreviation: "spr", type: "UNIT", conversionFactor: 1.0 }
            ];
        } else if (companyKey.includes("toy") || companyKey.includes("jugueteria")) {
            // ==========================================
            // 🧸 SECTOR 19: JUGUETERÍA
            // ==========================================
            unitData = [
                { name: "Unidad Juguete / Muñeco", abbreviation: "und", type: "UNIT", conversionFactor: 1.0 },
                { name: "Caja de Juego de Mesa", abbreviation: "cj-jgo", type: "BOX", conversionFactor: 1.0 },
                { name: "Paquete Figuras de Acción", abbreviation: "paq-fig", type: "PACK", conversionFactor: 1.0 },
                { name: "Docena de Canicas Colección", abbreviation: "doc-can", type: "DOZEN", conversionFactor: 1.0 },
                { name: "Pack Coleccionable x2", abbreviation: "pack2", type: "PACK", conversionFactor: 2.0 },
                { name: "Pack Bloques Armables x5", abbreviation: "pack5", type: "PACK", conversionFactor: 5.0 },
                { name: "Display Mini-Autos Juguete", abbreviation: "disp-cars", type: "BOX", conversionFactor: 1.0 },
                { name: "Blister Cartas Coleccionables", abbreviation: "bli-cards", type: "PACK", conversionFactor: 1.0 },
                { name: "Bolsa de Peluches Surtidos", abbreviation: "bls-pel", type: "UNIT", conversionFactor: 1.0 },
                { name: "Litro Burbujero Líquido Recarga", abbreviation: "1L", type: "LITER", conversionFactor: 1.0 },
                { name: "Medio Litro Pintura Escolar Dactilar", abbreviation: "0.5L", type: "HALF_LITER", conversionFactor: 1.0 },
                { name: "Cuarto Litro Pegamento Juguetes", abbreviation: "0.25L", type: "QUARTER_LITER", conversionFactor: 1.0 },
                { name: "Mililitro Lubricante Cubos Rubik", abbreviation: "ml", type: "MILLILITER", conversionFactor: 1.0 },
                { name: "Gramo Brillantina Manualidades", abbreviation: "g", type: "GRAM", conversionFactor: 1.0 },
                { name: "Kilogramo Masa Moldeable Arcilla", abbreviation: "kg", type: "KILOGRAM", conversionFactor: 1.0 },
                { name: "Metro Pista de Carreras Flexible", abbreviation: "m-pista", type: "METER", conversionFactor: 1.0 },
                { name: "Pote Slime Divertido", abbreviation: "pte", type: "UNIT", conversionFactor: 1.0 },
                { name: "Frasco Pintura Maqueta", abbreviation: "frs", type: "UNIT", conversionFactor: 1.0 },
                { name: "Tubo Pegamento Modelismo", abbreviation: "tb", type: "UNIT", conversionFactor: 1.0 },
                { name: "Pack Pilas Alcalinas Suministro", abbreviation: "pack-pila", type: "PACK", conversionFactor: 1.0 },
                { name: "Lata Spray Aire Comprimido", abbreviation: "lt-aire", type: "UNIT", conversionFactor: 1.0 }
            ];
        } else {
            // ==========================================
            // 🏢 SECTOR 20: GENERAL / OTROS SECTORES (Fallback Estricto)
            // ==========================================
            unitData = [
                { name: "Unidad Estándar", abbreviation: "und", type: "UNIT", conversionFactor: 1.0 },
                { name: "Caja Corporativa", abbreviation: "cj", type: "BOX", conversionFactor: 1.0 },
                { name: "Paquete Suministros", abbreviation: "paq", type: "PACK", conversionFactor: 1.0 },
                { name: "Docena Regular", abbreviation: "doc", type: "DOZEN", conversionFactor: 1.0 },
                { name: "Metro Lineal General", abbreviation: "m", type: "METER", conversionFactor: 1.0 },
                { name: "Metro Cuadrado Superficie", abbreviation: "m2", type: "SQUARE_METER", conversionFactor: 1.0 },
                { name: "Litro Completo Insumo", abbreviation: "1L", type: "LITER", conversionFactor: 1.0 },
                { name: "Medio Litro Envase", abbreviation: "0.5L", type: "HALF_LITER", conversionFactor: 1.0 },
                { name: "Cuarto Litro Frasco", abbreviation: "0.25L", type: "QUARTER_LITER", conversionFactor: 1.0 },
                { name: "Mililitro Precisión Líquido", abbreviation: "ml", type: "MILLILITER", conversionFactor: 1.0 },
                { name: "Kilogramo Peso Base", abbreviation: "kg", type: "KILOGRAM", conversionFactor: 1.0 },
                { name: "Gramo Componente Fino", abbreviation: "g", type: "GRAM", conversionFactor: 1.0 },
                { name: "Display Pack Comercial", abbreviation: "disp", type: "BOX", conversionFactor: 1.0 },
                { name: "Blister Repuesto General", abbreviation: "bli", type: "PACK", conversionFactor: 1.0 },
                { name: "Sachet Monodosis", abbreviation: "sch", type: "UNIT", conversionFactor: 1.0 },
                { name: "Par Elementos Vinculados", abbreviation: "par", type: "UNIT", conversionFactor: 2.0 },
                { name: "Set / Kit Genérico", abbreviation: "kit", type: "PACK", conversionFactor: 1.0 },
                { name: "Bolsa Insumo Común", abbreviation: "bls", type: "UNIT", conversionFactor: 1.0 },
                { name: "Fardo Suministro Mayorista", abbreviation: "frd", type: "UNIT", conversionFactor: 1.0 },
                { name: "Pote Contenedor", abbreviation: "pte", type: "UNIT", conversionFactor: 1.0 },
                { name: "Tubo Empaque Circular", abbreviation: "tb", type: "UNIT", conversionFactor: 1.0 }
            ];
        }

        // Mapeo final inyectando el companyId correspondiente a la iteración multi-tenant actual
        const formatData = unitData.map(unit => ({
            ...unit,
            companyId: company.id
        }));

        // Guardado en lote aislando duplicados transaccionales por cada Tenant
        const result = await prisma.unit.createMany({
            data: formatData,
            skipDuplicates: true
        });

        totalInserted += result.count;
        console.log(`   └─ ✅ [${company.name}] Sincronizadas ${result.count} unidades de medida válidas.`);
    }

    console.log(`\n🎉 Proceso completado con éxito. Se sembraron ${totalInserted} registros de forma segura según el enum UnitType.`);
}

module.exports = {
    unitSeed
};