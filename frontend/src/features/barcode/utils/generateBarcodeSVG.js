// ========================================
// utils/generateBarcodeSVG.js
// ========================================

import JsBarcode from "jsbarcode";

export default function generateBarcodeSVG(barcode) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  JsBarcode(svg, barcode, {
    format: "CODE128",
    width: 1.5,
    height: 35,
    displayValue: true,
    margin: 0,
    fontSize: 10,
  });

  return svg;
}
