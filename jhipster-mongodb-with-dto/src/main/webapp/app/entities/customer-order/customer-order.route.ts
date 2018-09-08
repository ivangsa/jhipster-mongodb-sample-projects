import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerOrder } from 'app/shared/model/customer-order.model';
import { CustomerOrderService } from './customer-order.service';
import { CustomerOrderComponent } from './customer-order.component';
import { CustomerOrderDetailComponent } from './customer-order-detail.component';
import { CustomerOrderUpdateComponent } from './customer-order-update.component';
import { CustomerOrderDeletePopupComponent } from './customer-order-delete-dialog.component';
import { ICustomerOrder } from 'app/shared/model/customer-order.model';

@Injectable({ providedIn: 'root' })
export class CustomerOrderResolve implements Resolve<ICustomerOrder> {
    constructor(private service: CustomerOrderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((customerOrder: HttpResponse<CustomerOrder>) => customerOrder.body));
        }
        return of(new CustomerOrder());
    }
}

export const customerOrderRoute: Routes = [
    {
        path: 'customer-order',
        component: CustomerOrderComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'jhipsterMongodbWithDtoApp.customerOrder.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'customer-order/:id/view',
        component: CustomerOrderDetailComponent,
        resolve: {
            customerOrder: CustomerOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterMongodbWithDtoApp.customerOrder.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'customer-order/new',
        component: CustomerOrderUpdateComponent,
        resolve: {
            customerOrder: CustomerOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterMongodbWithDtoApp.customerOrder.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'customer-order/:id/edit',
        component: CustomerOrderUpdateComponent,
        resolve: {
            customerOrder: CustomerOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterMongodbWithDtoApp.customerOrder.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerOrderPopupRoute: Routes = [
    {
        path: 'customer-order/:id/delete',
        component: CustomerOrderDeletePopupComponent,
        resolve: {
            customerOrder: CustomerOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterMongodbWithDtoApp.customerOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
