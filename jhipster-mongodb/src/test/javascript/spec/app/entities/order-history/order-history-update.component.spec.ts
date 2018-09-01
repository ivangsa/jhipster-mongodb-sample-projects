/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterMongodbTestModule } from '../../../test.module';
import { OrderHistoryUpdateComponent } from 'app/entities/order-history/order-history-update.component';
import { OrderHistoryService } from 'app/entities/order-history/order-history.service';
import { OrderHistory } from 'app/shared/model/order-history.model';

describe('Component Tests', () => {
    describe('OrderHistory Management Update Component', () => {
        let comp: OrderHistoryUpdateComponent;
        let fixture: ComponentFixture<OrderHistoryUpdateComponent>;
        let service: OrderHistoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMongodbTestModule],
                declarations: [OrderHistoryUpdateComponent]
            })
                .overrideTemplate(OrderHistoryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrderHistoryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderHistoryService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new OrderHistory('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.orderHistory = entity;
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
                    const entity = new OrderHistory();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.orderHistory = entity;
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
