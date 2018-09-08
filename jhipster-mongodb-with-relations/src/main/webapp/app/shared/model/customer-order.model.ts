import { Moment } from 'moment';
import { IPaymentDetails } from 'app/shared/model//payment-details.model';
import { ICustomer } from 'app/shared/model//customer.model';
import { IShippingDetails } from 'app/shared/model//shipping-details.model';
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
    paymentDetails?: IPaymentDetails;
    customer?: ICustomer;
    shippingDetails?: IShippingDetails;
    orderedItems?: IOrderedItem[];
}

export class CustomerOrder implements ICustomerOrder {
    constructor(
        public id?: string,
        public date?: Moment,
        public status?: OrderStatus,
        public paymentDetails?: IPaymentDetails,
        public customer?: ICustomer,
        public shippingDetails?: IShippingDetails,
        public orderedItems?: IOrderedItem[]
    ) {}
}
