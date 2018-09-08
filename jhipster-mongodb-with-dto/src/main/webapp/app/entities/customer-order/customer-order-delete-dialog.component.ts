import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICustomerOrder } from 'app/shared/model/customer-order.model';
import { CustomerOrderService } from './customer-order.service';

@Component({
    selector: 'jhi-customer-order-delete-dialog',
    templateUrl: './customer-order-delete-dialog.component.html'
})
export class CustomerOrderDeleteDialogComponent {
    customerOrder: ICustomerOrder;

    constructor(
        private customerOrderService: CustomerOrderService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.customerOrderService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'customerOrderListModification',
                content: 'Deleted an customerOrder'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-customer-order-delete-popup',
    template: ''
})
export class CustomerOrderDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ customerOrder }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CustomerOrderDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.customerOrder = customerOrder;
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
