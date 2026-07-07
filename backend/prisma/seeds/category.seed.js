// ========================================
// prisma/seeds/category.seed.js
// ========================================

const prisma = require("../client");

async function categorySeed() {
    console.log("🌱 Iniciando súper-siembra jerárquica masiva de Categorías para 20 Sectores...");

    // 1. Obtener todas las empresas registradas
    const companies = await prisma.company.findMany();

    if (!companies || companies.length === 0) {
        throw new Error("❌ Error: No existe ninguna empresa en la base de datos. Ejecuta admin.seed primero.");
    }

    console.log(`🏢 Se encontraron ${companies.length} empresas. Procesando big data estructural...`);

    let totalCategories = 0;
    let totalSubCategories = 0;

    for (const company of companies) {
        const companyKey = (company.slug || company.name || "").toLowerCase();
        let sectorSchema = [];

        // =========================================================================
        // SÚPER MAPEO DETALLADO DE LOS 20 SECTORES COMERCIALES
        // =========================================================================

        if (companyKey.includes("minimarket") || companyKey.includes("bodega") || companyKey.includes("market")) {
            // 🛒 1. MINIMARKET / SUPERMERCADO
            sectorSchema = [
                { parent: { name: "Abarrotes y Despensa", description: "Insumos secos y provisiones básicas" }, subs: ["Arroz y Legumbres", "Azúcar y Endulzantes", "Fideos y Pastas", "Aceites Comestibles", "Harinas y Polvos", "Sal y Especias"] },
                { parent: { name: "Bebidas y Líquidos", description: "Líquidos refrescantes con o sin gas" }, subs: ["Gaseosas", "Aguas Puras", "Jugos y Néctares", "Bebidas Energizantes", "Isotónicos", "Tés Líquidos"] },
                { parent: { name: "Lácteos y Huevos", description: "Leches y derivados pasteurizados" }, subs: ["Leche Líquida", "Yogures", "Mantequillas", "Quesos Frescos", "Quesos Madurados", "Huevos de Gallina"] },
                { parent: { name: "Limpieza del Hogar", description: "Desinfección y aseo de interiores" }, subs: ["Detergentes Ropa", "Lavavajillas", "Limpia pisos", "Cloro y Desinfectantes", "Suavizantes", "Esponjas y Paños"] },
                { parent: { name: "Snacks y Golosinas", description: "Piqueos rápidos y dulces" }, subs: ["Papas Fritas", "Piqueos Salados", "Galletas Dulces", "Galletas Saladas", "Chocolates", "Caramelos y Gomas"] },
                { parent: { name: "Cuidado Personal Básicos", description: "Higiene personal diaria" }, subs: ["Jabones Barras", "Shampoo", "Crema Dental", "Desodorantes", "Papel Higiénico", "Toallitas Húmedas"] }
            ];
        } else if (companyKey.includes("pharmacy") || companyKey.includes("farmacia") || companyKey.includes("botica")) {
            // 💊 2. FARMACIA / BOTICA
            sectorSchema = [
                { parent: { name: "Medicamentos de Venta Libre", description: "Fármacos OTC" }, subs: ["Analgésicos", "Antiinflamatorios", "Antigripales", "Salud Estomacal", "Antihistamínicos", "Antitusígenos"] },
                { parent: { name: "Medicamentos Especializados", description: "Fármacos bajo prescripción médica" }, subs: ["Antibióticos", "Antihipertensivos", "Antidiabéticos", "Corticoides", "Anticoagulantes", "Inmunológicos"] },
                { parent: { name: "Cuidado de la Piel (Dermocosmética)", description: "Tratamientos dermatológicos" }, subs: ["Fotoprotección", "Hidratantes Faciales", "Limpiadores", "Anti-edad", "Cuidado Corporal", "Tratamiento Acné"] },
                { parent: { name: "Mamá y Bebé", description: "Nutrición e higiene infantil" }, subs: ["Pañales Etapas", "Fórmulas Infantiles", "Toallitas Bebé", "Biberones y Chupones", "Cremas Escaldaduras", "Shampoo Bebé"] },
                { parent: { name: "Vitaminas y Suplementos", description: "Nutrición complementaria" }, subs: ["Multivitamínicos", "Vitamina C", "Calcio y Magnesio", "Suplementos Adultos", "Colágeno Hidrolizado", "Omega 3"] },
                { parent: { name: "Dispositivos Médicos y Botiquín", description: "Instrumentos de medición y primeros auxilios" }, subs: ["Tensiómetros", "Glucómetros", "Termómetros", "Gasas y Vendas", "Alcohol Quirúrgico", "Mascarillas"] }
            ];
        } else if (companyKey.includes("restaurant") || companyKey.includes("restaurante") || companyKey.includes("gastronomia")) {
            // 🍽️ 3. RESTAURANTE / GASTRONOMÍA
            sectorSchema = [
                { parent: { name: "Entradas y Entremeses", description: "Platos para comenzar la experiencia" }, subs: ["Sopas y Cremas", "Ensaladas Frescas", "Piqueos Calientes", "Ceviches", "Antojos Tradicionales", "Panes de la Casa"] },
                { parent: { name: "Platos de Fondo Pollo y Carnes", description: "Especialidades de proteínas" }, subs: ["Carnes a la Parrilla", "Cortes Premium", "Pollo a la Brasa", "Guisos Tradicionales", "Saltados", "Aves Especiales"] },
                { parent: { name: "Platos Marinos y Pastas", description: "Pesca del día e Italia clásica" }, subs: ["Pescados Fritos", "Mariscos al Wok", "Pastas Largas", "Pastas Rellenas", "Lasagnas", "Arroces Marinos"] },
                { parent: { name: "Guarniciones y Extras", description: "Acompañamientos extras para el plato" }, subs: ["Papas Fritas Receta", "Arroz Blanco", "Purés", "Vegetales Salteados", "Camotes Fritos", "Salsas Extras"] },
                { parent: { name: "Postres y Dulces Finos", description: "Cierre dulce de la comida" }, subs: ["Tortas del Día", "Helados Artesanales", "Postres de Cuchara", "Flanes y Budines", "Pancakes", "Frutas Estación"] },
                { parent: { name: "Bebidas de la Casa y Bar", description: "Refrescos y licores preparados" }, subs: ["Refrescos Naturales", "Gaseosas Línea", "Cervezas Nacionales", "Cervezas Artesanales", "Cocteles Clásicos", "Vinos por Copa"] }
            ];
        } else if (companyKey.includes("veterinary") || companyKey.includes("veterinaria") || companyKey.includes("petshop")) {
            // 🐾 4. VETERINARIA / PET SHOP
            sectorSchema = [
                { parent: { name: "Alimentos Perros", description: "Nutrición seca y húmeda canina" }, subs: ["Cachorros Seco", "Adultos Razas Pequeñas", "Adultos Razas Grandes", "Senior", "Comida Húmeda Latas", "Alimento Medicado"] },
                { parent: { name: "Alimentos Gatos", description: "Nutrición felina especializada" }, subs: ["Gatitos Seco", "Adultos Control Bolas", "Gatos Esterilizados", "Senior Felino", "Sachets Húmedos", "Dietas Veterinarias"] },
                { parent: { name: "Farmacia Veterinaria", description: "Fármacos de prescripción animal" }, subs: ["Antiparasitarios Internos", "Pipetas Antipulgas", "Antibióticos Vet", "Antiinflamatorios Mascotas", "Suplementos Pelaje", "Gotas Oticas"] },
                { parent: { name: "Estética y Cuidado", description: "Productos de aseo e higiene animal" }, subs: ["Shampoo Mascotas", "Acondicionadores", "Colonias Caninas", "Corte de Uñas Herramientas", "Limpia Orejas", "Arenas Sanitarias Gatos"] },
                { parent: { name: "Juguetes y Entretenimiento", description: "Accesorios interactivos de recreación" }, subs: ["Pelotas de Goma", "Mordedores Soga", "Rascadores Gatos", "Plumas Interactivas", "Juguetes Inteligencia", "Discos Voladores"] },
                { parent: { name: "Accesorios de Paseo y Hogar", description: "Indumentaria y logística para mascotas" }, subs: ["Collares Regulables", "Correas Extensibles", "Arneses Ergonómicos", "Camas Acolchadas", "Platos Comederos", "Transportadores Viaje"] }
            ];
        } else if (companyKey.includes("technology") || companyKey.includes("tecnologia") || companyKey.includes("computo")) {
            // 💻 5. TECNOLOGÍA / COMPUTACIÓN
            sectorSchema = [
                { parent: { name: "Componentes de Hardware", description: "Partes internas para ensamble de PC" }, subs: ["Procesadores", "Tarjetas de Video", "Memorias RAM", "Placas Madre", "Discos Sólidos SSD", "Fuentes de Poder"] },
                { parent: { name: "Periféricos e Input", description: "Accesorios externos de interacción" }, subs: ["Teclados Mecánicos", "Mouses Gamers", "Auriculares con Micro", "Monitores Gamer", "Cámaras Web", "Mousepads Extendidos"] },
                { parent: { name: "Laptops y Ordenadores", description: "Equipos de cómputo completos" }, subs: ["Laptops Oficina", "Laptops Gaming", "Computadoras Desktop", "All in One", "Mini PCs", "Tablets"] },
                { parent: { name: "Redes y Conectividad", description: "Equipos de transmisión de datos" }, subs: ["Routers Wi-Fi", "Switches Red", "Cables de Red Cat6", "Adaptadores Bluetooth", "Repetidores Señal", "Tarjetas de Red PCIe"] },
                { parent: { name: "Impresión y Suministros", description: "Equipos de impresión e insumos" }, subs: ["Impresoras Inyección", "Impresoras Láser", "Cartuchos de Tinta", "Tóners Originales", "Papel Fotográfico", "Repuestos Cabezal"] },
                { parent: { name: "Almacenamiento Externo", description: "Dispositivos de respaldo portátiles" }, subs: ["Discos Duros Externos", "Memorias USB", "Tarjetas MicroSD", "Cofres Enclosure", "Almacenamiento NAS", "Sólidos Portátiles"] }
            ];
        } else if (companyKey.includes("bookstore") || companyKey.includes("libreria") || companyKey.includes("papeleria")) {
            // 📚 6. LIBRERÍA / PAPELERÍA
            sectorSchema = [
                { parent: { name: "Útiles Escolares Básicos", description: "Elementos de uso diario en colegios" }, subs: ["Cuadernos Escolares", "Lápices de Colores", "Lapiceros Tinta", "Plumones Escolares", "Reglas y Escuadras", "Borradores y Correctores"] },
                { parent: { name: "Papelería y Resmas", description: "Formatos de papel para impresión y dibujo" }, subs: ["Resmas Papel A4", "Papel Oficio", "Cartulinas Escolares", "Papel Bond Colores", "Block de Notas", "Papel Canson Dibujo"] },
                { parent: { name: "Oficina y Archivo", description: "Logística y organización de documentos" }, subs: ["Archivadores Palanca", "Fólderes Plásticos", "Engrapadoras", "Perforadoras", "Clips y Chinches", "Notas Adhesivas Post-it"] },
                { parent: { name: "Arte y Manualidades", description: "Insumos artísticos profesionales y escolares" }, subs: ["Pinturas Acrílicas", "Óleos Profesionales", "Pinceles Variados", "Lienzos para Pintar", "Plastilinas", "Silicona Líquida"] },
                { parent: { name: "Libros y Literatura", description: "Lecturas de entretenimiento y consulta" }, subs: ["Literatura Juvenil", "Novelas Ficción", "Libros Autoayuda", "Cuentos Infantiles", "Diccionarios", "Enciclopedias Guía"] },
                { parent: { name: "Regalos y Embalaje", description: "Materiales de presentación" }, subs: ["Papel de Regalo", "Bolsas de Regalo", "Cintas Adhesivas", "Cinta de Embalaje", "Pegamento en Barra", "Tijeras y Cúters"] }
            ];
        } else if (companyKey.includes("gym") || companyKey.includes("gimnasio") || companyKey.includes("fitness")) {
            // 🏋️‍♂️ 7. GIMNASIO / FITNESS
            sectorSchema = [
                { parent: { name: "Membresías del Club", description: "Planes de acceso a las instalaciones" }, subs: ["Pase Diario", "Plan Mensual Estándar", "Plan Trimestral", "Plan Semestral VIP", "Plan Anual Black", "Membresía Corporativa"] },
                { parent: { name: "Servicios Personalizados", description: "Asesorías individuales uno a uno" }, subs: ["Entrenamiento Personal", "Asesoría Nutricional", "Fisioterapia Deportiva", "Evaluación Antropométrica", "Clases Particulares Box", "Planes de Coaching Online"] },
                { parent: { name: "Suplementación Deportiva", description: "Insumos nutricionales para el rendimiento" }, subs: ["Proteína de Suero Whey", "Creatina Monohidratada", "Aminoácidos BCAA", "Pre-Entrenamientos", "Quemadores de Grasa", "Ganadores de Peso"] },
                { parent: { name: "Bebidas e Hidratación", description: "Líquidos para consumo intra-entreno" }, subs: ["Agua Mineral Embocada", "Bebidas Isotónicas", "Energizantes Cero Azúcar", "Shakes Proteicos Listos", "Aminoácidos Listos", "Agua con Electrólitos"] },
                { parent: { name: "Snacks Fitness", description: "Barras alimenticias saludables" }, subs: ["Barras de Proteína", "Barras Energéticas Avena", "Galletas de Arroz", "Mantequilla de Maní Single", "Frutos Secos Mix", "Beef Jerky Proteico"] },
                { parent: { name: "Accesorios Deportivos", description: "Implementos personales de entrenamiento" }, subs: ["Shakers Mezcladores", "Guantes de Gimnasio", "Correas de Levantamiento Straps", "Toallas de Microfibra", "Fajas Lumbares", "Bandas de Resistencia"] }
            ];
        } else if (companyKey.includes("jewelry") || companyKey.includes("joyeria") || companyKey.includes("relojeria")) {
            // 💎 8. JOYERÍA / ACCESORIOS
            sectorSchema = [
                { parent: { name: "Joyas en Oro 18K", description: "Piezas de alta gama de oro legítimo" }, subs: ["Anillos de Compromiso Oro", "Argollas de Matrimonio", "Cadenas Eslabón Oro", "Dijes Finos", "Aretes de Oro", "Pulseras Macizas Oro"] },
                { parent: { name: "Joyas en Plata 925", description: "Piezas contemporáneas de plata esterlina" }, subs: ["Anillos de Plata", "Cadenas de Plata", "Pulseras de Dijes dijes", "Aretes de Plata", "Esclavas de Plata", "Tobilleras Plata"] },
                { parent: { name: "Relojería Fina", description: "Maquinarias analógicas y cronógrafos" }, subs: ["Relojes Automáticos", "Relojes Cuarzo", "Cronógrafos Deportivos", "Relojes Elegantes Vestir", "Smartwatches Premium", "Correas Repuesto Reloj"] },
                { parent: { name: "Piedras Preciosas sueltas", description: "Gemas certificadas de alta joyería" }, subs: ["Diamantes Certificados", "Esmeraldas", "Rubíes", "Zafiros Azules", "Circones Premium", "Perlas Cultivadas"] },
                { parent: { name: "Cuidado y Mantenimiento Joyas", description: "Insumos para limpieza profunda de metales" }, subs: ["Líquido Limpiador Plata", "Paños Microfibra Pulido", "Líquido Limpiador Oro", "Estuches Herméticos", "Exhibidores Almohadilla", "Kits de Limpieza Relojes"] },
                { parent: { name: "Empaques y Regalo Premium", description: "Presentación elegante para obsequios" }, subs: ["Cajas de Anillo Terciopelo", "Estuches de Collar Largos", "Bolsas de satén", "Tarjetas de Dedicatoria Oro", "Bolsas de Lujo de la Marca", "Cajas de Reloj Cuero"] }
            ];
        } else if (companyKey.includes("construction") || companyKey.includes("constructora") || companyKey.includes("obras")) {
            // 🏗️ 9. CONSTRUCCIÓN / OBRAS
            sectorSchema = [
                { parent: { name: "Materiales de Obra Gruesa", description: "Estructuras y aglomerantes base" }, subs: ["Cemento Gris Bolsas", "Fierro Corrugado Varillas", "Ladrillos de Techo", "Ladrillos de Pared", "Cal Hidratada", "Alambre Negro Recocido"] },
                { parent: { name: "Acabados y Revestimientos", description: "Estética y protección de superficies" }, subs: ["Porcelanatos Pisos", "Cerámicos Pared", "Pegamento para Cerámicos", "Fraguas Colores", "Pisos Laminados", "Zócalos PVC"] },
                { parent: { name: "Pinturas y Impermeabilizantes", description: "Recubrimientos químicos e hidro-protectores" }, subs: ["Pintura Látex Interiores", "Pintura Látex Exteriores", "Esmaltes Sintéticos", "Thinner Solvente", "Impermeabilizantes Techo", "Selladores de Pared"] },
                { parent: { name: "Tuberías e Hidráulica", description: "Redes de fluidos desague y agua caliente" }, subs: ["Tubos de Agua PVC", "Tubos de Desagüe", "Conexiones PVC Codos", "Pegamento PVC Tubos", "Válvulas de Esfera", "Tubos CPVC Agua Caliente"] },
                { parent: { name: "Drywall y Cielos Rasos", description: "Sistemas constructivos en seco" }, subs: ["Planchas de Yeso Estándar", "Planchas Drywall RH resistentes", "Parantes de Fierro", "Rieles Galvanizados", "Tornillos Drywall Wafer", "Cinta de Papel Juntas"] },
                { parent: { name: "Seguridad Industrial EPP", description: "Protección personal de obreros" }, subs: ["Cascos de Obra", "Botas de Seguridad Punta Acero", "Guantes de Cuero Badana", "Lentes de Seguridad", "Arneses Anti-caídas", "Chalecos Reflectivos"] }
            ];
        } else if (companyKey.includes("logistics") || companyKey.includes("logistica") || companyKey.includes("transporte")) {
            // 📦 10. LOGÍSTICA / TRANSPORTE
            sectorSchema = [
                { parent: { name: "Embalaje Industrial Almacén", description: "Protección de mercancías en tarimas" }, subs: ["Film Stretch Transparente", "Film Stretch Negro", "Cinta de Embalaje Tan", "Dispensadores de Cinta", "Zunchos Plásticos", "Grapas Metálicas Zuncho"] },
                { parent: { name: "Cajas y Contenedores Envío", description: "Estructuras de cartón corrugado" }, subs: ["Cajas de Envío Pequeñas", "Cajas Medianas Mudanza", "Cajas Grandes Corrugado Master", "Sobres de Burbuja Courier", "Cajas Auto-armables", "Cajas de Archivo Pasado"] },
                { parent: { name: "Seguridad y Sellos de Control", description: "Precintos inviolables para transportes" }, subs: ["Precintos de Plástico Numerados", "Precintos de Clavo Contenedor", "Precintos Metálicos Cable", "Etiquetas Frágil Adhesivas", "Etiquetas de Código de Barras", "Cinta de Seguridad Inviolable"] },
                { parent: { name: "Insumos Flota Transporte", description: "Mantenimiento logístico vehicular pesado" }, subs: ["Aceite de Motor Diésel", "Líquido de Frenos Heavy Duty", "Refrigerante de Motor Rojo", "Grasa para Chasis Chasis", "Aditivos de Combustible Diésel", "Filtros de Aire Camión"] },
                { parent: { name: "Servicios Courier Nacional", description: "Tarifas de distribución express" }, subs: ["Envío Local Provincia Documentos", "Envío Nacional Paquetes Pequeños", "Flete de Carga Consolidada LCL", "Servicio Contraentrega Express", "Retorno de Cargo Firmado", "Recojo a Domicilio Almacén"] },
                { parent: { name: "Etiquetado e Identificación", description: "Identificadores físicos de inventario" }, subs: ["Rollos Térmicos Puntos Venta", "Etiquetas Térmicas Directas", "Ribbons Cera Impresoras", "Etiquetas de Pallet Grandes", "Marcadores Permanentes Industriales", "Porta Guías Plásticos"] }
            ];
        } else if (companyKey.includes("hardware") || companyKey.includes("ferreteria")) {
            // 🔧 11. FERRETERÍA
            sectorSchema = [
                { parent: { name: "Fijaciones y Tornillería", description: "Elementos de unión roscados" }, subs: ["Tornillos Madera Zinc", "Tornillos Autoperforantes Metal", "Pernos Hexagonales Grado 5", "Tuercas y Arandelas", "Tarugos de Plástico Gris", "Clavos de Acero Cemento"] },
                { parent: { name: "Herramientas de Corte Mano", description: "Instrumentos cortantes mecánicos" }, subs: ["Discos de Corte Metal", "Discos de Diamante Concreto", "Hojas de Sierra Manual", "Cúters Profesionales Metal", "Brocas de Acero Rápido", "Brocas de Concreto Widia"] },
                { parent: { name: "Abrasivos y Lijado", description: "Elementos de pulido y desbaste" }, subs: ["Lijas de Agua Fierro", "Lijas de Madera Hojas", "Discos Flap de Pulido", "Ruedas de Esmeril Banco", "Pasta de Pulir Metales", "Cepillos de Alambre Fierro"] },
                { parent: { name: "Cerrajería y Seguridad Puertas", description: "Mecanismos de bloqueo de accesos" }, subs: ["Candados de Latón Macizo", "Cerraduras de Embutir Puertas", "Chapas de Pomo Dormitorio", "Bisagras de Acero Pulido", "Cerrojos de Seguridad Maletero", "Llaves Virgenes Repuesto"] },
                { parent: { name: "Adhesivos y Siliconas Sellado", description: "Químicos pegamentados estructurales" }, subs: ["Silicona Transparente Tubos", "Silicona Negra Alta Temp", "Pegamento Instantáneo Gotita", "Pegamento Epóxico Acero Plast", "Espuma de Poliuretano Expansiva", "Cinta Téflon Sellado Gasfitería"] },
                { parent: { name: "Cables y Cadenas Tracción", description: "Líneas de suspensión y amarre pesados" }, subs: ["Cadenas de Acero Eslabón", "Cable de Acero Galvanizado", "Sujeta Cables Grampas", "Tensores de Ojo y Gancho", "Sogas de Nylon Trenzado", "Mosquetones de Seguridad Acero"] }
            ];
        } else if (companyKey.includes("clothing") || companyKey.includes("textil") || companyKey.includes("moda") || companyKey.includes("boutique")) {
            // 👕 12. TEXTIL / BOUTIQUE / MODA
            sectorSchema = [
                { parent: { name: "Prendas Superiores Hombre", description: "Ropa masculina de torso superior" }, subs: ["Polos Algodón Básicos", "Camisas de Vestir Manga Larga", "Camisas Casuales Cortas", "Casacas de Cuero Sintético", "Poleras con Capucha Hoodies", "Suéteres de Tejido Punto"] },
                { parent: { name: "Prendas Inferiores Hombre", description: "Ropa masculina de torso inferior" }, subs: ["Pantalones Jean Denim", "Pantalones Dril Casuales", "Pantalones de Vestir Sastre", "Shorts Playeros Verano", "Bermudas Cargo Bolsillos", "Pantalones Joggers Deportivos"] },
                { parent: { name: "Prendas Superiores Mujer", description: "Ropa femenina de torso superior" }, subs: ["Blusas de Seda Casuales", "Tops Cortos Crop Tops", "Polos Estampados Moda", "Cardigans Largos Invierno", "Sacos de Sastre Dama", "Casacas Denim Mujer"] },
                { parent: { name: "Prendas Inferiores Mujer", description: "Ropa femenina de torso inferior" }, subs: ["Jeans Skinny Tiro Alto", "Pantalones Palazzo Sueltos", "Faldas Cortas Mezclilla", "Faldas Largas Estampadas", "Leggings Deportivas Lycra", "Shorts de Jean Deshilachado"] },
                { parent: { name: "Vestidos y Enterizos Dama", description: "Piezas enteras de moda femenina" }, subs: ["Vestidos de Gala Noche", "Vestidos Playeros Flores", "Vestidos Casuales Cortos", "Enterizos Largos Elegantes", "Enterizos Cortos Juveniles", "Monos de Algodón Homewear"] },
                { parent: { name: "Accesorios de Moda Complementos", description: "Adornos y funcionales textiles" }, subs: ["Correas de Cuero legítimo", "Bufandas de Lana Tejida", "Gorras de Visera Curva", "Sombreros de Paja Verano", "Medias Largas Pack 3", "Pañuelos de Seda Estampados"] }
            ];
        } else if (companyKey.includes("automotive") || companyKey.includes("automotriz") || companyKey.includes("taller")) {
            // 🚗 13. AUTOMOTRIZ / TALLER
            sectorSchema = [
                { parent: { name: "Sistema de Frenos Seguridad", description: "Componentes del frenado vehicular" }, subs: ["Pastillas de Freno Delanteras", "Pastillas de Freno Traseras", "Discos de Freno Ventilados", "Tambores de Freno Traseros", "Zapatas de Freno Rectificadas", "Sensores de Desgaste Pastilla"] },
                { parent: { name: "Filtros Automotrices Insumos", description: "Retenedores de impurezas del motor" }, subs: ["Filtros de Aceite Motor", "Filtros de Aire Motor", "Filtros de Combustible Gasolina", "Filtros de Aire Acondicionado Cabina", "Filtros de Caja Automática", "Filtros de Trampa Diésel"] },
                { parent: { name: "Sistema Eléctrico e Iluminación", description: "Encendido y señalización luminosa" }, subs: ["Baterías Libres Mantenimiento", "Bujías de Iridio Encendido", "Bujías de Níquel Estándar", "Focos Halógenos H7 H4", "Focos LED Alta Potencia", "Fusibles Automotrices Amperajes"] },
                { parent: { name: "Suspensión y Dirección Vehículo", description: "Estabilidad de marcha y giros amortiguados" }, subs: ["Amortiguadores Delanteros Gas", "Amortiguadores Traseros Hidráulicos", "Pastillas o Terminales de Dirección", "Rotulas de Suspensión Eje", "Bujes de Trapecio Caucho", "Bielas de Barra Estabilizadora"] },
                { parent: { name: "Fluidos y Químicos de Limpieza", description: "Líquidos operativos y limpieza estética" }, subs: ["Aceite Motor 10W40 Semisintético", "Aceite Motor 5W30 Sintético Puro", "Líquido Limpiaparabrisas Concentrado", "Limpia Carburadores Spray Inyectores", "Aflojatodo Silicona WD40", "Limpia Contactos Electrónicos QD"] },
                { parent: { name: "Accesorios y Embellecimiento Auto", description: "Línea estética para el conductor" }, subs: ["Plumillas Limpiaparabrisas Goma", "Silicona en Crema Tableros", "Ambientadores de Auto Colgantes", "Fundas de Asiento Tela Cuero", "Pisos de Jebe Universales Maletera", "Cera Pulidora de Carrocería Alta"] }
            ];
        } else if (companyKey.includes("bakery") || companyKey.includes("pasteleria") || companyKey.includes("panaderia")) {
            // 🍰 14. PANADERÍA / PASTELERÍA
            sectorSchema = [
                { parent: { name: "Panes Artesanales Tradicionales", description: "Masas horneadas diarias crujientes" }, subs: ["Pan Francés Crujiente", "Pan Baguette Clásico Grande", "Pan de Molde Integral Blanco", "Pan Ciabatta Olivo", "Pan de Yema Suave", "Pan con Queso Horneado"] },
                { parent: { name: "Bollería y Masas Dulces", description: "Facturas y hojaldres azucarados horneados" }, subs: ["Croissants de Mantequilla", "Facturas de Crema Pastelera", "Donas Glaseadas Chocolate", "Cachitos de Manjar Blanco", "Enrollados de Canela Cinnamon", "Muffins con Chispas Arándano"] },
                { parent: { name: "Pastelería Fina y Tortas", description: "Pasteles estructurados para celebraciones" }, subs: ["Torta Tres Leches Vainilla", "Torta Helada Tradicional", "Selva Negra Chocolate Intenso", "Cheesecake de Fresa Frutos", "Pie de Limón Merengue", "Chiffón de Naranja Esponjoso"] },
                { parent: { name: "Bocaditos Eventos Reuniones", description: "Miniaturas de sabor para catering rápidos" }, subs: ["Mini Empanadas de Carne Fritas", "Tequeños con Queso Crema", "Alfajorcitos de Maicena Caja", "Mini Pizzas Mozzarella", "Piononos Chicos Cortados", "Bolitas de Carne Cóctel"] },
                { parent: { name: "Insumos Repostería Mayorista", description: "Materia prima fina para decoración interna" }, subs: ["Harina de Trigo Especial", "Crema de Leche Batir Chantilly", "Manjar Blanco Repostero Balde", "Fudge de Chocolate Espeso", "Esencia de Vainilla Botella", "Lluvia de Caramelo Colores"] },
                { parent: { name: "Bebidas Cafetería Acompañante", description: "Bebidas calientes y frías de barra" }, subs: ["Café Espresso Americano Caliente", "Café Cappuccino Espumoso", "Chocolate Caliente Tradición", "Infusiones Variadas Tazas", "Jugos de Fruta Licuados", "Café Helado Iced Latte"] }
            ];
        } else if (companyKey.includes("optics") || companyKey.includes("optica") || companyKey.includes("visual")) {
            // 👓 15. ÓPTICA
            sectorSchema = [
                { parent: { name: "Monturas Oftálmicas Adulto", description: "Marcos estructurales de lunas correctivas" }, subs: ["Monturas de Acetato Gruesas", "Monturas de Titanio Ligeras", "Monturas Al Aire Tres Piezas", "Monturas Metálicas Aviador", "Monturas Flexibles Deportivas", "Marcos Semi-Al Aire Hilo"] },
                { parent: { name: "Monturas Escolares Infantiles", description: "Estructuras anticaídas para niños y niñas" }, subs: ["Monturas de Silicona Flexibles", "Marcos con Liga Sujeción", "Monturas Resistencia Reson", "Gafas Infantiles Redondas", "Monturas Infantiles Personajes", "Lentes de Lectura Escolares"] },
                { parent: { name: "Lentes de Sol Gafas", description: "Protección ocular contra rayos solares UV" }, subs: ["Gafas de Sol Polarizadas", "Lentes Deportivos Ciclismo", "Gafas de Sol Moda Aviador", "Lentes de Sol Espejados", "Lentes de Sol Dama Cat-Eye", "Gafas de Sol Filtro UV400"] },
                { parent: { name: "Lentes de Contacto Correctivos", description: "Lentillas ópticas de contacto corneal" }, subs: ["Lentes de Contacto Mensuales", "Lentillas Diarias Desechables", "Lentes de Contacto Cosméticos Color", "Lentillas Tóricos Astigmatismo", "Lentillas Multifocales Presbicia", "Soluciones de Limpieza Líquido"] },
                { parent: { name: "Lunas y Cristales Tratamientos", description: "Tecnología de graduación superficial cristales" }, subs: ["Lunas Anti-Reflejo Estándar", "Cristales Filtro Luz Azul Blue", "Lunas Fotocromáticas Transition", "Cristales Resina Alto Índice", "Lunas Policarbonato Anti-Impacto", "Cristales Bifocales Clásicos"] },
                { parent: { name: "Accesorios Ópticos Limpieza", description: "Elementos de protección y limpieza individual" }, subs: ["Líquido Limpiador de Lunas Spray", "Paños de Microfibra Antiestáticos", "Estuches Rígidos de Montura", "Cordones de Sujeción Cuello", "Destornilladores Llavero Ópticos", "Plaquetas de Silicona Repuesto"] }
            ];
        } else if (companyKey.includes("liquor") || companyKey.includes("licoreria") || companyKey.includes("bar")) {
            // 🍾 16. LICORERÍA / DESTILADOS
            sectorSchema = [
                { parent: { name: "Licores Destilados Blancos", description: "Bebidas alcohólicas claras de alta graduación" }, subs: ["Pisco Quebranta Tradicional", "Pisco Acholado Botellas", "Vodka Importado Premium", "Ginebra London Dry Gin", "Tequila Reposado Mexicano", "Ron Blanco Coctelero"] },
                { parent: { name: "Whisky y Destilados Oscuros", description: "Bebidas espirituosas añejadas en barricas" }, subs: ["Whisky Escocés Blended 12 Años", "Whisky Single Malt Premium", "Bourbon Americano Maíz", "Ron Añejo Oscuro Gran Reserva", "Brandy Tradicional Copas", "Cognac Francés Fino XO"] },
                { parent: { name: "Vinos Tintos y Blancos", description: "Calidad vitivinícola embotellada de cepas" }, subs: ["Vino Tinto Malbec Argentino", "Vino Tinto Cabernet Sauvignon", "Vino Blanco Chardonnay Seco", "Vino Blanco Sauvignon Blanc", "Vino Rosado Semi Seco Dulce", "Vinos Espumantes Champaña Cava"] },
                { parent: { name: "Cervezas Nacionales e Importadas", description: "Bebidas fermentadas a base de lúpulo malta" }, subs: ["Cerveza Lager Rubia Pack 12", "Cerveza Negra Stout Botella", "Cerveza Artesanal IPA Amarga", "Cerveza Artesanal Trigo Red", "Cerveza Importada Premium Lata", "Cervezas Sin Alcohol Cero"] },
                { parent: { name: "Licores Dulces y Aperitivos", description: "Cremas espirituosas y acompañantes bajativos" }, subs: ["Crema de Whisky Irlandesa", "Licor de Café Espeso", "Anís Dulce Digestivo", "Aperitivos Amargos Vermouth", "Crema de Menta Licores", "Licor de Naranja Triple Sec"] },
                { parent: { name: "Complementos de Barra Hielo", description: "Agregados indispensables para coctelera mesa" }, subs: ["Bolsa de Hielo en Cubos Rolito", "Agua Tónica Mezcladora Latas", "Gaseosa Ginger Ale Botellita", "Jarabe de Goma Coctelero Sweet", "Jugo de Limón Envasado Botella", "Cerezas en Almíbar Frasco Marrasquino"] }
            ];
        } else if (companyKey.includes("agriculture") || companyKey.includes("agro") || companyKey.includes("agricola")) {
            // 🌾 17. AGRÍCOLA / AGROPECUARIO
            sectorSchema = [
                { parent: { name: "Semillas Cultivos Certificadas", description: "Granos listos para siembra de alta germinación" }, subs: ["Semillas de Hortalizas Variadas", "Semillas de Maíz Híbrido", "Semillas de Papa Seleccionada", "Semillas de Frutales Injertos", "Granos de Trigo Siembra", "Semillas de Forrajes Pastos"] },
                { parent: { name: "Fertilizantes Macronutrientes Base", description: "Abonos químicos para desarrollo vegetativo masivo" }, subs: ["Urea Granulada 46 porc", "Fosfato Diamónico Sacos", "Cloruro de Potasio Agrícola", "Nitrato de Amonio Bolsas", "Fertilizantes Foliares Líquidos", "Abonos Orgánicos Compost Compost"] },
                { parent: { name: "Defensa Sanitaria Fitosanitarios", description: "Químicos de control de plagas malezas" }, subs: ["Insecticidas Control Pulgón", "Fungicidas Control Hongos", "Herbicidas Control Malezas", "Acaricidas Huertos Frutas", "Nematicidas Suelos Cultivo", "Adyuvantes Pegantes Agrícolas"] },
                { parent: { name: "Herramientas Riego Tecnificado", description: "Componentes plásticos de microaspersión goteo" }, subs: ["Cintas de Goteo Rollos", "Mangueras de Riego Polietileno", "Aspersores de Impacto Bronce", "Goteros Autocompensados Línea", "Filtros de Anillas Riego", "Conexiones Rápidas T-Codos"] },
                { parent: { name: "Herramientas de Labranza Manual", description: "Instrumentos mecánicos de mano de campo" }, subs: ["Palas de Punta Recta", "Picos de Acero Forjado", "Machetes de Acero Cortante", "Rastrillos de Metal Limpieza", "Tijeras de Podar Ramas Gruesas", "Carretillas de Obra Reforzadas"] },
                { parent: { name: "Equipos de Pulverización Sanitaria", description: "Maquinarias portátiles de aspersión líquida" }, subs: ["Mochilas de Fumigar Manuales", "Fumigadoras a Motor Gasolina", "Boquillas de Aspersión Cono", "Mangueras de Alta Presión Fumigación", "Lanzas de Latón Extensibles", "Kits de Repuestos Empaquetaduras"] }
            ];
        } else if (companyKey.includes("beauty") || companyKey.includes("salon") || companyKey.includes("estetica") || companyKey.includes("cosmeticos")) {
            // 💅 18. SALÓN DE BELLEZA / ESTÉTICA
            sectorSchema = [
                { parent: { name: "Cuidado Capilar Profesional", description: "Shampoos y tratamientos de lavado de salón" }, subs: ["Shampoo Sin Sal Post-Keratina", "Acondicionadores Hidratación Profunda", "Mascarillas Reparadoras Argán", "Ampollas de Nutrición Brillo", "Sérums Óleos Finalizadores Puntas", "Protectores Térmicos Alaciado"] },
                { parent: { name: "Tinturación Cambios Color", description: "Coloración permanente y peróxidos químicos" }, subs: ["Tintes en Crema Tubos Números", "Tinte Sin Amoniaco Delicado", "Polvo Decolorante Azul Bolsas", "Peróxido Activador Crema 20Vol", "Peróxido Activador Crema 30Vol", "Correctores de Color Matizadores"] },
                { parent: { name: "Manicura y Pedicura Uñas", description: "Esmaltados y extensiones de uñas acrílicas" }, subs: ["Esmaltes Tradicionales Colores", "Esmaltes Gel Semipermanentes LED", "Bases de Uñas Fortalecedoras", "Brillo Finalizador Top Coat", "Líquido Acrílico Monómero", "Polvos Acrílicos Construcción Rosa"] },
                { parent: { name: "Cosméticos Rostro Maquillaje", description: "Línea de color de belleza facial" }, subs: ["Bases de Maquillaje Líquidas", "Correctores de Ojeras Alta Cobertura", "Polvos Traslúcidos Selladores", "Paletas de Sombras Ojos", "Labiales Líquidos Matte Larga", "Máscaras de Pestañas Rímel Black"] },
                { parent: { name: "Estética Facial Tratamientos", description: "Limpieza y regeneración dérmica en cabina" }, subs: ["Leche Limpiadora Facial Suave", "Tónicos Hidratantes Rosas", "Exfoliantes Microgránulos Rostro", "Peeling Químico Ácido Glicólico", "Mascarillas de Arcilla Purificante", "Crema Masaje Facial Hidratante"] },
                { parent: { name: "Herramientas de Peinado Eléctricas", description: "Aparatos térmicos de estilismo capilar" }, subs: ["Secadoras de Cabello Profesionales", "Planchas Alaciadoras Cerámica Titanio", "Onduladores Rizadores Tubo", "Maquinas de Corte Clipper Barba", "Trimmers Patilleras Precisión", "Limpiadores Esterilizadores UV"] }
            ];
        } else if (companyKey.includes("toy") || companyKey.includes("jugueteria")) {
            // 🧸 19. JUGUETERÍA
            sectorSchema = [
                { parent: { name: "Juguetes Primera Infancia", description: "Recreación estimulativa para bebés lactantes" }, subs: ["Sonajeros de Dentición Suaves", "Gimnasios de Actividades Manta", "Bloques de Construcción Blandos", "Juguetes de Arrastre Madera", "Cubos de Encastre Colores", "Peluches Musicales Antialérgicos"] },
                { parent: { name: "Muñecas y Figuras de Acción", description: "Modelos a escala y personajes coleccionables" }, subs: ["Muñecas Articuladas de Moda", "Accesorios de Muñeca Casitas", "Figuras de Acción Superhéroes", "Robots Transformables Mecánicos", "Dinosaurios con Sonido Luces", "Estructuras de Combate Pistas"] },
                { parent: { name: "Juegos de Mesa y Estrategia", description: "Entretenimiento mental familiar en tablero" }, subs: ["Juegos de Estrategia Clásicos Monopolio", "Juegos de Cartas Rápidos Uno", "Rompecabezas Infantiles Piezas", "Rompecabezas 1000 Piezas Adultos", "Juegos de Memoria Didácticos", "Ajedrez Tableros de Madera"] },
                { parent: { name: "Vehículos Juguete y Radiocontrol", description: "Autos a escala y transmisión de radio frecuencia" }, subs: ["Autos de Metal Colección Escala", "Camiones de Construcción Plástico", "Pistas de Carreras Lanzadores", "Autos a Radiocontrol Recargables", "Drones de Juguete Estables", "Trenes Eléctricos con Vías"] },
                { parent: { name: "Juguetes de Construcción Bloques", description: "Sistemas de ensamble modular creativo" }, subs: ["Bloques Clásicos Construcción Caja", "Kits de Construcción Temáticos", "Sets de Ladrillos Miniatura", "Estructuras de Ingeniería Armable", "Piezas Magnéticas Geométricas", "Mesas de Construcción Tableros"] },
                { parent: { name: "Recreación Aire Libre Deportes", description: "Juguetes dinámicos para exteriores patios" }, subs: ["Pelotas de Fútbol Inflables", "Scooters Regulables Dos Ruedas", "Bicicletas de Aprendizaje Balance", "Pistolas de Agua Lanzadores", "Burbujeros Líquidos Gigantes", "Camas Elásticas Saltagol Mini"] }
            ];
        } else {
            // 🏢 20. SERVICIOS / GENERAL / CONSULTORÍA (Fallback Estricto para el resto de empresas)
            sectorSchema = [
                { parent: { name: "Servicios Corporativos Base", description: "Líneas operativas generales de consultoría empresarial" }, subs: ["Asesoría Legal", "Auditoría Contable", "Consultoría TI", "Gestión de Recursos", "Marketing Digital", "Planeamiento Estratégico"] },
                { parent: { name: "Suministros de Oficina Corporativos", description: "Materiales genéricos de uso interno" }, subs: ["Papelería Impresa", "Lapiceros de Marca", "Fólderes Corporativos", "Agendas Ejecutivas", "Organizadores Escritorio", "Gafetes Plásticos"] },
                { parent: { name: "Capacitaciones y Talleres Especiales", description: "Formación interna para el crecimiento laboral" }, subs: ["Liderazgo Efectivo", "Ventas Especializadas", "Herramientas Digitales", "Seguridad en el Trabajo", "Atención al Cliente", "Finanzas Personales"] },
                { parent: { name: "Soporte Técnico de Redes", description: "Asistencia directa e infraestructura técnica" }, subs: ["Mantenimiento PCs", "Configuración Servidores", "Soporte Remoto", "Instalación Software", "Seguridad Informática", "Copias de Respaldo Cloud"] },
                { parent: { name: "Logística Eventos Corporativos", description: "Organización integral de juntas de negocio" }, subs: ["Catering Ejecutivo", "Alquiler de Proyectores", "Diseño de Banners", "Fotografía Eventos", "Anfitrionaje Personal", "Sistemas de Audio Micrófono"] },
                { parent: { name: "Artículos Promocionales Merchandising", description: "Regalos de marca corporativos con logotipo" }, subs: ["Tazas Cerámica Logotipo", "Tomatodos Aluminio Marca", "Lapiceros Metálicos Grabados", "Llaveros de Jebe Forma", "Bolsas Ecológicas Tela Notex", "Mochilas Porta Laptop Diseños"] }
            ];
        }

        // =========================================================================
        // INYECCIÓN MÁXIMA EN BASE DE DATOS PRESERVANDO JERARQUÍAS
        // =========================================================================

        for (const item of sectorSchema) {
            // 1. Crear la Categoría Padre y atrapar su ID real único generado
            const parentCategory = await prisma.category.create({
                data: {
                    name: item.parent.name,
                    description: item.parent.description,
                    companyId: company.id
                }
            });
            totalCategories++;

            // 2. Formatear las subcategorías amarrándoles dinámicamente ese ID Padre
            const subCategoriesData = item.subs.map(subName => ({
                name: subName,
                description: `Subcategoría perteneciente al bloque de ${item.parent.name}`,
                companyId: company.id,
                parentId: parentCategory.id // Mapeo exacto
            }));

            // 3. Crear en lote masivo las subcategorías vinculadas al padre actual
            if (subCategoriesData.length > 0) {
                const subResult = await prisma.category.createMany({
                    data: subCategoriesData,
                    skipDuplicates: true
                });
                totalSubCategories += subResult.count;
            }
        }

        console.log(`   └─ ✅ [${company.name}] Catálogo multi-tenant estructurado con éxito.`);
    }

    console.log(`\n🏁 Súper-siembra finalizada. Se procesaron con éxito ${totalCategories} Categorías Padre y ${totalSubCategories} Subcategorías distribuidas entre tus 20 empresas.`);
}

module.exports = {
    categorySeed
};