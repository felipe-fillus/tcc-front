import { Professor } from './../../model/professor.model';
import { Injectable } from "@angular/core";
import { EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
    providedIn: 'root'
})
export class UsuarioEventService {
    onUserEvent = new EventEmitter();

    private dataSource = new BehaviorSubject<any>(undefined);
    data = this.dataSource.asObservable();

    constructor() { }

    updatedDataSelection(data: any){
        this.dataSource.next(data);
    }
}