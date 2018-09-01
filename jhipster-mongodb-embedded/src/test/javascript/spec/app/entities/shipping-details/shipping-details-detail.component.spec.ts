/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterMongodbEmbeddedTestModule } from '../../../test.module';
import { ShippingDetailsDetailComponent } from 'app/entities/shipping-details/shipping-details-detail.component';
import { ShippingDetails } from 'app/shared/model/shipping-details.model';

describe('Component Tests', () => {
    describe('ShippingDetails Management Detail Component', () => {
        let comp: ShippingDetailsDetailComponent;
        let fixture: ComponentFixture<ShippingDetailsDetailComponent>;
        const route = ({ data: of({ shippingDetails: new ShippingDetails('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMongodbEmbeddedTestModule],
                declarations: [ShippingDetailsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ShippingDetailsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ShippingDetailsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.shippingDetails).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
