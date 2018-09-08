import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrderedItem } from 'app/shared/model/ordered-item.model';
import { OrderedItemService } from './ordered-item.service';

@Component({
    selector: 'jhi-ordered-item-delete-dialog',
    templateUrl: './ordered-item-delete-dialog.component.html'
})
export class OrderedItemDeleteDialogComponent {
    orderedItem: IOrderedItem;

    constructor(
        private orderedItemService: OrderedItemService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.orderedItemService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'orderedItemListModification',
                content: 'Deleted an orderedItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ordered-item-delete-popup',
    template: ''
})
export class OrderedItemDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderedItem }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OrderedItemDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.orderedItem = orderedItem;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
