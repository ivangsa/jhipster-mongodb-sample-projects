import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model//customer.model';
import { IPaymentDetails } from 'app/shared/model//payment-details.model';
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
    customer?: ICustomer;
    paymentDetails?: IPaymentDetails;
    shippingDetails?: IShippingDetails;
    orderedItems?: IOrderedItem[];
}

export class CustomerOrder implements ICustomerOrder {
    constructor(
        public id?: string,
        public date?: Moment,
        public status?: OrderStatus,
        public customer?: ICustomer,
        public paymentDetails?: IPaymentDetails,
        public shippingDetails?: IShippingDetails,
        public orderedItems?: IOrderedItem[]
    ) {}
}
