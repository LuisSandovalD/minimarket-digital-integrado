// ============================================================================
// prisma/seeds/purchase.seed.js
// ============================================================================

const { PrismaClient, PurchaseStatus, PaymentStatus } = require("@prisma/client");
const crypto = require("crypto");
const prisma = new PrismaClient();

const PURCHASE_TO_PRODUCT_RATIO_MIN = 0.8;
const PURCHASE_TO_PRODUCT_RATIO_MAX = 1.3;

/**
 * Helper para generar fechas distribuidas en el rango histórico solicitado.
 */
const generateHistoricalPurchaseDate = (currentStep, totalRecords) => {
  const startDate = new Date("2021-01-01T07:00:00");
  const endDate = new Date(); // Año en curso (2026)

  const totalTimeRange = endDate.getTime() - startDate.getTime();
  const incrementalTime = (totalTimeRange / totalRecords) * currentStep;

  const targetDate = new Date(startDate.getTime() + incrementalTime);

  const randomHour = 7 + Math.floor(Math.random() * 9);
  const randomMinute = Math.floor(Math.random() * 60);
  targetDate.setHours(randomHour, randomMinute, 0, 0);

  return targetDate;
};

const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

async function purchaseJsonPayloadSeed() {
  console.log("🚀 Iniciando carga masiva histórica de Compras Distribuidas por Sucursal (2021 - hoy)...");

  const allCompanies = await prisma.company.findMany({ select: { id: true, name: true } });

  if (allCompanies.length === 0) {
    throw new Error("❌ Asegúrate de tener registros en la tabla Company antes de procesar compras.");
  }

  const poolNotes = [
    "Compra de reposición para stock general de almacén",
    "Abastecimiento urgente para vitrinas de exhibición",
    "Pedido regular - Abastecimiento programado por campaña",
    "Reposición mensual de útiles e insumos logísticos",
    "Compra masiva stock extra para inventario estacional",
    "Lote prioritario para cubrir picos de demanda local",
    "Insumos con cadena de frío de distribución rápida",
    "Reposición estándar de góndolas principales",
    "Pedido regular quincenal de alta rotación",
    "Cargamento especial coordinado por administración central",
  ];

  let grandTotalPurchases = 0;

  for (const currentCompany of allCompanies) {
    const companyId = currentCompany.id;

    // Traemos todas las dependencias necesarias de manera controlada
    const allBranches = await prisma.branch.findMany({ where: { companyId }, select: { id: true } });
    const buyer = await prisma.user.findFirst({ where: { companyId }, select: { id: true } });
    const allProducts = await prisma.product.findMany({ where: { companyId }, select: { id: true } });
    const allSuppliers = await prisma.supplier.findMany({ where: { companyId }, select: { id: true } });

    // Validación estricta para evitar accesos a propiedades de nulos o arreglos vacíos
    if (allBranches.length === 0 || !buyer || allProducts.length === 0 || allSuppliers.length === 0) {
      console.warn(`⚠️ Empresa "${currentCompany.name}" (ID ${companyId}) omitida: Faltan sucursales, productos, proveedores o usuarios.`);
      continue;
    }

    const paymentMethodsToSeed = [
      { name: "Efectivo Caja General", type: "CASH" },
      { name: "Tarjeta de Crédito/Débito", type: "CARD" },
      { name: "Transferencia Bancaria", type: "TRANSFER" },
      { name: "Billeteras Digitales", type: "WALLET" },
    ];

    let availablePaymentMethods = [];
    for (const method of paymentMethodsToSeed) {
      let dbMethod = await prisma.paymentMethod_DB.findFirst({ where: { type: method.type, companyId } });
      if (!dbMethod) {
        dbMethod = await prisma.paymentMethod_DB.create({
          data: { name: method.name, type: method.type, isActive: true, companyId },
        });
      }
      if (dbMethod && dbMethod.isActive) {
        availablePaymentMethods.push(dbMethod);
      }
    }

    // Si por alguna razón no hay métodos de pago activos, evitamos un posterior crash masivo
    if (availablePaymentMethods.length === 0) {
      console.warn(`⚠️ Omitiendo compras para empresa ID ${companyId} debido a la falta de métodos de pago válidos.`);
      continue;
    }

    const ratio = PURCHASE_TO_PRODUCT_RATIO_MIN + Math.random() * (PURCHASE_TO_PRODUCT_RATIO_MAX - PURCHASE_TO_PRODUCT_RATIO_MIN);
    const totalRecordsPerCompany = Math.max(40, Math.floor(allProducts.length * ratio));

    console.log(`🏢 Empresa: "${currentCompany.name}" → Generando ${totalRecordsPerCompany} Órdenes de Compra distribuidas...`);

    let companyPurchaseCounter = 1;

    for (let i = 0; i < totalRecordsPerCompany; i++) {
      const randomSupplier = allSuppliers[Math.floor(Math.random() * allSuppliers.length)];
      const shuffledProducts = shuffleArray(allProducts);
      const detailCount = Math.floor(Math.random() * 4) + 1;
      const selectedProducts = shuffledProducts.slice(0, detailCount);
      const targetBranch = allBranches[Math.floor(Math.random() * allBranches.length)];

      const purchaseDetailsPayload = selectedProducts.map(p => {
        return {
          productId: p.id,
          quantity: Math.floor(Math.random() * 400) + 50,
          costPrice: parseFloat((Math.random() * (20 - 1) + 1).toFixed(2)),
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

          const purchaseNumber = `COM-${currentYear}-${String(companyId).padStart(2, "0")}-${String(companyPurchaseCounter).padStart(4, "0")}`;
          const transactionHex = crypto.randomBytes(3).toString("hex").toUpperCase();
          const transactionId = `TX-PURCH-${currentYear}-${transactionHex}`;

          const randomPaymentMethod = availablePaymentMethods[Math.floor(Math.random() * availablePaymentMethods.length)];

          companyPurchaseCounter++;
          grandTotalPurchases++;

          // A. Registrar la Cabecera de Compra
          const newPurchase = await tx.purchase.create({
            data: {
              purchaseNumber,
              subtotal: cabeceraSubtotal,
              tax,
              discount,
              total,
              status: PurchaseStatus.COMPLETED,
              notes: `${note} | Destino: Sucursal ID ${targetBranch.id}`,
              expectedDelivery: historicalDate,
              actualDelivery: historicalDate,
              createdAt: historicalDate,
              updatedAt: historicalDate,
              buyerId: buyer.id,
              branchId: targetBranch.id,
              companyId,
              supplierId: randomSupplier.id,
            },
          });

          // B. Flujo de Transacción/Pago Asociado
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
              purchaseId: newPurchase.id,
            },
          });

          // C. Detalles e impacto en Inventario y Lotes
          for (const detail of purchaseDetailsPayload) {
            const itemSubtotal = detail.quantity * detail.costPrice;
            const batchHex = crypto.randomBytes(2).toString("hex").toUpperCase();
            const generatedBatch = `LOT-${String(currentYear).substring(2)}-${batchHex}`;

            const expDate = new Date(historicalDate);
            expDate.setFullYear(expDate.getFullYear() + 1);

            const createdDetail = await tx.purchaseDetail.create({
              data: {
                purchaseId: newPurchase.id,
                productId: detail.productId,
                quantity: detail.quantity,
                price: detail.costPrice,
                subtotal: itemSubtotal,
                tax: 0,
                batchNumber: generatedBatch,
                expirationDate: expDate,
              },
            });

            const currentInventory = await tx.inventory.findUnique({
              where: {
                productId_branchId: {
                  productId: detail.productId,
                  branchId: targetBranch.id,
                },
              },
            });

            const previousStock = currentInventory?.stock ?? 0;
            const newStock = previousStock + detail.quantity;

            const inventory = await tx.inventory.upsert({
              where: {
                productId_branchId: {
                  productId: detail.productId,
                  branchId: targetBranch.id,
                },
              },
              update: {
                stock: { increment: detail.quantity },
                lastUpdated: historicalDate,
              },
              create: {
                productId: detail.productId,
                branchId: targetBranch.id,
                companyId,
                stock: detail.quantity,
                reservedStock: 0,
                damagedStock: 0,
                lastUpdated: historicalDate,
              },
            });

            // Historial de Kárdex
            await tx.inventoryHistory.create({
              data: {
                type: "PURCHASE",
                quantity: detail.quantity,
                previousStock,
                newStock,
                reason: `Entrada por compra centralizada para sucursal ${targetBranch.id}`,
                reference: purchaseNumber,
                productId: detail.productId,
                inventoryId: inventory.id,
                branchId: targetBranch.id,
                companyId,
                createdAt: historicalDate,
              },
            });

            // Trazabilidad por Lotes Físicos
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
                branchId: targetBranch.id,
                companyId,
                createdAt: historicalDate,
                updatedAt: historicalDate,
              },
            });
          }
        },
        { timeout: 60000 },
      );

      if ((companyPurchaseCounter - 1) % 50 === 0) {
        console.log(`   ...${companyPurchaseCounter - 1}/${totalRecordsPerCompany} compras procesadas.`);
      }
    }
  }

  console.log("\n======================================================");
  console.log("✅ SEED LOGÍSTICO MULTI-SUCURSAL COMPLETADO");
  console.log(`📊 Total global inyectado: ${grandTotalPurchases} compras distribuidas.`);
  console.log("======================================================\n");
}

// Bloque de ejecución segura e independiente
if (require.main === module) {
  purchaseJsonPayloadSeed()
    .catch((e) => {
      console.error("❌ Error detectado en el proceso de seed de compras:", e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

module.exports = { purchaseJsonPayloadSeed };
