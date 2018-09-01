import { Moment } from 'moment';

export const enum OrderStatus {
    CONFIRMED = 'CONFIRMED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED'
}

export interface ICustomerOrder {
    id?: string;
    date?: Moment;
    status?: OrderStatus;
}

export class CustomerOrder implements ICustomerOrder {
    constructor(public id?: string, public date?: Moment, public status?: OrderStatus) {}
}
