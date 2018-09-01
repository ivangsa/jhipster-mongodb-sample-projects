import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterMongodbEmbeddedCustomerModule } from './customer/customer.module';
import { JhipsterMongodbEmbeddedCustomerOrderModule } from './customer-order/customer-order.module';
import { JhipsterMongodbEmbeddedOrderedItemModule } from './ordered-item/ordered-item.module';
import { JhipsterMongodbEmbeddedPaymentDetailsModule } from './payment-details/payment-details.module';
import { JhipsterMongodbEmbeddedShippingDetailsModule } from './shipping-details/shipping-details.module';
import { JhipsterMongodbEmbeddedOrderHistoryModule } from './order-history/order-history.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        JhipsterMongodbEmbeddedCustomerModule,
        JhipsterMongodbEmbeddedCustomerOrderModule,
        JhipsterMongodbEmbeddedOrderedItemModule,
        JhipsterMongodbEmbeddedPaymentDetailsModule,
        JhipsterMongodbEmbeddedShippingDetailsModule,
        JhipsterMongodbEmbeddedOrderHistoryModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterMongodbEmbeddedEntityModule {}
