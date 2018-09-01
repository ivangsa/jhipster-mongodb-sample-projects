import { Moment } from 'moment';
import { IOrderedItem } from 'app/shared/model//ordered-item.model';

export const enum OrderStatus {
    CONFIRMED = 'CONFIRMED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED'
}

export interface ICustomerOrder {
    id?: string;
    date?: Moment;
    status?: OrderStatus;
    customerId?: number;
    paymentDetailsId?: number;
    shippingDetailsId?: number;
    orderedItems?: IOrderedItem[];
}

export class CustomerOrder implements ICustomerOrder {
    constructor(
        public id?: string,
        public date?: Moment,
        public status?: OrderStatus,
        public customerId?: number,
        public paymentDetailsId?: number,
        public shippingDetailsId?: number,
        public orderedItems?: IOrderedItem[]
    ) {}
}
