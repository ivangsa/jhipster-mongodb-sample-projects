import { Moment } from 'moment';
import { ICustomerOrder } from 'app/shared/model//customer-order.model';

export const enum OrderStatus {
    CONFIRMED = 'CONFIRMED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED'
}

export interface IOrderHistory {
    id?: string;
    eventDate?: Moment;
    newStatus?: OrderStatus;
    customerOrder?: ICustomerOrder;
}

export class OrderHistory implements IOrderHistory {
    constructor(public id?: string, public eventDate?: Moment, public newStatus?: OrderStatus, public customerOrder?: ICustomerOrder) {}
}
