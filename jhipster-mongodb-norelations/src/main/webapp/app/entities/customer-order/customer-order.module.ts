import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterMongodbNorelationsSharedModule } from 'app/shared';
import {
    CustomerOrderComponent,
    CustomerOrderDetailComponent,
    CustomerOrderUpdateComponent,
    CustomerOrderDeletePopupComponent,
    CustomerOrderDeleteDialogComponent,
    customerOrderRoute,
    customerOrderPopupRoute
} from './';

const ENTITY_STATES = [...customerOrderRoute, ...customerOrderPopupRoute];

@NgModule({
    imports: [JhipsterMongodbNorelationsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CustomerOrderComponent,
        CustomerOrderDetailComponent,
        CustomerOrderUpdateComponent,
        CustomerOrderDeleteDialogComponent,
        CustomerOrderDeletePopupComponent
    ],
    entryComponents: [
        CustomerOrderComponent,
        CustomerOrderUpdateComponent,
        CustomerOrderDeleteDialogComponent,
        CustomerOrderDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterMongodbNorelationsCustomerOrderModule {}
