import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterMongodbEmbeddedSharedModule } from 'app/shared';
import {
    OrderHistoryComponent,
    OrderHistoryDetailComponent,
    OrderHistoryUpdateComponent,
    OrderHistoryDeletePopupComponent,
    OrderHistoryDeleteDialogComponent,
    orderHistoryRoute,
    orderHistoryPopupRoute
} from './';

const ENTITY_STATES = [...orderHistoryRoute, ...orderHistoryPopupRoute];

@NgModule({
    imports: [JhipsterMongodbEmbeddedSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OrderHistoryComponent,
        OrderHistoryDetailComponent,
        OrderHistoryUpdateComponent,
        OrderHistoryDeleteDialogComponent,
        OrderHistoryDeletePopupComponent
    ],
    entryComponents: [
        OrderHistoryComponent,
        OrderHistoryUpdateComponent,
        OrderHistoryDeleteDialogComponent,
        OrderHistoryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterMongodbEmbeddedOrderHistoryModule {}
