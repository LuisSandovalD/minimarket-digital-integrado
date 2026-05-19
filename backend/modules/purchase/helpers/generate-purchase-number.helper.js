const prisma =
  require("../../../prisma/client");

async function generatePurchaseNumber() {

  const count =
    await prisma.purchase.count();

  const correlativo =
    String(count + 1).padStart(5, "0");

  const date =
    new Date();

  const year =
    date.getFullYear();

  const month =
    String(date.getMonth() + 1)
      .padStart(2, "0");

  const day =
    String(date.getDate())
      .padStart(2, "0");

  return `PUR-${year}${month}${day}-${correlativo}`;

}

module.exports = {
  generatePurchaseNumber
};