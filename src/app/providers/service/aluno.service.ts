import { Aluno } from './../../model/aluno.model';
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AlunoService extends BaseService<Aluno> {
    serviceName = 'aluno';

    listarAlunos(params?: any): Observable<any> {
        return this.http.get(this.urlApi + "/lista-alunos/" + params);
    }

}