const { NotificationRepository } = require("../repositories/notification.repository");
const { NOTIFICATION_TYPES, PRIORITY_MAP, PRIORITIES } = require("../constants/notification.constants");
const { sendEmail } = require("../../../config/email.config");
const prisma = require("../../../prisma/client");
const {
  calculateAvailableStock,
  sortByPriority,
  removeDuplicateNotifications,
} = require("../utils/notification.utils");

const repository = new NotificationRepository();

const sendConsolidatedAlertEmail = async ({ email, name, summary }) => {
  if (!email) return;

  // Generadores dinámicos de filas HTML para las tablas
  const lowStockRows = summary.lowStock.map(item => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${item.productName}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: center;">${item.branchName}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right; color: #dc2626; font-weight: bold;">${item.stock} u. <span style="font-weight: normal; color: #64748b;">(Mín: ${item.min})</span></td>
    </tr>
  `).join("");

  const expiringRows = summary.expiring.map(item => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${item.productName} (Lote: ${item.batchNumber})</td>
      <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: center; color: #d97706; font-weight: bold;">${item.expDate}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">${item.qty} u.</td>
    </tr>
  `).join("");

  const mismatchRows = summary.mismatch.map(item => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${item.productName}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: center;">${item.branchName}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right; color: #b91c1c; font-weight: bold;">${item.damaged} u. dañadas</td>
    </tr>
  `).join("");

  return await sendEmail({
    to: email,
    subject: "📊 Reporte Diario de Alertas y Diagnóstico de Inventario",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 650px; margin: auto; border: 1px solid #cbd5e1; border-radius: 12px; background-color: #f8fafc;">
        <h2 style="color: #1e293b; margin-top: 0; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">📊 Resumen de Estado de Almacenes</h2>
        <p>Estimado(a) ${name},</p>
        <p>Te presentamos el consolidado automático de novedades críticas detectadas en el inventario de tus sucursales:</p>
        
        ${summary.lowStock.length > 0 ? `
          <div style="background: #ffffff; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #dc2626; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <h3 style="color: #991b1b; margin-top: 0;">⚠️ Productos en Stock Crítico</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <thead>
                <tr style="background-color: #fef2f2; color: #991b1b;">
                  <th style="padding: 6px; text-align: left;">Producto</th>
                  <th style="padding: 6px; text-align: center;">Sucursal</th>
                  <th style="padding: 6px; text-align: right;">Stock Actual</th>
                </tr>
              </thead>
              <tbody>
                ${lowStockRows}
              </tbody>
            </table>
          </div>
        ` : ""}

        ${summary.expiring.length > 0 ? `
          <div style="background: #ffffff; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #d97706; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <h3 style="color: #92400e; margin-top: 0;">📅 Lotes Próximos a Vencer (< 30 días)</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <thead>
                <tr style="background-color: #fffbeb; color: #92400e;">
                  <th style="padding: 6px; text-align: left;">Lote / Producto</th>
                  <th style="padding: 6px; text-align: center;">Vencimiento</th>
                  <th style="padding: 6px; text-align: right;">Cant. Lote</th>
                </tr>
              </thead>
              <tbody>
                ${expiringRows}
              </tbody>
            </table>
          </div>
        ` : ""}

        ${summary.mismatch.length > 0 ? `
          <div style="background: #ffffff; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #b91c1c; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <h3 style="color: #7f1d1d; margin-top: 0;">💥 Descuadres y Mermas Excesivas</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <thead>
                <tr style="background-color: #fdf2f2; color: #7f1d1d;">
                  <th style="padding: 6px; text-align: left;">Producto</th>
                  <th style="padding: 6px; text-align: center;">Sucursal</th>
                  <th style="padding: 6px; text-align: right;">Dañados</th>
                </tr>
              </thead>
              <tbody>
                ${mismatchRows}
              </tbody>
            </table>
          </div>
        ` : ""}

        <p style="font-size: 14px; color: #475569;">Por favor, ingresa al Panel Administrativo del sistema ERP POS para gestionar las solicitudes de compra o devoluciones correspondientes.</p>
        <br>
        <hr style="border: 0; border-top: 1px solid #cbd5e1;">
        <small style="color: #94a3b8;">Módulo de Monitoreo de Almacenes - ERP POS System</small>
      </div>
    `,
  });
};

class NotificationService {
  async getNotifications(companyId) {
    const inventories = await repository.getProductsForNotifications(companyId);

    if (!Array.isArray(inventories)) {
      console.error("❌ Inventories no es un arreglo:", inventories);
      return [];
    }

    const notifications = [];

    // Estructura colectora para el resumen por email consolidado
    const emailSummary = {
      lowStock: [],
      expiring: [],
      mismatch: [],
    };

    for (const inventory of inventories) {
      const product = inventory?.product;
      if (!product) continue;

      const availableStock = calculateAvailableStock(inventory);
      const minStockLimit = Number(product.minStock || 5);
      const branchName = inventory.branch?.name || "Principal";

      // 1. LOW STOCK
      if (availableStock <= minStockLimit) {
        notifications.push(
          this._buildNotificationStructure({
            id: `low-${inventory.id}`,
            type: NOTIFICATION_TYPES.LOW_STOCK,
            title: `${product.name} - Stock Crítico`,
            message:
              availableStock <= 0
                ? "Producto agotado por completo."
                : `Inventario bajo el mínimo (${availableStock} u. restantes)`,
            description: `El almacén de la sucursal "${branchName}" requiere reabastecimiento urgente.`,
            inventory,
            availableStock,
            minStockLimit,
          }),
        );

        emailSummary.lowStock.push({
          productName: product.name,
          branchName,
          stock: availableStock,
          min: minStockLimit,
        });
      }

      // 2. PURCHASE READY
      if (availableStock <= minStockLimit * 0.3) {
        notifications.push(
          this._buildNotificationStructure({
            id: `purchase-${inventory.id}`,
            type: NOTIFICATION_TYPES.PURCHASE_READY,
            title: `Generar Reorden: ${product.name}`,
            message: "Apto para consolidación en la siguiente orden de compra con proveedores.",
            description: `Sugerencia automática calculada para la sucursal "${branchName}".`,
            inventory,
            availableStock,
            minStockLimit,
          }),
        );
      }

      // 3. PRODUCTOS POR VENCER
      if (
        product.trackBatches &&
        Array.isArray(product.batches) &&
        product.batches.length > 0
      ) {
        const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
        const expirationLimit = new Date(Date.now() + THIRTY_DAYS);

        for (const batch of product.batches) {
          if (
            batch?.expirationDate &&
            new Date(batch.expirationDate) <= expirationLimit
          ) {
            notifications.push(
              this._buildNotificationStructure({
                id: `exp-${batch.id}`,
                type: NOTIFICATION_TYPES.EXPIRING_PRODUCT,
                title: `Lote Próximo a Vencer - #${batch.batchNumber}`,
                message: `Vencimiento programado: ${new Date(
                  batch.expirationDate,
                ).toLocaleDateString()}`,
                description: `Quedan ${batch.currentQuantity || 0} unidades en riesgo en el lote seleccionado.`,
                inventory,
                availableStock,
                minStockLimit,
              }),
            );

            emailSummary.expiring.push({
              productName: product.name,
              batchNumber: batch.batchNumber,
              expDate: new Date(batch.expirationDate).toLocaleDateString(),
              qty: batch.currentQuantity || 0,
            });
          }
        }
      }

      // 4. INVENTORY MISMATCH
      if (
        Number(inventory.damagedStock || 0) >
        Number(inventory.stock || 0) * 0.15
      ) {
        notifications.push(
          this._buildNotificationStructure({
            id: `mismatch-${inventory.id}`,
            type: NOTIFICATION_TYPES.INVENTORY_MISMATCH,
            title: `Posible Descuadre / Mermas: ${product.name}`,
            message: `Alerta física: se registran ${inventory.damagedStock || 0} unidades en estado dañado.`,
            description: `Supera el umbral de tolerancia del negocio en "${branchName}".`,
            inventory,
            availableStock,
            minStockLimit,
          }),
        );

        emailSummary.mismatch.push({
          productName: product.name,
          branchName,
          damaged: inventory.damagedStock || 0,
        });
      }
    }

    // ========================================
    // ENVÍO DE CORREO CONSOLIDADO ASÍNCRONO
    // ========================================
    const hasIssues =
      emailSummary.lowStock.length > 0 ||
      emailSummary.expiring.length > 0 ||
      emailSummary.mismatch.length > 0;

    if (hasIssues) {
      try {
        const admin = await prisma.user.findFirst({
          where: {
            companyId,
            role: "ADMIN",
          },
        });

        if (admin && admin.email) {
          await sendConsolidatedAlertEmail({
            email: admin.email,
            name: admin.name,
            summary: emailSummary,
          });
        }
      } catch (emailError) {
        console.error("⚠️ Error enviando el correo consolidado de inventario:", emailError.message || emailError);
      }
    }

    const uniqueNotifications = removeDuplicateNotifications(notifications);
    return sortByPriority(uniqueNotifications);
  }

  _buildNotificationStructure({
    id,
    type,
    title,
    message,
    description,
    inventory,
    availableStock,
    minStockLimit,
  }) {
    return {
      id,
      type,
      priority: PRIORITY_MAP[type] || PRIORITIES.LOW,
      title,
      message,
      description,
      product: {
        id: inventory.product.id,
        name: inventory.product.name,
        sku: inventory.product.sku,
        stock: availableStock,
        minStock: minStockLimit,
      },
      branch: {
        id: inventory.branch?.id,
        name: inventory.branch?.name,
      },
      timestamp: new Date().toISOString(),
      read: false,
      createdAt: new Date(),
    };
  }
}

module.exports = { NotificationService };
