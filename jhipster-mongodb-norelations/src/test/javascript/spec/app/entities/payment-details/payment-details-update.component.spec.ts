/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterMongodbNorelationsTestModule } from '../../../test.module';
import { PaymentDetailsUpdateComponent } from 'app/entities/payment-details/payment-details-update.component';
import { PaymentDetailsService } from 'app/entities/payment-details/payment-details.service';
import { PaymentDetails } from 'app/shared/model/payment-details.model';

describe('Component Tests', () => {
    describe('PaymentDetails Management Update Component', () => {
        let comp: PaymentDetailsUpdateComponent;
        let fixture: ComponentFixture<PaymentDetailsUpdateComponent>;
        let service: PaymentDetailsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMongodbNorelationsTestModule],
                declarations: [PaymentDetailsUpdateComponent]
            })
                .overrideTemplate(PaymentDetailsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PaymentDetailsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaymentDetailsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PaymentDetails('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.paymentDetails = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PaymentDetails();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.paymentDetails = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
