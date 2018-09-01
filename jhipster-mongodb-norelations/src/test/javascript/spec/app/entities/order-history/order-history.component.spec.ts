/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterMongodbNorelationsTestModule } from '../../../test.module';
import { OrderHistoryComponent } from 'app/entities/order-history/order-history.component';
import { OrderHistoryService } from 'app/entities/order-history/order-history.service';
import { OrderHistory } from 'app/shared/model/order-history.model';

describe('Component Tests', () => {
    describe('OrderHistory Management Component', () => {
        let comp: OrderHistoryComponent;
        let fixture: ComponentFixture<OrderHistoryComponent>;
        let service: OrderHistoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMongodbNorelationsTestModule],
                declarations: [OrderHistoryComponent],
                providers: []
            })
                .overrideTemplate(OrderHistoryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrderHistoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderHistoryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new OrderHistory('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.orderHistories[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
