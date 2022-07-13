import { FarmaceuticoModel } from './farmaceutico-model';
import { Farmaceutico } from './../domain/farmaceutico';
import { ClienteModel } from './cliente-model';
import { ProdutoModel } from './produto-model';
export interface PedidoModel {
  id: string;
  cliente: ClienteModel;
  farmaceutico: FarmaceuticoModel;
  produtos: Array<ProdutoModel>;
  valor: number;
  valorPago: number;
  troco: number;
  data: string;
  dataPagamento: string;
  status: string;
}
