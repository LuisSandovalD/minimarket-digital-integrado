// ============================================================================
// prisma/seeds/purchase.seed.js
// OPTIMIZADO: Flujo transaccional exclusivo para "Minimarket Don Lucho"
// ============================================================================

const { PrismaClient, PurchaseStatus, PaymentStatus } = require("@prisma/client");
const crypto = require("crypto");
const prisma = new PrismaClient();

const PURCHASE_TO_PRODUCT_RATIO_MIN = 0.8;
const PURCHASE_TO_PRODUCT_RATIO_MAX = 1.3;

/**
 * Helper para generar fechas distribuidas en el rango histórico solicitado.
 * Ajustado para cubrir el periodo de 2021 a 2026 de forma uniforme.
 */
const generateHistoricalPurchaseDate = (currentStep, totalRecords) => {
  const startDate = new Date("2021-01-01T07:00:00");
  const endDate = new Date("2026-07-08T23:59:59"); // Límite de la línea de tiempo simulada

  const totalTimeRange = endDate.getTime() - startDate.getTime();
  const incrementalTime = (totalTimeRange / totalRecords) * currentStep;

  const targetDate = new Date(startDate.getTime() + incrementalTime);

  const randomHour = 7 + Math.floor(Math.random() * 9); // Horas de oficina/recibo (7 AM - 4 PM)
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
  console.log("🚀 Iniciando carga masiva histórica de Compras para Minimarket Don Lucho (2021 - 2026)...");

  // 1. Buscar la empresa en la base de datos por su slug único
  const company = await prisma.company.findFirst({
    where: { slug: "minimarket-don-lucho" },
    select: { id: true, name: true },
  });

  if (!company) {
    throw new Error(
      "❌ No se encontró la empresa con slug 'minimarket-don-lucho' en la base de datos. Ejecuta tu admin/company seed primero.",
    );
  }

  const companyId = company.id;

  // 2. Traemos las dependencias exclusivas de Don Lucho
  const allBranches = await prisma.branch.findMany({ where: { companyId }, select: { id: true } });
  const buyer = await prisma.user.findFirst({ where: { companyId }, select: { id: true } });
  const allProducts = await prisma.product.findMany({ where: { companyId }, select: { id: true } });
  const allSuppliers = await prisma.supplier.findMany({ where: { companyId }, select: { id: true } });

  // Validación para evitar fallos si el inventario previo o los catálogos están vacíos
  if (allBranches.length === 0 || !buyer || allProducts.length === 0 || allSuppliers.length === 0) {
    throw new Error(
      "❌ Faltan dependencias críticas para Don Lucho: Asegúrate de haber poblado Sucursales, Usuarios, Productos y Proveedores primero.",
    );
  }

  // 3. Métodos de Pago locales autorizados
  const paymentMethodsToSeed = [
    { name: "Efectivo Caja Chica", type: "CASH" },
    { name: "Tarjeta de Crédito Corporativa", type: "CARD" },
    { name: "Transferencia BCP/BBVA", type: "TRANSFER" },
    { name: "Billeteras Digitales (Yape/Plin)", type: "WALLET" },
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

  if (availablePaymentMethods.length === 0) {
    throw new Error("❌ No se pudieron establecer o encontrar métodos de pago activos para Don Lucho.");
  }

  const poolNotes = [
    "Abastecimiento quincenal de abarrotes de alta rotación",
    "Compra de reposición de bebidas y licores para fin de semana",
    "Pedido regular de lácteos y embutidos con cadena de frío",
    "Compra estacional de golosinas y snacks",
    "Reposición de stock de productos de limpieza e higiene",
    "Lote de urgencia por quiebre de stock en góndolas principales",
    "Pedido mensual programado - Distribución directa a almacén",
  ];

  // Determinación de cantidad de compras en base al catálogo de productos activos
  const ratio = PURCHASE_TO_PRODUCT_RATIO_MIN + Math.random() * (PURCHASE_TO_PRODUCT_RATIO_MAX - PURCHASE_TO_PRODUCT_RATIO_MIN);
  const totalPurchasesToGenerate = Math.max(50, Math.floor(allProducts.length * ratio));

  console.log(`🛒 Se generarán ${totalPurchasesToGenerate} Órdenes de Compra con trazabilidad completa...`);

  let companyPurchaseCounter = 1;
  let grandTotalPurchases = 0;

  for (let i = 0; i < totalPurchasesToGenerate; i++) {
    const randomSupplier = allSuppliers[Math.floor(Math.random() * allSuppliers.length)];
    const shuffledProducts = shuffleArray(allProducts);

    // Cada orden de compra tendrá entre 1 y 5 productos diferentes
    const detailCount = Math.floor(Math.random() * 5) + 1;
    const selectedProducts = shuffledProducts.slice(0, detailCount);
    const targetBranch = allBranches[Math.floor(Math.random() * allBranches.length)];

    // Generamos la estructura de los productos que se van a comprar
    const purchaseDetailsPayload = selectedProducts.map(p => {
      return {
        productId: p.id,
        quantity: Math.floor(Math.random() * 200) + 24, // Cantidades razonables para un minimarket (24 a 224 unidades)
        costPrice: parseFloat((Math.random() * (12 - 1.5) + 1.5).toFixed(2)), // Precios de costo realistas (S/. 1.50 - S/. 12.00)
      };
    });

    const historicalDate = generateHistoricalPurchaseDate(companyPurchaseCounter, totalPurchasesToGenerate);
    const currentYear = historicalDate.getFullYear();
    const note = poolNotes[i % poolNotes.length];

    // Transacción aislada para asegurar la consistencia del lote, Kárdex, compras e inventario
    await prisma.$transaction(
      async (tx) => {
        let cabeceraSubtotal = 0;
        for (const d of purchaseDetailsPayload) {
          cabeceraSubtotal += d.quantity * d.costPrice;
        }

        // Cálculos tributarios en Perú (IGV 18%)
        const tax = parseFloat((cabeceraSubtotal * 0.18).toFixed(2));
        const discount = cabeceraSubtotal > 1500 ? 50.00 : 0.00; // Descuento por volumen de compra
        const total = parseFloat((cabeceraSubtotal + tax - discount).toFixed(2));

        // Correlativo de orden de compra simplificado para Don Lucho (DL)
        const purchaseNumber = `COM-${currentYear}-DL-${String(companyPurchaseCounter).padStart(5, "0")}`;
        const transactionHex = crypto.randomBytes(3).toString("hex").toUpperCase();
        const transactionId = `TX-PURCH-${currentYear}-${transactionHex}`;

        const randomPaymentMethod = availablePaymentMethods[Math.floor(Math.random() * availablePaymentMethods.length)];

        companyPurchaseCounter++;
        grandTotalPurchases++;

        // A. Registrar Cabecera de Compra
        const newPurchase = await tx.purchase.create({
          data: {
            purchaseNumber,
            subtotal: cabeceraSubtotal,
            tax,
            discount,
            total,
            status: PurchaseStatus.COMPLETED,
            notes: `${note} | Sucursal Destino: ID ${targetBranch.id}`,
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

        // B. Flujo de Transacción/Pago Comercial Asociado
        await tx.payment.create({
          data: {
            amount: total,
            status: PaymentStatus.COMPLETED,
            paymentMethod: randomPaymentMethod.id,
            reference: `PAGO-${purchaseNumber}`,
            transactionId: transactionId,
            notes: `Salida de efectivo autorizada mediante ${randomPaymentMethod.name}.`,
            paidAt: historicalDate,
            createdAt: historicalDate,
            purchaseId: newPurchase.id,
          },
        });

        // C. Detalle de Compra + Actualización de Inventarios + Lotes + Kárdex
        for (const detail of purchaseDetailsPayload) {
          const itemSubtotal = detail.quantity * detail.costPrice;
          const batchHex = crypto.randomBytes(2).toString("hex").toUpperCase();
          const generatedBatch = `LOT-${String(currentYear).substring(2)}-${batchHex}`;

          // Fecha de vencimiento lógica (entre 6 meses y 1 año y medio después de la compra)
          const expDate = new Date(historicalDate);
          const monthsToAdd = Math.floor(Math.random() * 12) + 6;
          expDate.setMonth(expDate.getMonth() + monthsToAdd);

          // 1. Crear el detalle de la compra
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

          // 2. Obtener el estado actual del inventario en la sucursal seleccionada
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

          // 3. Upsert de Inventario
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

          // 4. Registrar Kárdex (Historial de Inventario) para auditoría
          await tx.inventoryHistory.create({
            data: {
              type: "PURCHASE",
              quantity: detail.quantity,
              previousStock,
              newStock,
              reason: `Entrada física por compra registrada con N° ${purchaseNumber}`,
              reference: purchaseNumber,
              productId: detail.productId,
              inventoryId: inventory.id,
              branchId: targetBranch.id,
              companyId,
              createdAt: historicalDate,
            },
          });

          // 5. Trazabilidad por Lotes Físicos (Vital para productos perecederos de minimarket)
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
      { timeout: 60000 }, // Timeout extendido para transacciones robustas
    );

    if ((companyPurchaseCounter - 1) % 50 === 0) {
      console.log(`   ...${companyPurchaseCounter - 1}/${totalPurchasesToGenerate} compras consolidadas.`);
    }
  }

  console.log("\n======================================================\n");
  console.log("✅ SEED DE COMPRAS CONSOLIDADO PARA DON LUCHO");
  console.log(`📊 Total de órdenes de compra inyectadas: ${grandTotalPurchases}`);
  console.log("======================================================\n");
}

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
