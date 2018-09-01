/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterMongodbWithDtoTestModule } from '../../../test.module';
import { ShippingDetailsUpdateComponent } from 'app/entities/shipping-details/shipping-details-update.component';
import { ShippingDetailsService } from 'app/entities/shipping-details/shipping-details.service';
import { ShippingDetails } from 'app/shared/model/shipping-details.model';

describe('Component Tests', () => {
    describe('ShippingDetails Management Update Component', () => {
        let comp: ShippingDetailsUpdateComponent;
        let fixture: ComponentFixture<ShippingDetailsUpdateComponent>;
        let service: ShippingDetailsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMongodbWithDtoTestModule],
                declarations: [ShippingDetailsUpdateComponent]
            })
                .overrideTemplate(ShippingDetailsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ShippingDetailsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ShippingDetailsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ShippingDetails('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.shippingDetails = entity;
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
                    const entity = new ShippingDetails();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.shippingDetails = entity;
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
