export interface IOrderedItem {
    id?: string;
    catalogItemId?: number;
    name?: string;
    price?: number;
    quantity?: number;
}

export class OrderedItem implements IOrderedItem {
    constructor(public id?: string, public catalogItemId?: number, public name?: string, public price?: number, public quantity?: number) {}
}
