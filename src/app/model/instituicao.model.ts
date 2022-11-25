export class Instituicao {
    id:number;
    nome:string;
    cnpj:number;
    email:string;
    cep:number;
    endereco:string;
    numero:number;
    bairro:string;
    cidade:string;
    uf:string;
    telefone:string;
    senha:string;
    plano: string;
    nomeCartao: string;
    sobrenomeCartao: string;
    numeroCartao: number;
    validadeCartao: number;
    cvvCartao: number;
    formaPagamento: string;

    constructor() {
        this.id = null;
        this.nome = null;
        this.cnpj = null;
        this.email = null;
        this.cep = null;
        this.endereco = null;
        this.numero = null;
        this.bairro = null;
        this.cidade = null;
        this.uf = null;
        this.telefone = null;
        this.senha = null;
        this.plano = null;
        this.nomeCartao = null;
        this.sobrenomeCartao = null;
        this.numeroCartao = null;
        this.validadeCartao = null;
        this.cvvCartao = null;
        this.formaPagamento = null;
    }
}