/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderHistoryService } from 'app/entities/order-history/order-history.service';
import { OrderHistory } from 'app/shared/model/order-history.model';
import { SERVER_API_URL } from 'app/app.constants';

describe('Service Tests', () => {
    describe('OrderHistory Service', () => {
        let injector: TestBed;
        let service: OrderHistoryService;
        let httpMock: HttpTestingController;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(OrderHistoryService);
            httpMock = injector.get(HttpTestingController);
        });

        describe('Service methods', () => {
            it('should call correct URL', () => {
                service.find('123').subscribe(() => {});

                const req = httpMock.expectOne({ method: 'GET' });

                const resourceUrl = SERVER_API_URL + 'api/order-histories';
                expect(req.request.url).toEqual(resourceUrl + '/' + '123');
            });

            it('should create a OrderHistory', () => {
                service.create(new OrderHistory(null)).subscribe(received => {
                    expect(received.body.id).toEqual(null);
                });

                const req = httpMock.expectOne({ method: 'POST' });
                req.flush({ id: null });
            });

            it('should update a OrderHistory', () => {
                service.update(new OrderHistory('123')).subscribe(received => {
                    expect(received.body.id).toEqual('123');
                });

                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush({ id: '123' });
            });

            it('should return a OrderHistory', () => {
                service.find('123').subscribe(received => {
                    expect(received.body.id).toEqual('123');
                });

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush({ id: '123' });
            });

            it('should return a list of OrderHistory', () => {
                service.query(null).subscribe(received => {
                    expect(received.body[0].id).toEqual('123');
                });

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush([new OrderHistory('123')]);
            });

            it('should delete a OrderHistory', () => {
                service.delete('123').subscribe(received => {
                    expect(received.url).toContain('/' + '123');
                });

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush(null);
            });

            it('should propagate not found response', () => {
                service.find('123').subscribe(null, (_error: any) => {
                    expect(_error.status).toEqual(404);
                });

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush('Invalid request parameters', {
                    status: 404,
                    statusText: 'Bad Request'
                });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
