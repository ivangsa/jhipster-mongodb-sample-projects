import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IShippingDetails } from 'app/shared/model/shipping-details.model';
import { ShippingDetailsService } from './shipping-details.service';

@Component({
    selector: 'jhi-shipping-details-delete-dialog',
    templateUrl: './shipping-details-delete-dialog.component.html'
})
export class ShippingDetailsDeleteDialogComponent {
    shippingDetails: IShippingDetails;

    constructor(
        private shippingDetailsService: ShippingDetailsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.shippingDetailsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'shippingDetailsListModification',
                content: 'Deleted an shippingDetails'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-shipping-details-delete-popup',
    template: ''
})
export class ShippingDetailsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ shippingDetails }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ShippingDetailsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.shippingDetails = shippingDetails;
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
