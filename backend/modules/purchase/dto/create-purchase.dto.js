function createPurchaseDto(body) {

  return {

    supplierId:
      body.supplierId || null,

    branchId:
      body.branchId,

    companyId:
      body.companyId,

    buyerId:
      body.buyerId,

    notes:
      body.notes || null,

    expectedDelivery:
      body.expectedDelivery || null,

    details:
      body.details

  };

}

module.exports = {
  createPurchaseDto
};