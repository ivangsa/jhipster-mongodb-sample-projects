import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrderedItem } from 'app/shared/model/ordered-item.model';

type EntityResponseType = HttpResponse<IOrderedItem>;
type EntityArrayResponseType = HttpResponse<IOrderedItem[]>;

@Injectable({ providedIn: 'root' })
export class OrderedItemService {
    private resourceUrl = SERVER_API_URL + 'api/ordered-items';

    constructor(private http: HttpClient) {}

    create(orderedItem: IOrderedItem): Observable<EntityResponseType> {
        return this.http.post<IOrderedItem>(this.resourceUrl, orderedItem, { observe: 'response' });
    }

    update(orderedItem: IOrderedItem): Observable<EntityResponseType> {
        return this.http.put<IOrderedItem>(this.resourceUrl, orderedItem, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IOrderedItem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOrderedItem[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
