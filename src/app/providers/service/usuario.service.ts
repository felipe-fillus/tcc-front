import { Instituicao } from './../../model/instituicao.model';
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Login } from '../../model/login.model';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService extends BaseService<any> {
    serviceName = 'usuario';

    get urlApi() {
        return 'http://localhost:8080/api/' + this.serviceName;
    }


    login(auth: Login) {
        const url = this.urlApi + '/login?';
        return this.http.post(url, auth);
    }
    
}