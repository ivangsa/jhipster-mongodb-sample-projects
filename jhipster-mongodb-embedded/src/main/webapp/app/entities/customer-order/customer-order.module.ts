import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterMongodbEmbeddedSharedModule } from 'app/shared';
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
    imports: [JhipsterMongodbEmbeddedSharedModule, RouterModule.forChild(ENTITY_STATES)],
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
export class JhipsterMongodbEmbeddedCustomerOrderModule {}
