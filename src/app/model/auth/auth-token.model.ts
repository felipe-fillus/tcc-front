export class AuthToken {
    administrador: boolean;
    base64: string;
    codAgente: number;
    dataValidade: string;
    id: string;
    nome: string;

    constructor() {
        this.administrador = null;
        this.base64 = null;
        this.codAgente = null;
        this.dataValidade = null;
        this.id = null;
        this.nome = null;
    }
}