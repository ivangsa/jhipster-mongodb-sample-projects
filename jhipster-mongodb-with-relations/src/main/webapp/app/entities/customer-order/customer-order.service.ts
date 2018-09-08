import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICustomerOrder } from 'app/shared/model/customer-order.model';

type EntityResponseType = HttpResponse<ICustomerOrder>;
type EntityArrayResponseType = HttpResponse<ICustomerOrder[]>;

@Injectable({ providedIn: 'root' })
export class CustomerOrderService {
    private resourceUrl = SERVER_API_URL + 'api/customer-orders';

    constructor(private http: HttpClient) {}

    create(customerOrder: ICustomerOrder): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(customerOrder);
        return this.http
            .post<ICustomerOrder>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(customerOrder: ICustomerOrder): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(customerOrder);
        return this.http
            .put<ICustomerOrder>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<ICustomerOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICustomerOrder[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(customerOrder: ICustomerOrder): ICustomerOrder {
        const copy: ICustomerOrder = Object.assign({}, customerOrder, {
            date: customerOrder.date != null && customerOrder.date.isValid() ? customerOrder.date.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((customerOrder: ICustomerOrder) => {
            customerOrder.date = customerOrder.date != null ? moment(customerOrder.date) : null;
        });
        return res;
    }
}
