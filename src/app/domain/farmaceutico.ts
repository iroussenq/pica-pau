import { PessoaFisica } from './pessoa-fisica';

export interface Farmaceutico extends PessoaFisica {
  ofertaDia: string;
}
