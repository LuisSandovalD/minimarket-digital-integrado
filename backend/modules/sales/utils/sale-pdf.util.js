// ========================================
// utils/sale-pdf.util.js
// ========================================

const PDFDocument =
  require("pdfkit");

const fs =
  require("fs");

// ========================================
// GENERATE SALE PDF
// ========================================

exports.generateSalePDF =
  async (
    sale,
    outputPath,
  ) => {

    return new Promise(
      (
        resolve,
        reject,
      ) => {

        const doc =
          new PDFDocument();

        const stream =
          fs.createWriteStream(
            outputPath,
          );

        doc.pipe(stream);

        // TITLE

        doc
          .fontSize(20)
          .text(
            "COMPROBANTE DE VENTA",
            {
              align:
                "center",
            },
          );

        doc.moveDown();

        // INFO

        doc.text(
          `N° Venta: ${sale.saleNumber}`,
        );

        doc.text(
          `Cliente: ${
            sale.customerName ||
            "Cliente General"
          }`,
        );

        doc.text(
          `Total: ${sale.total}`,
        );

        doc.moveDown();

        // DETAILS

        sale.details.forEach(
          (detail) => {

            doc.text(
              `${detail.product.name} | ${detail.quantity} x ${detail.price}`,
            );

          },
        );

        doc.end();

        stream.on(
          "finish",
          () =>
            resolve(
              outputPath,
            ),
        );

        stream.on(
          "error",
          reject,
        );

      },
    );

  };
