// ============================================================================
// prisma/seeds/sale.seed.2024.js
// Ventas distribuidas exclusivamente en el año 2024 - CORREGIDO MULTI-TENANT
// ============================================================================

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const YEAR = 2024;

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

async function saleJsonPayloadSeed2024() {
    console.log(`🚀 Iniciando carga masiva de Ventas exclusivamente del año ${YEAR} en esquema Multiempresa...`);

    // Traemos todas las empresas registradas
    const allCompanies = await prisma.company.findMany({ select: { id: true, name: true } });

    if (allCompanies.length === 0) {
        throw new Error("❌ Asegúrate de tener registros en la tabla Company antes de ejecutar.");
    }

    // El catálogo base de transacciones fijas (Alineado a IDs de productos relativos de cada empresa 1 al 20)
    // Se normalizó el sub-catálogo del 1 al 20 para garantizar match con los 20 productos autogenerados por empresa
    const basePayload = [
        { notes: "Venta minorista de la semana", details: [{ productId: 1, quantity: 5, salePrice: 7.50 }, { productId: 2, quantity: 3, salePrice: 14.00 }] },
        { notes: "Venta por mostrador a cliente final", details: [{ productId: 4, quantity: 12, salePrice: 4.50 }, { productId: 5, quantity: 10, salePrice: 5.00 }] },
        { notes: "Pedido de insumos básicos e inventario", details: [{ productId: 7, quantity: 20, salePrice: 3.50 }, { productId: 8, quantity: 15, salePrice: 3.80 }] },
        { notes: "Atención corporativa express de insumos", details: [{ productId: 10, quantity: 8, salePrice: 6.90 }] },
        { notes: "Venta de fin de semana - Pack Promocional", details: [{ productId: 1, quantity: 25, salePrice: 7.20 }, { productId: 13, quantity: 15, salePrice: 6.50 }] },
        { notes: "Despacho regular a cliente recurrente", details: [{ productId: 15, quantity: 10, salePrice: 12.50 }] },
        { notes: "Cierre de turno tarde - Rotación rápida", details: [{ productId: 18, quantity: 20, salePrice: 2.20 }] },
        { notes: "Venta mayorista pequeña por volumen", details: [{ productId: 4, quantity: 18, salePrice: 4.10 }] },
        { notes: "Artículos de cuidado especializado", details: [{ productId: 19, quantity: 4, salePrice: 29.90 }] },
        { notes: "Venta góndola de artículos variados", details: [{ productId: 3, quantity: 20, salePrice: 1.80 }] },
        { notes: "Consumo institucional express", details: [{ productId: 6, quantity: 10, salePrice: 6.50 }, { productId: 11, quantity: 12, salePrice: 5.50 }] },
        { notes: "Reposición rápida de almacén diario", details: [{ productId: 10, quantity: 5, salePrice: 6.90 }] },
        { notes: "Venta directa de mostrador", details: [{ productId: 2, quantity: 6, salePrice: 14.00 }] },
        { notes: "Venta estratégica para aliado local", details: [{ productId: 9, quantity: 2, salePrice: 110.00 }] },
        { notes: "Último despacho comercial del mes", details: [{ productId: 11, quantity: 15, salePrice: 5.50 }] },
        { notes: "Compra matutina express", details: [{ productId: 5, quantity: 4, salePrice: 4.90 }, { productId: 18, quantity: 5, salePrice: 2.50 }] },
        { notes: "Pack operativo para negocio local", details: [{ productId: 11, quantity: 10, salePrice: 4.50 }, { productId: 12, quantity: 15, salePrice: 3.20 }] },
        { notes: "Abastecimiento regular para menú del día", details: [{ productId: 7, quantity: 15, salePrice: 3.10 }, { productId: 9, quantity: 15, salePrice: 2.70 }] },
        { notes: "Venta de mostrador - Reposición bodega", details: [{ productId: 19, quantity: 8, salePrice: 11.50 }, { productId: 20, quantity: 20, salePrice: 1.50 }] },
        { notes: "Cliente se lleva lote pequeño de stock", details: [{ productId: 1, quantity: 12, salePrice: 7.20 }] },
        { notes: "Venta regular - Útiles de aseo y cuidado", details: [{ productId: 12, quantity: 8, salePrice: 9.80 }, { productId: 16, quantity: 6, salePrice: 6.20 }] },
        { notes: "Pedido para evento institucional", details: [{ productId: 13, quantity: 20, salePrice: 6.50 }, { productId: 14, quantity: 25, salePrice: 2.50 }] },
        { notes: "Compra express para el almuerzo corporativo", details: [{ productId: 16, quantity: 12, salePrice: 7.90 }, { productId: 17, quantity: 5, salePrice: 16.50 }] },
        { notes: "Venta de oficina - Reposición de archivadores", details: [{ productId: 12, quantity: 15, salePrice: 1.80 }, { productId: 13, quantity: 3, salePrice: 22.00 }] },
        { notes: "Venta de contingencia por temporada", details: [{ productId: 8, quantity: 10, salePrice: 9.50 }] },
        { notes: "Venta rápida de tarros de stock", details: [{ productId: 4, quantity: 24, salePrice: 4.20 }] },
        { notes: "Insumos para producción comercial", details: [{ productId: 10, quantity: 2, salePrice: 98.00 }] },
        { notes: "Pack familiar de artículos varios", details: [{ productId: 13, quantity: 20, salePrice: 1.80 }, { productId: 14, quantity: 15, salePrice: 3.90 }] },
        { notes: "Venta mostrador - Servilletas institucionales", details: [{ productId: 17, quantity: 20, salePrice: 2.10 }] },
        { notes: "Abastecimiento express regular", details: [{ productId: 2, quantity: 10, salePrice: 13.80 }] },
    ];

    const totalRepetitions = 5;
    const totalRecordsPerCompany = basePayload.length * totalRepetitions;

    let grandTotalVentas = 0;
    let grandVentasOmitidas = 0;
    let grandAlertas = 0;

    // Iteramos de manera limpia sobre cada Tenant
    for (const currentCompany of allCompanies) {
        const companyId = currentCompany.id;

        const allBranches = await prisma.branch.findMany({ where: { companyId }, select: { id: true } });
        const seller = await prisma.user.findFirst({ where: { companyId }, select: { id: true } });
        const allProducts = await prisma.product.findMany({ where: { companyId }, select: { id: true } });
        const allCustomers = await prisma.customer.findMany({ where: { companyId }, select: { id: true } });

        if (allBranches.length === 0 || !seller || allProducts.length === 0 || allCustomers.length === 0) {
            console.warn(`⚠️ Empresa "${currentCompany.name}" (ID ${companyId}) omitida: Datos maestros incompletos.`);
            continue;
        }

        let paymentMethod = await prisma.paymentMethod_DB.findFirst({
            where: { companyId, isActive: true }
        });

        if (!paymentMethod) {
            paymentMethod = await prisma.paymentMethod_DB.create({
                data: { name: "Efectivo Caja General", type: "CASH", isActive: true, companyId }
            });
        }

        console.log(`🏢 Empresa: "${currentCompany.name}" → Procesando ${totalRecordsPerCompany} ventas estructuradas para el [${YEAR}]...`);

        let companyCounter = 1;
        let ventasOmitidas = 0;
        let alertasGeneradas = 0;
        const seedBatchId = Math.random().toString(36).substring(2, 6).toUpperCase();

        // Mapeo seguro de los índices reales de los productos en la base de datos para este tenant
        // Evitamos usar IDs estáticos (1,2,3...) globales y usamos los asignados correlativamente por el product.seed
        for (let rep = 0; rep < totalRepetitions; rep++) {
            for (const baseItem of basePayload) {

                const historicalDate = generateDateForYear(companyCounter, totalRecordsPerCompany, YEAR);
                const randomCustomer = allCustomers[Math.floor(Math.random() * allCustomers.length)];
                const targetBranch = allBranches[Math.floor(Math.random() * allBranches.length)];

                // Traducir los IDs relativos del payload (1-20) a los IDs reales de la base de datos de esta empresa
                const mappedDetails = baseItem.details.map(d => {
                    const productIndex = (d.productId - 1) % allProducts.length;
                    const realProduct = allProducts[productIndex];
                    return {
                        productId: realProduct.id,
                        quantity: d.quantity,
                        salePrice: d.salePrice
                    };
                });

                // Validar stock ANTES de abrir la transacción en la sucursal seleccionada
                let todosConStock = true;
                for (const detail of mappedDetails) {
                    const inv = await prisma.inventory.findUnique({
                        where: { productId_branchId: { productId: detail.productId, branchId: targetBranch.id } }
                    });
                    if (!inv || inv.stock < detail.quantity) {
                        todosConStock = false;
                        break;
                    }
                }

                if (!todosConStock) {
                    ventasOmitidas++;
                    grandVentasOmitidas++;
                    companyCounter++;
                    continue;
                }

                await prisma.$transaction(async (tx) => {
                    let cabeceraSubtotal = 0;
                    let cabeceraTax = 0;
                    let cabeceraTotal = 0;

                    const computedDetails = mappedDetails.map(d => {
                        const totalLinea = d.quantity * d.salePrice;
                        const subtotalLinea = parseFloat((totalLinea / 1.18).toFixed(2));
                        const taxLinea = parseFloat((totalLinea - subtotalLinea).toFixed(2));

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

                    cabeceraSubtotal = parseFloat(cabeceraSubtotal.toFixed(2));
                    cabeceraTax = parseFloat(cabeceraTax.toFixed(2));
                    cabeceraTotal = parseFloat(cabeceraTotal.toFixed(2));
                    const discount = 0.00;

                    const saleNumber = `VEN-${YEAR}-${String(companyId).padStart(2, "0")}-${seedBatchId}-${String(companyCounter).padStart(4, "0")}`;
                    const esCredito = Math.random() < 0.30;
                    const status = esCredito ? "PENDING" : "COMPLETED";
                    const porcentaje = esCredito ? (0.20 + Math.random() * 0.30) : 1.0;
                    const initialPayment = parseFloat((cabeceraTotal * porcentaje).toFixed(2));

                    // 1. Creación de la Venta Cabecera
                    const newSale = await tx.sale.create({
                        data: {
                            saleNumber,
                            subtotal: cabeceraSubtotal,
                            tax: cabeceraTax,
                            discount,
                            total: cabeceraTotal,
                            status,
                            notes: `${baseItem.notes} | Sucursal: ID ${targetBranch.id}`,
                            createdAt: historicalDate,
                            updatedAt: historicalDate,
                            sellerId: seller.id,
                            branchId: targetBranch.id,
                            companyId,
                            customerId: randomCustomer.id
                        }
                    });

                    // 2. Registro del Flujo de Pago
                    await tx.payment.create({
                        data: {
                            amount: initialPayment,
                            status: "COMPLETED",
                            paymentMethod: paymentMethod.id,
                            reference: esCredito ? `INICIAL-${saleNumber}` : `COBRO-${saleNumber}`,
                            transactionId: `TX-${YEAR}-${Math.floor(100000 + Math.random() * 900000)}`,
                            notes: esCredito ? "Amortización parcial inicial." : "Liquidación total en punto de venta.",
                            paidAt: historicalDate,
                            createdAt: historicalDate,
                            updatedAt: historicalDate,
                            saleId: newSale.id
                        }
                    });

                    // 3. Creación de detalles e Impacto de Kárdex/Inventario
                    for (const detail of computedDetails) {
                        const availableBatch = await tx.productBatch.findFirst({
                            where: { productId: detail.productId, branchId: targetBranch.id, currentQuantity: { gte: detail.quantity } },
                            orderBy: { expirationDate: "asc" }
                        });

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
                            where: { productId_branchId: { productId: detail.productId, branchId: targetBranch.id } }
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
                                    reason: `Salida de inventario ${YEAR}: venta ${saleNumber} en sucursal ${targetBranch.id}`,
                                    reference: saleNumber,
                                    productId: detail.productId,
                                    inventoryId: currentInventory.id,
                                    branchId: targetBranch.id,
                                    companyId,
                                    createdAt: historicalDate
                                }
                            });

                            if (newStock < 20) {
                                alertasGeneradas++;
                                grandAlertas++;
                                await tx.notification.create({
                                    data: {
                                        title: "⚠️ Stock Crítico en Almacén",
                                        message: `Producto ID: ${detail.productId} bajó del límite en Sucursal ${targetBranch.id}. Stock remanente: ${newStock} unidades.`,
                                        type: "LOW_STOCK",
                                        isRead: true,
                                        userId: seller.id,
                                        productId: detail.productId,
                                        companyId,
                                        createdAt: historicalDate
                                    }
                                });
                            }
                        }
                    }
                });

                companyCounter++;
                grandTotalVentas++;
            }
        }

        console.log(`   ✅ Empresa "${currentCompany.name}": ${companyCounter - 1 - ventasOmitidas} ventas inyectadas, ${ventasOmitidas} omitidas por stock.`);
    }

    console.log(`\n======================================================`);
    console.log(`✅ [${YEAR}] SEED COMPLETADO: ventas inyectadas con IGV reconciliado a nivel Multi-tenant.`);
    console.log(`📊 Total global de ventas creadas: ${grandTotalVentas}`);
    console.log(`⏭️  Total global de ventas omitidas por stock insuficiente: ${grandVentasOmitidas}`);
    console.log(`🔔 Total global de alertas de inventario registradas: ${grandAlertas}`);
    console.log(`======================================================`);
}

// Bloque de ejecución independiente
if (require.main === module) {
    saleJsonPayloadSeed2024()
        .catch((e) => {
            console.error("❌ Error detectado en el proceso de seed de ventas [2024]:", e);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}

module.exports = { saleJsonPayloadSeed2024 };