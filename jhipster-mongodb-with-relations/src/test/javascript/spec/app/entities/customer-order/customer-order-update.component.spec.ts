/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterMongodbWithRelationsTestModule } from '../../../test.module';
import { CustomerOrderUpdateComponent } from 'app/entities/customer-order/customer-order-update.component';
import { CustomerOrderService } from 'app/entities/customer-order/customer-order.service';
import { CustomerOrder } from 'app/shared/model/customer-order.model';

describe('Component Tests', () => {
    describe('CustomerOrder Management Update Component', () => {
        let comp: CustomerOrderUpdateComponent;
        let fixture: ComponentFixture<CustomerOrderUpdateComponent>;
        let service: CustomerOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMongodbWithRelationsTestModule],
                declarations: [CustomerOrderUpdateComponent]
            })
                .overrideTemplate(CustomerOrderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CustomerOrderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerOrderService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CustomerOrder('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.customerOrder = entity;
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
                    const entity = new CustomerOrder();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.customerOrder = entity;
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
