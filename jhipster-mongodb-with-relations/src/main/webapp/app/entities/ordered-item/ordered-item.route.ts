import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderedItem } from 'app/shared/model/ordered-item.model';
import { OrderedItemService } from './ordered-item.service';
import { OrderedItemComponent } from './ordered-item.component';
import { OrderedItemDetailComponent } from './ordered-item-detail.component';
import { OrderedItemUpdateComponent } from './ordered-item-update.component';
import { OrderedItemDeletePopupComponent } from './ordered-item-delete-dialog.component';
import { IOrderedItem } from 'app/shared/model/ordered-item.model';

@Injectable({ providedIn: 'root' })
export class OrderedItemResolve implements Resolve<IOrderedItem> {
    constructor(private service: OrderedItemService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((orderedItem: HttpResponse<OrderedItem>) => orderedItem.body));
        }
        return of(new OrderedItem());
    }
}

export const orderedItemRoute: Routes = [
    {
        path: 'ordered-item',
        component: OrderedItemComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterMongodbWithRelationsApp.orderedItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ordered-item/:id/view',
        component: OrderedItemDetailComponent,
        resolve: {
            orderedItem: OrderedItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterMongodbWithRelationsApp.orderedItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ordered-item/new',
        component: OrderedItemUpdateComponent,
        resolve: {
            orderedItem: OrderedItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterMongodbWithRelationsApp.orderedItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ordered-item/:id/edit',
        component: OrderedItemUpdateComponent,
        resolve: {
            orderedItem: OrderedItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterMongodbWithRelationsApp.orderedItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderedItemPopupRoute: Routes = [
    {
        path: 'ordered-item/:id/delete',
        component: OrderedItemDeletePopupComponent,
        resolve: {
            orderedItem: OrderedItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterMongodbWithRelationsApp.orderedItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
