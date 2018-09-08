import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterMongodbWithDtoPaginationCustomerModule } from './customer/customer.module';
import { JhipsterMongodbWithDtoPaginationCustomerOrderModule } from './customer-order/customer-order.module';
import { JhipsterMongodbWithDtoPaginationOrderedItemModule } from './ordered-item/ordered-item.module';
import { JhipsterMongodbWithDtoPaginationPaymentDetailsModule } from './payment-details/payment-details.module';
import { JhipsterMongodbWithDtoPaginationShippingDetailsModule } from './shipping-details/shipping-details.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        JhipsterMongodbWithDtoPaginationCustomerModule,
        JhipsterMongodbWithDtoPaginationCustomerOrderModule,
        JhipsterMongodbWithDtoPaginationOrderedItemModule,
        JhipsterMongodbWithDtoPaginationPaymentDetailsModule,
        JhipsterMongodbWithDtoPaginationShippingDetailsModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterMongodbWithDtoPaginationEntityModule {}
