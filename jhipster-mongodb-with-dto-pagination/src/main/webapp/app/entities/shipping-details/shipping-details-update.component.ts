import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IShippingDetails } from 'app/shared/model/shipping-details.model';
import { ShippingDetailsService } from './shipping-details.service';

@Component({
    selector: 'jhi-shipping-details-update',
    templateUrl: './shipping-details-update.component.html'
})
export class ShippingDetailsUpdateComponent implements OnInit {
    private _shippingDetails: IShippingDetails;
    isSaving: boolean;

    constructor(private shippingDetailsService: ShippingDetailsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ shippingDetails }) => {
            this.shippingDetails = shippingDetails;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.shippingDetails.id !== undefined) {
            this.subscribeToSaveResponse(this.shippingDetailsService.update(this.shippingDetails));
        } else {
            this.subscribeToSaveResponse(this.shippingDetailsService.create(this.shippingDetails));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IShippingDetails>>) {
        result.subscribe((res: HttpResponse<IShippingDetails>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get shippingDetails() {
        return this._shippingDetails;
    }

    set shippingDetails(shippingDetails: IShippingDetails) {
        this._shippingDetails = shippingDetails;
    }
}
