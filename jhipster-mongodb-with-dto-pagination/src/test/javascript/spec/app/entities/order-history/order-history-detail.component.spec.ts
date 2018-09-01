/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterMongodbWithDtoPaginationTestModule } from '../../../test.module';
import { OrderHistoryDetailComponent } from 'app/entities/order-history/order-history-detail.component';
import { OrderHistory } from 'app/shared/model/order-history.model';

describe('Component Tests', () => {
    describe('OrderHistory Management Detail Component', () => {
        let comp: OrderHistoryDetailComponent;
        let fixture: ComponentFixture<OrderHistoryDetailComponent>;
        const route = ({ data: of({ orderHistory: new OrderHistory('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMongodbWithDtoPaginationTestModule],
                declarations: [OrderHistoryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OrderHistoryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrderHistoryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.orderHistory).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
