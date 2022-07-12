import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {
  authorization: string;

  public endpoint: string;
  public serviceName: string;
  public model: any;

  constructor(
    protected http: HttpClient,
    protected router: Router,
  ) { }

  get urlApi() {
    return 'http://localhost:8080/api/' + this.serviceName;
  }

  list(): Observable<T[]> {
    return this.http.get<T[]>(this.urlApi);
  }

  filter(params?: any, ext?: string): Observable<any> {
    if (ext) {
      if (ext && params) {
        return this.http.get(this.urlApi + '/' + ext + this.paramsToQueryString(params));
      }
      return this.http.get(this.urlApi + '/' + ext);
    }

    if (!ext && params) {
      return this.http.get(this.urlApi + this.paramsToQueryString(params));
    }
    return this.http.get(this.urlApi);
  }

  getByIdPagina(id: number): Observable<T> {
    return this.http.get<T>(this.urlApi + '?id=' + id);
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(this.urlApi + '/' + id);
  }

  getWithParams(params: any) {
    return this.http.get<T>(this.urlApi + '/' + params);
  }

  getAll(params?: {}, ext?: string): Observable<any> {
    if (ext) {
      if (ext && params) {
        return this.http.get(this.urlApi + '/' + ext + this.paramsToQueryString(params));
      }
      return this.http.get(this.urlApi + '/' + ext);
    }

    if (!ext && params) {
      return this.http.get(this.urlApi + this.paramsToQueryString(params));
    }
    return this.http.get(this.urlApi);
  }

  add(model: any, stringName?: string) {
    if (typeof stringName !== 'undefined' && stringName !== null) {
      return this.http.post(this.urlApi + '/' + stringName, model);
    }
    
    return this.http.post(this.urlApi, model);
  }


  edit(model: any, param?: string) {
    if (!param) {
      return this.http.put(this.urlApi, model);
    }
    return this.http.put(this.urlApi + '/' + param, model);
  }

  delete(id: number) {
    return this.http.delete(this.urlApi + '?id=' + id);
  }

  paramsToQueryString(params: any) {
    let result = '?';

    for (let propertyName in params) {
      if (params && params[propertyName] !== undefined && params[propertyName] !== null && params[propertyName] !== '') {
        if (Array.isArray(params[propertyName])) {
          for (const item of params[propertyName]) {
            result += propertyName + '=' + item + '&';
          }
        } else {
          result += propertyName + '=' + params[propertyName] + '&';
        }
      }
    }
    return result.substring(0, result.length - 1);
  }
}
