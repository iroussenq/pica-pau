import { ProdutoModel } from './produto-model';
export interface FornecedorModel {
  id: string;
  nome: string;
  niver: string;
  cnpj: string;
  produtos: ProdutoModel[];
  idade?: string;
  documento?: string;
  documentoValido?: boolean;
}
