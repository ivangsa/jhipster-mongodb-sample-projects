import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model//customer.model';
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
    paymentDetails?: any;
    shippingDetails?: any;
    customer?: ICustomer;
    orderedItems?: IOrderedItem[];
}

export class CustomerOrder implements ICustomerOrder {
    constructor(
        public id?: string,
        public date?: Moment,
        public status?: OrderStatus,
        public paymentDetails?: any,
        public shippingDetails?: any,
        public customer?: ICustomer,
        public orderedItems?: IOrderedItem[]
    ) {}
}
