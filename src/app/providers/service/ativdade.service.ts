import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Atividade } from './../../model/atividade.model';
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class AtividadeService extends BaseService<Atividade> {
    serviceName = 'atividade';


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

    atribuirAtividade(model: any) {
        return this.http.post(this.urlApi + '/atribuir-atividade', model);
    }

    removerAtividadeAluno(id: number) {
        return this.http.delete(this.urlApi + '/remove-atividade/' + id, {});
    }

    getByIdAluno(id: number) {
        if(id != null && id != undefined)
            return this.http.get(this.urlApi + '/buscar-idaluno/' + id);
    }

    getRecomendadasByIdAluno(id: number) {
        if(id != null && id != undefined)
            return this.http.get(this.urlApi + '/recomendadas-idaluno/' + id);
    }

    filtrar(model: any) {
        return this.http.post(this.urlApi + '/filtrar', model);
    }

    setCloncluido(model: any) {
        return this.http.post(this.urlApi + '/set-concluido', model);
    }
}