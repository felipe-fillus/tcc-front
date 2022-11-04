import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
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

}