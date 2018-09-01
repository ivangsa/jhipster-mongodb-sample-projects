/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterMongodbEmbeddedTestModule } from '../../../test.module';
import { ShippingDetailsComponent } from 'app/entities/shipping-details/shipping-details.component';
import { ShippingDetailsService } from 'app/entities/shipping-details/shipping-details.service';
import { ShippingDetails } from 'app/shared/model/shipping-details.model';

describe('Component Tests', () => {
    describe('ShippingDetails Management Component', () => {
        let comp: ShippingDetailsComponent;
        let fixture: ComponentFixture<ShippingDetailsComponent>;
        let service: ShippingDetailsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMongodbEmbeddedTestModule],
                declarations: [ShippingDetailsComponent],
                providers: []
            })
                .overrideTemplate(ShippingDetailsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ShippingDetailsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ShippingDetailsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ShippingDetails('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.shippingDetails[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
