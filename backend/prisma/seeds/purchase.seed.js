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
    console.log("🚀 Iniciando carga masiva histórica de Compras e Inventarios para las 20 empresas...");

    // ==================================================
    // 1. OBTENER TODAS LAS EMPRESAS DISPONIBLES
    // ==================================================
    const allCompanies = await prisma.company.findMany({ select: { id: true } });

    if (allCompanies.length === 0) {
        throw new Error("Asegúrate de tener registros en la tabla Company antes de procesar compras.");
    }

    // Pool de notas realistas para variabilidad transaccional
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

    let grandTotalPurchases = 0;

    // ==================================================
    // 2. ITERAR EN LAS 20 EMPRESAS DE FORMA EXCLUSIVA
    // ==================================================
    for (const currentCompany of allCompanies) {
        const companyId = currentCompany.id;

        // Obtener la primera sucursal, comprador, productos y proveedores específicos de ESTA empresa
        const branch = await prisma.branch.findFirst({ where: { companyId } });
        const buyer = await prisma.user.findFirst({ where: { companyId } });
        const allProducts = await prisma.product.findMany({ where: { companyId }, select: { id: true } });
        const allSuppliers = await prisma.supplier.findMany({ where: { companyId }, select: { id: true } });

        // Si la empresa no tiene catálogo de datos maestros listo, salta preventivamente para evitar fallos de Foreign Key
        if (!branch || !buyer || allProducts.length === 0 || allSuppliers.length === 0) {
            console.warn(`⚠️ Empresa ID ${companyId} omitida: Faltan productos, proveedores, sucursales o usuarios.`);
            continue;
        }

        // Configuración/Verificación de métodos de pago únicos para esta empresa específica
        const paymentMethodsToSeed = [
            { name: "Efectivo Caja General", type: "CASH" },
            { name: "Tarjeta de Crédito/Débito", type: "CARD" },
            { name: "Transferencia Bancaria", type: "TRANSFER" },
            { name: "Billeteras Digitales", type: "WALLET" },
            { name: "Cheque Comercial", type: "CHECK" }
        ];

        let availablePaymentMethods = [];

        for (const method of paymentMethodsToSeed) {
            let dbMethod = await prisma.paymentMethod_DB.findFirst({
                where: { type: method.type, companyId }
            });

            if (!dbMethod) {
                dbMethod = await prisma.paymentMethod_DB.create({
                    data: {
                        name: method.name,
                        type: method.type,
                        isActive: true,
                        companyId
                    }
                });
            }

            if (dbMethod.isActive) {
                availablePaymentMethods.push(dbMethod);
            }
        }

        // Definimos entre 40 y 60 compras históricas exclusivas por cada empresa
        const totalRecordsPerCompany = Math.floor(Math.random() * 21) + 40;
        console.log(` 🏢 Empresa ID ${companyId}: Inyectando ${totalRecordsPerCompany} Órdenes de Compra (2022 - 2026)...`);

        let companyPurchaseCounter = 1;

        // ==================================================
        // 3. BUCLE DE COMPRAS TRANSACCIONAL POR EMPRESA
        // ==================================================
        for (let i = 0; i < totalRecordsPerCompany; i++) {
            const randomSupplier = allSuppliers[Math.floor(Math.random() * allSuppliers.length)];
            const shuffledProducts = shuffleArray(allProducts);
            const detailCount = Math.floor(Math.random() * 4) + 1; // Entre 1 y 4 ítems por compra
            const selectedProducts = shuffledProducts.slice(0, detailCount);

            const purchaseDetailsPayload = selectedProducts.map(p => {
                return {
                    productId: p.id,
                    quantity: Math.floor(Math.random() * 400) + 50,                  // 50 a 450 unidades
                    costPrice: parseFloat((Math.random() * (20 - 1) + 1).toFixed(2)) // Costos de 1.00 a 20.00 PEN
                };
            });

            const historicalDate = generateHistoricalPurchaseDate(companyPurchaseCounter, totalRecordsPerCompany);
            const currentYear = historicalDate.getFullYear();
            const note = poolNotes[i % poolNotes.length];

            await prisma.$transaction(
                async (tx) => {
                    let cabeceraSubtotal = 0;
                    for (const d of purchaseDetailsPayload) {
                        cabeceraSubtotal += d.quantity * d.costPrice;
                    }

                    const tax = parseFloat((cabeceraSubtotal * 0.18).toFixed(2));
                    const discount = cabeceraSubtotal > 1000 ? 30.00 : 0.00;
                    const total = parseFloat((cabeceraSubtotal + tax - discount).toFixed(2));

                    // Formato correlativo estructurado por año y contador de la empresa
                    const purchaseNumber = `COM-${currentYear}-${String(companyId).padStart(2, "0")}-${String(companyPurchaseCounter).padStart(4, "0")}`;
                    const transactionHex = crypto.randomBytes(3).toString("hex").toUpperCase();
                    const transactionId = `TX-PURCH-${currentYear}-${transactionHex}`;

                    const randomPaymentMethod = availablePaymentMethods[Math.floor(Math.random() * availablePaymentMethods.length)];

                    companyPurchaseCounter++;
                    grandTotalPurchases++;

                    // A. Registrar la Cabecera de la Compra
                    const newPurchase = await tx.purchase.create({
                        data: {
                            purchaseNumber,
                            subtotal: cabeceraSubtotal,
                            tax,
                            discount,
                            total,
                            status: PurchaseStatus.COMPLETED,
                            notes: note,
                            expectedDelivery: historicalDate,
                            actualDelivery: historicalDate,
                            createdAt: historicalDate,
                            updatedAt: historicalDate,
                            buyerId: buyer.id,
                            branchId: branch.id,
                            companyId,
                            supplierId: randomSupplier.id
                        }
                    });

                    // B. Registrar el Flujo de Pago de la compra
                    await tx.payment.create({
                        data: {
                            amount: total,
                            status: PaymentStatus.COMPLETED,
                            paymentMethod: randomPaymentMethod.id,
                            reference: `PAGO-${purchaseNumber}`,
                            transactionId: transactionId,
                            notes: `Salida de caja liquidada mediante ${randomPaymentMethod.name}.`,
                            paidAt: historicalDate,
                            createdAt: historicalDate,
                            purchaseId: newPurchase.id
                        }
                    });

                    // C. Detalles de la orden, Afectación de Stock, Kárdex y Lotes individuales
                    for (const detail of purchaseDetailsPayload) {
                        const itemSubtotal = detail.quantity * detail.costPrice;

                        const batchHex = crypto.randomBytes(2).toString("hex").toUpperCase();
                        const generatedBatch = `LOT-${String(currentYear).substring(2)}-${batchHex}`;

                        const expDate = new Date(historicalDate);
                        expDate.setFullYear(expDate.getFullYear() + 1); // Expira en 1 año

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

                        // Incremento atómico y seguro de stock
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
                                companyId,
                                stock: detail.quantity,
                                reservedStock: 0,
                                damagedStock: 0,
                                lastUpdated: historicalDate
                            }
                        });

                        // Insertar movimiento cronológico de Kárdex
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
                                companyId,
                                createdAt: historicalDate
                            }
                        });

                        // Trazabilidad física del lote
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
                                companyId,
                                createdAt: historicalDate,
                                updatedAt: historicalDate
                            }
                        });
                    }
                },
                { timeout: 60000 } // Timeout transaccional de 1 minuto por bloque de compra individual
            );
        }
    }

    console.log(`\n======================================================`);
    console.log(`✅ SEED LOGÍSTICO MULTIEMPRESA COMPLETADO EXITOSAMENTE`);
    console.log(`📊 Total global inyectado: ${grandTotalPurchases} compras distribuidas en las 20 empresas.`);
    console.log(`📅 Cobertura histórica: 2022 - 2026.`);
    console.log(`======================================================\n`);
}

module.exports = {
    purchaseJsonPayloadSeed
};