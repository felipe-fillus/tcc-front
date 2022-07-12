import { Injectable } from "@angular/core";
import { Instituicao } from "../../model/instituicao.model";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class InstituicaoService extends BaseService<Instituicao> {
    serviceName = 'instituicao';

}