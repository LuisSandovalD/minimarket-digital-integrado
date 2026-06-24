// ========================================
// prisma/seeds/purchase.seed.js
// ========================================

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Helper para generar fechas distribuidas en los últimos 5 años.
 * Inicia ligeramente antes que las ventas (fines de 2020 / inicios de 2021) hasta el 2026 actual.
 */
const generateHistoricalPurchaseDate = (currentStep, totalRecords) => {
    const startDate = new Date("2024-12-01T07:00:00");
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

async function purchaseJsonPayloadSeed() {
    // 1. OBTENER DATOS MAESTROS OBLIGATORIOS
    const company = await prisma.company.findFirst();
    const branch = await prisma.branch.findFirst();
    const buyer = await prisma.user.findFirst();

    if (!company || !branch || !buyer) {
        throw new Error("Asegúrate de tener Company, Branch y User en la BD antes de procesar compras.");
    }

    // 1.2 OBTENER O CREAR MÉTODO DE PAGO
    let paymentMethod = await prisma.paymentMethod_DB.findFirst({
        where: { companyId: company.id, isActive: true }
    });

    if (!paymentMethod) {
        paymentMethod = await prisma.paymentMethod_DB.create({
            data: {
                name: "Efectivo Caja General",
                type: "CASH",
                isActive: true,
                companyId: company.id
            }
        });
    }

    // ========================================
    // 2. ARRAY DE COMPRAS BASE (Payload Cíclico)
    // ========================================
    const basePurchasesPayload = [
        { supplierId: 1, notes: "Compra de reposición de bebidas y aguas para el almacén central", details: [{ productId: 1, quantity: 150, costPrice: 5.00 }, { productId: 2, quantity: 100, costPrice: 10.00 }, { productId: 3, quantity: 80, costPrice: 4.00 }] },
        { supplierId: 2, notes: "Abastecimiento urgente de lácteos para vitrinas refrigeradas", details: [{ productId: 4, quantity: 300, costPrice: 3.20 }, { productId: 5, quantity: 200, costPrice: 3.50 }, { productId: 6, quantity: 100, costPrice: 5.50 }] },
        { supplierId: 3, notes: "Pedido regular de fideos y harinas - Abastecimiento por campaña", details: [{ productId: 7, quantity: 400, costPrice: 2.10 }, { productId: 8, quantity: 350, costPrice: 2.30 }, { productId: 9, quantity: 200, costPrice: 1.80 }] },
        { supplierId: 4, notes: "Reposición mensual de útiles e insumos de limpieza del hogar", details: [{ productId: 10, quantity: 150, costPrice: 4.50 }, { productId: 11, quantity: 120, costPrice: 3.10 }, { productId: 12, quantity: 180, costPrice: 2.00 }] },
        { supplierId: 1, notes: "Compra masiva stock extra de aceites vegetales y arroz", details: [{ productId: 1, quantity: 500, costPrice: 3.40 }, { productId: 2, quantity: 400, costPrice: 7.20 }] },
        { supplierId: 5, notes: "Lote de cervezas y aguas gasificadas para temporada de alta demanda", details: [{ productId: 13, quantity: 300, costPrice: 4.20 }, { productId: 14, quantity: 450, costPrice: 1.50 }] },
        { supplierId: 6, notes: "Embutidos y carnes frías con cadena de frío prioritaria", details: [{ productId: 15, quantity: 200, costPrice: 8.50 }, { productId: 16, quantity: 250, costPrice: 5.20 }, { productId: 17, quantity: 150, costPrice: 12.00 }] },
        { supplierId: 7, notes: "Reposición de chocolates, confitería y café instantáneo", details: [{ productId: 18, quantity: 400, costPrice: 1.20 }, { productId: 19, quantity: 180, costPrice: 7.50 }, { productId: 20, quantity: 500, costPrice: 0.80 }] },
        { supplierId: 2, notes: "Pedido regular quincenal de tarros de leche evaporada", details: [{ productId: 4, quantity: 600, costPrice: 3.15 }] },
        { supplierId: 8, notes: "Cargamento de pañales y productos de higiene femenina", details: [{ productId: 21, quantity: 120, costPrice: 22.00 }, { productId: 22, quantity: 200, costPrice: 6.80 }] },
        { supplierId: 3, notes: "Stock de galletas, avenas y sémolas para góndolas", details: [{ productId: 23, quantity: 450, costPrice: 0.90 }, { productId: 24, quantity: 250, costPrice: 2.40 }, { productId: 25, quantity: 180, costPrice: 1.65 }] },
        { supplierId: 9, notes: "Compra de volumen de papel higiénico y servilletas institucionales", details: [{ productId: 26, quantity: 350, costPrice: 4.10 }, { productId: 27, quantity: 500, costPrice: 1.20 }] },
        { supplierId: 4, notes: "Compra de contingencia de desinfectantes e insecticidas", details: [{ productId: 10, quantity: 150, costPrice: 4.30 }, { productId: 28, quantity: 100, costPrice: 6.20 }] },
        { supplierId: 1, notes: "Abastecimiento mensual de harinas industriales y mantecas", details: [{ productId: 29, quantity: 60, costPrice: 85.00 }, { productId: 30, quantity: 40, costPrice: 72.00 }] },
        { supplierId: 10, notes: "Útiles de oficina y papelería para stock interno y comercial", details: [{ productId: 31, quantity: 150, costPrice: 3.50 }, { productId: 32, quantity: 300, costPrice: 0.90 }, { productId: 33, quantity: 80, costPrice: 15.00 }] }
    ];

    // Multiplicamos por 5 repeticiones para generar un historial robusto de compras (~75 órdenes de compra)
    const repetitions = 10;
    const totalRecords = basePurchasesPayload.length * repetitions;

    console.log(`📊 Generando e inyectando ${totalRecords} Órdenes de Compra históricas (2021 - 2026)...`);
    let globalCounter = 1;

    for (let rep = 0; rep < repetitions; rep++) {
        for (const item of basePurchasesPayload) {

            // Calculamos la fecha en la que verdaderamente ocurrió esta compra en el pasado
            const historicalDate = generateHistoricalPurchaseDate(globalCounter, totalRecords);
            const currentYear = historicalDate.getFullYear();

            await prisma.$transaction(async (tx) => {

                let cabeceraSubtotal = 0;
                for (const d of item.details) {
                    cabeceraSubtotal += d.quantity * d.costPrice;
                }

                const tax = parseFloat((cabeceraSubtotal * 0.18).toFixed(2));
                const discount = cabeceraSubtotal > 1000 ? 30.00 : 0.00;
                const total = parseFloat((cabeceraSubtotal + tax - discount).toFixed(2));

                // Código correlativo ajustado al año real de la compra
                const purchaseNumber = `COM-${currentYear}-${String(globalCounter).padStart(4, '0')}`;
                globalCounter++;

                // 1. Crear Cabecera con Fechas Históricas Coherentes
                const newPurchase = await tx.purchase.create({
                    data: {
                        purchaseNumber,
                        subtotal: cabeceraSubtotal,
                        tax,
                        discount,
                        total,
                        status: "COMPLETED",
                        notes: item.notes,
                        expectedDelivery: historicalDate,
                        actualDelivery: historicalDate,
                        createdAt: historicalDate,
                        updatedAt: historicalDate,
                        buyerId: buyer.id,
                        branchId: branch.id,
                        companyId: company.id,
                        supplierId: item.supplierId
                    }
                });

                // 2. Registrar el Egreso de Dinero Ajustado en el Tiempo
                await tx.payment.create({
                    data: {
                        amount: total,
                        status: "COMPLETED",
                        paymentMethod: paymentMethod.id,
                        reference: `PAGO-${purchaseNumber}`,
                        transactionId: `TX-PURCH-${Math.floor(100000 + Math.random() * 900000)}`,
                        notes: "Salida de caja histórica automatizada por liquidación de orden de compra.",
                        paidAt: historicalDate,
                        createdAt: historicalDate,
                        purchaseId: newPurchase.id
                    }
                });

                // 3. Procesar Líneas del Detalle, Kardex y Lotes
                for (const detail of item.details) {
                    const itemSubtotal = detail.quantity * detail.costPrice;

                    // Lote con nomenclatura del año correspondiente
                    const generatedBatch = `LOT-${String(currentYear).substring(2)}-${Math.floor(1000 + Math.random() * 9000)}`;

                    // Fecha de expiración realista (1 año después de haber sido comprado)
                    const expDate = new Date(historicalDate.getTime());
                    expDate.setFullYear(expDate.getFullYear() + 1);

                    const createdDetail = await tx.purchaseDetail.create({
                        data: {
                            purchaseId: newPurchase.id,
                            productId: detail.productId,
                            quantity: detail.quantity,
                            price: detail.costPrice,
                            subtotal: itemSubtotal,
                            tax: 0.00,
                            batchNumber: generatedBatch,
                            expirationDate: expDate
                        }
                    });

                    // Buscar o Inicializar Inventario
                    const currentInventory = await tx.inventory.findUnique({
                        where: {
                            productId_branchId: {
                                productId: detail.productId,
                                branchId: branch.id
                            }
                        }
                    });

                    const previousStock = currentInventory ? currentInventory.stock : 0;
                    const newStock = previousStock + detail.quantity;

                    const updatedInventory = await tx.inventory.upsert({
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

                    // Mapear Kardex al Pasado
                    await tx.inventoryHistory.create({
                        data: {
                            type: "PURCHASE",
                            quantity: detail.quantity,
                            previousStock: previousStock,
                            newStock: newStock,
                            reason: `Entrada por compra correlativo ${purchaseNumber}`,
                            reference: purchaseNumber,
                            productId: detail.productId,
                            inventoryId: updatedInventory.id,
                            branchId: branch.id,
                            companyId: company.id,
                            createdAt: historicalDate
                        }
                    });

                    // Instanciar el lote del producto ajustando su línea temporal
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

                    // Notificaciones históricas (Marcadas como leídas porque ya pasaron)
                    await tx.notification.create({
                        data: {
                            title: "📦 Mercadería Recibida e Ingresada",
                            message: `Se registró el ingreso de ${detail.quantity} unidades del producto ID: ${detail.productId} mediante la compra ${purchaseNumber}.`,
                            type: "PURCHASE_READY",
                            isRead: true,
                            userId: buyer.id,
                            productId: detail.productId,
                            companyId: company.id,
                            createdAt: historicalDate
                        }
                    });
                }
            });
        }
    }

    console.log(`\n======================================================`);
    console.log(`✅ SEED LOGÍSTICO COMPLETADO: ${totalRecords} compras inyectadas.`);
    console.log(`📅 Rango temporal cubierto: Fines de 2020 hasta mediados de 2026.`);
    console.log(`💡 El inventario ahora cuenta con soporte y stock histórico real.`);
    console.log(`======================================================\n`);
}

module.exports = {
    purchaseJsonPayloadSeed
};