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
  paymentDetailsCreditCardNumber?: string;
  paymentDetailsId?: string;
  customerUsername?: string;
  customerId?: string;
  shippingDetailsAddress?: string;
  shippingDetailsId?: string;
  orderedItems?: IOrderedItem[];
}

export const defaultValue: Readonly<ICustomerOrder> = {};
