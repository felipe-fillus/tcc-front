
export class User {
    email: string;
    tipo: string;

    constructor(model?: User) {
        this.email = model ? model.email : '';
        this.tipo = model ? model.tipo : '';
    }
}