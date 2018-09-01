import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IOrderHistory } from 'app/shared/model/order-history.model';
import { OrderHistoryService } from './order-history.service';
import { ICustomerOrder } from 'app/shared/model/customer-order.model';
import { CustomerOrderService } from 'app/entities/customer-order';

@Component({
    selector: 'jhi-order-history-update',
    templateUrl: './order-history-update.component.html'
})
export class OrderHistoryUpdateComponent implements OnInit {
    private _orderHistory: IOrderHistory;
    isSaving: boolean;

    customerorders: ICustomerOrder[];
    eventDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private orderHistoryService: OrderHistoryService,
        private customerOrderService: CustomerOrderService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ orderHistory }) => {
            this.orderHistory = orderHistory;
        });
        this.customerOrderService.query().subscribe(
            (res: HttpResponse<ICustomerOrder[]>) => {
                this.customerorders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.orderHistory.eventDate = moment(this.eventDate, DATE_TIME_FORMAT);
        if (this.orderHistory.id !== undefined) {
            this.subscribeToSaveResponse(this.orderHistoryService.update(this.orderHistory));
        } else {
            this.subscribeToSaveResponse(this.orderHistoryService.create(this.orderHistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOrderHistory>>) {
        result.subscribe((res: HttpResponse<IOrderHistory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCustomerOrderById(index: number, item: ICustomerOrder) {
        return item.id;
    }
    get orderHistory() {
        return this._orderHistory;
    }

    set orderHistory(orderHistory: IOrderHistory) {
        this._orderHistory = orderHistory;
        this.eventDate = moment(orderHistory.eventDate).format(DATE_TIME_FORMAT);
    }
}
