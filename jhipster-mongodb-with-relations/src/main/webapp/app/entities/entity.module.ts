import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterMongodbWithRelationsCustomerModule } from './customer/customer.module';
import { JhipsterMongodbWithRelationsCustomerOrderModule } from './customer-order/customer-order.module';
import { JhipsterMongodbWithRelationsOrderedItemModule } from './ordered-item/ordered-item.module';
import { JhipsterMongodbWithRelationsPaymentDetailsModule } from './payment-details/payment-details.module';
import { JhipsterMongodbWithRelationsShippingDetailsModule } from './shipping-details/shipping-details.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        JhipsterMongodbWithRelationsCustomerModule,
        JhipsterMongodbWithRelationsCustomerOrderModule,
        JhipsterMongodbWithRelationsOrderedItemModule,
        JhipsterMongodbWithRelationsPaymentDetailsModule,
        JhipsterMongodbWithRelationsShippingDetailsModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterMongodbWithRelationsEntityModule {}
