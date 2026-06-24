// ============================================================================
// prisma/seeds/sale.seed.2021.js
// Ventas distribuidas exclusivamente en el año 2021 - CORREGIDO
// ============================================================================

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const generateDateForYear = (currentStep, totalRecords, year) => {
    const startDate = new Date(`${year}-01-01T08:30:00`);
    const endDate = new Date(`${year}-12-31T20:00:00`);

    const totalTimeRange = endDate.getTime() - startDate.getTime();
    const incrementalTime = (totalTimeRange / totalRecords) * currentStep;

    const targetDate = new Date(startDate.getTime() + incrementalTime);
    const randomHour = 8 + Math.floor(Math.random() * 12);
    const randomMinute = Math.floor(Math.random() * 60);
    targetDate.setHours(randomHour, randomMinute, 0, 0);

    return targetDate;
};

async function saleJsonPayloadSeed2021() {
    const company = await prisma.company.findFirst();
    const branch = await prisma.branch.findFirst();
    const seller = await prisma.user.findFirst();

    if (!company || !branch || !seller) {
        throw new Error("Asegúrate de tener Company, Branch y User en la BD antes de ejecutar.");
    }

    let paymentMethod = await prisma.paymentMethod_DB.findFirst({
        where: { companyId: company.id, isActive: true }
    });

    if (!paymentMethod) {
        paymentMethod = await prisma.paymentMethod_DB.create({
            data: { name: "Efectivo Caja General", type: "CASH", isActive: true, companyId: company.id }
        });
    }

    const basePayload = [
        { notes: "Venta minorista de abarrotes de la semana", details: [{ productId: 1, quantity: 5, salePrice: 7.50 }, { productId: 2, quantity: 3, salePrice: 14.00 }] },
        { notes: "Venta de lácteos por mostrador a cliente final", details: [{ productId: 4, quantity: 12, salePrice: 4.50 }, { productId: 5, quantity: 10, salePrice: 5.00 }] },
        { notes: "Pedido de productos de panadería e insumos básicos", details: [{ productId: 7, quantity: 20, salePrice: 3.50 }, { productId: 8, quantity: 15, salePrice: 3.80 }] },
        { notes: "Atención corporativa express de insumos de limpieza", details: [{ productId: 10, quantity: 8, salePrice: 6.90 }] },
        { notes: "Venta de fin de semana - Pack Bebidas", details: [{ productId: 1, quantity: 25, salePrice: 7.20 }, { productId: 13, quantity: 15, salePrice: 6.50 }] },
        { notes: "Despacho regular a cliente recurrente de embutidos", details: [{ productId: 15, quantity: 10, salePrice: 12.50 }] },
        { notes: "Golosinas y café - Cierre de turno tarde", details: [{ productId: 18, quantity: 30, salePrice: 2.20 }] },
        { notes: "Venta mayorista pequeña de leche evaporada", details: [{ productId: 4, quantity: 48, salePrice: 4.10 }] },
        { notes: "Artículos de cuidado e higiene personal femenina", details: [{ productId: 21, quantity: 4, salePrice: 29.90 }] },
        { notes: "Venta góndola de snacks variados", details: [{ productId: 23, quantity: 40, salePrice: 1.80 }] },
        { notes: "Consumo institucional de papel de oficina y útiles", details: [{ productId: 26, quantity: 10, salePrice: 6.50 }, { productId: 31, quantity: 12, salePrice: 5.50 }] },
        { notes: "Reposición rápida de desinfectantes del hogar", details: [{ productId: 10, quantity: 5, salePrice: 6.90 }] },
        { notes: "Venta directa de bebidas carbonatadas", details: [{ productId: 2, quantity: 6, salePrice: 14.00 }] },
        { notes: "Venta de harinas para panificadora aliada local", details: [{ productId: 29, quantity: 2, salePrice: 110.00 }] },
        { notes: "Último despacho de papelería del mes", details: [{ productId: 31, quantity: 15, salePrice: 5.50 }] },
        { notes: "Compra matutina de desayuno rápido", details: [{ productId: 5, quantity: 4, salePrice: 4.90 }, { productId: 18, quantity: 5, salePrice: 2.50 }] },
        { notes: "Pack de limpieza para restaurante local", details: [{ productId: 11, quantity: 10, salePrice: 4.50 }, { productId: 12, quantity: 15, salePrice: 3.20 }] },
        { notes: "Abastecimiento de fideos para menú del día", details: [{ productId: 7, quantity: 35, salePrice: 3.10 }, { productId: 9, quantity: 15, salePrice: 2.70 }] },
        { notes: "Venta de mostrador - Reposición de golosinas de bodega", details: [{ productId: 19, quantity: 8, salePrice: 11.50 }, { productId: 20, quantity: 50, salePrice: 1.50 }] },
        { notes: "Cliente se lleva lote pequeño de aceites", details: [{ productId: 1, quantity: 12, salePrice: 7.20 }] },
        { notes: "Venta regular - Útiles de aseo personal", details: [{ productId: 22, quantity: 8, salePrice: 9.80 }, { productId: 26, quantity: 6, salePrice: 6.20 }] },
        { notes: "Pedido para evento de oficina - Aguas y cervezas", details: [{ productId: 13, quantity: 30, salePrice: 6.50 }, { productId: 14, quantity: 40, salePrice: 2.50 }] },
        { notes: "Compra express de embutidos para el almuerzo", details: [{ productId: 16, quantity: 12, salePrice: 7.90 }, { productId: 17, quantity: 5, salePrice: 16.50 }] },
        { notes: "Venta de oficina - Reposición de archivadores y lapiceros", details: [{ productId: 32, quantity: 25, salePrice: 1.80 }, { productId: 33, quantity: 3, salePrice: 22.00 }] },
        { notes: "Venta de contingencia - Insecticidas de temporada", details: [{ productId: 28, quantity: 10, salePrice: 9.50 }] },
        { notes: "Venta rápida de tarros de leche", details: [{ productId: 4, quantity: 24, salePrice: 4.20 }] },
        { notes: "Insumos para pastelería - Mantecas industriales", details: [{ productId: 30, quantity: 2, salePrice: 98.00 }] },
        { notes: "Pack familiar de snacks y galletas", details: [{ productId: 23, quantity: 20, salePrice: 1.80 }, { productId: 24, quantity: 15, salePrice: 3.90 }] },
        { notes: "Venta mostrador - Servilletas institucionales", details: [{ productId: 27, quantity: 30, py: 2.10, salePrice: 2.10 }] },
        { notes: "Abastecimiento express de arroz embolsado", details: [{ productId: 2, quantity: 10, salePrice: 13.80 }] },
    ];

    const YEAR = 2021;
    const totalRepetitions = 5;
    const totalRecords = basePayload.length * totalRepetitions;

    console.log(`📊 [${YEAR}] Generando ${totalRecords} transacciones de venta...`);

    let globalCounter = 1;
    let alertasGeneradas = 0;
    let ventasOmitidas = 0;
    const seedBatchId = Math.random().toString(36).substring(2, 6).toUpperCase();

    for (let rep = 0; rep < totalRepetitions; rep++) {
        for (const baseItem of basePayload) {

            const historicalDate = generateDateForYear(globalCounter, totalRecords, YEAR);
            const randomCustomerId = Math.floor(Math.random() * 25) + 1;

            // Validar stock ANTES de abrir la transacción
            let todosConStock = true;
            for (const detail of baseItem.details) {
                const inv = await prisma.inventory.findUnique({
                    where: { productId_branchId: { productId: detail.productId, branchId: branch.id } }
                });
                if (!inv || inv.stock < detail.quantity) {
                    todosConStock = false;
                    console.warn(`⚠️  [${YEAR}] Sin stock suficiente para producto ${detail.productId} (disponible: ${inv?.stock ?? 0}, requerido: ${detail.quantity}). Venta omitida.`);
                    break;
                }
            }

            if (!todosConStock) {
                ventasOmitidas++;
                globalCounter++;
                continue;
            }

            await prisma.$transaction(async (tx) => {
                let cabeceraSubtotal = 0;
                let cabeceraTax = 0;
                let cabeceraTotal = 0;

                // 1. Pre-cálculo estructurado de importes con desglose nativo de IGV (18%)
                const computedDetails = baseItem.details.map(d => {
                    const totalLinea = d.quantity * d.salePrice; // El valor final pagado por el ítem
                    const subtotalLinea = parseFloat((totalLinea / 1.18).toFixed(2)); // Base imponible
                    const taxLinea = parseFloat((totalLinea - subtotalLinea).toFixed(2)); // IGV del ítem

                    cabeceraSubtotal += subtotalLinea;
                    cabeceraTax += taxLinea;
                    cabeceraTotal += totalLinea;

                    return {
                        productId: d.productId,
                        quantity: d.quantity,
                        price: d.salePrice,
                        subtotal: subtotalLinea,
                        tax: taxLinea,
                        discount: 0.00
                    };
                });

                // Forzar formateo a 2 decimales para la cabecera
                cabeceraSubtotal = parseFloat(cabeceraSubtotal.toFixed(2));
                cabeceraTax = parseFloat(cabeceraTax.toFixed(2));
                cabeceraTotal = parseFloat(cabeceraTotal.toFixed(2));
                const discount = 0.00;

                const saleNumber = `VEN-${YEAR}-${seedBatchId}-${String(globalCounter).padStart(4, '0')}`;
                const esCredito = Math.random() < 0.30;
                const status = esCredito ? "PENDING" : "COMPLETED";
                const porcentaje = esCredito ? (0.20 + Math.random() * 0.30) : 1.0;
                const initialPayment = parseFloat((cabeceraTotal * porcentaje).toFixed(2));

                // 2. Creación de la Venta Matriz
                const newSale = await tx.sale.create({
                    data: {
                        saleNumber,
                        subtotal: cabeceraSubtotal,
                        tax: cabeceraTax,
                        discount,
                        total: cabeceraTotal,
                        status,
                        notes: baseItem.notes,
                        createdAt: historicalDate,
                        updatedAt: historicalDate,
                        sellerId: seller.id,
                        branchId: branch.id,
                        companyId: company.id,
                        customerId: randomCustomerId
                    }
                });

                // 3. Registro del Pago
                await tx.payment.create({
                    data: {
                        amount: initialPayment,
                        status: "COMPLETED",
                        paymentMethod: paymentMethod.id,
                        reference: esCredito ? `INICIAL-${saleNumber}` : `COBRO-${saleNumber}`,
                        transactionId: `TX-${YEAR}-${Math.floor(100000 + Math.random() * 900000)}`,
                        notes: esCredito ? `Amortización parcial inicial.` : `Liquidación total en punto de venta.`,
                        paidAt: historicalDate,
                        createdAt: historicalDate,
                        updatedAt: historicalDate,
                        saleId: newSale.id
                    }
                });

                // 4. Creación iterativa de detalles y actualización de inventarios
                for (const detail of computedDetails) {
                    const availableBatch = await tx.productBatch.findFirst({
                        where: { productId: detail.productId, branchId: branch.id, currentQuantity: { gte: detail.quantity } },
                        orderBy: { expirationDate: 'asc' }
                    });

                    // Inserción limpia respetando el esquema relacional
                    await tx.saleDetail.create({
                        data: {
                            saleId: newSale.id,
                            productId: detail.productId,
                            quantity: detail.quantity,
                            price: detail.price, // Precio Unitario (P.V.P con IGV incluido)
                            subtotal: detail.subtotal, // Base Imponible limpia de la línea
                            tax: detail.tax, // IGV calculado correspondiente a la línea
                            discount: detail.discount,
                            batchId: availableBatch ? availableBatch.id : null
                        }
                    });

                    if (availableBatch) {
                        await tx.productBatch.update({
                            where: { id: availableBatch.id },
                            data: { currentQuantity: { decrement: detail.quantity }, updatedAt: historicalDate }
                        });
                    }

                    const currentInventory = await tx.inventory.findUnique({
                        where: { productId_branchId: { productId: detail.productId, branchId: branch.id } }
                    });

                    if (currentInventory) {
                        const previousStock = currentInventory.stock;
                        const newStock = previousStock - detail.quantity;

                        await tx.inventory.update({
                            where: { id: currentInventory.id },
                            data: { stock: newStock, lastUpdated: historicalDate }
                        });

                        await tx.inventoryHistory.create({
                            data: {
                                type: "SALE",
                                quantity: detail.quantity,
                                previousStock,
                                newStock,
                                reason: `Salida de inventario ${YEAR}: venta ${saleNumber}`,
                                reference: saleNumber,
                                productId: detail.productId,
                                inventoryId: currentInventory.id,
                                branchId: branch.id,
                                companyId: company.id,
                                createdAt: historicalDate
                            }
                        });

                        if (newStock < 20) {
                            alertasGeneradas++;
                            await tx.notification.create({
                                data: {
                                    title: "⚠️ Stock Crítico en Almacén",
                                    message: `Producto ID: ${detail.productId} bajó del límite. Stock remanente: ${newStock} unidades.`,
                                    type: "LOW_STOCK",
                                    isRead: true,
                                    userId: seller.id,
                                    productId: detail.productId,
                                    companyId: company.id,
                                    createdAt: historicalDate
                                }
                            });
                        }
                    }
                }
            });

            globalCounter++;
        }
    }

    console.log(`\n======================================================`);
    console.log(`✅ [${YEAR}] SEED COMPLETADO: ventas inyectadas con IGV reconciliado.`);
    console.log(`⏭️  Ventas omitidas por stock insuficiente: ${ventasOmitidas}`);
    console.log(`🔔 Alertas de inventario registradas: ${alertasGeneradas}`);
    console.log(`======================================================`);
}

module.exports = { saleJsonPayloadSeed2021 };