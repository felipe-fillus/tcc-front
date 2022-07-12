import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base.service';
import { User } from '../../../model/user.model';
import { Login } from '../../../model/login.model';
import { Token } from '../../../model/token.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthBaseService extends BaseService<any>{
  serviceName = 'usuarios';
  usuarioLogadoSubject: BehaviorSubject<{ user: User}> = new BehaviorSubject({ user: new User()});
  router: Router;
  

  apiUrl = 'http://localhost:8080/api/'

  setCallbackUrl(url: string): void {
    sessionStorage.setItem('callback-url', url);
  }

  getCallbackUrl(): string {
    return sessionStorage.getItem('callback-url') as string;
  }

  clearCallbackUrl(): void {
    sessionStorage.removeItem('callback-url');
  }

  getToken(): string | null {
    return window.localStorage.getItem('local-token');
  }

  watchLoggedUser(): Observable<{ user: User}> {
    return this.usuarioLogadoSubject;
  }

  getLoggedProfile(returnPromise: boolean = false): Observable<string> | any {
    let http = this.getAll(undefined, 'meus-dados');
    if (returnPromise) {
      return http.toPromise();
    }

    return http;
  }

  setLoggedUser(token?: string): void {
    if (token) {
      
      window.localStorage.setItem('local-token', token);
    }

    if (this.getToken()) {
      const loggedUser = <Observable<User>>this.getLoggedProfile();
      forkJoin([loggedUser]).subscribe((res: [User]) => {
        this.usuarioLogadoSubject.next({ user: res[0]});
      })

    }
  }

  setRefreshToken(token?: string): void {
    if (token) {
      window.localStorage.setItem('local-token', token);
    }
  }


  login(auth: Login): Observable<Token> {
    let headers = new HttpHeaders();

    const url = this.apiUrl + 'public/auth/login';
    return this.http.post<Token>(url, auth, { headers: headers });
  }

  refreshToken(): Observable<Token> {
    let headers = new HttpHeaders();

    const url = this.apiUrl + 'auth/refresh-token';
    return this.http.post<Token>(url, { headers: headers });
  }

  logout(): void {
    window.localStorage.removeItem('local-token');
    this.usuarioLogadoSubject.next({ user: new User()});
    this.router.navigateByUrl('/pageLogin');
  }
}
