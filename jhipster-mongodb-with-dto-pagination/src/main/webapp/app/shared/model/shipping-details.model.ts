export interface IShippingDetails {
    id?: string;
    address?: string;
}

export class ShippingDetails implements IShippingDetails {
    constructor(public id?: string, public address?: string) {}
}
