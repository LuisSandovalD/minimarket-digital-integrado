function purchaseResponseDto(
  purchase
) {

  return {

    id:
      purchase.id,

    purchaseNumber:
      purchase.purchaseNumber,

    subtotal:
      purchase.subtotal,

    tax:
      purchase.tax,

    total:
      purchase.total,

    status:
      purchase.status,

    supplier:
      purchase.supplier,

    buyer:
      purchase.buyer,

    branch:
      purchase.branch,

    details:
      purchase.details,

    createdAt:
      purchase.createdAt

  };

}

module.exports = {
  purchaseResponseDto
};