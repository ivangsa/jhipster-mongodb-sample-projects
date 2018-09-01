import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IOrderHistory } from 'app/shared/model/order-history.model';
import { OrderHistoryService } from './order-history.service';

@Component({
    selector: 'jhi-order-history-update',
    templateUrl: './order-history-update.component.html'
})
export class OrderHistoryUpdateComponent implements OnInit {
    private _orderHistory: IOrderHistory;
    isSaving: boolean;
    eventDate: string;

    constructor(private orderHistoryService: OrderHistoryService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ orderHistory }) => {
            this.orderHistory = orderHistory;
        });
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
    get orderHistory() {
        return this._orderHistory;
    }

    set orderHistory(orderHistory: IOrderHistory) {
        this._orderHistory = orderHistory;
        this.eventDate = moment(orderHistory.eventDate).format(DATE_TIME_FORMAT);
    }
}
