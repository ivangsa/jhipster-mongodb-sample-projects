import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterMongodbWithDtoCustomerModule } from './customer/customer.module';
import { JhipsterMongodbWithDtoCustomerOrderModule } from './customer-order/customer-order.module';
import { JhipsterMongodbWithDtoOrderedItemModule } from './ordered-item/ordered-item.module';
import { JhipsterMongodbWithDtoPaymentDetailsModule } from './payment-details/payment-details.module';
import { JhipsterMongodbWithDtoShippingDetailsModule } from './shipping-details/shipping-details.module';
import { JhipsterMongodbWithDtoOrderHistoryModule } from './order-history/order-history.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        JhipsterMongodbWithDtoCustomerModule,
        JhipsterMongodbWithDtoCustomerOrderModule,
        JhipsterMongodbWithDtoOrderedItemModule,
        JhipsterMongodbWithDtoPaymentDetailsModule,
        JhipsterMongodbWithDtoShippingDetailsModule,
        JhipsterMongodbWithDtoOrderHistoryModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterMongodbWithDtoEntityModule {}
