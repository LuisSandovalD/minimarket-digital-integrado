// ========================================
// helpers/generate-purchase-number.helper.js
// ========================================

async function generatePurchaseNumber() {

  const now = new Date();

  const year = now.getFullYear();

  const month = String(
    now.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    now.getDate()
  ).padStart(2, "0");

  return `PUR-${year}${month}${day}-${Date.now()}`;

}

module.exports = {
  generatePurchaseNumber
};