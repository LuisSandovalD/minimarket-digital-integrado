// ========================================
// prisma/seeds/product.seed.js
// ========================================

const prisma = require("../client");

async function productSeed() {
    console.log("🚀 Iniciando carga masiva de 20 productos por cada empresa adaptado a la BD...");

    // 1. Validar Unidad Base
    const unit = await prisma.unit.findFirst({
        where: { type: "UNIT" }
    });

    if (!unit) {
        throw new Error("❌ No existe la unidad UNIT. Ejecuta unit.seed primero.");
    }

    // 2. Traer todas las empresas creadas en el seed anterior
    const companies = await prisma.company.findMany();
    if (companies.length === 0) {
        throw new Error("❌ No existen empresas. Ejecuta admin.seed primero.");
    }

    // 3. Plantillas de datos por empresa para autogenerar 20 productos únicos cada una
    const blueprints = {
        "minimarket-don-luchito-sac": {
            category: "Abarrotes y Alimentos", prefix: "MIN",
            items: ["Arroz Extra", "Aceite Vegetal", "Leche Evaporada", "Fideos Espagueti", "Azúcar Rubia", "Atún en Trozos", "Lentejas Bebé", "Café Soluble", "Galletas de Soda", "Gaseosa Cola", "Detergente Polvo", "Jabón de Tocador", "Yogurt Fresa", "Mermelada Piña", "Pan de Molde", "Mayonesa Alacena", "Avena en Hojuelas", "Té Filtrante", "Sal Yodada", "Chocolate Tableta"],
            brands: ["Costeño", "Primor", "Gloria", "Don Vittorio", "Cartavio", "Real", "Paisana", "Kirma", "San Jorge", "Inca Kola", "Bolívar", "Nekko", "Laive", "Fanny", "Bimbo", "Alicorp", "3 Ositos", "McColin's", "Emsal", "Sublime"],
            baseCost: 4.00
        },
        "corp-tecnologica-vega": {
            category: "Tecnología y Gadgets", prefix: "TEC",
            items: ["Mouse Óptico", "Teclado Mecánico", "Monitor Gamer", "Auriculares Bluetooth", "Disco Sólido SSD", "Memoria RAM DDR4", "Cable HDMI 4K", "Cargador Carga Rápida", "Hub USB-C", "Soporte Laptop", "Powerbank 10k", "Cámara Web HD", "Adaptador Bluetooth", "Pendrive 64GB", "Tarjeta MicroSD", "Pasta Térmica", "Cooler CPU", "Grip de Mouse", "Filtro de Pantalla", "Organizador Cables"],
            brands: ["Logitech", "Redragon", "Asus", "Sony", "Kingston", "Corsair", "Ugreen", "Anker", "Baseus", "Halion", "Xiaomi", "Microsoft", "TP-Link", "SanDisk", "Samsung", "Artic", "CoolerMaster", "Razer", "3M", "Belkin"],
            baseCost: 90.00
        },
        "inversiones-medicas-san-jose": {
            category: "Material Médico", prefix: "MED",
            items: ["Tensiómetro Digital", "Termómetro Infrarrojo", "Oxímetro de Pulso", "Glucómetro Kit", "Estetoscopio", "Mascarillas KN95 x10", "Alcohol en Gel 1L", "Algodón Hidrófilo", "Gasa Estéril Pack", "Jeringas 5ml x20", "Guantes Nitrilo Caja", "Venda Elástica", "Esparadrapo Hipoalergénico", "Termómetro Digital", "Tiras Reactivas x50", "Lancetas Estériles", "Silla de Ruedas Standard", "Muletas de Aluminio", "Protector Facial", "Nebulizador Portátil"],
            brands: ["Omron", "Beurer", "ChoiceMMed", "Accu-Chek", "Littmann", "3M", "Alkofarma", "Inca", "Galeno", "Becton", "Top Glove", "Crepe", "Nexcare", "Citizen", "Guide", "Lancet", "Ortho", "AluMed", "Safe", "Philips"],
            baseCost: 45.00
        },
        "distribuidora-alimentos-sur": {
            category: "Consumo Masivo al por Mayor", prefix: "SUR",
            items: ["Saco Azúcar 50kg", "Saco Arroz 50kg", "Caja Aceite 12x1L", "Caja Leche 48 und", "Saco Harina 25kg", "Caja Atún 48 und", "Fardo Fideos 20 und", "Saco Menestras 25kg", "Caja Galletas Fardo", "Fardo Sal 20kg", "Caja Manteca Integral", "Saco Alimento Aves", "Fardo Conservas", "Caja Chocolates", "Saco Café Grano", "Fardo Papel Higiénico", "Caja Jabones Mayor", "Fardo Detergente", "Caja Conservas Durazno", "Saco Maíz Popcorn"],
            brands: ["Paramonga", "Costeño", "Primor", "Gloria", "Nicolini", "Fanny", "Lavaggi", "Sepsa", "Sayon", "Emsal", "Danlac", "Purina", "A-1", "Winter's", "Altomayo", "Elite", "Aval", "Opal", "Arequipa", "Importado"],
            baseCost: 80.00
        },
        "boutique-textil-alondra": {
            category: "Ropa y Moda", prefix: "TEX",
            items: ["Blusa Lino", "Pantalón Denim Mom", "Vestido Casual", "Casaca Denim", "Polo Oversize", "Chompa Hilo", "Falda Plisada", "Short Jean", "Casaca Cortaviento", "Top Rib", "Cardigan Largo", "Pantalón Sastrero", "Leggings Deportiva", "Polera con Capucha", "Enterizo Corto", "Saco Oversize", "Chaleco Tejido", "Camisa Oxford", "Bralette Encaje", "Pijama Algodón"],
            brands: ["Alondra Design", "Zara Collection", "Mango R", "H&M Line", "Levis Premium", "Stradivarius", "Bershka", "Pull&Bear", "Topitop", "Index", "Sybilla", "Basement", "Adidas Sport", "Nike Urban", "Only", "Vero Moda", "Pionier", "Tayssir", "Leonisa", "Kayser"],
            baseCost: 50.00
        },
        "ferreteria-el-progreso": {
            category: "Herramientas y Construcción", prefix: "FER",
            items: ["Martillo Uña", "Taladro Percutor", "Cinta Métrica", "Alicate Universal", "Destornillador Set", "Llave Inglesa", "Arco de Sierra", "Caja Herramientas", "Esmeril Angular", "Nivel de Mano", "Juego Llaves Allen", "Brocas Set", "Pistola Silicona", "Flexómetro", "Lijadora Orbital", "Espátula Acero", "Cincel Plano", "Gafas Protectoras", "Guantes Badana", "Cinta Aislante Pack"],
            brands: ["Tramontina", "Bosch", "Stanley", "Truper", "Pretul", "Bahco", "Irwin", "Stanley FatMax", "DeWalt", "Makita", "Total", "Black+Decker", "Tekbond", "Lufkin", "Skil", "Bellota", "Ubermann", "Steelpro", "3M", "3M Temflex"],
            baseCost: 30.00
        },
        "restaurante-sabores-del-peru": {
            category: "Carta - Platos y Bebidas", prefix: "RES",
            items: ["Ceviche Pescado", "Lomo Saltado", "Ají de Gallina", "Causa Limeña", "Arroz con Pollo", "Anticuchos Res", "Papa a la Huancaina", "Seco de Cabrito", "Tacu Tacu", "Arroz Chaufa", "Chicharrón Pescado", "Parihuela Marina", "Leche de Tigre", "Chicha Morada 1L", "Pisco Sour Tradicional", "Suspiro a la Limeña", "Picaronas Porción", "Crema Volteada", "Maracuyá Jarra", "Inca Kola Gordita"],
            brands: ["Sabores Especial", "Receta Criolla", "Gourmet", "Entrada", "Fondo", "Brasa", "Tradición", "Norteña", "Marina", "Fusión", "Puerto", "Especialidad", "Clásico", "Fruta Natural", "Quebranta", "Postre", "Artesanal", "Casero", "Fresco", "The Coca-Cola Co."],
            baseCost: 15.00
        },
        "farmacias-farmavida": {
            category: "Medicamentos y Bienestar", prefix: "FAR",
            items: ["Paracetamol 500mg", "Panadol Antigripal", "Ibuprofeno 400mg", "Amoxicilina 500mg", "Omeprazol 20mg", "Loratadina 10mg", "Aspirina 100mg", "Cetirizina 10mg", "Vitamina C 1g", "Complejo B Inyectable", "Antiácido Polvo", "Gel Analgésico", "Crema Dérmica", "Colirio Ocular", "Alcohol 70% 500ml", "Gasa Fraccionada", "Pastillas Garganta", "Suero Oral Electrolitos", "Mascarilla Quirúrgica x50", "Bloqueador Solar SPF50"],
            brands: ["Genfar", "Panadol", "Bayer", "Medifarma", "Quilab", "Portugal", "Mylan", "Sanofi", "Redoxon", "Neurobión", "Sal de Andrews", "Voltaren", "Bepanthen", "Eyemed", "Alkofarma", "Galeno", "Strepsils", "Pedialyte", "SafeMed", "Bahía"],
            baseCost: 10.00
        },
        "constructora-inmobiliaria-horizon": {
            category: "Materiales de Estructura", prefix: "CON",
            items: ["Bolsa Cemento Tipo 1", "Varilla Fierro 1/2", "Varilla Fierro 3/8", "Ladrillo King Kong x100", "Ladrillo Techo x100", "Bolsa Cal Hidratada", "Malla Electrosoldada", "Clavos de Acero 3'' x1kg", "Alambre Negro Nro 16 x1kg", "Plancha Policarbonato", "Tubo PVC Sal 4''", "Tubo PVC Agua 1/2''", "Pegamento PVC", "Piedra Chancada m3", "Arena Gruesa m3", "Premix Concreto", "Aditivo Impermeabilizante", "Plancha Drywall", "Perfil Omega Drywall", "Cinta Fibra Vidrio"],
            brands: ["Sol", "Aceros Arequipa", "Siderperu", "Lark", "Pirámide", "Inca", "Prodac", "IncaFierro", "AcerosA", "Polygal", "Pavco", "Nicoll", "Oatey", "Cantera Local", "Cantera Local", "Unicon", "Sika", "Gyplac", "Tupemesa", "Knauf"],
            baseCost: 35.00
        },
        "petshop-veterinaria-huellitas": {
            category: "Alimento y Cuidado de Mascotas", prefix: "PET",
            items: ["Ricocan Adulto 15kg", "Shampoo Antipulgas", "Ricocat Adulto 10kg", "Pro Plan Cachorro 3kg", "Royal Canin Gato 2kg", "Collar Antiparasitario", "Hueso Carnaza Pack", "Arena Sanitaria 5kg", "Arnés Ajustable", "Juguete Cordón Mordedor", "Pastilla Desparasitante", "Gotas Oticas Limpieza", "Plato Acero Doble", "Cama Acolchada Mediana", "Snacks Perritos Bolsa", "Transportador Gato", "Cortaúñas Mascota", "Cepillo Cardina", "Gotas Relajantes Natural", "Ropa Invierno Mascota"],
            brands: ["Ricocan", "Huellitas S.A.", "Ricocat", "Purina Pro Plan", "Royal Canin", "Seresto", "Dog Chow", "Scoop", "Zeedog", "Kong", "Bravecto", "Otiflex", "PetTech", "SweetDreams", "Barkys", "Catit", "Furminator", "Wahl", "PetCalm", "DoggyStyle"],
            baseCost: 28.00
        },
        "automotriz-del-centro": {
            category: "Repuestos Automotrices", prefix: "AUT",
            items: ["Aceite Motor 20W-50", "Pastillas Freno Delanteras", "Filtro de Aceite", "Filtro de Aire", "Batería 13 Placas", "Bujías de Iridio Set", "Líquido de Frenos Dot4", "Refrigerante Radiador", "Faja de Distribución", "Amortiguador Delantero", "Llantas 185/65 R15", "Plumillas Limpiaparabrisas", "Foco Halógeno H4", "Kit de Embrague", "Sensor de Oxígeno", "Bomba de Agua Motor", "Filtro de Combustible", "Pastillas Freno Posteriores", "Terminal de Dirección", "Gata Hidráulica Botella"],
            brands: ["Castrol", "Bosch", "Fram", "Mann Filter", "Capsa", "NGK", "Varga", "Prestone", "Gates", "KYB", "Bridgestone", "Michelin", "Philips", "Valeo", "Denso", "GMB", "Mahle", "Fras-le", "555", "Truper"],
            baseCost: 60.00
        },
        "opticas-vision-clara": {
            category: "Monturas y Cristales", prefix: "OPT",
            items: ["Montura Resina Negra", "Líquido Limpiador Lunas", "Estuche Rígido Lentes", "Paño Microfibra Premium", "Montura Metal Aviador", "Lentes de Sol Polarizados", "Cordón Sujetador Goma", "Montura Carey Redonda", "Lunas Antireflex Resina", "Lunas Blue Defense", "Gotas Humectantes Ojos", "Montura Deportiva", "Destornillador Óptico", "Lupa de Mano Lectura", "Lentes de Lectura Presbicia", "Montura Titanium Gold", "Lunas Fotocromáticas", "Par Almohadillas Silicona", "Estuche Viaje Múltiple", "Lentes Lunas Medida"],
            brands: ["VisionCare", "ClearView", "OptiCase", "MicroFiber", "Ray-Ban", "Oakley", "HoldFast", "Vogue", "Essilor", "Hoya", "FreshTears", "Nike Eyewear", "Precision Tool", "Bausch & Lomb", "Foster Grant", "Silhouette", "Transitions", "OptiParts", "TravelPack", "Speedo Optic"],
            baseCost: 40.00
        },
        "cafeteria-pasteleria-aroma": {
            category: "Cafés y Bebidas Calientes", prefix: "CAF",
            items: ["Café Capuccino 8oz", "Torta de Chocolate Porción", "Café Americano Fuerte", "Café Latte Espresso", "Frappuccino Caramelo", "Tarta de Manzana", "Pie de Limón", "Cheesecake de Fresa", "Croissant de Jamón/Queso", "Empanada de Carne", "Muffin de Arándanos", "Té Verde Premium", "Chocolate Caliente Taza", "Alfajor de Manjarblanco", "Brownie de Nueces", "Sandwich Caprese", "Jugo Naranja Exprimido", "Milshake Vainilla", "Galleta Chispas Chocolate", "Queque de Plátano"],
            brands: ["Aroma Blend", "Pastelería Fina", "Aroma Tradición", "Espresso Real", "Aroma Ice", "Horno Casero", "Horno Casero", "Dulce Tentación", "Crocante", "Criolla Express", "Muffin Co.", "Wico", "Cusco Tradición", "Valle", "Cacao 60%", "Gourmet Deli", "Valle Fresco", "Gelato S.", "HomeBaked", "Casero"],
            baseCost: 6.00
        },
        "libreria-utiles-minerva": {
            category: "Útiles de Escritorio", prefix: "LIB",
            items: ["Cuaderno Cuadriculado", "Caja Lapiceros x12", "Lápiz Grafito 2B x12", "Borrador de Leche x4", "Tijera Escolar 5''", "Goma en Barra 40g", "Silicona Líquida 250ml", "Regla de Plástico 30cm", "Caja Colores x24", "Plumones Escolares x12", "Resaltador Fluorescente", "Folder Manila A4 x25", "Papel Fotocopia Millar", "Corrector Líquido Tipo Lápiz", "Calculadora Científica", "Block Hojas Rayadas", "Cinta Scotch Transparente", "Engrapadora de Oficina", "Grapas Caja x5000", "Perforador 2 Huecos"],
            brands: ["Stanford", "Faber-Castell", "Artesco", "Pelikan", "Mundial", "Glis", "Uhu", "Baco", "Faber-Castell Art", "Layconsa", "Stabilo", "Minerva Pack", "Chamex", "Pentel", "Casio", "Atlas", "3M Scotch", "Rapid", "Artesco G", "Pilot"],
            baseCost: 8.00
        },
        "tecnologia-redes-norte": {
            category: "Conectividad y Redes", prefix: "NET",
            items: ["Router Wi-Fi 6", "Cable Red Cat6 305m", "Switch 8 Puertos Giga", "Access Point Exterior", "Conectores RJ45 Cat6 x100", "Tarjeta Red PCI-E Wi-Fi", "Patch Cord Cat6 2m", "Rack de Pared 6RU", "Pigtail Fibra Óptica", "Roseta Empotrar Red", "Crimpeadora Profesional", "Tester de Cable RJ45", "Inyector PoE 30W", "Antena Omnidireccional", "Módulo SFP Fibra Transceptor", "Roseta Superficie 2 tomas", "Pelador de Cable UTP", "Canaleta Plástica 20x10", "Grapas Pared Redondas x100", "Amarracables Nylon x100"],
            brands: ["TP-Link", "Nexxt Solutions", "D-Link", "Ubiquiti", "AMP", "Asus", "Steren", "Quest", "Furukawa", "Dixson", "Proskit", "Fluke", "MikroTik", "Tenda", "Cisco", "Linksys", "Truper", "Dexson", "Legrand", "Panduit"],
            baseCost: 110.00
        },
        "zapateria-real-calzado": {
            category: "Calzado Urbano", prefix: "ZAP",
            items: ["Zapatillas Cuero Hombre", "Botines Casual Mujer", "Mocasines Elegantes", "Sandalias Verano Playa", "Zapatos Escolares Cuero", "Zapatillas Running Sport", "Botas de Lluvia Impermeable", "Baletas Planas Mujer", "Zapatos de Vestir Caballero", "Zapatillas Urbanas Lona", "Ojotas Confort", "Plantillas Gel Descanso", "Crema Lustradora Calzado", "Calzador de Metal Largo", "Pasadores Redondos Pack", "Zapatos Seguridad Punta Acero", "Zapatillas Skate Unisex", "Sandalias Plataforma Cuero", "Botines Gamuza Confort", "Impermeabilizante Spray"],
            brands: ["Real Men", "Real Woman", "Guante", "Platanitos", "Pionier", "Walon", "Siete Vidas", "Bata", "Calimod", "Converse", "Croc", "Dr. Scholl", "Cherry", "ShoeAcc", "Generic", "Nazca", "Vans", "Vizzano", "Hush Puppies", "Tarrago"],
            baseCost: 80.00
        },
        "gimnasio-fitness-iron-body": {
            category: "Suplementos Nutricionales", prefix: "GIM",
            items: ["Proteína Whey 2lb", "Creatina Monohidratada 300g", "Pre-Entreno Energy", "Aminoácidos BCAA 2:1:1", "Quemador Grasa Cápsulas", "Colágeno Hidrolizado", "Ganador de Masa 5lb", "Shaker Mezclador Antiderrames", "Cinta Elástica Resistencia", "Fajas Deportiva Lumbar", "Multivitamínico Diario", "Barra Proteica Caja x12", "Magnesio Carbonato Bloque", "Guantes Gimnasio Neopreno", "Soga para Saltar Velocidad", "Muñequeras Fuerza Par", "Correas de Levantamiento Straps", "Glutamina Polvo 300g", "Isotónico Polvo Hidratación", "Rueda Abdominal Doble"],
            brands: ["Gold Standard", "Optimum Nutrition", "Psychotic", "Mutant", "Hydroxicut", "Lab Nutrition", "Serious Mass", "IronBody Gear", "Theraband", "Everlast", "Centrum", "Quest Bar", "Chalk", "Adidas", "Nike", "Under Armour", "Reebok", "Dymatize", "Gatorade", "BodyRipped"],
            baseCost: 60.00
        },
        "joyas-accesorios-splendor": {
            category: "Joyería en Plata", prefix: "JOY",
            items: ["Cadena Plata 925", "Anillo Solitario", "Aretes Topacio Plata", "Pulsera Dijes Ajustable", "Dije Cruz Tallada", "Anillo Compromiso Oro18k", "Gargantilla Minimalista", "Aretes Argollas Medianas", "Esclava Plata Hombre", "Dije Árbol de la Vida", "Pulsera Hilo Rojo Plata", "Joyero Viaje Terciopelo", "Líquido Limpiador Plata", "Paño Pulidor Microfibra", "Anillo Alianza Matrimonio", "Prendedor Saco Filigrana", "Gemelos Camisa Elegante", "Tobillera Verano Cascabel", "Aretes Perla Cultivada", "Dije Inicial Personalizada"],
            brands: ["Splendor Italian", "Splendor Design", "Splendor Jewels", "Splendor Line", "Artesanos Catacaos", "Splendor Gold", "Splendor Luxury", "Clásico", "Varonil", "Místico", "Amuleto", "Organizer", "SilverClean", "Shine Cloth", "Eternity", "Arte Tradición", "Executive", "Summer", "Natural Pearl", "CustomJewel"],
            baseCost: 65.00
        },
        "bodega-logistica-norte": {
            category: "Embalaje y Almacenamiento", prefix: "LOG",
            items: ["Caja Cartón Nro 4", "Rollo Film Estirable", "Cinta Embalaje Marrón Pack", "Dispensador Cinta Manual", "Bolsa Burbuja Rollo", "Esquineros Cartón x50", "Precintos Seguridad x100", "Bolsas Courier A4 x100", "Sacos Polipropileno x25", "Marcador Indeleble Grueso x4", "Etiquetas Autoadhesivas Rollo", "Cutter Retráctil Metal", "Grapas Industriales Caja", "Caja Cartón Archivo", "Cinta Masking Tape", "Zuncho Plástico Rollo", "Grapas Metal Zuncho x100", "Tenaza Tensora Zuncho", "Báscula Digital Maletas", "Pallet Madera Estándar"],
            brands: ["Trupal", "StretchPack", "Shurtape", "Tesa", "BubbleWrap", "LogiPack", "SecureTie", "CourierBag", "SacosNorte", "Faber-Castell", "Zebra", "Olfa", "Stanley", "Minerva", "3M", "ZunchoTech", "ZunchoTech", "Signode", "Camry", "EcoPallet"],
            baseCost: 15.00
        },
        "licoreria-minimarket-el-brindis": {
            category: "Licores y Bebidas Espirituosas", prefix: "LIC",
            items: ["Pisco Quebranta 750ml", "Six Pack Cerveza", "Whisky Red Label 750ml", "Vodka Absolute 750ml", "Ron Cartavio Solera", "Vino Tinto Malbec", "Ginebra Dry Gin", "Tónica Botella Pack", "Hielo Cubos Bolsa 3kg", "Tequila Reposado", "Espumante Demi Sec", "Fernet Aperitivo", "Licor de Crema", "Cigarrillos Cajetilla x20", "Pack Vasos Plásticos x50", "Saborizante Jarabe Goma", "Agua Mineral Con Gas 2L", "Ginger Ale Litro", "Bebida Energizante Lata", "Snack Papas Nativas"],
            brands: ["Cuatro Gallos", "Pilsen Callao", "Johnnie Walker", "Pernod Ricard", "Cartavio", "Tabernero", "Tanqueray", "Evervess", "Glacial", "Jose Cuervo", "Santiago Queirolo", "Branca", "Baileys", "Lucky Strike", "Reyma", "Caral", "San Mateo", "Schweppes", "Red Bull", "Inka Crops"],
            baseCost: 25.00
        }
    };

    // 4. Iterar sobre las empresas mapeando dinámicamente sus productos
    for (const company of companies) {
        const blueprint = blueprints[company.slug];

        if (!blueprint) {
            console.log(`⚠️ No se definió catálogo mock para la empresa con slug: ${company.slug}`);
            continue;
        }

        // Buscamos o creamos la categoría específica vinculada a la empresa actual
        let category = await prisma.category.findFirst({
            where: {
                name: blueprint.category,
                companyId: company.id
            }
        });

        if (!category) {
            category = await prisma.category.create({
                data: {
                    name: blueprint.category,
                    companyId: company.id
                }
            });
        }

        // Construimos exactamente 20 productos únicos estructurados según las columnas de la BD
        const productsData = [];
        for (let i = 0; i < 20; i++) {
            const productName = `${blueprint.items[i]} ${blueprint.brands[i]}`;
            const skuNumber = String(i + 1).padStart(2, "0");

            // Lógica de Precios y Costos alineada con tus campos NUMERIC(10, 2)
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
                maxStock: finalMaxStock, // 'stock' removido por completo
                companyId: company.id,
                categoryId: category.id,
                unitId: unit.id
            });
        }

        // Inserción masiva ignorando duplicaciones accidentales
        await prisma.product.createMany({
            data: productsData,
            skipDuplicates: true
        });

        console.log(`🛒 20 productos asignados a: ${company.name} [Categoría: ${blueprint.category}]`);
    }

    console.log("\n====================================");
    console.log("⭐ PROCESO COMPLETADO EXITOSAMENTE");
    console.log("====================================\n");
}

module.exports = {
    productSeed
};