import { ImagemAnexo } from './../../model/exercicio.model';
import { Aluno } from '../../model/aluno.model';
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ImagemService extends BaseService<ImagemAnexo> {
    serviceName = 'imagens';

    deletar(id: number): Observable<Object> {
        return this.http.delete(this.urlApi + '/' + id, {})
    }

    getImagem(id: number) {
        return this.urlApi + '/buscar-imagem/' + id;
    }
}