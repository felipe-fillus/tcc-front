import { Aluno } from './../../model/aluno.model';
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AlunoService extends BaseService<Aluno> {
    serviceName = 'aluno';

    listarAlunos(params?: any): Observable<any> {
        return this.http.get(this.urlApi + "/lista-alunos/" + params);
    }

    uploadFiles(idExercicio: number, file: File, url: string) {
        const data: FormData = new FormData();
        data.append('file', file);
        let headers = new HttpHeaders();

        headers = headers.append('no-content-type', 'no-content-type');
        
        return this.http.post(this.urlApi + "/" + url + "/" + idExercicio, data, { headers });
    }

    deletar(id: number): Observable<Object> {
        return this.http.delete(this.urlApi + '/' + id, {})
    }

    filtrar(model: any) {
        return this.http.post(this.urlApi + '/filtrar-alunos', model);
    }
}