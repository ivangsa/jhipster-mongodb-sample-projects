/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterMongodbEmbeddedTestModule } from '../../../test.module';
import { OrderedItemComponent } from 'app/entities/ordered-item/ordered-item.component';
import { OrderedItemService } from 'app/entities/ordered-item/ordered-item.service';
import { OrderedItem } from 'app/shared/model/ordered-item.model';

describe('Component Tests', () => {
    describe('OrderedItem Management Component', () => {
        let comp: OrderedItemComponent;
        let fixture: ComponentFixture<OrderedItemComponent>;
        let service: OrderedItemService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMongodbEmbeddedTestModule],
                declarations: [OrderedItemComponent],
                providers: []
            })
                .overrideTemplate(OrderedItemComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrderedItemComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderedItemService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new OrderedItem('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.orderedItems[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
