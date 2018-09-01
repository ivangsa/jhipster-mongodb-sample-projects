import { Moment } from 'moment';

export const enum OrderStatus {
    CONFIRMED = 'CONFIRMED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED'
}

export interface IOrderHistory {
    id?: string;
    eventDate?: Moment;
    newStatus?: OrderStatus;
}

export class OrderHistory implements IOrderHistory {
    constructor(public id?: string, public eventDate?: Moment, public newStatus?: OrderStatus) {}
}
