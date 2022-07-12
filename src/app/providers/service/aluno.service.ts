import { Aluno } from './../../model/aluno.model';
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class AlunoService extends BaseService<Aluno> {
    serviceName = 'aluno';

}