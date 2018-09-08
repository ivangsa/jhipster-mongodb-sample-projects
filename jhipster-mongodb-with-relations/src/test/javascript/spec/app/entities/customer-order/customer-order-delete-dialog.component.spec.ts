/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterMongodbWithRelationsTestModule } from '../../../test.module';
import { CustomerOrderDeleteDialogComponent } from 'app/entities/customer-order/customer-order-delete-dialog.component';
import { CustomerOrderService } from 'app/entities/customer-order/customer-order.service';

describe('Component Tests', () => {
    describe('CustomerOrder Management Delete Component', () => {
        let comp: CustomerOrderDeleteDialogComponent;
        let fixture: ComponentFixture<CustomerOrderDeleteDialogComponent>;
        let service: CustomerOrderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMongodbWithRelationsTestModule],
                declarations: [CustomerOrderDeleteDialogComponent]
            })
                .overrideTemplate(CustomerOrderDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CustomerOrderDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerOrderService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete('123');
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith('123');
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
