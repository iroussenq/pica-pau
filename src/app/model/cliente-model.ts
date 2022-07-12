export interface ClienteModel {
  id: string;
  nome: string;
  niver: string;
  email: string;
  cpf: string;
  idade?: string;
  documento?: string;
  documentoValido?: boolean;
}
