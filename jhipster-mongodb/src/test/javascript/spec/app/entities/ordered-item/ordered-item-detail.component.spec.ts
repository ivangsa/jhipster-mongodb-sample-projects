/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterMongodbTestModule } from '../../../test.module';
import { OrderedItemDetailComponent } from 'app/entities/ordered-item/ordered-item-detail.component';
import { OrderedItem } from 'app/shared/model/ordered-item.model';

describe('Component Tests', () => {
    describe('OrderedItem Management Detail Component', () => {
        let comp: OrderedItemDetailComponent;
        let fixture: ComponentFixture<OrderedItemDetailComponent>;
        const route = ({ data: of({ orderedItem: new OrderedItem('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMongodbTestModule],
                declarations: [OrderedItemDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OrderedItemDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrderedItemDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.orderedItem).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
