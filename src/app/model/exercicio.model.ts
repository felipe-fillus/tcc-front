import { AnyNaptrRecord } from "dns";

export class Exercicio {
    id:number;
    idAtividade:number;
    tipoExercicio:any;
    imagensExercicio:ImagemAnexo[];
    palavra:string;

    constructor() {
        this.id = null;
        this.idAtividade = null;
        this.tipoExercicio = null;
        this.imagensExercicio = null;
        this.palavra = null;
    }
}

export class ImagemAnexo {
    id: number;
    idExercicio: number;
    tipo: string;
    pathImagem: string;
}