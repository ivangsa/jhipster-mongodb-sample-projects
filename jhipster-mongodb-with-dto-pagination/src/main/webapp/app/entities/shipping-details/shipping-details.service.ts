import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IShippingDetails } from 'app/shared/model/shipping-details.model';

type EntityResponseType = HttpResponse<IShippingDetails>;
type EntityArrayResponseType = HttpResponse<IShippingDetails[]>;

@Injectable({ providedIn: 'root' })
export class ShippingDetailsService {
    private resourceUrl = SERVER_API_URL + 'api/shipping-details';

    constructor(private http: HttpClient) {}

    create(shippingDetails: IShippingDetails): Observable<EntityResponseType> {
        return this.http.post<IShippingDetails>(this.resourceUrl, shippingDetails, { observe: 'response' });
    }

    update(shippingDetails: IShippingDetails): Observable<EntityResponseType> {
        return this.http.put<IShippingDetails>(this.resourceUrl, shippingDetails, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IShippingDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IShippingDetails[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
