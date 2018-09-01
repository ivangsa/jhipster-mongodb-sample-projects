/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterMongodbNorelationsTestModule } from '../../../test.module';
import { CustomerOrderDetailComponent } from 'app/entities/customer-order/customer-order-detail.component';
import { CustomerOrder } from 'app/shared/model/customer-order.model';

describe('Component Tests', () => {
    describe('CustomerOrder Management Detail Component', () => {
        let comp: CustomerOrderDetailComponent;
        let fixture: ComponentFixture<CustomerOrderDetailComponent>;
        const route = ({ data: of({ customerOrder: new CustomerOrder('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMongodbNorelationsTestModule],
                declarations: [CustomerOrderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CustomerOrderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CustomerOrderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.customerOrder).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
