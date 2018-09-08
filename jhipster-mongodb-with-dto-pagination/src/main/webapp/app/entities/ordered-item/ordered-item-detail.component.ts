import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrderedItem } from 'app/shared/model/ordered-item.model';

@Component({
    selector: 'jhi-ordered-item-detail',
    templateUrl: './ordered-item-detail.component.html'
})
export class OrderedItemDetailComponent implements OnInit {
    orderedItem: IOrderedItem;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderedItem }) => {
            this.orderedItem = orderedItem;
        });
    }

    previousState() {
        window.history.back();
    }
}
