import { Injectable } from "@angular/core";
import { Professor } from "../../model/professor.model";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class ProfessorService extends BaseService<Professor> {
    serviceName = 'professor';

    filtrar(model: any) {
        return this.http.post(this.urlApi + '/filtrar-professores', model);
    }


    deletarProfessor(id: number) {
        return this.http.delete(this.urlApi + '/delete-professor/' + id, {});
    }

}