/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterMongodbWithDtoPaginationTestModule } from '../../../test.module';
import { OrderedItemDeleteDialogComponent } from 'app/entities/ordered-item/ordered-item-delete-dialog.component';
import { OrderedItemService } from 'app/entities/ordered-item/ordered-item.service';

describe('Component Tests', () => {
    describe('OrderedItem Management Delete Component', () => {
        let comp: OrderedItemDeleteDialogComponent;
        let fixture: ComponentFixture<OrderedItemDeleteDialogComponent>;
        let service: OrderedItemService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMongodbWithDtoPaginationTestModule],
                declarations: [OrderedItemDeleteDialogComponent]
            })
                .overrideTemplate(OrderedItemDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrderedItemDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderedItemService);
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
