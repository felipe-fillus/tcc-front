import { Aluno } from './aluno.model';
export class Professor {
    id:number;
    nome:string;
    cpf:number;
    email:string;
    telefone:string;
    idInstituicao:number;
    senha:string;
    alunos?: Aluno[];
    
    constructor() {
        this.id = null;
        this.nome = null;
        this.cpf = null;
        this.email = null;
        this.telefone = null;
        this.idInstituicao = null;
        this.senha = null;
        this.alunos = null;
    }
}