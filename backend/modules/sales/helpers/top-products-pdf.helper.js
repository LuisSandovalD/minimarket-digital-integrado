const PDFDocument = require("pdfkit");

exports.generateTopProductsPDF = ({ report, company, img }) => {
  const doc = new PDFDocument({ size: "A4", margin: 40 });
  const headerX = img?.buffer ? 110 : 40;
  const headerY = 45;

  if (img?.buffer) {
    try {
      doc.image(img.buffer, 40, 40, { width: 60 });
    } catch (_) {
      /* Se ignora el fallo si la imagen está corrupta o no es válida */
    }
  }

  if (company) {
    doc.fontSize(14).font("Helvetica-Bold").text(company.name || "", headerX, headerY);
    doc.fontSize(10).font("Helvetica").text(`RUC: ${company.ruc || ""}`, headerX, headerY + 18);
  }

  doc.fontSize(16).font("Helvetica-Bold").text("Top Productos", { align: "center" });
  doc.moveDown(1);

  const pageWidth2 = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  const colW = { name: pageWidth2 - 150, qty: 60, total: 90 };
  let y2 = doc.y;

  const drawHeaders = (yPos) => {
    doc.rect(doc.x, yPos, pageWidth2, 20).fill("#0f172a");
    doc.fillColor("#fff").fontSize(10).font("Helvetica-Bold");
    doc.text("Producto", doc.x + 4, yPos + 4, { width: colW.name - 8 });
    doc.text("Cantidad", doc.x + colW.name + 4, yPos + 4, { width: colW.qty - 8, align: "right" });
    doc.text("Total", doc.x + colW.name + colW.qty + 4, yPos + 4, { width: colW.total - 8, align: "right" });
    return yPos + 26;
  };

  y2 = drawHeaders(y2);
  doc.font("Helvetica").fontSize(10).fillColor("#000");

  let qtySum = 0;
  let totSum = 0;

  for (const row of report) {
    if (y2 > doc.page.height - doc.page.margins.bottom - 40) {
      doc.addPage();
      y2 = drawHeaders(doc.y);
      doc.font("Helvetica").fontSize(10).fillColor("#000");
    }

    doc.moveTo(doc.x, y2 - 4).strokeColor("#e5e7eb").lineWidth(0.5).stroke();

    const name = row.productName || row.name || "";
    const qty = Number(row.quantity || row.count || 0);
    const total = Number(row.total || row.amount || 0);
    qtySum += qty;
    totSum += total;

    doc.fillColor("#1f2937").text(name, doc.x + 4, y2, { width: colW.name - 8 });
    doc.text(String(qty), doc.x + colW.name + 4, y2, { width: colW.qty - 8, align: "right" });
    doc.fillColor("#000").font("Helvetica-Bold").text(new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(total), doc.x + colW.name + colW.qty + 4, y2, { width: colW.total - 8, align: "right" });
    doc.font("Helvetica");

    y2 += 18;
  }

  doc.moveTo(doc.x, y2 + 4).strokeColor("#9ca3af").lineWidth(1).stroke();
  doc.font("Helvetica-Bold").text("Totales", doc.x + 4, y2 + 8, { width: colW.name - 8 });
  doc.text(String(qtySum), doc.x + colW.name + 4, y2 + 8, { width: colW.qty - 8, align: "right" });
  doc.text(new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(totSum), doc.x + colW.name + colW.qty + 4, y2 + 8, { width: colW.total - 8, align: "right" });

  doc.end();
  return doc;
};
