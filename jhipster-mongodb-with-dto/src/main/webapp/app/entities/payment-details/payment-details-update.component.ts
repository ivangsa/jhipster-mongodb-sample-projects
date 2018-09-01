import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPaymentDetails } from 'app/shared/model/payment-details.model';
import { PaymentDetailsService } from './payment-details.service';

@Component({
    selector: 'jhi-payment-details-update',
    templateUrl: './payment-details-update.component.html'
})
export class PaymentDetailsUpdateComponent implements OnInit {
    private _paymentDetails: IPaymentDetails;
    isSaving: boolean;

    constructor(private paymentDetailsService: PaymentDetailsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ paymentDetails }) => {
            this.paymentDetails = paymentDetails;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.paymentDetails.id !== undefined) {
            this.subscribeToSaveResponse(this.paymentDetailsService.update(this.paymentDetails));
        } else {
            this.subscribeToSaveResponse(this.paymentDetailsService.create(this.paymentDetails));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPaymentDetails>>) {
        result.subscribe((res: HttpResponse<IPaymentDetails>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get paymentDetails() {
        return this._paymentDetails;
    }

    set paymentDetails(paymentDetails: IPaymentDetails) {
        this._paymentDetails = paymentDetails;
    }
}
