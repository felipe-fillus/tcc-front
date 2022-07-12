import { Injectable } from "@angular/core";
import { Professor } from "../../model/professor.model";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class ProfessorService extends BaseService<Professor> {
    serviceName = 'professor';

}