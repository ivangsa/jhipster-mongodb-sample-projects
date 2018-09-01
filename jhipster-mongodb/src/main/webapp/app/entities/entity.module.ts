import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterMongodbCustomerModule } from './customer/customer.module';
import { JhipsterMongodbCustomerOrderModule } from './customer-order/customer-order.module';
import { JhipsterMongodbOrderedItemModule } from './ordered-item/ordered-item.module';
import { JhipsterMongodbPaymentDetailsModule } from './payment-details/payment-details.module';
import { JhipsterMongodbShippingDetailsModule } from './shipping-details/shipping-details.module';
import { JhipsterMongodbOrderHistoryModule } from './order-history/order-history.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        JhipsterMongodbCustomerModule,
        JhipsterMongodbCustomerOrderModule,
        JhipsterMongodbOrderedItemModule,
        JhipsterMongodbPaymentDetailsModule,
        JhipsterMongodbShippingDetailsModule,
        JhipsterMongodbOrderHistoryModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterMongodbEntityModule {}
