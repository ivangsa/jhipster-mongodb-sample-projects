import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrderHistory } from 'app/shared/model/order-history.model';
import { Principal } from 'app/core';
import { OrderHistoryService } from './order-history.service';

@Component({
    selector: 'jhi-order-history',
    templateUrl: './order-history.component.html'
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
    orderHistories: IOrderHistory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private orderHistoryService: OrderHistoryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.orderHistoryService.query().subscribe(
            (res: HttpResponse<IOrderHistory[]>) => {
                this.orderHistories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOrderHistories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOrderHistory) {
        return item.id;
    }

    registerChangeInOrderHistories() {
        this.eventSubscriber = this.eventManager.subscribe('orderHistoryListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
