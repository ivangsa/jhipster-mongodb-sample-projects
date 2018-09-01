/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterMongodbNorelationsTestModule } from '../../../test.module';
import { OrderedItemUpdateComponent } from 'app/entities/ordered-item/ordered-item-update.component';
import { OrderedItemService } from 'app/entities/ordered-item/ordered-item.service';
import { OrderedItem } from 'app/shared/model/ordered-item.model';

describe('Component Tests', () => {
    describe('OrderedItem Management Update Component', () => {
        let comp: OrderedItemUpdateComponent;
        let fixture: ComponentFixture<OrderedItemUpdateComponent>;
        let service: OrderedItemService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMongodbNorelationsTestModule],
                declarations: [OrderedItemUpdateComponent]
            })
                .overrideTemplate(OrderedItemUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrderedItemUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderedItemService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new OrderedItem('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.orderedItem = entity;
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
                    const entity = new OrderedItem();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.orderedItem = entity;
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
