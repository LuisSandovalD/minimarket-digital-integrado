const prisma = require("../../../prisma/client");
const { sendEmail } = require("../../../config/email.config");

const {
  createSale,
  createManyDetails,
  createManyPayments,
} = require("../repositories/sale.repository");

const {
  decreaseStockByProduct,
} = require("../../inventory/repositories/inventory.repository");

const {
  generateSaleNumber,
} = require("../helpers/generate-sale-number.helper");

const sendSaleReceiptEmail = async ({ email, name, saleNumber, invoiceType, invoiceNumber, total, details }) => {
  if (!email) return;

  const formattedTotal = new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(Number(total || 0));

  const productRows = details.map(item => {
    const itemSubtotal = new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(Number(item.quantity) * Number(item.price));

    return `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">ID Producto: ${item.productId}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">${itemSubtotal}</td>
      </tr>
    `;
  }).join("");

  return await sendEmail({
    to: email,
    subject: `Confirmación de Compra - Ticket ${saleNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #2563eb; margin-top: 0;">¡Gracias por tu compra, ${name}!</h2>
        <p>Te adjuntamos el resumen de tu transacción realizada con éxito en nuestro establecimiento:</p>
        
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #2563eb;">
          <p style="margin: 4px 0;"><strong>N° de Venta:</strong> ${saleNumber}</p>
          <p style="margin: 4px 0;"><strong>Comprobante:</strong> ${invoiceType} (${invoiceNumber})</p>
        </div>

        <h3 style="color: #1e293b;">Productos adquiridos:</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f1f5f9;">
              <th style="padding: 8px; text-align: left; font-size: 13px;">Item</th>
              <th style="padding: 8px; text-align: center; font-size: 13px;">Cant.</th>
              <th style="padding: 8px; text-align: right; font-size: 13px;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${productRows}
          </tbody>
        </table>

        <h3 style="text-align: right; color: #1e293b; margin-top: 20px;">Total cancelado: <span style="color: #2563eb;">${formattedTotal}</span></h3>
        <br>
        <hr style="border: 0; border-top: 1px solid #e2e8f0;">
        <small style="color: #64748b;">Este es un comprobante de pago electrónico automatizado por ERP POS System.</small>
      </div>
    `,
  });
};

module.exports = {
  createSaleService: async (body, user) => {
    console.time("🚀 TOTAL_PROCESS");

    const saleNumber = await generateSaleNumber();

    const subtotal = body.details.reduce(
      (acc, item) => acc + (Number(item.quantity) * Number(item.price)),
      0,
    );
    const tax = parseFloat((subtotal * 0.18).toFixed(2));
    const discount = Number(body.discount || 0);
    const total = parseFloat((subtotal + tax - discount).toFixed(2));
    const saleStatus = body.status || "COMPLETED";

    let customerEmail = body.customerEmail || null;
    let customerName = "Cliente General";

    const transactionResult = await prisma.$transaction(
      async (tx) => {
        if (body.customerId) {
          const customer = await tx.customer.findUnique({
            where: { id: Number(body.customerId) },
          });

          if (!customer) {
            throw new Error("El cliente especificado no existe.");
          }

          if (!customer.isActive) {
            throw new Error("El cliente seleccionado se encuentra inactivo.");
          }

          customerEmail = customer.email;
          customerName = customer.name;

          if (saleStatus === "CREDIT_PENDING") {
            const creditAmount = body.payments
              .filter(p => p.status === "PENDING")
              .reduce((sum, p) => sum + Number(p.amount), 0);

            const potentialDebt = Number(customer.currentDebt) + creditAmount;
            if (customer.creditLimit && potentialDebt > Number(customer.creditLimit)) {
              throw new Error(`Crédito insuficiente. La operación incrementaría la deuda a ${potentialDebt}, superando el límite de ${customer.creditLimit}.`);
            }

            if (creditAmount > 0) {
              await tx.customer.update({
                where: { id: customer.id },
                data: { currentDebt: { increment: creditAmount } },
              });
            }
          }
        } else if (saleStatus === "CREDIT_PENDING") {
          throw new Error("Para registrar una venta al crédito es obligatorio asociar un cliente (customerId).");
        }

        const sale = await createSale(
          {
            saleNumber,
            companyId: Number(user.companyId),
            branchId: Number(user.branchId),
            userId: Number(user.id),
            customerId: body.customerId ? Number(body.customerId) : null,
            subtotal,
            tax,
            discount,
            total,
            notes: body.notes || null,
            status: saleStatus,
          },
          tx,
        );

        const details = body.details.map(item => ({
          saleId: sale.id,
          productId: Number(item.productId),
          quantity: Number(item.quantity),
          price: Number(item.price),
          subtotal: parseFloat((Number(item.quantity) * Number(item.price)).toFixed(2)),
          discount: 0.00,
          tax: 0.00,
        }));

        await createManyDetails(details, tx);

        for (const item of body.details) {
          await decreaseStockByProduct(
            Number(item.productId),
            Number(item.quantity),
            tx,
          );
        }

        if (Array.isArray(body.payments) && body.payments.length > 0) {
          const payments = body.payments.map(payment => {
            const isCreditInstallment = payment.status === "PENDING";

            return {
              amount: Number(payment.amount),
              remainingAmount: isCreditInstallment ? Number(payment.amount) : 0.00,
              status: payment.status || "COMPLETED",
              paymentMethodId: Number(payment.paymentMethodId),
              reference: payment.reference || (isCreditInstallment ? `CRÉDITO-${saleNumber}` : `INICIAL-${saleNumber}`),
              transactionId: `TX-SALE-${Math.floor(100000 + Math.random() * 900000)}`,
              notes: isCreditInstallment ? "Cuenta por cobrar generada por venta al crédito." : "Ingreso de caja por cuota inicial / pago contado.",
              paidAt: isCreditInstallment ? null : new Date(),
              dueDate: payment.dueDate ? new Date(payment.dueDate) : null,
            };
          });

          await createManyPayments(sale.id, payments, tx);
        }

        return sale;
      },
      {
        maxWait: 10000,
        timeout: 20000,
      },
    );

    console.timeEnd("🚀 TOTAL_PROCESS");

    const finalResponse = {
      ...transactionResult,
      invoice: {
        invoiceNumber: `FACT-${saleNumber.split("-")[2] || saleNumber}`,
        type: body.invoiceType || "NOTA_VENTA",
        total: transactionResult.total,
      },
    };

    if (customerEmail) {
      try {
        await sendSaleReceiptEmail({
          email: customerEmail,
          name: customerName,
          saleNumber,
          invoiceType: finalResponse.invoice.type,
          invoiceNumber: finalResponse.invoice.invoiceNumber,
          total: finalResponse.invoice.total,
          details: body.details,
        });
      } catch (emailError) {
        console.error("⚠️ Falló el envío de correo informativo al cliente:", emailError.message || emailError);
      }
    }

    return finalResponse;
  },
};
