import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICustomerOrder } from 'app/shared/model/customer-order.model';
import { CustomerOrderService } from './customer-order.service';

@Component({
    selector: 'jhi-customer-order-update',
    templateUrl: './customer-order-update.component.html'
})
export class CustomerOrderUpdateComponent implements OnInit {
    private _customerOrder: ICustomerOrder;
    isSaving: boolean;
    date: string;

    constructor(private customerOrderService: CustomerOrderService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ customerOrder }) => {
            this.customerOrder = customerOrder;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.customerOrder.date = moment(this.date, DATE_TIME_FORMAT);
        if (this.customerOrder.id !== undefined) {
            this.subscribeToSaveResponse(this.customerOrderService.update(this.customerOrder));
        } else {
            this.subscribeToSaveResponse(this.customerOrderService.create(this.customerOrder));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerOrder>>) {
        result.subscribe((res: HttpResponse<ICustomerOrder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get customerOrder() {
        return this._customerOrder;
    }

    set customerOrder(customerOrder: ICustomerOrder) {
        this._customerOrder = customerOrder;
        this.date = moment(customerOrder.date).format(DATE_TIME_FORMAT);
    }
}
