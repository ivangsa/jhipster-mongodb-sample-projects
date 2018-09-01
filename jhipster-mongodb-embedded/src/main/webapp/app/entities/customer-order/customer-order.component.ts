import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICustomerOrder } from 'app/shared/model/customer-order.model';
import { Principal } from 'app/core';
import { CustomerOrderService } from './customer-order.service';

@Component({
    selector: 'jhi-customer-order',
    templateUrl: './customer-order.component.html'
})
export class CustomerOrderComponent implements OnInit, OnDestroy {
    customerOrders: ICustomerOrder[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private customerOrderService: CustomerOrderService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.customerOrderService.query().subscribe(
            (res: HttpResponse<ICustomerOrder[]>) => {
                this.customerOrders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCustomerOrders();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICustomerOrder) {
        return item.id;
    }

    registerChangeInCustomerOrders() {
        this.eventSubscriber = this.eventManager.subscribe('customerOrderListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
