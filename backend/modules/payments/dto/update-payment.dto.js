export class UpdatePaymentDTO {
    constructor(data) {
        this.amount = data.amount
            ? Number(data.amount)
            : undefined;

        this.paymentMethod = data.paymentMethod
            ? Number(data.paymentMethod)
            : undefined;

        this.status = data.status;

        this.reference = data.reference;
        this.notes = data.notes;
        this.transactionId = data.transactionId;

        this.paidAt = data.paidAt;
        this.dueDate = data.dueDate;
    }
}