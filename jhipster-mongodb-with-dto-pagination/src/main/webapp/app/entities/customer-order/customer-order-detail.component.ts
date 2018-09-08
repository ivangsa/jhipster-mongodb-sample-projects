import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustomerOrder } from 'app/shared/model/customer-order.model';

@Component({
    selector: 'jhi-customer-order-detail',
    templateUrl: './customer-order-detail.component.html'
})
export class CustomerOrderDetailComponent implements OnInit {
    customerOrder: ICustomerOrder;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ customerOrder }) => {
            this.customerOrder = customerOrder;
        });
    }

    previousState() {
        window.history.back();
    }
}
