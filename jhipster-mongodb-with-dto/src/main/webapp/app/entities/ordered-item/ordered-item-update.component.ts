import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IOrderedItem } from 'app/shared/model/ordered-item.model';
import { OrderedItemService } from './ordered-item.service';

@Component({
    selector: 'jhi-ordered-item-update',
    templateUrl: './ordered-item-update.component.html'
})
export class OrderedItemUpdateComponent implements OnInit {
    private _orderedItem: IOrderedItem;
    isSaving: boolean;

    constructor(private orderedItemService: OrderedItemService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ orderedItem }) => {
            this.orderedItem = orderedItem;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.orderedItem.id !== undefined) {
            this.subscribeToSaveResponse(this.orderedItemService.update(this.orderedItem));
        } else {
            this.subscribeToSaveResponse(this.orderedItemService.create(this.orderedItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOrderedItem>>) {
        result.subscribe((res: HttpResponse<IOrderedItem>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get orderedItem() {
        return this._orderedItem;
    }

    set orderedItem(orderedItem: IOrderedItem) {
        this._orderedItem = orderedItem;
    }
}
