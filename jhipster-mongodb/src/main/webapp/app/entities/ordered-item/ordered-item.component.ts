import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrderedItem } from 'app/shared/model/ordered-item.model';
import { Principal } from 'app/core';
import { OrderedItemService } from './ordered-item.service';

@Component({
    selector: 'jhi-ordered-item',
    templateUrl: './ordered-item.component.html'
})
export class OrderedItemComponent implements OnInit, OnDestroy {
    orderedItems: IOrderedItem[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private orderedItemService: OrderedItemService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.orderedItemService.query().subscribe(
            (res: HttpResponse<IOrderedItem[]>) => {
                this.orderedItems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOrderedItems();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOrderedItem) {
        return item.id;
    }

    registerChangeInOrderedItems() {
        this.eventSubscriber = this.eventManager.subscribe('orderedItemListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
