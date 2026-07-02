// ========================================
// prisma/seeds/purchase.seed.js
// ========================================

const { PrismaClient, PurchaseStatus, PaymentStatus } = require("@prisma/client");
const crypto = require("crypto");
const prisma = new PrismaClient();

/**
 * Helper para generar fechas distribuidas en el rango histórico solicitado.
 * Inicia a fines de 2022 hasta el año actual 2026.
 */
const generateHistoricalPurchaseDate = (currentStep, totalRecords) => {
    const startDate = new Date("2022-12-01T07:00:00");
    const endDate = new Date(); // Año actual: 2026

    const totalTimeRange = endDate.getTime() - startDate.getTime();
    const incrementalTime = (totalTimeRange / totalRecords) * currentStep;

    const targetDate = new Date(startDate.getTime() + incrementalTime);

    // Variación horaria realista de oficina/almacén (Entre 7 AM y 4 PM)
    const randomHour = 7 + Math.floor(Math.random() * 9);
    const randomMinute = Math.floor(Math.random() * 60);
    targetDate.setHours(randomHour, randomMinute, 0, 0);

    return targetDate;
};

/**
 * Helper para mezclar arrays (Algoritmo Fisher-Yates) para aleatoriedad pura.
 */
const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

async function purchaseJsonPayloadSeed() {
    // ==================================================
    // 1. OBTENER DATOS MAESTROS OBLIGATORIOS DE LA BD
    // ==================================================
    const company = await prisma.company.findFirst();
    const branch = await prisma.branch.findFirst();
    const buyer = await prisma.user.findFirst();

    // Obtenemos los productos y proveedores reales para evitar IDs fantasmas (Violación de FK)
    const allProducts = await prisma.product.findMany({ select: { id: true } });
    const allSuppliers = await prisma.supplier.findMany({ select: { id: true } });

    if (!company || !branch || !buyer || allProducts.length === 0 || allSuppliers.length === 0) {
        throw new Error(
            "Asegúrate de tener Company, Branch, User, Products y Suppliers en la BD antes de procesar compras."
        );
    }

    // ==================================================
    // 2. INICIALIZAR MÚLTIPLES MÉTODOS DE PAGO (CORREGIDO)
    // ==================================================
    // Un solo registro por cada valor del Enum para respetar la regla @@unique([type, companyId])
    const paymentMethodsToSeed = [
        { name: "Efectivo Caja General", type: "CASH" },
        { name: "Tarjeta de Crédito/Débito", type: "CARD" },
        { name: "Transferencia Bancaria", type: "TRANSFER" },
        { name: "Billeteras Digitales", type: "WALLET" },
        { name: "Cheque Comercial", type: "CHECK" }
    ];

    let availablePaymentMethods = [];

    for (const method of paymentMethodsToSeed) {
        // Se busca por 'type' y 'companyId' que componen la restricción única real
        let dbMethod = await prisma.paymentMethod_DB.findFirst({
            where: {
                type: method.type,
                companyId: company.id
            }
        });

        if (!dbMethod) {
            dbMethod = await prisma.paymentMethod_DB.create({
                data: {
                    name: method.name,
                    type: method.type, // Enums de tu esquema: CASH, CARD, CHECK, TRANSFER, WALLET
                    isActive: true,
                    companyId: company.id
                }
            });
        }

        if (dbMethod.isActive) {
            availablePaymentMethods.push(dbMethod);
        }
    }

    // ==================================================
    // 3. POOL DE NOTAS REALISTAS PARA VARIABILIDAD
    // ==================================================
    const poolNotes = [
        "Compra de reposición de bebidas y aguas para el almacén central",
        "Abastecimiento urgente de lácteos para vitrinas refrigeradas",
        "Pedido regular de fideos y harinas - Abastecimiento por campaña",
        "Reposición mensual de útiles e insumos de limpieza del hogar",
        "Compra masiva stock extra de aceites vegetales y arroz",
        "Lote de cervezas y aguas gasificadas para temporada de alta demanda",
        "Embutidos y carnes frías con cadena de frío prioritaria",
        "Reposición de chocolates, confitería y café instantáneo",
        "Pedido regular quincenal de tarros de leche evaporada",
        "Cargamento de pañales y productos de higiene femenina",
        "Stock de galletas, avenas y sémolas para góndolas",
        "Compra de volumen de papel higiénico y servilletas institucionales",
        "Compra de contingencia de desinfectantes e insecticidas",
        "Abastecimiento mensual de harinas industriales y mantecas",
        "Útiles de oficina y papelería para stock interno y comercial"
    ];

    const totalRecords = 300; // Número total de Órdenes de compra históricas a generar
    console.log(` 📊 Generando e inyectando ${totalRecords} Órdenes de Compra dinámicas (2022 - 2026)...`);

    let globalCounter = 1;

    // ==================================================
    // 4. BUCLE DE GENERACIÓN TRANSACCIONAL (300 REGISTROS)
    // ==================================================
    for (let i = 0; i < totalRecords; i++) {

        // Seleccionamos un proveedor aleatorio de los existentes en la base de datos
        const randomSupplier = allSuppliers[Math.floor(Math.random() * allSuppliers.length)];

        // Mezclamos productos y elegimos una cantidad aleatoria (entre 1 y 4 ítems por compra) para evitar IDs duplicados en la misma orden
        const shuffledProducts = shuffleArray(allProducts);
        const detailCount = Math.floor(Math.random() * 4) + 1;
        const selectedProducts = shuffledProducts.slice(0, detailCount);

        // Generamos el payload de detalles con precios y cantidades dinámicas y realistas
        const purchaseDetailsPayload = selectedProducts.map(p => {
            return {
                productId: p.id,
                quantity: Math.floor(Math.random() * 450) + 50,          // Cantidades entre 50 y 500 unidades
                costPrice: parseFloat((Math.random() * (20 - 1) + 1).toFixed(2)) // Precios de costo entre 1.00 y 20.00
            };
        });

        const historicalDate = generateHistoricalPurchaseDate(globalCounter, totalRecords);
        const currentYear = historicalDate.getFullYear();
        const note = poolNotes[i % poolNotes.length];

        await prisma.$transaction(
            async (tx) => {
                // Cálculo de subtotales de la cabecera de la compra
                let cabeceraSubtotal = 0;
                for (const d of purchaseDetailsPayload) {
                    cabeceraSubtotal += d.quantity * d.costPrice;
                }

                const tax = parseFloat((cabeceraSubtotal * 0.18).toFixed(2));
                const discount = cabeceraSubtotal > 1000 ? 30.00 : 0.00;
                const total = parseFloat((cabeceraSubtotal + tax - discount).toFixed(2));

                // Formatos correlativos y códigos hash únicos mediante 'crypto' para mitigar duplicidades
                const purchaseNumber = `COM-${currentYear}-${String(globalCounter).padStart(5, "0")}`;
                const transactionHex = crypto.randomBytes(3).toString("hex").toUpperCase();
                const transactionId = `TX-PURCH-${currentYear}-${transactionHex}`;

                // Seleccionar un método de pago aleatorio de nuestro pool verificado
                const randomPaymentMethod = availablePaymentMethods[Math.floor(Math.random() * availablePaymentMethods.length)];

                globalCounter++;

                // --------------------------------------------------
                // A. CABECERA DE COMPRA
                // --------------------------------------------------
                const newPurchase = await tx.purchase.create({
                    data: {
                        purchaseNumber,
                        subtotal: cabeceraSubtotal,
                        tax,
                        discount,
                        total,
                        status: PurchaseStatus.COMPLETED, // Enum nativo
                        notes: note,
                        expectedDelivery: historicalDate,
                        actualDelivery: historicalDate,
                        createdAt: historicalDate,
                        updatedAt: historicalDate,
                        buyerId: buyer.id,
                        branchId: branch.id,
                        companyId: company.id,
                        supplierId: randomSupplier.id
                    }
                });

                // --------------------------------------------------
                // B. REGISTRO DE PAGO
                // --------------------------------------------------
                await tx.payment.create({
                    data: {
                        amount: total,
                        status: PaymentStatus.COMPLETED, // Enum nativo
                        paymentMethod: randomPaymentMethod.id,
                        reference: `PAGO-${purchaseNumber}`,
                        transactionId: transactionId,
                        notes: `Salida de caja automatizada liquidada mediante ${randomPaymentMethod.name}.`,
                        paidAt: historicalDate,
                        createdAt: historicalDate,
                        purchaseId: newPurchase.id
                    }
                });

                // --------------------------------------------------
                // C. DETALLES DE COMPRA, CONTROL DE STOCK Y LOTES
                // --------------------------------------------------
                for (const detail of purchaseDetailsPayload) {
                    const itemSubtotal = detail.quantity * detail.costPrice;

                    // Generación de un número de lote único no secuencial por producto
                    const batchHex = crypto.randomBytes(2).toString("hex").toUpperCase();
                    const generatedBatch = `LOT-${String(currentYear).substring(2)}-${batchHex}`;

                    // Fecha de vencimiento proyectada a exactamente 1 año desde la compra
                    const expDate = new Date(historicalDate);
                    expDate.setFullYear(expDate.getFullYear() + 1);

                    // Guardar detalle físico del artículo adquirido
                    const createdDetail = await tx.purchaseDetail.create({
                        data: {
                            purchaseId: newPurchase.id,
                            productId: detail.productId,
                            quantity: detail.quantity,
                            price: detail.costPrice,
                            subtotal: itemSubtotal,
                            tax: 0,
                            batchNumber: generatedBatch,
                            expirationDate: expDate
                        }
                    });

                    // Obtener stock previo de inventario para calcular el historial de movimientos (Kárdex)
                    const currentInventory = await tx.inventory.findUnique({
                        where: {
                            productId_branchId: {
                                productId: detail.productId,
                                branchId: branch.id
                            }
                        }
                    });

                    const previousStock = currentInventory?.stock ?? 0;
                    const newStock = previousStock + detail.quantity;

                    // Actualización incremental controlada o creación de stock por sucursal
                    const inventory = await tx.inventory.upsert({
                        where: {
                            productId_branchId: {
                                productId: detail.productId,
                                branchId: branch.id
                            }
                        },
                        update: {
                            stock: { increment: detail.quantity },
                            lastUpdated: historicalDate
                        },
                        create: {
                            productId: detail.productId,
                            branchId: branch.id,
                            companyId: company.id,
                            stock: detail.quantity,
                            reservedStock: 0,
                            damagedStock: 0,
                            lastUpdated: historicalDate
                        }
                    });

                    // Historial cronológico de movimientos de inventario
                    await tx.inventoryHistory.create({
                        data: {
                            type: "PURCHASE",
                            quantity: detail.quantity,
                            previousStock,
                            newStock,
                            reason: `Entrada por compra correlativo ${purchaseNumber}`,
                            reference: purchaseNumber,
                            productId: detail.productId,
                            inventoryId: inventory.id,
                            branchId: branch.id,
                            companyId: company.id,
                            createdAt: historicalDate
                        }
                    });

                    // Trazabilidad de lotes individuales vigentes en stock
                    await tx.productBatch.create({
                        data: {
                            batchNumber: generatedBatch,
                            expirationDate: expDate,
                            initialQuantity: detail.quantity,
                            currentQuantity: detail.quantity,
                            purchasePrice: detail.costPrice,
                            isActive: true,
                            productId: detail.productId,
                            purchaseDetailId: createdDetail.id,
                            branchId: branch.id,
                            companyId: company.id,
                            createdAt: historicalDate,
                            updatedAt: historicalDate
                        }
                    });
                }
            },
            {
                // Timeout preventivo de 5 minutos para evitar rupturas en ejecuciones locales o servidores lentos
                timeout: 300000
            }
        );
    }

    console.log(`\n======================================================`);
    console.log(`✅ SEED LOGÍSTICO COMPLETADO: ${totalRecords} compras inyectadas.`);
    console.log(`📅 Rango temporal cubierto: Fines de 2022 hasta el actual 2026.`);
    console.log(`💡 Métodos de pago e inventarios sincronizados sin conflictos únicos.`);
    console.log(`======================================================\n`);
}

module.exports = {
    purchaseJsonPayloadSeed
};