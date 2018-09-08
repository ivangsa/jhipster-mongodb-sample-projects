export interface IPaymentDetails {
    id?: string;
    creditCardNumber?: string;
}

export class PaymentDetails implements IPaymentDetails {
    constructor(public id?: string, public creditCardNumber?: string) {}
}
