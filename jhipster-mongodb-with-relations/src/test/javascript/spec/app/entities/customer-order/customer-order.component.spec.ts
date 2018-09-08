/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterMongodbWithRelationsTestModule } from '../../../test.module';
import { CustomerOrderComponent } from 'app/entities/customer-order/customer-order.component';
import { CustomerOrderService } from 'app/entities/customer-order/customer-order.service';
import { CustomerOrder } from 'app/shared/model/customer-order.model';

describe('Component Tests', () => {
    describe('CustomerOrder Management Component', () => {
        let comp: CustomerOrderComponent;
        let fixture: ComponentFixture<CustomerOrderComponent>;
        let service: CustomerOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMongodbWithRelationsTestModule],
                declarations: [CustomerOrderComponent],
                providers: []
            })
                .overrideTemplate(CustomerOrderComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CustomerOrderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerOrderService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CustomerOrder('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.customerOrders[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
