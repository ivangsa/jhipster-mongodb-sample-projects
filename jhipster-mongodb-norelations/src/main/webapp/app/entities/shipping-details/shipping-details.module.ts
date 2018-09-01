import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterMongodbNorelationsSharedModule } from 'app/shared';
import {
    ShippingDetailsComponent,
    ShippingDetailsDetailComponent,
    ShippingDetailsUpdateComponent,
    ShippingDetailsDeletePopupComponent,
    ShippingDetailsDeleteDialogComponent,
    shippingDetailsRoute,
    shippingDetailsPopupRoute
} from './';

const ENTITY_STATES = [...shippingDetailsRoute, ...shippingDetailsPopupRoute];

@NgModule({
    imports: [JhipsterMongodbNorelationsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ShippingDetailsComponent,
        ShippingDetailsDetailComponent,
        ShippingDetailsUpdateComponent,
        ShippingDetailsDeleteDialogComponent,
        ShippingDetailsDeletePopupComponent
    ],
    entryComponents: [
        ShippingDetailsComponent,
        ShippingDetailsUpdateComponent,
        ShippingDetailsDeleteDialogComponent,
        ShippingDetailsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterMongodbNorelationsShippingDetailsModule {}
