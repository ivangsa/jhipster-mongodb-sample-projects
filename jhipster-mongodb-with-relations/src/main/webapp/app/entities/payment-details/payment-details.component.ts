import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPaymentDetails } from 'app/shared/model/payment-details.model';
import { Principal } from 'app/core';
import { PaymentDetailsService } from './payment-details.service';

@Component({
    selector: 'jhi-payment-details',
    templateUrl: './payment-details.component.html'
})
export class PaymentDetailsComponent implements OnInit, OnDestroy {
    paymentDetails: IPaymentDetails[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private paymentDetailsService: PaymentDetailsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.paymentDetailsService.query().subscribe(
            (res: HttpResponse<IPaymentDetails[]>) => {
                this.paymentDetails = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPaymentDetails();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPaymentDetails) {
        return item.id;
    }

    registerChangeInPaymentDetails() {
        this.eventSubscriber = this.eventManager.subscribe('paymentDetailsListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
