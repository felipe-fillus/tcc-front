import { ErrorInterceptor } from './error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthBaseService } from '../providers/service/auth/auth-base.service';
describe('ErrorInterceptor', () => {
    let service: AuthBaseService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule
            ],
            providers: [
                AuthBaseService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: ErrorInterceptor,
                    multi: true,
                },
            ],
        });

        service = TestBed.get(AuthBaseService);
        httpMock = TestBed.get(HttpTestingController);
    });

    // it('should add an Authorization header', () => {
    //     service.getEnvironmentVariables(environment.api_url).subscribe(response => {
    //         expect(response).toBeTruthy();
    //     });

    //     const httpRequest = httpMock.expectOne(`${environment.api_url}public/endpoints`);

    //     expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    // });
})