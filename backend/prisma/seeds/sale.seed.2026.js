// ============================================================================
// prisma/seeds/sale.seed.2026.js
// Ventas distribuidas desde el 01-Ene-2026 hasta HOY (fecha del sistema)
// Reconciliación contable nativa de impuestos y desgloses de IGV (Perú)
// ============================================================================

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const generateDateForYear2026 = (currentStep, totalRecords) => {
    const startDate = new Date("2026-01-01T08:30:00");
    const endDate = new Date(); // Fecha actual del sistema en 2026

    const totalTimeRange = endDate.getTime() - startDate.getTime();
    const incrementalTime = (totalTimeRange / totalRecords) * currentStep;

    const targetDate = new Date(startDate.getTime() + incrementalTime);
    const randomHour = 8 + Math.floor(Math.random() * 12);
    const randomMinute = Math.floor(Math.random() * 60);
    targetDate.setHours(randomHour, randomMinute, 0, 0);

    return targetDate;
};

async function saleJsonPayloadSeed2026() {
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
        { notes: "Venta mostrador - Servilletas institucionales", details: [{ productId: 27, quantity: 30, salePrice: 2.10 }] }, // Corregido el campo duplicado erróneo py: 2.10
        { notes: "Abastecimiento express de arroz embolsado", details: [{ productId: 2, quantity: 10, salePrice: 13.80 }] },
        { notes: "Compra fuerte de fin de semana - Almacén lleno", details: [{ productId: 1, quantity: 40, salePrice: 7.10 }, { productId: 4, quantity: 60, salePrice: 4.15 }, { productId: 13, quantity: 50, salePrice: 6.30 }] },
        { notes: "Pedido especial de carnes y embutidos para buffet", details: [{ productId: 15, quantity: 20, salePrice: 12.20 }, { productId: 16, quantity: 25, salePrice: 7.80 }, { productId: 17, quantity: 10, salePrice: 16.00 }] },
        { notes: "Surtido de fideos y harinas para comercio vecinal", details: [{ productId: 7, quantity: 50, salePrice: 3.10 }, { productId: 8, quantity: 40, salePrice: 3.50 }, { productId: 25, quantity: 20, salePrice: 2.80 }] },
        { notes: "Reposición mensual de pañales para centro infantil", details: [{ productId: 21, quantity: 15, salePrice: 28.50 }] },
        { notes: "Venta institucional masiva de útiles escolares", details: [{ productId: 31, quantity: 40, salePrice: 5.20 }, { productId: 32, quantity: 60, salePrice: 1.70 }] },
        { notes: "Cliente corporativo - Papel higiénico por mayor", details: [{ productId: 26, quantity: 50, salePrice: 6.00 }] },
        { notes: "Venta nocturna - Pack licores y bebidas gasificadas", details: [{ productId: 13, quantity: 35, salePrice: 6.50 }, { productId: 14, quantity: 50, salePrice: 2.40 }] },
        { notes: "Compra express de avenas y sémolas", details: [{ productId: 24, quantity: 25, salePrice: 3.90 }, { productId: 25, quantity: 15, salePrice: 2.90 }] },
        { notes: "Venta de chocolates para canastas de regalo", details: [{ productId: 19, quantity: 15, salePrice: 11.20 }, { productId: 20, quantity: 100, salePrice: 1.40 }] },
        { notes: "Útiles de limpieza - Lavandería local", details: [{ productId: 10, quantity: 15, salePrice: 6.80 }, { productId: 12, quantity: 20, salePrice: 3.10 }] },
        { notes: "Pedido de contingencia - Aguas y rehidratantes", details: [{ productId: 3, quantity: 20, salePrice: 6.00 }] },
        { notes: "Venta minorista - Harina industrial fraccionada", details: [{ productId: 29, quantity: 4, salePrice: 105.00 }] },
        { notes: "Mostrador - Lácteos surtidos familiares", details: [{ productId: 5, quantity: 12, salePrice: 5.00 }, { productId: 6, quantity: 8, salePrice: 8.20 }] },
        { notes: "Venta rápida de desinfectantes de piso", details: [{ productId: 11, quantity: 12, salePrice: 4.50 }] },
        { notes: "Pedido de galletas dulces al por mayor", details: [{ productId: 23, quantity: 60, salePrice: 1.75 }] },
        { notes: "Despacho final - Insumos de panadería", details: [{ productId: 8, quantity: 30, salePrice: 3.50 }] },
        { notes: "Cliente se lleva pack de aceites de cocina", details: [{ productId: 1, quantity: 15, salePrice: 7.20 }] },
        { notes: "Venta mostrador - Aguas gasificadas frías", details: [{ productId: 14, quantity: 24, salePrice: 2.50 }] },
        { notes: "Compra express - Cuidado personal", details: [{ productId: 22, quantity: 10, salePrice: 9.50 }] },
        { notes: "Venta de cierre de mes - Artículos de oficina variados", details: [{ productId: 31, quantity: 10, salePrice: 5.50 }, { productId: 33, quantity: 5, salePrice: 21.00 }] }
    ];

    const YEAR = 2026; // ✅ CORREGIDO: Cambiado de 2025 a 2026 para mapear consistencia temporal
    const totalRepetitions = 10;
    const totalRecords = basePayload.length * totalRepetitions;

    console.log(`📊 [${YEAR}] Generando ${totalRecords} transacciones de venta indexadas...`);

    let globalCounter = 1;
    let alertasGeneradas = 0;
    let ventasOmitidas = 0;
    const seedBatchId = Math.random().toString(36).substring(2, 6).toUpperCase();

    for (let rep = 0; rep < totalRepetitions; rep++) {
        for (const baseItem of basePayload) {

            const historicalDate = generateDateForYear2026(globalCounter, totalRecords);
            const randomCustomerId = Math.floor(Math.random() * 25) + 1;

            // ── Validar stock ANTES de abrir la transacción ──────────────────
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
            // ────────────────────────────────────────────────────────────────

            await prisma.$transaction(async (tx) => {
                let cabeceraSubtotal = 0;
                let cabeceraTax = 0;
                let cabeceraTotal = 0;

                // 1. Estructuración y cálculo lineal del IGV (18% incluido en el P.V.P)
                const computedDetails = baseItem.details.map(d => {
                    const totalLinea = d.quantity * d.salePrice;
                    const subtotalLinea = parseFloat((totalLinea / 1.18).toFixed(2)); // Base imponible de la línea
                    const taxLinea = parseFloat((totalLinea - subtotalLinea).toFixed(2)); // Impuesto retenido en la línea

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

                // Formateo estricto a 2 decimales para los campos numéricos de cabecera
                cabeceraSubtotal = parseFloat(cabeceraSubtotal.toFixed(2));
                cabeceraTax = parseFloat(cabeceraTax.toFixed(2));
                cabeceraTotal = parseFloat(cabeceraTotal.toFixed(2));
                const discount = 0.00;

                const saleNumber = `VEN-${YEAR}-${seedBatchId}-${String(globalCounter).padStart(4, '0')}`;

                const esCredito = Math.random() < 0.30;
                const status = esCredito ? "PENDING" : "COMPLETED";
                const porcentaje = esCredito ? (0.20 + Math.random() * 0.30) : 1.0;
                const initialPayment = parseFloat((cabeceraTotal * porcentaje).toFixed(2));

                // 2. Persistencia en la tabla Sale (Cabecera)
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

                // 3. Persistencia en la tabla Payment
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

                // 4. Registro de cada artículo en SaleDetail y ajustes matemáticos de almacén
                for (const detail of computedDetails) {
                    const availableBatch = await tx.productBatch.findFirst({
                        where: { productId: detail.productId, branchId: branch.id, currentQuantity: { gte: detail.quantity } },
                        orderBy: { expirationDate: 'asc' }
                    });

                    // ✅ CORREGIDO: Se rellenan de manera nativa los campos subtotal y tax correspondientes a la fila
                    await tx.saleDetail.create({
                        data: {
                            saleId: newSale.id,
                            productId: detail.productId,
                            quantity: detail.quantity,
                            price: detail.price,
                            subtotal: detail.subtotal,
                            tax: detail.tax,
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
    console.log(`✅ [${YEAR}] SEED COMPLETADO: Transacciones sincronizadas y desglosadas.`);
    console.log(`⏭️  Ventas omitidas por stock insuficiente: ${ventasOmitidas}`);
    console.log(`🔔 Alertas de inventario registradas: ${alertasGeneradas}`);
    console.log(`======================================================`);
}

module.exports = { saleJsonPayloadSeed2026 };