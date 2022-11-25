import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Questionario } from '../../model/questionario.model';
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class QuestionarioService extends BaseService<Questionario> {
    serviceName = 'questionario';

    deletar(id: number): Observable<Object> {
        return this.http.delete(this.urlApi + '/' + id, {})
    }

    buscarPorIdAluno(id: number) {
        return this.http.get(this.urlApi + '/aluno/' + id, {});
    }
}