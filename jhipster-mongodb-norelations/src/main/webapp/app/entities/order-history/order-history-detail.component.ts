import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrderHistory } from 'app/shared/model/order-history.model';

@Component({
    selector: 'jhi-order-history-detail',
    templateUrl: './order-history-detail.component.html'
})
export class OrderHistoryDetailComponent implements OnInit {
    orderHistory: IOrderHistory;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderHistory }) => {
            this.orderHistory = orderHistory;
        });
    }

    previousState() {
        window.history.back();
    }
}
