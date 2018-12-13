import { ITipoVagao } from 'app/shared/model//tipo-vagao.model';

export interface IVagao {
    id?: number;
    codigo?: string;
    descricao?: string;
    altura?: string;
    comprimento?: string;
    largura?: string;
    tipoVagao?: ITipoVagao;
}

export class Vagao implements IVagao {
    constructor(
        public id?: number,
        public codigo?: string,
        public descricao?: string,
        public altura?: string,
        public comprimento?: string,
        public largura?: string,
        public tipoVagao?: ITipoVagao
    ) {}
}
