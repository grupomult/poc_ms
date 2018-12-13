export interface ITipoVagao {
    id?: number;
    codigo?: string;
    descricao?: string;
}

export class TipoVagao implements ITipoVagao {
    constructor(public id?: number, public codigo?: string, public descricao?: string) {}
}
