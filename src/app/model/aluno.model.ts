import { AtividadeAluno } from "./atividade-aluno.model";

export class Aluno {
    id:number;
    nome:string;
    cpf:number;
    email:string;
    idInstituicao:number;
    idProfessor:number;
    senha:string;
    atividadesAluno?: AtividadeAluno[];
    atividade: boolean;

    constructor() {
        this.id = null;
        this.nome = null;
        this.cpf = null;
        this.email = null;
        this.idInstituicao = null;
        this.idProfessor = null;
        this.senha = null;
        this.atividadesAluno = [];
        this.atividade = null;
    }
}