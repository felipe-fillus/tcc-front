import { Exercicio } from './../../model/exercicio.model';
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class ExercicioService extends BaseService<Exercicio> {
    serviceName = 'exercicio';

}