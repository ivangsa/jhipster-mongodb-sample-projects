import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterMongodbNorelationsCustomerModule } from './customer/customer.module';
import { JhipsterMongodbNorelationsCustomerOrderModule } from './customer-order/customer-order.module';
import { JhipsterMongodbNorelationsOrderedItemModule } from './ordered-item/ordered-item.module';
import { JhipsterMongodbNorelationsPaymentDetailsModule } from './payment-details/payment-details.module';
import { JhipsterMongodbNorelationsShippingDetailsModule } from './shipping-details/shipping-details.module';
import { JhipsterMongodbNorelationsOrderHistoryModule } from './order-history/order-history.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        JhipsterMongodbNorelationsCustomerModule,
        JhipsterMongodbNorelationsCustomerOrderModule,
        JhipsterMongodbNorelationsOrderedItemModule,
        JhipsterMongodbNorelationsPaymentDetailsModule,
        JhipsterMongodbNorelationsShippingDetailsModule,
        JhipsterMongodbNorelationsOrderHistoryModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterMongodbNorelationsEntityModule {}
