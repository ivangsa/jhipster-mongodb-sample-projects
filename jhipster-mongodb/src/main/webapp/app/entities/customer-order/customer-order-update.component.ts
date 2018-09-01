import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ICustomerOrder } from 'app/shared/model/customer-order.model';
import { CustomerOrderService } from './customer-order.service';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer';
import { IPaymentDetails } from 'app/shared/model/payment-details.model';
import { PaymentDetailsService } from 'app/entities/payment-details';
import { IShippingDetails } from 'app/shared/model/shipping-details.model';
import { ShippingDetailsService } from 'app/entities/shipping-details';
import { IOrderedItem } from 'app/shared/model/ordered-item.model';
import { OrderedItemService } from 'app/entities/ordered-item';

@Component({
    selector: 'jhi-customer-order-update',
    templateUrl: './customer-order-update.component.html'
})
export class CustomerOrderUpdateComponent implements OnInit {
    private _customerOrder: ICustomerOrder;
    isSaving: boolean;

    customers: ICustomer[];

    paymentdetails: IPaymentDetails[];

    shippingdetails: IShippingDetails[];

    ordereditems: IOrderedItem[];
    date: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private customerOrderService: CustomerOrderService,
        private customerService: CustomerService,
        private paymentDetailsService: PaymentDetailsService,
        private shippingDetailsService: ShippingDetailsService,
        private orderedItemService: OrderedItemService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ customerOrder }) => {
            this.customerOrder = customerOrder;
        });
        this.customerService.query().subscribe(
            (res: HttpResponse<ICustomer[]>) => {
                this.customers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.paymentDetailsService.query().subscribe(
            (res: HttpResponse<IPaymentDetails[]>) => {
                this.paymentdetails = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.shippingDetailsService.query().subscribe(
            (res: HttpResponse<IShippingDetails[]>) => {
                this.shippingdetails = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.orderedItemService.query().subscribe(
            (res: HttpResponse<IOrderedItem[]>) => {
                this.ordereditems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCustomerById(index: number, item: ICustomer) {
        return item.id;
    }

    trackPaymentDetailsById(index: number, item: IPaymentDetails) {
        return item.id;
    }

    trackShippingDetailsById(index: number, item: IShippingDetails) {
        return item.id;
    }

    trackOrderedItemById(index: number, item: IOrderedItem) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    get customerOrder() {
        return this._customerOrder;
    }

    set customerOrder(customerOrder: ICustomerOrder) {
        this._customerOrder = customerOrder;
        this.date = moment(customerOrder.date).format(DATE_TIME_FORMAT);
    }
}
