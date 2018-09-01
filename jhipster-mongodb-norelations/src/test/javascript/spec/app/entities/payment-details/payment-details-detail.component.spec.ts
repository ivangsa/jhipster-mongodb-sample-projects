/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterMongodbNorelationsTestModule } from '../../../test.module';
import { PaymentDetailsDetailComponent } from 'app/entities/payment-details/payment-details-detail.component';
import { PaymentDetails } from 'app/shared/model/payment-details.model';

describe('Component Tests', () => {
    describe('PaymentDetails Management Detail Component', () => {
        let comp: PaymentDetailsDetailComponent;
        let fixture: ComponentFixture<PaymentDetailsDetailComponent>;
        const route = ({ data: of({ paymentDetails: new PaymentDetails('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMongodbNorelationsTestModule],
                declarations: [PaymentDetailsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PaymentDetailsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PaymentDetailsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.paymentDetails).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
