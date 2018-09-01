/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterMongodbWithDtoPaginationTestModule } from '../../../test.module';
import { OrderHistoryDeleteDialogComponent } from 'app/entities/order-history/order-history-delete-dialog.component';
import { OrderHistoryService } from 'app/entities/order-history/order-history.service';

describe('Component Tests', () => {
    describe('OrderHistory Management Delete Component', () => {
        let comp: OrderHistoryDeleteDialogComponent;
        let fixture: ComponentFixture<OrderHistoryDeleteDialogComponent>;
        let service: OrderHistoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMongodbWithDtoPaginationTestModule],
                declarations: [OrderHistoryDeleteDialogComponent]
            })
                .overrideTemplate(OrderHistoryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrderHistoryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderHistoryService);
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
