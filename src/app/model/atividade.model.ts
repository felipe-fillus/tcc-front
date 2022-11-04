import { ETipoAtividade } from "../enum/tipo-atividade.enum";
import { Exercicio } from "./exercicio.model";

export class Atividade {
    id:number;
    idProfessor:number;
    tipoAtividade:ETipoAtividade;
    nomeAtividade:string;
    qtdAtividade:number;
    exercicios: Exercicio[];

    constructor() {
        this.id = null;
        this.idProfessor = null;
        this.tipoAtividade = null;
        this.nomeAtividade = null;
        this.qtdAtividade = null;
        this.exercicios = null;
    }
}