import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPaymentDetails } from 'app/shared/model/payment-details.model';
import { PaymentDetailsService } from './payment-details.service';

@Component({
    selector: 'jhi-payment-details-delete-dialog',
    templateUrl: './payment-details-delete-dialog.component.html'
})
export class PaymentDetailsDeleteDialogComponent {
    paymentDetails: IPaymentDetails;

    constructor(
        private paymentDetailsService: PaymentDetailsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.paymentDetailsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'paymentDetailsListModification',
                content: 'Deleted an paymentDetails'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-payment-details-delete-popup',
    template: ''
})
export class PaymentDetailsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ paymentDetails }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PaymentDetailsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.paymentDetails = paymentDetails;
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
