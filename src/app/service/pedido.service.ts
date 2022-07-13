import { PedidoModel } from './../model/pedido-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  url = 'http://localhost:8080/pedido/';

  constructor(private http: HttpClient) {}

  consultar(): Observable<PedidoModel[]> {
    return this.http.get<PedidoModel[]>(this.url + 'consultar');
  }

  cadastrar(
    idCliente: string,
    idFarmaceutico: string
  ): Observable<PedidoModel> {
    return this.http.post<PedidoModel>(this.url + 'cadastrar', {
      cliente: { id: idCliente },
      farmaceutico: { id: idFarmaceutico },
    });
  }

  adicionarProduto(id: string, idProduto: string): Observable<PedidoModel> {
    return this.http.put<PedidoModel>(this.url + 'adicionar-produto/' + id, {
      idsProdutos: [idProduto],
    });
  }

  pagar(id: string, valor: number): Observable<PedidoModel> {
    return this.http.put<PedidoModel>(this.url + 'pagar/' + id, {
      valor,
    });
  }

  remover(id: string): Observable<PedidoModel> {
    return this.http.delete<PedidoModel>(this.url + 'remover/' + id);
  }
}
