export class CreatePaymentDTO {
    constructor(data) {
        this.amount = Number(data.amount);
        this.paymentMethod = Number(data.paymentMethod);

        this.status = data.status || "COMPLETED";

        this.reference = data.reference || null;
        this.notes = data.notes || null;
        this.transactionId = data.transactionId || null;

        this.paidAt = data.paidAt || null;
        this.dueDate = data.dueDate || null;

        this.saleId = data.saleId || null;
        this.purchaseId = data.purchaseId || null;
    }
}