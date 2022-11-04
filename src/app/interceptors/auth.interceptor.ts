import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthBaseService } from '../providers/service/auth/auth-base.service';
import { Token } from '../model/token.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authBaseService: AuthBaseService,
    ) {
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        let headers: any = req.headers;
        let token = this.authBaseService.getToken();

        if (token) {
            headers = headers.append('authorization', 'Bearer ' + token);

            if (this.useApplicationJson(headers) && !this.noContentType(headers)) {
                headers = headers.append('Content-Type', 'application/json;');
            }

            if(!req.url.includes("refresh-token") ){
              this.authBaseService.refreshToken().subscribe((res: Token) => {
                this.authBaseService.setRefreshToken(res.jwt);
              });
            }
        }

        const authReq = req.clone({
            headers
        });

        return next
            .handle(authReq)
            .pipe(
                map((event: HttpEvent<any>) => {
                    return event;
                }),
            );
    }

    useApplicationJson(header): boolean {
        if (header.get('Content-Type') !== null && (<string>header.get('Content-Type').includes('application/x-www-form-urlencoded'))) {
            return false;
        }
        return true;
    }

    noContentType(header): boolean {
        if (header.get('no-content-type')) {
            return true;
        }
        return false;
    }
}

