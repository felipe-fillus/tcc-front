
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthBaseService } from '../providers/service/auth/auth-base.service';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    runRefreshToken: boolean = true;

    constructor(
        public authBaseService: AuthBaseService,
        //public alertService: AlertService,
    ) {

    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<any> {

        return next.handle(request)
            .pipe(
                tap(data => {
                    if (data instanceof HttpResponse) {

                        if (data.body && data.body.error) {
                            // this.alertService.error(data.body.error);
                            throw new Error(data.body.error);
                        }
                    }
                }),
                catchError(err => {

                    switch (err.status) {
                        case 0:
                            // this.alertService.error(err.statusText);
                            // console.error(err.error);
                            break;

                        case 400:
                            if (err.error && err.error.error_description && err.error.error_description == 'Code not valid') {
                                // this.alertService.error('Código retornado do AMEI inválido');
                            }
                            // this.alertService.error('Sessão expirada');
                            // this.authBaseService.logout();


                            break;

                        case 401:
                            if (err.error !== null) {
                                // this.alertService.error('Não autorizado');
                            } else {
                                // this.alertService.error('Sessão expirada');
                            }
                            // this.authBaseService.logout();
                            break;
                        case 403:
                            // this.alertService.error('Usuário não possui acesso ao sistema');
                            break;
                        case 415:

                            break;
                        case 500:
                            const error = err.error.message || err.statusText;

                            if (error.includes('Access Token nulo')) {
                                // this.alertService.error('Não autorizado');
                                // this.authBaseService.logout();
                            } else {
                                // this.alertService.error(error);
                            }
                            break;
                    }

                    return throwError(err);
                }));
    }
}

