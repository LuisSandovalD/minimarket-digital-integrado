// ========================================
// features/sales/components/modals/BillingModal.jsx
// ========================================
import { Download, Eye, MessageSquare, Receipt } from "lucide-react";

import { ModernButton } from "@/components/buttons";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays/";

const fPrice = (v) => new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(Number(v || 0));

// Incluye fecha y hora. Si no llega "d" (createdAt undefined), usa la fecha/hora actual.
const fDate = (d) => {
  const date = d ? new Date(d) : new Date();
  return date.toLocaleString("es-PE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function BillingModal({ open, onClose, sale, onConfirmBilling }) {
  if (!open || !sale) return null;

  const items = sale.details || [];

  const totalNeto = Number(sale.total || 0);
  const subtotalGravado = totalNeto / 1.18;
  const igvCalculado = totalNeto - subtotalGravado;

  // ========================================
  // IMPRESIÓN ESPECÍFICA MEDIANTE IFRAME OCULTO
  // ========================================
  const handlePrintSpecific = () => {
    const ticketHtml = document.getElementById("ticket-print-area").innerHTML;

    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0px";
    iframe.style.height = "0px";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`
      <html>
        <head>
          <title>Ticket N° ${sale.saleNumber}</title>
          <style>
            body {
              font-family: monospace;
              font-size: 12px;
              color: #000;
              background: #fff;
              margin: 0;
              padding: 10px;
              width: 80mm;
            }
            .text-center { text-align: center; }
            .space-y-1 > * + * { margin-top: 4px; }
            .border-b { border-bottom: 1px dashed #000; }
            .border-t { border-top: 1px dashed #000; }
            .py-2 { padding-top: 8px; padding-bottom: 8px; }
            .pt-2 { padding-top: 8px; }
            .pb-2 { padding-bottom: 8px; }
            .flex { display: flex; }
            .justify-between { justify-content: space-between; }
            .w-1/2 { width: 50%; }
            .w-1/6 { width: 16.66%; text-align: center; }
            .w-1/3 { width: 33.33%; text-align: right; }
            .ml-auto { margin-left: auto; }
            .w-32 { width: 130px; }
            .font-bold { font-weight: bold; }
            .truncate { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          </style>
        </head>
        <body>
          ${ticketHtml}
        </body>
      </html>
    `);
    iframeDoc.close();

    iframe.contentWindow.focus();
    setTimeout(() => {
      iframe.contentWindow.print();
      document.body.removeChild(iframe);
    }, 500);
  };

  // ========================================
  // ENVÍO DE TEXTO ESTRUCTURADO A WHATSAPP
  // ========================================
  const handleSendWhatsApp = () => {
    const enterpriseName = "NUESTRO ALMACÉN S.A.C.";
    const customerName = sale.customer?.name || "Cliente General";

    let message = `*${enterpriseName}* 🧾\n`;
    message += `*Comprobante:* N° ${sale.saleNumber}\n`;
    message += `*Fecha:* ${fDate(sale.createdAt)}\n`;
    message += `*Cliente:* ${customerName}\n`;
    if (sale.customer?.documentNumber) {
      message += `*${sale.customer.documentType || "DOC"}:* ${sale.customer.documentNumber}\n`;
    }
    message += `\n📦 *DETALLE DE COMPRA:*\n`;

    items.forEach((item) => {
      message += `• ${item.product?.name || "Prod"} (x${item.quantity}) - ${fPrice(item.subtotal)}\n`;
    });

    message += `\n*TOTAL NETO:* ${fPrice(totalNeto)}\n\n`;
    message += `🔗 _Visualice su comprobante digital aquí:_ ${window.location.origin}/sales/preview/${sale.id}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${sale.customer?.phone || ""}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    if (onConfirmBilling) {
      onConfirmBilling({ saleId: sale.id, action: "SEND_WHATSAPP" });
    }
  };

  return (
    <Modal open={open} onClose={onClose} size="sm">
      <HeaderModal
        onClose={onClose}
        title={`Comprobante N° ${sale.saleNumber}`}
        subtitle="Estación de Despacho Específica"
        icon={Receipt}
      />

      <div className="p-4 max-h-[70vh] overflow-y-auto text-xs text-slate-600 dark:text-slate-300">
        <div className="space-y-3">
          <ModernButton
            type="button"
            onClick={handlePrintSpecific}
            icon={Download}
            text="Guardar PDF / Imprimir Ticket"
            fullWidth
          />

          <p className="font-bold uppercase text-[10px] text-slate-400 tracking-wider flex items-center gap-1 justify-center">
            <Eye size={12} /> Vista Previa del Comprobante
          </p>

          {/* Ticket angosto, centrado, estilo 80mm */}
          <div
            id="ticket-print-area"
            className="bg-white text-slate-900 px-5 py-4 rounded-lg border border-dashed border-slate-300 shadow-sm font-mono text-[11px] space-y-3 dark:bg-white dark:text-slate-900"
          >
            <div className="text-center pb-2 border-b border-dashed border-slate-300">
              <h4 className="font-bold uppercase">NUESTRO ALMACÉN S.A.C.</h4>
              <p style={{ fontSize: "10px", color: "#666" }}>RUC: 20123456789</p>
              <p style={{ fontSize: "9px", color: "#999" }}>Lima, Perú</p>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Ticket</span>
                <span className="font-bold">{sale.saleNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Fecha</span>
                <span>{fDate(sale.createdAt)}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500 shrink-0">Cliente</span>
                <span className="truncate text-right">{sale.customer?.name || "Cliente General"}</span>
              </div>
              {sale.customer?.documentNumber && (
                <div className="flex justify-between">
                  <span className="text-slate-500">{sale.customer.documentType || "RUC"}</span>
                  <span>{sale.customer.documentNumber}</span>
                </div>
              )}
            </div>

            <div className="border-t border-b border-dashed border-slate-300 py-2 space-y-1">
              <div className="flex justify-between font-bold text-slate-400 text-[10px]">
                <span className="w-1/2">CONCEPTO</span>
                <span className="w-1/6 text-center">CANT</span>
                <span className="w-1/3 text-right">TOTAL</span>
              </div>
              {items.map((item, idx) => (
                <div key={item.id || idx} className="flex justify-between items-start">
                  <span className="w-1/2 truncate font-medium">{item.product?.name || "Producto"}</span>
                  <span className="w-1/6 text-center">x{item.quantity}</span>
                  <span className="w-1/3 text-right font-bold">{fPrice(item.subtotal)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-slate-500">
                <span>Gravada</span>
                <span>{fPrice(subtotalGravado)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>IGV (18%)</span>
                <span>{fPrice(igvCalculado)}</span>
              </div>
              <div className="flex justify-between border-t border-dashed border-slate-300 pt-1.5 mt-1.5 font-bold text-[13px]">
                <span>TOTAL</span>
                <span style={{ color: "#047857" }}>{fPrice(totalNeto)}</span>
              </div>
            </div>

            <div
              className="text-center pt-2 border-t border-dashed border-slate-300"
              style={{ fontSize: "9px", color: "#999" }}
            >
              Gracias por su preferencia comercial.
            </div>
          </div>
        </div>
      </div>

      <FooterModal>
        <div className="flex justify-end gap-2">
          <ModernButton variant="ghost" text="Cerrar Panel" onClick={onClose} />
          <ModernButton
            icon={MessageSquare}
            text="Enviar por WhatsApp Web"
            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
            onClick={handleSendWhatsApp}
          />
        </div>
      </FooterModal>
    </Modal>
  );
}
