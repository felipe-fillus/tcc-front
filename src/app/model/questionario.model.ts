export class Questionario {
    id:number;
    idAluno:number;
    tipoExercicio:any;
    observacao:string;
    preferencias:any[];

    constructor() {
        this.id = null;
        this.idAluno = null;
        this.tipoExercicio = null;
        this.observacao = '';
        this.preferencias = [];
    }
}