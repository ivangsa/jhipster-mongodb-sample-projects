import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IShippingDetails } from 'app/shared/model/shipping-details.model';

@Component({
    selector: 'jhi-shipping-details-detail',
    templateUrl: './shipping-details-detail.component.html'
})
export class ShippingDetailsDetailComponent implements OnInit {
    shippingDetails: IShippingDetails;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ shippingDetails }) => {
            this.shippingDetails = shippingDetails;
        });
    }

    previousState() {
        window.history.back();
    }
}
