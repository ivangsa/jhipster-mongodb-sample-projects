import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPaymentDetails } from 'app/shared/model/payment-details.model';

@Component({
    selector: 'jhi-payment-details-detail',
    templateUrl: './payment-details-detail.component.html'
})
export class PaymentDetailsDetailComponent implements OnInit {
    paymentDetails: IPaymentDetails;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ paymentDetails }) => {
            this.paymentDetails = paymentDetails;
        });
    }

    previousState() {
        window.history.back();
    }
}
