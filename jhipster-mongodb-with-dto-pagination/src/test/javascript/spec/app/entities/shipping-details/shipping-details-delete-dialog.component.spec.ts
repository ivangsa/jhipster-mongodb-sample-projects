/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterMongodbWithDtoPaginationTestModule } from '../../../test.module';
import { ShippingDetailsDeleteDialogComponent } from 'app/entities/shipping-details/shipping-details-delete-dialog.component';
import { ShippingDetailsService } from 'app/entities/shipping-details/shipping-details.service';

describe('Component Tests', () => {
    describe('ShippingDetails Management Delete Component', () => {
        let comp: ShippingDetailsDeleteDialogComponent;
        let fixture: ComponentFixture<ShippingDetailsDeleteDialogComponent>;
        let service: ShippingDetailsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMongodbWithDtoPaginationTestModule],
                declarations: [ShippingDetailsDeleteDialogComponent]
            })
                .overrideTemplate(ShippingDetailsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ShippingDetailsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ShippingDetailsService);
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
