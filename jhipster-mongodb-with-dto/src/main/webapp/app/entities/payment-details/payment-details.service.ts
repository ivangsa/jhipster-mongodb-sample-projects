import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPaymentDetails } from 'app/shared/model/payment-details.model';

type EntityResponseType = HttpResponse<IPaymentDetails>;
type EntityArrayResponseType = HttpResponse<IPaymentDetails[]>;

@Injectable({ providedIn: 'root' })
export class PaymentDetailsService {
    private resourceUrl = SERVER_API_URL + 'api/payment-details';

    constructor(private http: HttpClient) {}

    create(paymentDetails: IPaymentDetails): Observable<EntityResponseType> {
        return this.http.post<IPaymentDetails>(this.resourceUrl, paymentDetails, { observe: 'response' });
    }

    update(paymentDetails: IPaymentDetails): Observable<EntityResponseType> {
        return this.http.put<IPaymentDetails>(this.resourceUrl, paymentDetails, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IPaymentDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPaymentDetails[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
